import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface CreateProductParams {
  sku: string;
}

export interface Product {
  id: number;
  sku: string;
}

export interface GetProductParams {
  productId: number;
  sku: string;
}

export interface GetProductsParams {
  pageSize: number;
  pageToken: number;
}

export interface GetProductsResponse {
  products: Product[];
  nextPageToken: number;
}

const baseCreateProductParams: object = {
  sku: "",
};

const baseProduct: object = {
  id: 0,
  sku: "",
};

const baseGetProductParams: object = {
  productId: 0,
  sku: "",
};

const baseGetProductsParams: object = {
  pageSize: 0,
  pageToken: 0,
};

const baseGetProductsResponse: object = {
  products: undefined,
  nextPageToken: 0,
};

export interface ProductService<Context extends DataLoaders> {

  CreateProduct(ctx: Context, request: CreateProductParams): Promise<Product>;

  GetProduct(ctx: Context, request: GetProductParams): Promise<Product>;

  GetProducts(ctx: Context, request: GetProductsParams): Promise<GetProductsResponse>;

}

export class ProductServiceClientImpl<Context extends DataLoaders> implements ProductService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateProduct(ctx: Context, request: CreateProductParams): Promise<Product> {
    const data = CreateProductParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.ProductService", "CreateProduct", data);
    return promise.then(data => Product.decode(new Reader(data)));
  }

  GetProduct(ctx: Context, request: GetProductParams): Promise<Product> {
    const dl = ctx.getDataLoader("pepeunlimited.products.ProductService.GetProduct", () => {
      return new DataLoader<GetProductParams, Product>((requests) => {
        const responses = requests.map(async request => {
          const data = GetProductParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.ProductService", "GetProduct", data);
          return Product.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetProducts(ctx: Context, request: GetProductsParams): Promise<GetProductsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.products.ProductService.GetProducts", () => {
      return new DataLoader<GetProductsParams, GetProductsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetProductsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.ProductService", "GetProducts", data);
          return GetProductsResponse.decode(new Reader(response));
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

export const CreateProductParams = {
  encode(message: CreateProductParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sku);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateProductParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateProductParams) as CreateProductParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sku = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateProductParams {
    const message = Object.create(baseCreateProductParams) as CreateProductParams;
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = String(object.sku);
    } else {
      message.sku = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateProductParams>): CreateProductParams {
    const message = Object.create(baseCreateProductParams) as CreateProductParams;
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = object.sku;
    } else {
      message.sku = "";
    }
    return message;
  },
  toJSON(message: CreateProductParams): unknown {
    const obj: any = {};
    obj.sku = message.sku || "";
    return obj;
  },
};

export const Product = {
  encode(message: Product, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.sku);
    return writer;
  },
  decode(reader: Reader, length?: number): Product {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseProduct) as Product;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.sku = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Product {
    const message = Object.create(baseProduct) as Product;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = String(object.sku);
    } else {
      message.sku = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Product>): Product {
    const message = Object.create(baseProduct) as Product;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = object.sku;
    } else {
      message.sku = "";
    }
    return message;
  },
  toJSON(message: Product): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.sku = message.sku || "";
    return obj;
  },
};

export const GetProductParams = {
  encode(message: GetProductParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.productId);
    writer.uint32(18).string(message.sku);
    return writer;
  },
  decode(reader: Reader, length?: number): GetProductParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetProductParams) as GetProductParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.sku = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetProductParams {
    const message = Object.create(baseGetProductParams) as GetProductParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = String(object.sku);
    } else {
      message.sku = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetProductParams>): GetProductParams {
    const message = Object.create(baseGetProductParams) as GetProductParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = object.sku;
    } else {
      message.sku = "";
    }
    return message;
  },
  toJSON(message: GetProductParams): unknown {
    const obj: any = {};
    obj.productId = message.productId || 0;
    obj.sku = message.sku || "";
    return obj;
  },
};

export const GetProductsParams = {
  encode(message: GetProductsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pageSize);
    writer.uint32(16).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetProductsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetProductsParams) as GetProductsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pageSize = reader.int32();
          break;
        case 2:
          message.pageToken = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetProductsParams {
    const message = Object.create(baseGetProductsParams) as GetProductsParams;
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
  fromPartial(object: DeepPartial<GetProductsParams>): GetProductsParams {
    const message = Object.create(baseGetProductsParams) as GetProductsParams;
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
  toJSON(message: GetProductsParams): unknown {
    const obj: any = {};
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetProductsResponse = {
  encode(message: GetProductsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.nextPageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetProductsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetProductsResponse) as GetProductsResponse;
    message.products = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.products.push(Product.decode(reader, reader.uint32()));
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
  fromJSON(object: any): GetProductsResponse {
    const message = Object.create(baseGetProductsResponse) as GetProductsResponse;
    message.products = [];
    if (object.products !== undefined && object.products !== null) {
      for (const e of object.products) {
        message.products.push(Product.fromJSON(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = Number(object.nextPageToken);
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetProductsResponse>): GetProductsResponse {
    const message = Object.create(baseGetProductsResponse) as GetProductsResponse;
    message.products = [];
    if (object.products !== undefined && object.products !== null) {
      for (const e of object.products) {
        message.products.push(Product.fromPartial(e));
      }
    }
    if (object.nextPageToken !== undefined && object.nextPageToken !== null) {
      message.nextPageToken = object.nextPageToken;
    } else {
      message.nextPageToken = 0;
    }
    return message;
  },
  toJSON(message: GetProductsResponse): unknown {
    const obj: any = {};
    if (message.products) {
      obj.products = message.products.map(e => e ? Product.toJSON(e) : undefined);
    } else {
      obj.products = [];
    }
    obj.nextPageToken = message.nextPageToken || 0;
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