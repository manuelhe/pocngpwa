import { Injectable } from '@angular/core';

@Injectable()
export class MsgService {

  constructor() { }

  public getMessage():string {
    return 'FOX News 2. TEst';
  }

}
