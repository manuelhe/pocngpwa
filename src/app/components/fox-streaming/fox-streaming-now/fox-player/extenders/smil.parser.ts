import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { parseString } from 'xml2js';

export module smil {

  export const parse = (smil: string):Observable<any> => {
    return Observable.fromPromise(new Promise(res => {
      parseString(smil, (err, result) => {
        let obj = {
          errors: parseErrors(result.smil),
          head: undefined,
          body: undefined
        };

        if (!obj.errors) {
          obj.head = parseHead(result.smil);
          obj.body = parseBody(result.smil);
        }
        res(obj);
      });
    }));
  }

}

const parseErrors = (smil:any): any => {
  if (smil
    && hasContent(smil.body)
    && hasContent(smil.body[0].seq)
    && hasContent(smil.body[0].seq[0].ref)
    && smil.body[0].seq[0].ref[0].param) {
      const details = reduce(smil.body[0].seq[0].ref[0].param, (accumulator, value) => {
        const name = value['$'].name;
        let val = value['$'].value;
        if (name === 'isException') {
          val = Boolean(val);
        }
        accumulator[name] = val;
        return accumulator;
      }, {});

      if (details.isException) {
        return details;
      }
  }
  return false;
}

const parseHead = (smil: any): any => {
  if (smil
    && hasContent(smil.head)
    && smil.head[0].meta) {
      return reduce(smil.head[0].meta, (accumulator, value) => {
        accumulator[value['$'].name] = value['$'].content;
        return accumulator;
      }, {});
  }
  return undefined;
};

const parseBody = (smil: any) :any => {
  if (smil
    && hasContent(smil.body)
    && hasContent(smil.body[0].seq)) {
      if (hasContent(smil.body[0].seq[0].switch) && hasContent(smil.body[0].seq[0].switch[0].video)) {
        return { videoUrl:  smil.body[0].seq[0].switch[0].video[0].$.src }
      }

      if (hasContent(smil.body[0].seq) && (hasContent(smil.body[0].seq[0].ref) || hasContent(smil.body[0].seq[0].video))) {
        let videoUrl = undefined;
        let vastUrl = undefined;
        if (hasContent(smil.body[0].seq[0].video)) {
          videoUrl = smil.body[0].seq[0].video[0].$.src;
        }
        if(hasContent(smil.body[0].seq[0].ref)) {
          vastUrl = smil.body[0].seq[0].ref[0].$.src;
          if (!videoUrl) {
            videoUrl = smil.body[0].seq[0].ref[1].$.src;
          }
        }

        return {
          videoUrl,
          vastUrl
        }
      }
    }
  return undefined;
}

const reduce = (source:any, fn: any, accumulator: any) : any => {
  source.forEach((value) => {
    accumulator = fn(accumulator, value);
  });
  return accumulator;
}

const hasContent = (item:any):boolean => {
  return item && item.length;
}
