import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface CreatePaymentParams {
  orderId: number;
  paymentInstrumentId: number;
  userId: number;
}

export interface Payment {
  paymentInstrumentId: number;
  orderId: number;
  id: number;
}

export interface GetPaymentParams {
  paymentId: number;
  userId: number;
  orderId: number;
}

export interface GetPaymentsParams {
  userId: number;
  pageSize: number;
  pageToken: number;
}

export interface GetPaymentsResponse {
  payments: Payment[];
  nextPageToken: number;
}

export interface CreatePaymentInstrumentParams {
  type: string;
}

export interface PaymentInstrument {
  id: number;
  type: string;
  typeI18nId: number;
}

export interface DeletePaymentInstrumentParams {
}

export interface GetPaymentInstrumentParams {
  id: number;
  type: string;
}

export interface GetPaymentInstrumentsParams {
  platform: string;
}

export interface GetPaymentInstrumentsResponse {
  paymentInstruments: PaymentInstrument[];
}

const baseCreatePaymentParams: object = {
  orderId: 0,
  paymentInstrumentId: 0,
  userId: 0,
};

const basePayment: object = {
  paymentInstrumentId: 0,
  orderId: 0,
  id: 0,
};

const baseGetPaymentParams: object = {
  paymentId: 0,
  userId: 0,
  orderId: 0,
};

const baseGetPaymentsParams: object = {
  userId: 0,
  pageSize: 0,
  pageToken: 0,
};

const baseGetPaymentsResponse: object = {
  payments: undefined,
  nextPageToken: 0,
};

const baseCreatePaymentInstrumentParams: object = {
  type: "",
};

const basePaymentInstrument: object = {
  id: 0,
  type: "",
  typeI18nId: 0,
};

const baseDeletePaymentInstrumentParams: object = {
};

const baseGetPaymentInstrumentParams: object = {
  id: 0,
  type: "",
};

const baseGetPaymentInstrumentsParams: object = {
  platform: "",
};

const baseGetPaymentInstrumentsResponse: object = {
  paymentInstruments: undefined,
};

export interface PaymentService<Context extends DataLoaders> {

  CreatePayment(ctx: Context, request: CreatePaymentParams): Promise<Payment>;

  GetPayments(ctx: Context, request: GetPaymentsParams): Promise<GetPaymentsResponse>;

  GetPayment(ctx: Context, request: GetPaymentParams): Promise<Payment>;

  CreatePaymentInstrument(ctx: Context, request: CreatePaymentInstrumentParams): Promise<PaymentInstrument>;

  GetPaymentInstrument(ctx: Context, request: GetPaymentInstrumentParams): Promise<PaymentInstrument>;

  GetPaymentInstruments(ctx: Context, request: GetPaymentInstrumentsParams): Promise<GetPaymentInstrumentsResponse>;

}

export class PaymentServiceClientImpl<Context extends DataLoaders> implements PaymentService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreatePayment(ctx: Context, request: CreatePaymentParams): Promise<Payment> {
    const data = CreatePaymentParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "CreatePayment", data);
    return promise.then(data => Payment.decode(new Reader(data)));
  }

  GetPayments(ctx: Context, request: GetPaymentsParams): Promise<GetPaymentsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.PaymentService.GetPayments", () => {
      return new DataLoader<GetPaymentsParams, GetPaymentsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPaymentsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "GetPayments", data);
          return GetPaymentsResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetPayment(ctx: Context, request: GetPaymentParams): Promise<Payment> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.PaymentService.GetPayment", () => {
      return new DataLoader<GetPaymentParams, Payment>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPaymentParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "GetPayment", data);
          return Payment.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  CreatePaymentInstrument(ctx: Context, request: CreatePaymentInstrumentParams): Promise<PaymentInstrument> {
    const data = CreatePaymentInstrumentParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "CreatePaymentInstrument", data);
    return promise.then(data => PaymentInstrument.decode(new Reader(data)));
  }

  GetPaymentInstrument(ctx: Context, request: GetPaymentInstrumentParams): Promise<PaymentInstrument> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.PaymentService.GetPaymentInstrument", () => {
      return new DataLoader<GetPaymentInstrumentParams, PaymentInstrument>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPaymentInstrumentParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "GetPaymentInstrument", data);
          return PaymentInstrument.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetPaymentInstruments(ctx: Context, request: GetPaymentInstrumentsParams): Promise<GetPaymentInstrumentsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.PaymentService.GetPaymentInstruments", () => {
      return new DataLoader<GetPaymentInstrumentsParams, GetPaymentInstrumentsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPaymentInstrumentsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.PaymentService", "GetPaymentInstruments", data);
          return GetPaymentInstrumentsResponse.decode(new Reader(response));
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

export const CreatePaymentParams = {
  encode(message: CreatePaymentParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.orderId);
    writer.uint32(16).uint32(message.paymentInstrumentId);
    writer.uint32(24).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreatePaymentParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreatePaymentParams) as CreatePaymentParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.paymentInstrumentId = reader.uint32();
          break;
        case 3:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreatePaymentParams {
    const message = Object.create(baseCreatePaymentParams) as CreatePaymentParams;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
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
    return message;
  },
  fromPartial(object: DeepPartial<CreatePaymentParams>): CreatePaymentParams {
    const message = Object.create(baseCreatePaymentParams) as CreatePaymentParams;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
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
    return message;
  },
  toJSON(message: CreatePaymentParams): unknown {
    const obj: any = {};
    obj.orderId = message.orderId || 0;
    obj.paymentInstrumentId = message.paymentInstrumentId || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const Payment = {
  encode(message: Payment, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.paymentInstrumentId);
    writer.uint32(16).int64(message.orderId);
    writer.uint32(24).int64(message.id);
    return writer;
  },
  decode(reader: Reader, length?: number): Payment {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePayment) as Payment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentInstrumentId = reader.uint32();
          break;
        case 2:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.id = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Payment {
    const message = Object.create(basePayment) as Payment;
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = Number(object.paymentInstrumentId);
    } else {
      message.paymentInstrumentId = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Payment>): Payment {
    const message = Object.create(basePayment) as Payment;
    if (object.paymentInstrumentId !== undefined && object.paymentInstrumentId !== null) {
      message.paymentInstrumentId = object.paymentInstrumentId;
    } else {
      message.paymentInstrumentId = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
  toJSON(message: Payment): unknown {
    const obj: any = {};
    obj.paymentInstrumentId = message.paymentInstrumentId || 0;
    obj.orderId = message.orderId || 0;
    obj.id = message.id || 0;
    return obj;
  },
};

export const GetPaymentParams = {
  encode(message: GetPaymentParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.paymentId);
    writer.uint32(16).int64(message.userId);
    writer.uint32(24).int64(message.orderId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentParams) as GetPaymentParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPaymentParams {
    const message = Object.create(baseGetPaymentParams) as GetPaymentParams;
    if (object.paymentId !== undefined && object.paymentId !== null) {
      message.paymentId = Number(object.paymentId);
    } else {
      message.paymentId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPaymentParams>): GetPaymentParams {
    const message = Object.create(baseGetPaymentParams) as GetPaymentParams;
    if (object.paymentId !== undefined && object.paymentId !== null) {
      message.paymentId = object.paymentId;
    } else {
      message.paymentId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    return message;
  },
  toJSON(message: GetPaymentParams): unknown {
    const obj: any = {};
    obj.paymentId = message.paymentId || 0;
    obj.userId = message.userId || 0;
    obj.orderId = message.orderId || 0;
    return obj;
  },
};

export const GetPaymentsParams = {
  encode(message: GetPaymentsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int32(message.pageSize);
    writer.uint32(24).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentsParams) as GetPaymentsParams;
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
  fromJSON(object: any): GetPaymentsParams {
    const message = Object.create(baseGetPaymentsParams) as GetPaymentsParams;
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
  fromPartial(object: DeepPartial<GetPaymentsParams>): GetPaymentsParams {
    const message = Object.create(baseGetPaymentsParams) as GetPaymentsParams;
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
  toJSON(message: GetPaymentsParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetPaymentsResponse = {
  encode(message: GetPaymentsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.payments) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.nextPageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentsResponse) as GetPaymentsResponse;
    message.payments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payments.push(Payment.decode(reader, reader.uint32()));
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
  fromJSON(object: any): GetPaymentsResponse {
    const message = Object.create(baseGetPaymentsResponse) as GetPaymentsResponse;
    message.payments = [];
    if (object.payments !== undefined && object.payments !== null) {
      for (const e of object.payments) {
        message.payments.push(Payment.fromJSON(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = Number(object.nextPageToken);
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPaymentsResponse>): GetPaymentsResponse {
    const message = Object.create(baseGetPaymentsResponse) as GetPaymentsResponse;
    message.payments = [];
    if (object.payments !== undefined && object.payments !== null) {
      for (const e of object.payments) {
        message.payments.push(Payment.fromPartial(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = object.nextPageToken;
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  toJSON(message: GetPaymentsResponse): unknown {
    const obj: any = {};
    if (message.payments) {
      obj.payments = message.payments.map(e => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.payments = [];
    }
    obj.nextPageToken = message.nextPageToken || 0;
    return obj;
  },
};

export const CreatePaymentInstrumentParams = {
  encode(message: CreatePaymentInstrumentParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): CreatePaymentInstrumentParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreatePaymentInstrumentParams) as CreatePaymentInstrumentParams;
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
  fromJSON(object: any): CreatePaymentInstrumentParams {
    const message = Object.create(baseCreatePaymentInstrumentParams) as CreatePaymentInstrumentParams;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreatePaymentInstrumentParams>): CreatePaymentInstrumentParams {
    const message = Object.create(baseCreatePaymentInstrumentParams) as CreatePaymentInstrumentParams;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    return message;
  },
  toJSON(message: CreatePaymentInstrumentParams): unknown {
    const obj: any = {};
    obj.type = message.type || "";
    return obj;
  },
};

export const PaymentInstrument = {
  encode(message: PaymentInstrument, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.id);
    writer.uint32(18).string(message.type);
    writer.uint32(24).int64(message.typeI18nId);
    return writer;
  },
  decode(reader: Reader, length?: number): PaymentInstrument {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePaymentInstrument) as PaymentInstrument;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.typeI18nId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PaymentInstrument {
    const message = Object.create(basePaymentInstrument) as PaymentInstrument;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.typeI18nId !== undefined && object.typeI18nId !== null) {
      message.typeI18nId = Number(object.typeI18nId);
    } else {
      message.typeI18nId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PaymentInstrument>): PaymentInstrument {
    const message = Object.create(basePaymentInstrument) as PaymentInstrument;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.typeI18nId !== undefined && object.typeI18nId !== null) {
      message.typeI18nId = object.typeI18nId;
    } else {
      message.typeI18nId = 0;
    }
    return message;
  },
  toJSON(message: PaymentInstrument): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.type = message.type || "";
    obj.typeI18nId = message.typeI18nId || 0;
    return obj;
  },
};

export const DeletePaymentInstrumentParams = {
  encode(message: DeletePaymentInstrumentParams, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): DeletePaymentInstrumentParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeletePaymentInstrumentParams) as DeletePaymentInstrumentParams;
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
  fromJSON(object: any): DeletePaymentInstrumentParams {
    const message = Object.create(baseDeletePaymentInstrumentParams) as DeletePaymentInstrumentParams;
    return message;
  },
  fromPartial(object: DeepPartial<DeletePaymentInstrumentParams>): DeletePaymentInstrumentParams {
    const message = Object.create(baseDeletePaymentInstrumentParams) as DeletePaymentInstrumentParams;
    return message;
  },
  toJSON(message: DeletePaymentInstrumentParams): unknown {
    const obj: any = {};
    return obj;
  },
};

export const GetPaymentInstrumentParams = {
  encode(message: GetPaymentInstrumentParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.id);
    writer.uint32(18).string(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentInstrumentParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentInstrumentParams) as GetPaymentInstrumentParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPaymentInstrumentParams {
    const message = Object.create(baseGetPaymentInstrumentParams) as GetPaymentInstrumentParams;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPaymentInstrumentParams>): GetPaymentInstrumentParams {
    const message = Object.create(baseGetPaymentInstrumentParams) as GetPaymentInstrumentParams;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    return message;
  },
  toJSON(message: GetPaymentInstrumentParams): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.type = message.type || "";
    return obj;
  },
};

export const GetPaymentInstrumentsParams = {
  encode(message: GetPaymentInstrumentsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.platform);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentInstrumentsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentInstrumentsParams) as GetPaymentInstrumentsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.platform = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPaymentInstrumentsParams {
    const message = Object.create(baseGetPaymentInstrumentsParams) as GetPaymentInstrumentsParams;
    if (object.platform !== undefined && object.platform !== null) {
      message.platform = String(object.platform);
    } else {
      message.platform = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPaymentInstrumentsParams>): GetPaymentInstrumentsParams {
    const message = Object.create(baseGetPaymentInstrumentsParams) as GetPaymentInstrumentsParams;
    if (object.platform !== undefined && object.platform !== null) {
      message.platform = object.platform;
    } else {
      message.platform = "";
    }
    return message;
  },
  toJSON(message: GetPaymentInstrumentsParams): unknown {
    const obj: any = {};
    obj.platform = message.platform || "";
    return obj;
  },
};

export const GetPaymentInstrumentsResponse = {
  encode(message: GetPaymentInstrumentsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.paymentInstruments) {
      PaymentInstrument.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetPaymentInstrumentsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPaymentInstrumentsResponse) as GetPaymentInstrumentsResponse;
    message.paymentInstruments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentInstruments.push(PaymentInstrument.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPaymentInstrumentsResponse {
    const message = Object.create(baseGetPaymentInstrumentsResponse) as GetPaymentInstrumentsResponse;
    message.paymentInstruments = [];
    if (object.paymentInstruments !== undefined && object.paymentInstruments !== null) {
      for (const e of object.paymentInstruments) {
        message.paymentInstruments.push(PaymentInstrument.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPaymentInstrumentsResponse>): GetPaymentInstrumentsResponse {
    const message = Object.create(baseGetPaymentInstrumentsResponse) as GetPaymentInstrumentsResponse;
    message.paymentInstruments = [];
    if (object.paymentInstruments !== undefined && object.paymentInstruments !== null) {
      for (const e of object.paymentInstruments) {
        message.paymentInstruments.push(PaymentInstrument.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetPaymentInstrumentsResponse): unknown {
    const obj: any = {};
    if (message.paymentInstruments) {
      obj.paymentInstruments = message.paymentInstruments.map(e => e ? PaymentInstrument.toJSON(e) : undefined);
    } else {
      obj.paymentInstruments = [];
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