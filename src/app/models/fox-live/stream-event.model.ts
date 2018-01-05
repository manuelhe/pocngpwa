export interface StreamEventModel {
  authLevel: string;
  channel: string;
  channel_info: {
    display_name: string;
    logo_picture: string;
    media_url: string;
    name: string;
  };
  startDate: number;
  endDate: number;
  id: string;
  image: {
    url: string;
  };
  label: string;
  media_url: string;
  mediaId: string;
  statsid: string;
  externalEvent: string;
  title: string;
  location: string;
  isLive: boolean;
  isChannel: boolean;
  isPremium: boolean;
}
