import { globals } from '../../../../../../_constants';

export module youbora {

  export const attach = (player: any, event: any, user: any): void => {
    if (!player.youbora) {
      return;
    }
    player.youbora({
      accountCode: globals.adsAndTracking.youboraAccountCode,
      enableAnalytics: true,
      username: user.subscriberID,
      media: {
        isLive: event.isLive   
      },
      extraParams: {
        'param1': 'FOX Sports',
        'param2': event.id,
        'param3': globals.appVersion,
        'param4': user.identityProvider.referenceID,
        'param5': event.title,
        'param6': event.channel_info.name,
        'param7': null,
        'param8': null
      }
    });
  }

}
