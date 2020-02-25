import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface EndPriceAtParams {
  params: GetPriceParams | undefined;
  endAtDay: number;
  endAtMonth: number;
}

export interface Price {
  id: number;
  price: number;
  discount: number;
  startAt: string;
  endAt: string;
  thirdPartyId: number;
  productId: number;
}

export interface CreatePriceParams {
  startAtDay: number;
  startAtMonth: number;
  endAtDay: number;
  endAtMonth: number;
  price: number;
  discount: number;
  productId: number;
  thirdPartyId: number;
}

export interface GetPriceParams {
  productId: number;
  productSku: string;
  priceId: number;
}

const baseEndPriceAtParams: object = {
  params: undefined,
  endAtDay: 0,
  endAtMonth: 0,
};

const basePrice: object = {
  id: 0,
  price: 0,
  discount: 0,
  startAt: "",
  endAt: "",
  thirdPartyId: 0,
  productId: 0,
};

const baseCreatePriceParams: object = {
  startAtDay: 0,
  startAtMonth: 0,
  endAtDay: 0,
  endAtMonth: 0,
  price: 0,
  discount: 0,
  productId: 0,
  thirdPartyId: 0,
};

const baseGetPriceParams: object = {
  productId: 0,
  productSku: "",
  priceId: 0,
};

export interface PriceService<Context extends DataLoaders> {

  CreatePrice(ctx: Context, request: CreatePriceParams): Promise<Price>;

  GetPrice(ctx: Context, request: GetPriceParams): Promise<Price>;

  EndPriceAt(ctx: Context, request: EndPriceAtParams): Promise<Price>;

}

export class PriceServiceClientImpl<Context extends DataLoaders> implements PriceService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreatePrice(ctx: Context, request: CreatePriceParams): Promise<Price> {
    const data = CreatePriceParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.PriceService", "CreatePrice", data);
    return promise.then(data => Price.decode(new Reader(data)));
  }

  GetPrice(ctx: Context, request: GetPriceParams): Promise<Price> {
    const dl = ctx.getDataLoader("pepeunlimited.products.PriceService.GetPrice", () => {
      return new DataLoader<GetPriceParams, Price>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPriceParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.PriceService", "GetPrice", data);
          return Price.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  EndPriceAt(ctx: Context, request: EndPriceAtParams): Promise<Price> {
    const data = EndPriceAtParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.PriceService", "EndPriceAt", data);
    return promise.then(data => Price.decode(new Reader(data)));
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

export const EndPriceAtParams = {
  encode(message: EndPriceAtParams, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined && message.params !== undefined) {
      GetPriceParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.endAtDay);
    writer.uint32(24).int32(message.endAtMonth);
    return writer;
  },
  decode(reader: Reader, length?: number): EndPriceAtParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEndPriceAtParams) as EndPriceAtParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = GetPriceParams.decode(reader, reader.uint32());
          break;
        case 2:
          message.endAtDay = reader.int32();
          break;
        case 3:
          message.endAtMonth = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EndPriceAtParams {
    const message = Object.create(baseEndPriceAtParams) as EndPriceAtParams;
    if (object.params !== undefined && object.params !== null) {
      message.params = GetPriceParams.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = Number(object.endAtDay);
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = Number(object.endAtMonth);
    } else {
      message.endAtMonth = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<EndPriceAtParams>): EndPriceAtParams {
    const message = Object.create(baseEndPriceAtParams) as EndPriceAtParams;
    if (object.params !== undefined && object.params !== null) {
      message.params = GetPriceParams.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = object.endAtDay;
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = object.endAtMonth;
    } else {
      message.endAtMonth = 0;
    }
    return message;
  },
  toJSON(message: EndPriceAtParams): unknown {
    const obj: any = {};
    obj.params = message.params ? GetPriceParams.toJSON(message.params) : undefined;
    obj.endAtDay = message.endAtDay || 0;
    obj.endAtMonth = message.endAtMonth || 0;
    return obj;
  },
};

export const Price = {
  encode(message: Price, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).uint32(message.price);
    writer.uint32(24).uint32(message.discount);
    writer.uint32(34).string(message.startAt);
    writer.uint32(42).string(message.endAt);
    writer.uint32(56).int64(message.thirdPartyId);
    writer.uint32(72).int64(message.productId);
    return writer;
  },
  decode(reader: Reader, length?: number): Price {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePrice) as Price;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.price = reader.uint32();
          break;
        case 3:
          message.discount = reader.uint32();
          break;
        case 4:
          message.startAt = reader.string();
          break;
        case 5:
          message.endAt = reader.string();
          break;
        case 7:
          message.thirdPartyId = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Price {
    const message = Object.create(basePrice) as Price;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price);
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = Number(object.discount);
    } else {
      message.discount = 0;
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
    if (object.thirdPartyId !== undefined && object.thirdPartyId !== null) {
      message.thirdPartyId = Number(object.thirdPartyId);
    } else {
      message.thirdPartyId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Price>): Price {
    const message = Object.create(basePrice) as Price;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    } else {
      message.discount = 0;
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
    if (object.thirdPartyId !== undefined && object.thirdPartyId !== null) {
      message.thirdPartyId = object.thirdPartyId;
    } else {
      message.thirdPartyId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    return message;
  },
  toJSON(message: Price): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.price = message.price || 0;
    obj.discount = message.discount || 0;
    obj.startAt = message.startAt || "";
    obj.endAt = message.endAt || "";
    obj.thirdPartyId = message.thirdPartyId || 0;
    obj.productId = message.productId || 0;
    return obj;
  },
};

export const CreatePriceParams = {
  encode(message: CreatePriceParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.startAtDay);
    writer.uint32(16).int32(message.startAtMonth);
    writer.uint32(24).int32(message.endAtDay);
    writer.uint32(32).int32(message.endAtMonth);
    writer.uint32(40).uint32(message.price);
    writer.uint32(48).uint32(message.discount);
    writer.uint32(56).int64(message.productId);
    writer.uint32(72).int64(message.thirdPartyId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreatePriceParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreatePriceParams) as CreatePriceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startAtDay = reader.int32();
          break;
        case 2:
          message.startAtMonth = reader.int32();
          break;
        case 3:
          message.endAtDay = reader.int32();
          break;
        case 4:
          message.endAtMonth = reader.int32();
          break;
        case 5:
          message.price = reader.uint32();
          break;
        case 6:
          message.discount = reader.uint32();
          break;
        case 7:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.thirdPartyId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreatePriceParams {
    const message = Object.create(baseCreatePriceParams) as CreatePriceParams;
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = Number(object.startAtDay);
    } else {
      message.startAtDay = 0;
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = Number(object.startAtMonth);
    } else {
      message.startAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = Number(object.endAtDay);
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = Number(object.endAtMonth);
    } else {
      message.endAtMonth = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price);
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = Number(object.discount);
    } else {
      message.discount = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.thirdPartyId !== undefined && object.thirdPartyId !== null) {
      message.thirdPartyId = Number(object.thirdPartyId);
    } else {
      message.thirdPartyId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreatePriceParams>): CreatePriceParams {
    const message = Object.create(baseCreatePriceParams) as CreatePriceParams;
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = object.startAtDay;
    } else {
      message.startAtDay = 0;
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = object.startAtMonth;
    } else {
      message.startAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = object.endAtDay;
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = object.endAtMonth;
    } else {
      message.endAtMonth = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    } else {
      message.discount = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.thirdPartyId !== undefined && object.thirdPartyId !== null) {
      message.thirdPartyId = object.thirdPartyId;
    } else {
      message.thirdPartyId = 0;
    }
    return message;
  },
  toJSON(message: CreatePriceParams): unknown {
    const obj: any = {};
    obj.startAtDay = message.startAtDay || 0;
    obj.startAtMonth = message.startAtMonth || 0;
    obj.endAtDay = message.endAtDay || 0;
    obj.endAtMonth = message.endAtMonth || 0;
    obj.price = message.price || 0;
    obj.discount = message.discount || 0;
    obj.productId = message.productId || 0;
    obj.thirdPartyId = message.thirdPartyId || 0;
    return obj;
  },
};

export const GetPriceParams = {
  encode(message: GetPriceParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.productId);
    writer.uint32(18).string(message.productSku);
    writer.uint32(24).int64(message.priceId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPriceParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPriceParams) as GetPriceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.productSku = reader.string();
          break;
        case 3:
          message.priceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPriceParams {
    const message = Object.create(baseGetPriceParams) as GetPriceParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.productSku !== undefined && object.productSku !== null) {
      message.productSku = String(object.productSku);
    } else {
      message.productSku = "";
    }
    if (object.priceId !== undefined && object.priceId !== null) {
      message.priceId = Number(object.priceId);
    } else {
      message.priceId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPriceParams>): GetPriceParams {
    const message = Object.create(baseGetPriceParams) as GetPriceParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.productSku !== undefined && object.productSku !== null) {
      message.productSku = object.productSku;
    } else {
      message.productSku = "";
    }
    if (object.priceId !== undefined && object.priceId !== null) {
      message.priceId = object.priceId;
    } else {
      message.priceId = 0;
    }
    return message;
  },
  toJSON(message: GetPriceParams): unknown {
    const obj: any = {};
    obj.productId = message.productId || 0;
    obj.productSku = message.productSku || "";
    obj.priceId = message.priceId || 0;
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