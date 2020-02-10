import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


export interface CreateCheckoutParams {
  paymentInstrumentId: number;
  userId: number;
  productId: number;
}

export interface Checkout {
  orderId: number;
  paymentId: number;
  paymentInstrumentId: number;
}

const baseCreateCheckoutParams: object = {
  paymentInstrumentId: 0,
  userId: 0,
  productId: 0,
};

const baseCheckout: object = {
  orderId: 0,
  paymentId: 0,
  paymentInstrumentId: 0,
};

export interface CheckoutService<Context extends DataLoaders> {

  CreateCheckout(ctx: Context, request: CreateCheckoutParams): Promise<Checkout>;

}

export class CheckoutServiceClientImpl<Context extends DataLoaders> implements CheckoutService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateCheckout(ctx: Context, request: CreateCheckoutParams): Promise<Checkout> {
    const data = CreateCheckoutParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.checkout.CheckoutService", "CreateCheckout", data);
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

export const CreateCheckoutParams = {
  encode(message: CreateCheckoutParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.paymentInstrumentId);
    writer.uint32(24).int64(message.userId);
    writer.uint32(32).int64(message.productId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateCheckoutParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateCheckoutParams) as CreateCheckoutParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentInstrumentId = reader.uint32();
          break;
        case 3:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateCheckoutParams {
    const message = Object.create(baseCreateCheckoutParams) as CreateCheckoutParams;
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = Number(object.paymentInstrumentId);
    } else {
      message.paymentInstrumentId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateCheckoutParams>): CreateCheckoutParams {
    const message = Object.create(baseCreateCheckoutParams) as CreateCheckoutParams;
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = object.paymentInstrumentId;
    } else {
      message.paymentInstrumentId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    return message;
  },
  toJSON(message: CreateCheckoutParams): unknown {
    const obj: any = {};
    obj.paymentInstrumentId = message.paymentInstrumentId || 0;
    obj.userId = message.userId || 0;
    obj.productId = message.productId || 0;
    return obj;
  },
};

export const Checkout = {
  encode(message: Checkout, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.orderId);
    writer.uint32(16).int64(message.paymentId);
    writer.uint32(24).uint32(message.paymentInstrumentId);
    return writer;
  },
  decode(reader: Reader, length?: number): Checkout {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCheckout) as Checkout;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.paymentId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.paymentInstrumentId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Checkout {
    const message = Object.create(baseCheckout) as Checkout;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    if (object.paymentId !== undefined && object.paymentId !== null) {
      message.paymentId = Number(object.paymentId);
    } else {
      message.paymentId = 0;
    }
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = Number(object.paymentInstrumentId);
    } else {
      message.paymentInstrumentId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Checkout>): Checkout {
    const message = Object.create(baseCheckout) as Checkout;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    if (object.paymentId !== undefined && object.paymentId !== null) {
      message.paymentId = object.paymentId;
    } else {
      message.paymentId = 0;
    }
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = object.paymentInstrumentId;
    } else {
      message.paymentInstrumentId = 0;
    }
    return message;
  },
  toJSON(message: Checkout): unknown {
    const obj: any = {};
    obj.orderId = message.orderId || 0;
    obj.paymentId = message.paymentId || 0;
    obj.paymentInstrumentId = message.paymentInstrumentId || 0;
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