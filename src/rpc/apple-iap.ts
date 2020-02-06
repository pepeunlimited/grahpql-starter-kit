import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { StringValue } from './google/protobuf/wrappers';


export interface VerifyReceiptParams {
  receipt: string;
  password: string | undefined;
}

export interface VerifyReceiptResponse {
  status: VerifyReceiptResponse_Status;
  type: VerifyReceiptResponse_Type;
  appleProductId: string;
}

export enum VerifyReceiptResponse_Status {
  UNKNOWN_STATUS = 0,
  OK = 1,
  REFUNDED = 2,
  SUBSCRIPTION_CANCELED = 3,
}

export enum VerifyReceiptResponse_Type {
  UNKNOWN_IAP_TYPE = 0,
  CONSUMABLE = 1,
  NON_CONSUMABLE = 2,
  AUTO_RENEWABLE_SUBSCRIPTION = 3,
  NON_RENEWING_SUBSCRIPTIONS = 4,
}

const baseVerifyReceiptParams: object = {
  receipt: "",
  password: undefined,
};

const baseVerifyReceiptResponse: object = {
  status: 0,
  type: 0,
  appleProductId: "",
};

export interface AppleIAPService<Context extends DataLoaders> {

  VerifyReceipt(ctx: Context, request: VerifyReceiptParams): Promise<VerifyReceiptResponse>;

}

export class AppleIAPServiceClientImpl<Context extends DataLoaders> implements AppleIAPService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  VerifyReceipt(ctx: Context, request: VerifyReceiptParams): Promise<VerifyReceiptResponse> {
    const data = VerifyReceiptParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.apple.AppleIAPService", "VerifyReceipt", data);
    return promise.then(data => VerifyReceiptResponse.decode(new Reader(data)));
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

export const VerifyReceiptParams = {
  encode(message: VerifyReceiptParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.receipt);
    if (message.password !== undefined && message.password !== undefined) {
      StringValue.encode({ value: message.password! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyReceiptParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyReceiptParams) as VerifyReceiptParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receipt = reader.string();
          break;
        case 2:
          message.password = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VerifyReceiptParams {
    const message = Object.create(baseVerifyReceiptParams) as VerifyReceiptParams;
    if (object.receipt !== undefined && object.receipt !== null) {
      message.receipt = String(object.receipt);
    } else {
      message.receipt = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyReceiptParams>): VerifyReceiptParams {
    const message = Object.create(baseVerifyReceiptParams) as VerifyReceiptParams;
    if (object.receipt !== undefined && object.receipt !== null) {
      message.receipt = object.receipt;
    } else {
      message.receipt = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = undefined;
    }
    return message;
  },
  toJSON(message: VerifyReceiptParams): unknown {
    const obj: any = {};
    obj.receipt = message.receipt || "";
    obj.password = message.password || undefined;
    return obj;
  },
};

export const VerifyReceiptResponse = {
  encode(message: VerifyReceiptResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.status);
    writer.uint32(16).int32(message.type);
    writer.uint32(26).string(message.appleProductId);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyReceiptResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyReceiptResponse) as VerifyReceiptResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32();
          break;
        case 2:
          message.type = reader.int32();
          break;
        case 3:
          message.appleProductId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VerifyReceiptResponse {
    const message = Object.create(baseVerifyReceiptResponse) as VerifyReceiptResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = VerifyReceiptResponse_Status.fromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = VerifyReceiptResponse_Type.fromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.appleProductId !== undefined && object.appleProductId !== null) {
      message.appleProductId = String(object.appleProductId);
    } else {
      message.appleProductId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyReceiptResponse>): VerifyReceiptResponse {
    const message = Object.create(baseVerifyReceiptResponse) as VerifyReceiptResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.appleProductId !== undefined && object.appleProductId !== null) {
      message.appleProductId = object.appleProductId;
    } else {
      message.appleProductId = "";
    }
    return message;
  },
  toJSON(message: VerifyReceiptResponse): unknown {
    const obj: any = {};
    obj.status = VerifyReceiptResponse_Status.toJSON(message.status);
    obj.type = VerifyReceiptResponse_Type.toJSON(message.type);
    obj.appleProductId = message.appleProductId || "";
    return obj;
  },
};

export namespace VerifyReceiptResponse_Status {
  export function fromJSON(object: any): VerifyReceiptResponse_Status {
    switch (object) {
      case 0:
      case "UNKNOWN_STATUS":
        return VerifyReceiptResponse_Status.UNKNOWN_STATUS;
      case 1:
      case "OK":
        return VerifyReceiptResponse_Status.OK;
      case 2:
      case "REFUNDED":
        return VerifyReceiptResponse_Status.REFUNDED;
      case 3:
      case "SUBSCRIPTION_CANCELED":
        return VerifyReceiptResponse_Status.SUBSCRIPTION_CANCELED;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  }
  export function toJSON(object: VerifyReceiptResponse_Status): string {
    switch (object) {
      case VerifyReceiptResponse_Status.UNKNOWN_STATUS:
        return "UNKNOWN_STATUS";
      case VerifyReceiptResponse_Status.OK:
        return "OK";
      case VerifyReceiptResponse_Status.REFUNDED:
        return "REFUNDED";
      case VerifyReceiptResponse_Status.SUBSCRIPTION_CANCELED:
        return "SUBSCRIPTION_CANCELED";
      default:
        return "UNKNOWN";
    }
  }
}

export namespace VerifyReceiptResponse_Type {
  export function fromJSON(object: any): VerifyReceiptResponse_Type {
    switch (object) {
      case 0:
      case "UNKNOWN_IAP_TYPE":
        return VerifyReceiptResponse_Type.UNKNOWN_IAP_TYPE;
      case 1:
      case "CONSUMABLE":
        return VerifyReceiptResponse_Type.CONSUMABLE;
      case 2:
      case "NON_CONSUMABLE":
        return VerifyReceiptResponse_Type.NON_CONSUMABLE;
      case 3:
      case "AUTO_RENEWABLE_SUBSCRIPTION":
        return VerifyReceiptResponse_Type.AUTO_RENEWABLE_SUBSCRIPTION;
      case 4:
      case "NON_RENEWING_SUBSCRIPTIONS":
        return VerifyReceiptResponse_Type.NON_RENEWING_SUBSCRIPTIONS;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  }
  export function toJSON(object: VerifyReceiptResponse_Type): string {
    switch (object) {
      case VerifyReceiptResponse_Type.UNKNOWN_IAP_TYPE:
        return "UNKNOWN_IAP_TYPE";
      case VerifyReceiptResponse_Type.CONSUMABLE:
        return "CONSUMABLE";
      case VerifyReceiptResponse_Type.NON_CONSUMABLE:
        return "NON_CONSUMABLE";
      case VerifyReceiptResponse_Type.AUTO_RENEWABLE_SUBSCRIPTION:
        return "AUTO_RENEWABLE_SUBSCRIPTION";
      case VerifyReceiptResponse_Type.NON_RENEWING_SUBSCRIPTIONS:
        return "NON_RENEWING_SUBSCRIPTIONS";
      default:
        return "UNKNOWN";
    }
  }
}

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