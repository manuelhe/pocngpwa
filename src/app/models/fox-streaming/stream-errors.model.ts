export interface FallbackErrorModel {
  id: string;
  title: string;
  message: string;
  errorTarget: string;
  errorTargetMessage: string;
  specialError: boolean;
  ready: boolean;
}
