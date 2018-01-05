import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resize'
})
export class ResizePipe implements PipeTransform {

  private sizes: any = {
    '1280': '/img/resized/1280x720/',
    '800': '/img/resized/800x450/',
    '640': '/img/resized/640x360/',
    '400': '/img/resized/400x225/',
    '320': '/img/resized/320x180/',
    '240': '/img/resized/240x135/'
  };

  transform(imagurl: any, size: any): any {
    try {
      const valueStrip = imagurl.split('/img/');
      const imgHost = valueStrip[0];
      const imgStrip = valueStrip[1].split('/');
      const imgName = imgStrip[1];

      return `${imgHost}${this.sizes[size]}${imgName}`;
    } catch (e) {
      return imagurl;
    }
  }

}
