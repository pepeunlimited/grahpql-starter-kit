import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface StartSubscriptionParams {
  userId: number;
  planId: number;
}

export interface GetSubscriptionParams {
  subscriptionId: number;
  userId: number;
}

export interface StopSubscriptionParams {
  userId: number;
}

export interface GetSubscriptionsParams {
  userId: number;
  pageSize: number;
  pageToken: number;
}

export interface GetSubscriptionsResponse {
  subscriptions: Subscription[];
  nextPageToken: number;
}

export interface Subscription {
  id: number;
  userId: number;
  planId: number;
  startAt: string;
  endAt: string;
}

const baseStartSubscriptionParams: object = {
  userId: 0,
  planId: 0,
};

const baseGetSubscriptionParams: object = {
  subscriptionId: 0,
  userId: 0,
};

const baseStopSubscriptionParams: object = {
  userId: 0,
};

const baseGetSubscriptionsParams: object = {
  userId: 0,
  pageSize: 0,
  pageToken: 0,
};

const baseGetSubscriptionsResponse: object = {
  subscriptions: undefined,
  nextPageToken: 0,
};

const baseSubscription: object = {
  id: 0,
  userId: 0,
  planId: 0,
  startAt: "",
  endAt: "",
};

export interface SubscriptionService<Context extends DataLoaders> {

  StartSubscription(ctx: Context, request: StartSubscriptionParams): Promise<Subscription>;

  StopSubscription(ctx: Context, request: StopSubscriptionParams): Promise<Subscription>;

  GetSubscription(ctx: Context, request: GetSubscriptionParams): Promise<Subscription>;

  GetSubscriptions(ctx: Context, request: GetSubscriptionsParams): Promise<GetSubscriptionsResponse>;

}

export class SubscriptionServiceClientImpl<Context extends DataLoaders> implements SubscriptionService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  StartSubscription(ctx: Context, request: StartSubscriptionParams): Promise<Subscription> {
    const data = StartSubscriptionParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.SubscriptionService", "StartSubscription", data);
    return promise.then(data => Subscription.decode(new Reader(data)));
  }

  StopSubscription(ctx: Context, request: StopSubscriptionParams): Promise<Subscription> {
    const data = StopSubscriptionParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.SubscriptionService", "StopSubscription", data);
    return promise.then(data => Subscription.decode(new Reader(data)));
  }

  GetSubscription(ctx: Context, request: GetSubscriptionParams): Promise<Subscription> {
    const dl = ctx.getDataLoader("pepeunlimited.products.SubscriptionService.GetSubscription", () => {
      return new DataLoader<GetSubscriptionParams, Subscription>((requests) => {
        const responses = requests.map(async request => {
          const data = GetSubscriptionParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.SubscriptionService", "GetSubscription", data);
          return Subscription.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetSubscriptions(ctx: Context, request: GetSubscriptionsParams): Promise<GetSubscriptionsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.products.SubscriptionService.GetSubscriptions", () => {
      return new DataLoader<GetSubscriptionsParams, GetSubscriptionsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetSubscriptionsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.SubscriptionService", "GetSubscriptions", data);
          return GetSubscriptionsResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

}

interface Rpc<Context> {

  request(ctx: Context, service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

interface DataLoaders {

  getDataLoader<T>(identifier: string, cstrFn: () => T): T;

}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const StartSubscriptionParams = {
  encode(message: StartSubscriptionParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int64(message.planId);
    return writer;
  },
  decode(reader: Reader, length?: number): StartSubscriptionParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseStartSubscriptionParams) as StartSubscriptionParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.planId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StartSubscriptionParams {
    const message = Object.create(baseStartSubscriptionParams) as StartSubscriptionParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = Number(object.planId);
    } else {
      message.planId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<StartSubscriptionParams>): StartSubscriptionParams {
    const message = Object.create(baseStartSubscriptionParams) as StartSubscriptionParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = object.planId;
    } else {
      message.planId = 0;
    }
    return message;
  },
  toJSON(message: StartSubscriptionParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.planId = message.planId || 0;
    return obj;
  },
};

export const GetSubscriptionParams = {
  encode(message: GetSubscriptionParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.subscriptionId);
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetSubscriptionParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetSubscriptionParams) as GetSubscriptionParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptionId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetSubscriptionParams {
    const message = Object.create(baseGetSubscriptionParams) as GetSubscriptionParams;
    if (object.subscriptionId !== undefined && object.subscriptionId !== null) {
      message.subscriptionId = Number(object.subscriptionId);
    } else {
      message.subscriptionId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetSubscriptionParams>): GetSubscriptionParams {
    const message = Object.create(baseGetSubscriptionParams) as GetSubscriptionParams;
    if (object.subscriptionId !== undefined && object.subscriptionId !== null) {
      message.subscriptionId = object.subscriptionId;
    } else {
      message.subscriptionId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: GetSubscriptionParams): unknown {
    const obj: any = {};
    obj.subscriptionId = message.subscriptionId || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const StopSubscriptionParams = {
  encode(message: StopSubscriptionParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): StopSubscriptionParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseStopSubscriptionParams) as StopSubscriptionParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StopSubscriptionParams {
    const message = Object.create(baseStopSubscriptionParams) as StopSubscriptionParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<StopSubscriptionParams>): StopSubscriptionParams {
    const message = Object.create(baseStopSubscriptionParams) as StopSubscriptionParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: StopSubscriptionParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetSubscriptionsParams = {
  encode(message: GetSubscriptionsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int32(message.pageSize);
    writer.uint32(24).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetSubscriptionsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetSubscriptionsParams) as GetSubscriptionsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.pageSize = reader.int32();
          break;
        case 3:
          message.pageToken = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetSubscriptionsParams {
    const message = Object.create(baseGetSubscriptionsParams) as GetSubscriptionsParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.pageSize !== undefined && object.pageSize !== null) {
      message.pageSize = Number(object.pageSize);
    } else {
      message.pageSize = 0;
    }
    if (object.pageToken !== undefined && object.pageToken !== null) {
      message.pageToken = Number(object.pageToken);
    } else {
      message.pageToken = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetSubscriptionsParams>): GetSubscriptionsParams {
    const message = Object.create(baseGetSubscriptionsParams) as GetSubscriptionsParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.pageSize !== undefined && object.pageSize !== null) {
      message.pageSize = object.pageSize;
    } else {
      message.pageSize = 0;
    }
    if (object.pageToken !== undefined && object.pageToken !== null) {
      message.pageToken = object.pageToken;
    } else {
      message.pageToken = 0;
    }
    return message;
  },
  toJSON(message: GetSubscriptionsParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetSubscriptionsResponse = {
  encode(message: GetSubscriptionsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.subscriptions) {
      Subscription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.nextPageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetSubscriptionsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetSubscriptionsResponse) as GetSubscriptionsResponse;
    message.subscriptions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptions.push(Subscription.decode(reader, reader.uint32()));
          break;
        case 2:
          message.nextPageToken = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetSubscriptionsResponse {
    const message = Object.create(baseGetSubscriptionsResponse) as GetSubscriptionsResponse;
    message.subscriptions = [];
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      for (const e of object.subscriptions) {
        message.subscriptions.push(Subscription.fromJSON(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = Number(object.nextPageToken);
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetSubscriptionsResponse>): GetSubscriptionsResponse {
    const message = Object.create(baseGetSubscriptionsResponse) as GetSubscriptionsResponse;
    message.subscriptions = [];
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      for (const e of object.subscriptions) {
        message.subscriptions.push(Subscription.fromPartial(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = object.nextPageToken;
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  toJSON(message: GetSubscriptionsResponse): unknown {
    const obj: any = {};
    if (message.subscriptions) {
      obj.subscriptions = message.subscriptions.map(e => e ? Subscription.toJSON(e) : undefined);
    } else {
      obj.subscriptions = [];
    }
    obj.nextPageToken = message.nextPageToken || 0;
    return obj;
  },
};

export const Subscription = {
  encode(message: Subscription, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).int64(message.userId);
    writer.uint32(24).int64(message.planId);
    writer.uint32(34).string(message.startAt);
    writer.uint32(42).string(message.endAt);
    return writer;
  },
  decode(reader: Reader, length?: number): Subscription {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSubscription) as Subscription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.planId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.startAt = reader.string();
          break;
        case 5:
          message.endAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Subscription {
    const message = Object.create(baseSubscription) as Subscription;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = Number(object.planId);
    } else {
      message.planId = 0;
    }
    if (object.startAt !== undefined && object.startAt !== null) {
      message.startAt = String(object.startAt);
    } else {
      message.startAt = "";
    }
    if (object.endAt !== undefined && object.endAt !== null) {
      message.endAt = String(object.endAt);
    } else {
      message.endAt = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Subscription>): Subscription {
    const message = Object.create(baseSubscription) as Subscription;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = object.planId;
    } else {
      message.planId = 0;
    }
    if (object.startAt !== undefined && object.startAt !== null) {
      message.startAt = object.startAt;
    } else {
      message.startAt = "";
    }
    if (object.endAt !== undefined && object.endAt !== null) {
      message.endAt = object.endAt;
    } else {
      message.endAt = "";
    }
    return message;
  },
  toJSON(message: Subscription): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.userId = message.userId || 0;
    obj.planId = message.planId || 0;
    obj.startAt = message.startAt || "";
    obj.endAt = message.endAt || "";
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};