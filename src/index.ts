// Import the native module. On web, it will be resolved to ZendeskMessagingExpo.web.ts
// and on native platforms to ZendeskMessagingExpo.ts
import { EventEmitter, Subscription } from 'expo-modules-core';
import { ZendeskEvent, ZendeskEventType, ZendeskInitializeConfig, ZendeskUser, EmitterSubscription } from "./ZendeskMessagingExpo.types";
import ZendeskMessagingExpoModule from "./ZendeskMessagingExpoModule";

// Get the native constant value.
export const PI = ZendeskMessagingExpoModule.PI;

export function hello(): string {
  return ZendeskMessagingExpoModule.hello();
}
/**
 * Initializing Zendesk SDK.
 *
 * You should call this function first before using other features.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#initialize-the-sdk}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#initialize-the-sdk}
 */
export async function initialize(config: ZendeskInitializeConfig) {
  return ZendeskMessagingExpoModule.initialize(config.channelKey);
}

/**
 * Invalidates the current instance of Zendesk.
 *
 * After calling this method you will have to call `initialize` again if you would like to use Zendesk.
 */
export function reset(): void {
  return ZendeskMessagingExpoModule.reset();
}

/**
 * To authenticate a user call the `login` with your own JWT.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#loginuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#loginuser}
 */
export async function loginUser(token: string): Promise<ZendeskUser> {
  if (typeof token !== "string" || !token.length) {
    return Promise.reject(new Error("invalid token"));
  }
  return ZendeskMessagingExpoModule.loginUser(token);
}

/**
 * Logout from Zendesk SDK.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#logoutuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#logoutuser}
 */
export function logout(): Promise<void> {
  return ZendeskMessagingExpoModule.logoutUser();
}


/**
 * Show the native based conversation screen.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#show-the-conversation}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#show-the-conversation}
 */
export async function openMessagingView(): Promise<void> {
  return ZendeskMessagingExpoModule.openMessagingView();
}

export async function setValueAsync(value: string) {
  return await ZendeskMessagingExpoModule.setValueAsync(value);
}

export function getUnreadMessageCount(): Promise<number> {
  return ZendeskMessagingExpoModule.getUnreadMessageCount();
}

const eventEmitter = new EventEmitter(ZendeskMessagingExpoModule);

/**
 * Add a listener for listening emitted events by Zendesk SDK.
 */
export function addEventListener<EventType extends ZendeskEventType>(
  type: EventType,
  listener: (event: ZendeskEvent<EventType>) => void
): EmitterSubscription {
  return eventEmitter.addListener(type, listener);
}

/**
 * Remove subscribed event listener.
 */
export function removeSubscription(subscription: EmitterSubscription): void {
  eventEmitter.removeSubscription(subscription);
}

/**
 * Remove all of registered listener by event type.
 */
export function removeAllListeners(type: ZendeskEventType): void {
  eventEmitter.removeAllListeners(type);
}