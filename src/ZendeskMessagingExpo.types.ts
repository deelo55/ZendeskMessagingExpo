export interface ZendeskUser {
  id: string;
  externalId: string;
}

export interface ZendeskInitializeConfig {
  channelKey: string;
  skipOpenMessaging?: boolean;
}


export type ZendeskEventType = keyof ZendeskEventResponse;
export type ZendeskEvent<Type extends ZendeskEventType> =
  ZendeskEventResponse[Type];

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- allow type
type ZendeskEventResponse = {
  unreadMessageCountChanged: {
    unreadCount: number;
  };
  authenticationFailed: {
    reason: string;
  };
};

export type EmitterSubscription = {
  remove: () => void; // The remove method to unsubscribe from the event
};

