import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


export interface CreateGiftVoucherOrderParams {
  productId: number;
  userId: number;
  giftVoucherId: string;
}

export interface CreateAppleIAPParams {
  iapReceipt: string;
  userId: number;
  productId: number;
}

export interface Checkout {
}

const baseCreateGiftVoucherOrderParams: object = {
  productId: 0,
  userId: 0,
  giftVoucherId: "",
};

const baseCreateAppleIAPParams: object = {
  iapReceipt: "",
  userId: 0,
  productId: 0,
};

const baseCheckout: object = {
};

export interface CheckoutService<Context extends DataLoaders> {

  CreateGiftVoucherOrder(ctx: Context, request: CreateGiftVoucherOrderParams): Promise<Checkout>;

  CreateAppleIAP(ctx: Context, request: CreateAppleIAPParams): Promise<Checkout>;

}

export class CheckoutServiceClientImpl<Context extends DataLoaders> implements CheckoutService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateGiftVoucherOrder(ctx: Context, request: CreateGiftVoucherOrderParams): Promise<Checkout> {
    const data = CreateGiftVoucherOrderParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.checkout.CheckoutService", "CreateGiftVoucherOrder", data);
    return promise.then(data => Checkout.decode(new Reader(data)));
  }

  CreateAppleIAP(ctx: Context, request: CreateAppleIAPParams): Promise<Checkout> {
    const data = CreateAppleIAPParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.checkout.CheckoutService", "CreateAppleIAP", data);
    return promise.then(data => Checkout.decode(new Reader(data)));
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

export const CreateGiftVoucherOrderParams = {
  encode(message: CreateGiftVoucherOrderParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.productId);
    writer.uint32(16).int64(message.userId);
    writer.uint32(26).string(message.giftVoucherId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateGiftVoucherOrderParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateGiftVoucherOrderParams) as CreateGiftVoucherOrderParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.giftVoucherId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateGiftVoucherOrderParams {
    const message = Object.create(baseCreateGiftVoucherOrderParams) as CreateGiftVoucherOrderParams;
    if (object.productId) {
      message.productId = Number(object.productId);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.giftVoucherId) {
      message.giftVoucherId = String(object.giftVoucherId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateGiftVoucherOrderParams>): CreateGiftVoucherOrderParams {
    const message = Object.create(baseCreateGiftVoucherOrderParams) as CreateGiftVoucherOrderParams;
    if (object.productId) {
      message.productId = object.productId;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.giftVoucherId) {
      message.giftVoucherId = object.giftVoucherId;
    }
    return message;
  },
  toJSON(message: CreateGiftVoucherOrderParams): unknown {
    const obj: any = {};
    obj.productId = message.productId || 0;
    obj.userId = message.userId || 0;
    obj.giftVoucherId = message.giftVoucherId || "";
    return obj;
  },
};

export const CreateAppleIAPParams = {
  encode(message: CreateAppleIAPParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.iapReceipt);
    writer.uint32(16).int64(message.userId);
    writer.uint32(24).int64(message.productId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateAppleIAPParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateAppleIAPParams) as CreateAppleIAPParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iapReceipt = reader.string();
          break;
        case 2:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateAppleIAPParams {
    const message = Object.create(baseCreateAppleIAPParams) as CreateAppleIAPParams;
    if (object.iapReceipt) {
      message.iapReceipt = String(object.iapReceipt);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.productId) {
      message.productId = Number(object.productId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateAppleIAPParams>): CreateAppleIAPParams {
    const message = Object.create(baseCreateAppleIAPParams) as CreateAppleIAPParams;
    if (object.iapReceipt) {
      message.iapReceipt = object.iapReceipt;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.productId) {
      message.productId = object.productId;
    }
    return message;
  },
  toJSON(message: CreateAppleIAPParams): unknown {
    const obj: any = {};
    obj.iapReceipt = message.iapReceipt || "";
    obj.userId = message.userId || 0;
    obj.productId = message.productId || 0;
    return obj;
  },
};

export const Checkout = {
  encode(message: Checkout, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): Checkout {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCheckout) as Checkout;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Checkout {
    const message = Object.create(baseCheckout) as Checkout;
    return message;
  },
  fromPartial(object: DeepPartial<Checkout>): Checkout {
    const message = Object.create(baseCheckout) as Checkout;
    return message;
  },
  toJSON(message: Checkout): unknown {
    const obj: any = {};
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