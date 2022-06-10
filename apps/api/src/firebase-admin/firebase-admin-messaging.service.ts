import { Injectable } from "@nestjs/common"
import { App } from "firebase-admin/app"
import {
  BatchResponse,
  getMessaging,
  Message,
  MessagingConditionResponse,
  MessagingDeviceGroupResponse,
  MessagingDevicesResponse,
  MessagingOptions,
  MessagingPayload,
  MessagingTopicManagementResponse,
  MessagingTopicResponse,
  MulticastMessage,
} from "firebase-admin/messaging"

@Injectable()
export class FirebaseMessagingService {
  constructor(public readonly app: App) {}

  get messaging() {
    if (!this.app) {
      throw new Error("Firebase instance is undefined.")
    }
    return getMessaging(this.app)
  }

  send(message: Message, dryRun?: boolean): Promise<string> {
    return this.messaging.send(message, dryRun)
  }
  sendAll(messages: Message[], dryRun?: boolean): Promise<BatchResponse> {
    return this.messaging.sendAll(messages, dryRun)
  }
  sendMulticast(message: MulticastMessage, dryRun?: boolean): Promise<BatchResponse> {
    return this.messaging.sendMulticast(message, dryRun)
  }
  sendToDevice(
    registrationToken: string | string[],
    payload: MessagingPayload,
    options?: MessagingOptions
  ): Promise<MessagingDevicesResponse> {
    return this.messaging.sendToDevice(registrationToken, payload, options)
  }
  sendToDeviceGroup(
    notificationKey: string,
    payload: MessagingPayload,
    options?: MessagingOptions
  ): Promise<MessagingDeviceGroupResponse> {
    return this.messaging.sendToDeviceGroup(notificationKey, payload, options)
  }
  sendToTopic(
    topic: string,
    payload: MessagingPayload,
    options?: MessagingOptions
  ): Promise<MessagingTopicResponse> {
    return this.messaging.sendToTopic(topic, payload, options)
  }
  sendToCondition(
    condition: string,
    payload: MessagingPayload,
    options?: MessagingOptions
  ): Promise<MessagingConditionResponse> {
    return this.messaging.sendToCondition(condition, payload, options)
  }
  subscribeToTopic(
    registrationTokens: string | string[],
    topic: string
  ): Promise<MessagingTopicManagementResponse> {
    return this.messaging.subscribeToTopic(registrationTokens, topic)
  }
  unsubscribeFromTopic(
    registrationTokens: string | string[],
    topic: string
  ): Promise<MessagingTopicManagementResponse> {
    return this.messaging.unsubscribeFromTopic(registrationTokens, topic)
  }
}
