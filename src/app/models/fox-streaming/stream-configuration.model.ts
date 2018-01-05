import {DFPModel} from './dfp.model';

export interface StreamConfigurationModel {
  releaseUrl: string;
  authToken: string;

  skinUrl: string;
  layoutUrl: string;

  autoPlay: boolean;
  allowFullScreen: boolean;
  mute: boolean;

  formats: string;

  event: any;
  authorization: any;

  dfp: DFPModel;

  error: any;
}
