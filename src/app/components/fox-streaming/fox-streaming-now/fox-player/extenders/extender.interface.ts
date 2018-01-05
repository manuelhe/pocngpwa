import { Observable } from 'rxjs/Observable';

export interface IExtender {
  apply(instance: any, configuration: any): Observable<any>;
}
