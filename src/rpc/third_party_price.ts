import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface EndThirdPartyPriceParams {
  params: GetThirdPartyPriceParams | undefined;
  endAtMonth: number;
  endAtDay: number;
}

export interface GetThirdPartyPriceParams {
  thirdPartyPriceId: number;
  inAppPurchaseSku: string;
  googleBillingServiceSku: string;
}

export interface CreateThirdPartyPriceParams {
  inAppPurchaseSku: string;
  googleBillingServiceSku: string;
  startAtMonth: number;
  startAtDay: number;
  type: string;
}

export interface GetThirdPartyPricesParams {
  type: string;
}

export interface ThirdPartyPrice {
  id: number;
  inAppPurchaseSku: string;
  googleBillingServiceSku: string;
  startAt: string;
  endAt: string;
  type: string;
}

export interface GetThirdPartyPricesResponse {
  thirdPartyPrices: ThirdPartyPrice[];
}

const baseEndThirdPartyPriceParams: object = {
  params: undefined,
  endAtMonth: 0,
  endAtDay: 0,
};

const baseGetThirdPartyPriceParams: object = {
  thirdPartyPriceId: 0,
  inAppPurchaseSku: "",
  googleBillingServiceSku: "",
};

const baseCreateThirdPartyPriceParams: object = {
  inAppPurchaseSku: "",
  googleBillingServiceSku: "",
  startAtMonth: 0,
  startAtDay: 0,
  type: "",
};

const baseGetThirdPartyPricesParams: object = {
  type: "",
};

const baseThirdPartyPrice: object = {
  id: 0,
  inAppPurchaseSku: "",
  googleBillingServiceSku: "",
  startAt: "",
  endAt: "",
  type: "",
};

const baseGetThirdPartyPricesResponse: object = {
  thirdPartyPrices: undefined,
};

export interface ThirdPartyPriceService<Context extends DataLoaders> {

  CreateThirdPartyPrice(ctx: Context, request: CreateThirdPartyPriceParams): Promise<ThirdPartyPrice>;

  GetThirdPartyPrices(ctx: Context, request: GetThirdPartyPricesParams): Promise<GetThirdPartyPricesResponse>;

  GetThirdPartyPrice(ctx: Context, request: GetThirdPartyPriceParams): Promise<ThirdPartyPrice>;

  EndThirdPartyPrice(ctx: Context, request: EndThirdPartyPriceParams): Promise<ThirdPartyPrice>;

}

export class ThirdPartyPriceServiceClientImpl<Context extends DataLoaders> implements ThirdPartyPriceService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateThirdPartyPrice(ctx: Context, request: CreateThirdPartyPriceParams): Promise<ThirdPartyPrice> {
    const data = CreateThirdPartyPriceParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.ThirdPartyPriceService", "CreateThirdPartyPrice", data);
    return promise.then(data => ThirdPartyPrice.decode(new Reader(data)));
  }

  GetThirdPartyPrices(ctx: Context, request: GetThirdPartyPricesParams): Promise<GetThirdPartyPricesResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.products.ThirdPartyPriceService.GetThirdPartyPrices", () => {
      return new DataLoader<GetThirdPartyPricesParams, GetThirdPartyPricesResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetThirdPartyPricesParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.ThirdPartyPriceService", "GetThirdPartyPrices", data);
          return GetThirdPartyPricesResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetThirdPartyPrice(ctx: Context, request: GetThirdPartyPriceParams): Promise<ThirdPartyPrice> {
    const dl = ctx.getDataLoader("pepeunlimited.products.ThirdPartyPriceService.GetThirdPartyPrice", () => {
      return new DataLoader<GetThirdPartyPriceParams, ThirdPartyPrice>((requests) => {
        const responses = requests.map(async request => {
          const data = GetThirdPartyPriceParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.ThirdPartyPriceService", "GetThirdPartyPrice", data);
          return ThirdPartyPrice.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  EndThirdPartyPrice(ctx: Context, request: EndThirdPartyPriceParams): Promise<ThirdPartyPrice> {
    const data = EndThirdPartyPriceParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.ThirdPartyPriceService", "EndThirdPartyPrice", data);
    return promise.then(data => ThirdPartyPrice.decode(new Reader(data)));
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

export const EndThirdPartyPriceParams = {
  encode(message: EndThirdPartyPriceParams, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined && message.params !== undefined) {
      GetThirdPartyPriceParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.endAtMonth);
    writer.uint32(24).int32(message.endAtDay);
    return writer;
  },
  decode(reader: Reader, length?: number): EndThirdPartyPriceParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEndThirdPartyPriceParams) as EndThirdPartyPriceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = GetThirdPartyPriceParams.decode(reader, reader.uint32());
          break;
        case 2:
          message.endAtMonth = reader.int32();
          break;
        case 3:
          message.endAtDay = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EndThirdPartyPriceParams {
    const message = Object.create(baseEndThirdPartyPriceParams) as EndThirdPartyPriceParams;
    if (object.params !== undefined && object.params !== null) {
      message.params = GetThirdPartyPriceParams.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = Number(object.endAtMonth);
    } else {
      message.endAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = Number(object.endAtDay);
    } else {
      message.endAtDay = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<EndThirdPartyPriceParams>): EndThirdPartyPriceParams {
    const message = Object.create(baseEndThirdPartyPriceParams) as EndThirdPartyPriceParams;
    if (object.params !== undefined && object.params !== null) {
      message.params = GetThirdPartyPriceParams.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = object.endAtMonth;
    } else {
      message.endAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = object.endAtDay;
    } else {
      message.endAtDay = 0;
    }
    return message;
  },
  toJSON(message: EndThirdPartyPriceParams): unknown {
    const obj: any = {};
    obj.params = message.params ? GetThirdPartyPriceParams.toJSON(message.params) : undefined;
    obj.endAtMonth = message.endAtMonth || 0;
    obj.endAtDay = message.endAtDay || 0;
    return obj;
  },
};

export const GetThirdPartyPriceParams = {
  encode(message: GetThirdPartyPriceParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.thirdPartyPriceId);
    writer.uint32(18).string(message.inAppPurchaseSku);
    writer.uint32(26).string(message.googleBillingServiceSku);
    return writer;
  },
  decode(reader: Reader, length?: number): GetThirdPartyPriceParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetThirdPartyPriceParams) as GetThirdPartyPriceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.thirdPartyPriceId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.inAppPurchaseSku = reader.string();
          break;
        case 3:
          message.googleBillingServiceSku = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetThirdPartyPriceParams {
    const message = Object.create(baseGetThirdPartyPriceParams) as GetThirdPartyPriceParams;
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = Number(object.thirdPartyPriceId);
    } else {
      message.thirdPartyPriceId = 0;
    }
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = String(object.inAppPurchaseSku);
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = String(object.googleBillingServiceSku);
    } else {
      message.googleBillingServiceSku = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetThirdPartyPriceParams>): GetThirdPartyPriceParams {
    const message = Object.create(baseGetThirdPartyPriceParams) as GetThirdPartyPriceParams;
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = object.thirdPartyPriceId;
    } else {
      message.thirdPartyPriceId = 0;
    }
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = object.inAppPurchaseSku;
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = object.googleBillingServiceSku;
    } else {
      message.googleBillingServiceSku = "";
    }
    return message;
  },
  toJSON(message: GetThirdPartyPriceParams): unknown {
    const obj: any = {};
    obj.thirdPartyPriceId = message.thirdPartyPriceId || 0;
    obj.inAppPurchaseSku = message.inAppPurchaseSku || "";
    obj.googleBillingServiceSku = message.googleBillingServiceSku || "";
    return obj;
  },
};

export const CreateThirdPartyPriceParams = {
  encode(message: CreateThirdPartyPriceParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.inAppPurchaseSku);
    writer.uint32(18).string(message.googleBillingServiceSku);
    writer.uint32(24).int32(message.startAtMonth);
    writer.uint32(32).int32(message.startAtDay);
    writer.uint32(42).string(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateThirdPartyPriceParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateThirdPartyPriceParams) as CreateThirdPartyPriceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inAppPurchaseSku = reader.string();
          break;
        case 2:
          message.googleBillingServiceSku = reader.string();
          break;
        case 3:
          message.startAtMonth = reader.int32();
          break;
        case 4:
          message.startAtDay = reader.int32();
          break;
        case 5:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateThirdPartyPriceParams {
    const message = Object.create(baseCreateThirdPartyPriceParams) as CreateThirdPartyPriceParams;
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = String(object.inAppPurchaseSku);
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = String(object.googleBillingServiceSku);
    } else {
      message.googleBillingServiceSku = "";
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = Number(object.startAtMonth);
    } else {
      message.startAtMonth = 0;
    }
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = Number(object.startAtDay);
    } else {
      message.startAtDay = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateThirdPartyPriceParams>): CreateThirdPartyPriceParams {
    const message = Object.create(baseCreateThirdPartyPriceParams) as CreateThirdPartyPriceParams;
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = object.inAppPurchaseSku;
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = object.googleBillingServiceSku;
    } else {
      message.googleBillingServiceSku = "";
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = object.startAtMonth;
    } else {
      message.startAtMonth = 0;
    }
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = object.startAtDay;
    } else {
      message.startAtDay = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    return message;
  },
  toJSON(message: CreateThirdPartyPriceParams): unknown {
    const obj: any = {};
    obj.inAppPurchaseSku = message.inAppPurchaseSku || "";
    obj.googleBillingServiceSku = message.googleBillingServiceSku || "";
    obj.startAtMonth = message.startAtMonth || 0;
    obj.startAtDay = message.startAtDay || 0;
    obj.type = message.type || "";
    return obj;
  },
};

export const GetThirdPartyPricesParams = {
  encode(message: GetThirdPartyPricesParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): GetThirdPartyPricesParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetThirdPartyPricesParams) as GetThirdPartyPricesParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetThirdPartyPricesParams {
    const message = Object.create(baseGetThirdPartyPricesParams) as GetThirdPartyPricesParams;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetThirdPartyPricesParams>): GetThirdPartyPricesParams {
    const message = Object.create(baseGetThirdPartyPricesParams) as GetThirdPartyPricesParams;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    return message;
  },
  toJSON(message: GetThirdPartyPricesParams): unknown {
    const obj: any = {};
    obj.type = message.type || "";
    return obj;
  },
};

export const ThirdPartyPrice = {
  encode(message: ThirdPartyPrice, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.inAppPurchaseSku);
    writer.uint32(26).string(message.googleBillingServiceSku);
    writer.uint32(34).string(message.startAt);
    writer.uint32(42).string(message.endAt);
    writer.uint32(50).string(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): ThirdPartyPrice {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseThirdPartyPrice) as ThirdPartyPrice;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.inAppPurchaseSku = reader.string();
          break;
        case 3:
          message.googleBillingServiceSku = reader.string();
          break;
        case 4:
          message.startAt = reader.string();
          break;
        case 5:
          message.endAt = reader.string();
          break;
        case 6:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ThirdPartyPrice {
    const message = Object.create(baseThirdPartyPrice) as ThirdPartyPrice;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = String(object.inAppPurchaseSku);
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = String(object.googleBillingServiceSku);
    } else {
      message.googleBillingServiceSku = "";
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
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ThirdPartyPrice>): ThirdPartyPrice {
    const message = Object.create(baseThirdPartyPrice) as ThirdPartyPrice;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.inAppPurchaseSku !== undefined && object.inAppPurchaseSku !== null) {
      message.inAppPurchaseSku = object.inAppPurchaseSku;
    } else {
      message.inAppPurchaseSku = "";
    }
    if (object.googleBillingServiceSku !== undefined && object.googleBillingServiceSku !== null) {
      message.googleBillingServiceSku = object.googleBillingServiceSku;
    } else {
      message.googleBillingServiceSku = "";
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
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    return message;
  },
  toJSON(message: ThirdPartyPrice): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.inAppPurchaseSku = message.inAppPurchaseSku || "";
    obj.googleBillingServiceSku = message.googleBillingServiceSku || "";
    obj.startAt = message.startAt || "";
    obj.endAt = message.endAt || "";
    obj.type = message.type || "";
    return obj;
  },
};

export const GetThirdPartyPricesResponse = {
  encode(message: GetThirdPartyPricesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.thirdPartyPrices) {
      ThirdPartyPrice.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetThirdPartyPricesResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetThirdPartyPricesResponse) as GetThirdPartyPricesResponse;
    message.thirdPartyPrices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.thirdPartyPrices.push(ThirdPartyPrice.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetThirdPartyPricesResponse {
    const message = Object.create(baseGetThirdPartyPricesResponse) as GetThirdPartyPricesResponse;
    message.thirdPartyPrices = [];
    if (object.thirdPartyPrices !== undefined && object.thirdPartyPrices !== null) {
      for (const e of object.thirdPartyPrices) {
        message.thirdPartyPrices.push(ThirdPartyPrice.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetThirdPartyPricesResponse>): GetThirdPartyPricesResponse {
    const message = Object.create(baseGetThirdPartyPricesResponse) as GetThirdPartyPricesResponse;
    message.thirdPartyPrices = [];
    if (object.thirdPartyPrices !== undefined && object.thirdPartyPrices !== null) {
      for (const e of object.thirdPartyPrices) {
        message.thirdPartyPrices.push(ThirdPartyPrice.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetThirdPartyPricesResponse): unknown {
    const obj: any = {};
    if (message.thirdPartyPrices) {
      obj.thirdPartyPrices = message.thirdPartyPrices.map(e => e ? ThirdPartyPrice.toJSON(e) : undefined);
    } else {
      obj.thirdPartyPrices = [];
    }
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