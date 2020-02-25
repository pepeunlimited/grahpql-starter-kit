import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface CreateOrderParams {
  orderItems: OrderItem[];
  userId: number;
}

export interface CreateOrderResponse {
  order: Order | undefined;
  orderItems: OrderItem[];
  orderTxs: OrderTx[];
}

export interface Order {
  id: number;
  createdAt: string;
  userId: number;
}

export interface GetOrderParams {
  orderId: number;
  userId: number;
}

export interface GetOrdersParams {
  userId: number;
  pageSize: number;
  pageToken: number;
}

export interface GetOrdersResponse {
  orders: Order[];
  nextPageToken: number;
}

export interface GetOrderTxsParams {
  userId: number;
  orderId: number;
}

export interface OrderTx {
  id: number;
  orderId: number;
  createdAt: string;
  status: string;
}

export interface GetOrderTxsResponse {
  orderTxs: OrderTx[];
}

export interface GetOrderItemsParams {
  userId: number;
  orderId: number;
}

export interface OrderItem {
  id: number;
  priceId: number;
  quantity: number;
  orderId: number;
  planId: number;
}

export interface GetOrderItemsResponse {
  orderItems: OrderItem[];
}

const baseCreateOrderParams: object = {
  orderItems: undefined,
  userId: 0,
};

const baseCreateOrderResponse: object = {
  order: undefined,
  orderItems: undefined,
  orderTxs: undefined,
};

const baseOrder: object = {
  id: 0,
  createdAt: "",
  userId: 0,
};

const baseGetOrderParams: object = {
  orderId: 0,
  userId: 0,
};

const baseGetOrdersParams: object = {
  userId: 0,
  pageSize: 0,
  pageToken: 0,
};

const baseGetOrdersResponse: object = {
  orders: undefined,
  nextPageToken: 0,
};

const baseGetOrderTxsParams: object = {
  userId: 0,
  orderId: 0,
};

const baseOrderTx: object = {
  id: 0,
  orderId: 0,
  createdAt: "",
  status: "",
};

const baseGetOrderTxsResponse: object = {
  orderTxs: undefined,
};

const baseGetOrderItemsParams: object = {
  userId: 0,
  orderId: 0,
};

const baseOrderItem: object = {
  id: 0,
  priceId: 0,
  quantity: 0,
  orderId: 0,
  planId: 0,
};

const baseGetOrderItemsResponse: object = {
  orderItems: undefined,
};

export interface OrderService<Context extends DataLoaders> {

  CreateOrder(ctx: Context, request: CreateOrderParams): Promise<CreateOrderResponse>;

  GetOrders(ctx: Context, request: GetOrdersParams): Promise<GetOrdersResponse>;

  GetOrder(ctx: Context, request: GetOrderParams): Promise<Order>;

  GetOrderTxs(ctx: Context, request: GetOrderTxsParams): Promise<GetOrderTxsResponse>;

  GetOrderItems(ctx: Context, request: GetOrderItemsParams): Promise<GetOrderItemsResponse>;

}

export class OrderServiceClientImpl<Context extends DataLoaders> implements OrderService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateOrder(ctx: Context, request: CreateOrderParams): Promise<CreateOrderResponse> {
    const data = CreateOrderParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.billing.OrderService", "CreateOrder", data);
    return promise.then(data => CreateOrderResponse.decode(new Reader(data)));
  }

  GetOrders(ctx: Context, request: GetOrdersParams): Promise<GetOrdersResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.OrderService.GetOrders", () => {
      return new DataLoader<GetOrdersParams, GetOrdersResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetOrdersParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.OrderService", "GetOrders", data);
          return GetOrdersResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetOrder(ctx: Context, request: GetOrderParams): Promise<Order> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.OrderService.GetOrder", () => {
      return new DataLoader<GetOrderParams, Order>((requests) => {
        const responses = requests.map(async request => {
          const data = GetOrderParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.OrderService", "GetOrder", data);
          return Order.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetOrderTxs(ctx: Context, request: GetOrderTxsParams): Promise<GetOrderTxsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.OrderService.GetOrderTxs", () => {
      return new DataLoader<GetOrderTxsParams, GetOrderTxsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetOrderTxsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.OrderService", "GetOrderTxs", data);
          return GetOrderTxsResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetOrderItems(ctx: Context, request: GetOrderItemsParams): Promise<GetOrderItemsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.billing.OrderService.GetOrderItems", () => {
      return new DataLoader<GetOrderItemsParams, GetOrderItemsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetOrderItemsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.billing.OrderService", "GetOrderItems", data);
          return GetOrderItemsResponse.decode(new Reader(response));
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

export const CreateOrderParams = {
  encode(message: CreateOrderParams, writer: Writer = Writer.create()): Writer {
    for (const v of message.orderItems) {
      OrderItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateOrderParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateOrderParams) as CreateOrderParams;
    message.orderItems = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderItems.push(OrderItem.decode(reader, reader.uint32()));
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
  fromJSON(object: any): CreateOrderParams {
    const message = Object.create(baseCreateOrderParams) as CreateOrderParams;
    message.orderItems = [];
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromJSON(e));
      }
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateOrderParams>): CreateOrderParams {
    const message = Object.create(baseCreateOrderParams) as CreateOrderParams;
    message.orderItems = [];
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromPartial(e));
      }
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: CreateOrderParams): unknown {
    const obj: any = {};
    if (message.orderItems) {
      obj.orderItems = message.orderItems.map(e => e ? OrderItem.toJSON(e) : undefined);
    } else {
      obj.orderItems = [];
    }
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const CreateOrderResponse = {
  encode(message: CreateOrderResponse, writer: Writer = Writer.create()): Writer {
    if (message.order !== undefined && message.order !== undefined) {
      Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.orderItems) {
      OrderItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.orderTxs) {
      OrderTx.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): CreateOrderResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateOrderResponse) as CreateOrderResponse;
    message.orderItems = [];
    message.orderTxs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = Order.decode(reader, reader.uint32());
          break;
        case 2:
          message.orderItems.push(OrderItem.decode(reader, reader.uint32()));
          break;
        case 3:
          message.orderTxs.push(OrderTx.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateOrderResponse {
    const message = Object.create(baseCreateOrderResponse) as CreateOrderResponse;
    message.orderItems = [];
    message.orderTxs = [];
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromJSON(object.order);
    } else {
      message.order = undefined;
    }
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromJSON(e));
      }
    }
    if (object.orderTxs !== undefined && object.orderTxs !== null) {
      for (const e of object.orderTxs) {
        message.orderTxs.push(OrderTx.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateOrderResponse>): CreateOrderResponse {
    const message = Object.create(baseCreateOrderResponse) as CreateOrderResponse;
    message.orderItems = [];
    message.orderTxs = [];
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromPartial(object.order);
    } else {
      message.order = undefined;
    }
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromPartial(e));
      }
    }
    if (object.orderTxs !== undefined && object.orderTxs !== null) {
      for (const e of object.orderTxs) {
        message.orderTxs.push(OrderTx.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CreateOrderResponse): unknown {
    const obj: any = {};
    obj.order = message.order ? Order.toJSON(message.order) : undefined;
    if (message.orderItems) {
      obj.orderItems = message.orderItems.map(e => e ? OrderItem.toJSON(e) : undefined);
    } else {
      obj.orderItems = [];
    }
    if (message.orderTxs) {
      obj.orderTxs = message.orderTxs.map(e => e ? OrderTx.toJSON(e) : undefined);
    } else {
      obj.orderTxs = [];
    }
    return obj;
  },
};

export const Order = {
  encode(message: Order, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.createdAt);
    writer.uint32(24).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): Order {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseOrder) as Order;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.createdAt = reader.string();
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
  fromJSON(object: any): Order {
    const message = Object.create(baseOrder) as Order;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Order>): Order {
    const message = Object.create(baseOrder) as Order;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: Order): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.createdAt = message.createdAt || "";
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetOrderParams = {
  encode(message: GetOrderParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.orderId);
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrderParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrderParams) as GetOrderParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.int64() as Long);
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
  fromJSON(object: any): GetOrderParams {
    const message = Object.create(baseGetOrderParams) as GetOrderParams;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOrderParams>): GetOrderParams {
    const message = Object.create(baseGetOrderParams) as GetOrderParams;
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: GetOrderParams): unknown {
    const obj: any = {};
    obj.orderId = message.orderId || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetOrdersParams = {
  encode(message: GetOrdersParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int32(message.pageSize);
    writer.uint32(24).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrdersParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrdersParams) as GetOrdersParams;
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
  fromJSON(object: any): GetOrdersParams {
    const message = Object.create(baseGetOrdersParams) as GetOrdersParams;
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
  fromPartial(object: DeepPartial<GetOrdersParams>): GetOrdersParams {
    const message = Object.create(baseGetOrdersParams) as GetOrdersParams;
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
  toJSON(message: GetOrdersParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetOrdersResponse = {
  encode(message: GetOrdersResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.nextPageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrdersResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrdersResponse) as GetOrdersResponse;
    message.orders = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(Order.decode(reader, reader.uint32()));
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
  fromJSON(object: any): GetOrdersResponse {
    const message = Object.create(baseGetOrdersResponse) as GetOrdersResponse;
    message.orders = [];
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromJSON(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = Number(object.nextPageToken);
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOrdersResponse>): GetOrdersResponse {
    const message = Object.create(baseGetOrdersResponse) as GetOrdersResponse;
    message.orders = [];
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromPartial(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = object.nextPageToken;
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  toJSON(message: GetOrdersResponse): unknown {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? Order.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    obj.nextPageToken = message.nextPageToken || 0;
    return obj;
  },
};

export const GetOrderTxsParams = {
  encode(message: GetOrderTxsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int64(message.orderId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrderTxsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrderTxsParams) as GetOrderTxsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOrderTxsParams {
    const message = Object.create(baseGetOrderTxsParams) as GetOrderTxsParams;
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
  fromPartial(object: DeepPartial<GetOrderTxsParams>): GetOrderTxsParams {
    const message = Object.create(baseGetOrderTxsParams) as GetOrderTxsParams;
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
  toJSON(message: GetOrderTxsParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.orderId = message.orderId || 0;
    return obj;
  },
};

export const OrderTx = {
  encode(message: OrderTx, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).int64(message.orderId);
    writer.uint32(26).string(message.createdAt);
    writer.uint32(34).string(message.status);
    return writer;
  },
  decode(reader: Reader, length?: number): OrderTx {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseOrderTx) as OrderTx;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.createdAt = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OrderTx {
    const message = Object.create(baseOrderTx) as OrderTx;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<OrderTx>): OrderTx {
    const message = Object.create(baseOrderTx) as OrderTx;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = "";
    }
    return message;
  },
  toJSON(message: OrderTx): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.orderId = message.orderId || 0;
    obj.createdAt = message.createdAt || "";
    obj.status = message.status || "";
    return obj;
  },
};

export const GetOrderTxsResponse = {
  encode(message: GetOrderTxsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.orderTxs) {
      OrderTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrderTxsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrderTxsResponse) as GetOrderTxsResponse;
    message.orderTxs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderTxs.push(OrderTx.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOrderTxsResponse {
    const message = Object.create(baseGetOrderTxsResponse) as GetOrderTxsResponse;
    message.orderTxs = [];
    if (object.orderTxs !== undefined && object.orderTxs !== null) {
      for (const e of object.orderTxs) {
        message.orderTxs.push(OrderTx.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOrderTxsResponse>): GetOrderTxsResponse {
    const message = Object.create(baseGetOrderTxsResponse) as GetOrderTxsResponse;
    message.orderTxs = [];
    if (object.orderTxs !== undefined && object.orderTxs !== null) {
      for (const e of object.orderTxs) {
        message.orderTxs.push(OrderTx.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetOrderTxsResponse): unknown {
    const obj: any = {};
    if (message.orderTxs) {
      obj.orderTxs = message.orderTxs.map(e => e ? OrderTx.toJSON(e) : undefined);
    } else {
      obj.orderTxs = [];
    }
    return obj;
  },
};

export const GetOrderItemsParams = {
  encode(message: GetOrderItemsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int64(message.orderId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrderItemsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrderItemsParams) as GetOrderItemsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOrderItemsParams {
    const message = Object.create(baseGetOrderItemsParams) as GetOrderItemsParams;
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
  fromPartial(object: DeepPartial<GetOrderItemsParams>): GetOrderItemsParams {
    const message = Object.create(baseGetOrderItemsParams) as GetOrderItemsParams;
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
  toJSON(message: GetOrderItemsParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.orderId = message.orderId || 0;
    return obj;
  },
};

export const OrderItem = {
  encode(message: OrderItem, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).int64(message.priceId);
    writer.uint32(24).uint32(message.quantity);
    writer.uint32(32).int64(message.orderId);
    writer.uint32(40).int64(message.planId);
    return writer;
  },
  decode(reader: Reader, length?: number): OrderItem {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseOrderItem) as OrderItem;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.priceId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.quantity = reader.uint32();
          break;
        case 4:
          message.orderId = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.planId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OrderItem {
    const message = Object.create(baseOrderItem) as OrderItem;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.priceId !== undefined && object.priceId !== null) {
      message.priceId = Number(object.priceId);
    } else {
      message.priceId = 0;
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = Number(object.quantity);
    } else {
      message.quantity = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = Number(object.orderId);
    } else {
      message.orderId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = Number(object.planId);
    } else {
      message.planId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<OrderItem>): OrderItem {
    const message = Object.create(baseOrderItem) as OrderItem;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.priceId !== undefined && object.priceId !== null) {
      message.priceId = object.priceId;
    } else {
      message.priceId = 0;
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = object.quantity;
    } else {
      message.quantity = 0;
    }
    if (object.orderId !== undefined && object.orderId !== null) {
      message.orderId = object.orderId;
    } else {
      message.orderId = 0;
    }
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = object.planId;
    } else {
      message.planId = 0;
    }
    return message;
  },
  toJSON(message: OrderItem): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.priceId = message.priceId || 0;
    obj.quantity = message.quantity || 0;
    obj.orderId = message.orderId || 0;
    obj.planId = message.planId || 0;
    return obj;
  },
};

export const GetOrderItemsResponse = {
  encode(message: GetOrderItemsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.orderItems) {
      OrderItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetOrderItemsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOrderItemsResponse) as GetOrderItemsResponse;
    message.orderItems = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderItems.push(OrderItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOrderItemsResponse {
    const message = Object.create(baseGetOrderItemsResponse) as GetOrderItemsResponse;
    message.orderItems = [];
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOrderItemsResponse>): GetOrderItemsResponse {
    const message = Object.create(baseGetOrderItemsResponse) as GetOrderItemsResponse;
    message.orderItems = [];
    if (object.orderItems !== undefined && object.orderItems !== null) {
      for (const e of object.orderItems) {
        message.orderItems.push(OrderItem.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetOrderItemsResponse): unknown {
    const obj: any = {};
    if (message.orderItems) {
      obj.orderItems = message.orderItems.map(e => e ? OrderItem.toJSON(e) : undefined);
    } else {
      obj.orderItems = [];
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