import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


export interface UseGiftVoucherOrderParams {
  productId: number;
  userId: number;
  giftVoucherId: string;
}

export interface UseAppleIAPParams {
  iapReceipt: string;
  userId: number;
  productId: number;
}

export interface Checkout {
}

const baseUseGiftVoucherOrderParams: object = {
  productId: 0,
  userId: 0,
  giftVoucherId: "",
};

const baseUseAppleIAPParams: object = {
  iapReceipt: "",
  userId: 0,
  productId: 0,
};

const baseCheckout: object = {
};

export interface CheckoutService<Context extends DataLoaders> {

  UseGiftVoucher(ctx: Context, request: UseGiftVoucherOrderParams): Promise<Checkout>;

  UseAppleIAP(ctx: Context, request: UseAppleIAPParams): Promise<Checkout>;

}

export class CheckoutServiceClientImpl<Context extends DataLoaders> implements CheckoutService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  UseGiftVoucher(ctx: Context, request: UseGiftVoucherOrderParams): Promise<Checkout> {
    const data = UseGiftVoucherOrderParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.checkout.CheckoutService", "UseGiftVoucher", data);
    return promise.then(data => Checkout.decode(new Reader(data)));
  }

  UseAppleIAP(ctx: Context, request: UseAppleIAPParams): Promise<Checkout> {
    const data = UseAppleIAPParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.checkout.CheckoutService", "UseAppleIAP", data);
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

export const UseGiftVoucherOrderParams = {
  encode(message: UseGiftVoucherOrderParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.productId);
    writer.uint32(16).int64(message.userId);
    writer.uint32(26).string(message.giftVoucherId);
    return writer;
  },
  decode(reader: Reader, length?: number): UseGiftVoucherOrderParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUseGiftVoucherOrderParams) as UseGiftVoucherOrderParams;
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
  fromJSON(object: any): UseGiftVoucherOrderParams {
    const message = Object.create(baseUseGiftVoucherOrderParams) as UseGiftVoucherOrderParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.giftVoucherId !== undefined && object.giftVoucherId !== null) {
      message.giftVoucherId = String(object.giftVoucherId);
    } else {
      message.giftVoucherId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<UseGiftVoucherOrderParams>): UseGiftVoucherOrderParams {
    const message = Object.create(baseUseGiftVoucherOrderParams) as UseGiftVoucherOrderParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.giftVoucherId !== undefined && object.giftVoucherId !== null) {
      message.giftVoucherId = object.giftVoucherId;
    } else {
      message.giftVoucherId = "";
    }
    return message;
  },
  toJSON(message: UseGiftVoucherOrderParams): unknown {
    const obj: any = {};
    obj.productId = message.productId || 0;
    obj.userId = message.userId || 0;
    obj.giftVoucherId = message.giftVoucherId || "";
    return obj;
  },
};

export const UseAppleIAPParams = {
  encode(message: UseAppleIAPParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.iapReceipt);
    writer.uint32(16).int64(message.userId);
    writer.uint32(24).int64(message.productId);
    return writer;
  },
  decode(reader: Reader, length?: number): UseAppleIAPParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUseAppleIAPParams) as UseAppleIAPParams;
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
  fromJSON(object: any): UseAppleIAPParams {
    const message = Object.create(baseUseAppleIAPParams) as UseAppleIAPParams;
    if (object.iapReceipt !== undefined && object.iapReceipt !== null) {
      message.iapReceipt = String(object.iapReceipt);
    } else {
      message.iapReceipt = "";
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
  fromPartial(object: DeepPartial<UseAppleIAPParams>): UseAppleIAPParams {
    const message = Object.create(baseUseAppleIAPParams) as UseAppleIAPParams;
    if (object.iapReceipt !== undefined && object.iapReceipt !== null) {
      message.iapReceipt = object.iapReceipt;
    } else {
      message.iapReceipt = "";
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
  toJSON(message: UseAppleIAPParams): unknown {
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