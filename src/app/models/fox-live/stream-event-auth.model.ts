export interface StreamEventAuthModel {
  duration: number;
  idleTimeout: number;
  status: string;
  tokenResponse: {
    token: string;
  };
}
