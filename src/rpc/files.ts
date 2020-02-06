import DataLoader from 'dataloader';
import { Reader, Writer } from 'protobufjs/minimal';
import hash from 'object-hash';
import * as Long from 'long';
import { Int64Value, StringValue } from './google/protobuf/wrappers';


export interface CreateBucketParams {
  name: string;
  endpoint: string;
}

export interface CreateBucketResponse {
  endpoint: string;
  cdnEndpoint: string;
  name: string;
  bucketId: number;
}

export interface GetFileParams {
  fileId: number | undefined;
  filename: Filename | undefined;
}

export interface GetFilesParams {
  pageSize: number;
  pageToken: number;
}

export interface GetFilesResponse {
  files: File[];
}

export interface GetBucketsParams {
  pageSize: number;
  pageToken: number;
}

export interface GetBucketsResponse {
  buckets: Bucket[];
}

export interface Bucket {
  id: number;
  name: string;
}

export interface CutParams {
  toSpacesName: string | undefined;
  fileId: number;
  filename: Filename | undefined;
  toSpacesId: number | undefined;
}

export interface CutResponse {
  newBucketName: string;
  newBucketId: number;
}

export interface WipeParams {
  bucketName: string;
  isDeleteSpaces: boolean;
}

export interface WipeParamsResponse {
  deletedCount: number;
}

export interface DeleteParams {
  fileId: number | undefined;
  filename: Filename | undefined;
  isPermanent: boolean;
}

export interface DeleteResponse {
}

export interface Filename {
  name: string;
  bucketId: number | undefined;
  bucketName: string | undefined;
}

export interface File {
  id: number;
  filename: string;
  createdAt: string;
  updatedAt: string;
  mimeType: string;
  fileSize: number;
  userId: number;
  isDraft: boolean;
  spacesId: number;
  fileUrl: string;
}

const baseCreateBucketParams: object = {
  name: "",
  endpoint: "",
};

const baseCreateBucketResponse: object = {
  endpoint: "",
  cdnEndpoint: "",
  name: "",
  bucketId: 0,
};

const baseGetFileParams: object = {
  fileId: undefined,
  filename: undefined,
};

const baseGetFilesParams: object = {
  pageSize: 0,
  pageToken: 0,
};

const baseGetFilesResponse: object = {
  files: undefined,
};

const baseGetBucketsParams: object = {
  pageSize: 0,
  pageToken: 0,
};

const baseGetBucketsResponse: object = {
  buckets: undefined,
};

const baseBucket: object = {
  id: 0,
  name: "",
};

const baseCutParams: object = {
  toSpacesName: undefined,
  fileId: 0,
  filename: undefined,
  toSpacesId: undefined,
};

const baseCutResponse: object = {
  newBucketName: "",
  newBucketId: 0,
};

const baseWipeParams: object = {
  bucketName: "",
  isDeleteSpaces: false,
};

const baseWipeParamsResponse: object = {
  deletedCount: 0,
};

const baseDeleteParams: object = {
  fileId: undefined,
  filename: undefined,
  isPermanent: false,
};

const baseDeleteResponse: object = {
};

const baseFilename: object = {
  name: "",
  bucketId: undefined,
  bucketName: undefined,
};

const baseFile: object = {
  id: 0,
  filename: "",
  createdAt: "",
  updatedAt: "",
  mimeType: "",
  fileSize: 0,
  userId: 0,
  isDraft: false,
  spacesId: 0,
  fileUrl: "",
};

export interface FilesService<Context extends DataLoaders> {

  GetFile(ctx: Context, request: GetFileParams): Promise<File>;

  GetFiles(ctx: Context, request: GetFilesParams): Promise<GetFilesResponse>;

  GetBuckets(ctx: Context, request: GetBucketsParams): Promise<GetBucketsResponse>;

  Cut(ctx: Context, request: CutParams): Promise<CutResponse>;

  Delete(ctx: Context, request: DeleteParams): Promise<DeleteResponse>;

  Wipe(ctx: Context, request: WipeParams): Promise<WipeParamsResponse>;

  CreateBucket(ctx: Context, request: CreateBucketParams): Promise<CreateBucketResponse>;

}

export class FilesServiceClientImpl<Context extends DataLoaders> implements FilesService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  GetFile(ctx: Context, request: GetFileParams): Promise<File> {
    const dl = ctx.getDataLoader("pepeunlimited.files.FilesService.GetFile", () => {
      return new DataLoader<GetFileParams, File>((requests) => {
        const responses = requests.map(async request => {
          const data = GetFileParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.FilesService", "GetFile", data);
          return File.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetFiles(ctx: Context, request: GetFilesParams): Promise<GetFilesResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.files.FilesService.GetFiles", () => {
      return new DataLoader<GetFilesParams, GetFilesResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetFilesParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.FilesService", "GetFiles", data);
          return GetFilesResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetBuckets(ctx: Context, request: GetBucketsParams): Promise<GetBucketsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.files.FilesService.GetBuckets", () => {
      return new DataLoader<GetBucketsParams, GetBucketsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetBucketsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.FilesService", "GetBuckets", data);
          return GetBucketsResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  Cut(ctx: Context, request: CutParams): Promise<CutResponse> {
    const data = CutParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.FilesService", "Cut", data);
    return promise.then(data => CutResponse.decode(new Reader(data)));
  }

  Delete(ctx: Context, request: DeleteParams): Promise<DeleteResponse> {
    const data = DeleteParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.FilesService", "Delete", data);
    return promise.then(data => DeleteResponse.decode(new Reader(data)));
  }

  Wipe(ctx: Context, request: WipeParams): Promise<WipeParamsResponse> {
    const data = WipeParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.FilesService", "Wipe", data);
    return promise.then(data => WipeParamsResponse.decode(new Reader(data)));
  }

  CreateBucket(ctx: Context, request: CreateBucketParams): Promise<CreateBucketResponse> {
    const data = CreateBucketParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.FilesService", "CreateBucket", data);
    return promise.then(data => CreateBucketResponse.decode(new Reader(data)));
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

export const CreateBucketParams = {
  encode(message: CreateBucketParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.endpoint);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateBucketParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateBucketParams) as CreateBucketParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.endpoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateBucketParams {
    const message = Object.create(baseCreateBucketParams) as CreateBucketParams;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = String(object.endpoint);
    } else {
      message.endpoint = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateBucketParams>): CreateBucketParams {
    const message = Object.create(baseCreateBucketParams) as CreateBucketParams;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = "";
    }
    return message;
  },
  toJSON(message: CreateBucketParams): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.endpoint = message.endpoint || "";
    return obj;
  },
};

export const CreateBucketResponse = {
  encode(message: CreateBucketResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.endpoint);
    writer.uint32(18).string(message.cdnEndpoint);
    writer.uint32(26).string(message.name);
    writer.uint32(32).int64(message.bucketId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateBucketResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateBucketResponse) as CreateBucketResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.string();
          break;
        case 2:
          message.cdnEndpoint = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.bucketId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateBucketResponse {
    const message = Object.create(baseCreateBucketResponse) as CreateBucketResponse;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = String(object.endpoint);
    } else {
      message.endpoint = "";
    }
    if (object.cdnEndpoint !== undefined && object.cdnEndpoint !== null) {
      message.cdnEndpoint = String(object.cdnEndpoint);
    } else {
      message.cdnEndpoint = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.bucketId !== undefined && object.bucketId !== null) {
      message.bucketId = Number(object.bucketId);
    } else {
      message.bucketId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateBucketResponse>): CreateBucketResponse {
    const message = Object.create(baseCreateBucketResponse) as CreateBucketResponse;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = "";
    }
    if (object.cdnEndpoint !== undefined && object.cdnEndpoint !== null) {
      message.cdnEndpoint = object.cdnEndpoint;
    } else {
      message.cdnEndpoint = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.bucketId !== undefined && object.bucketId !== null) {
      message.bucketId = object.bucketId;
    } else {
      message.bucketId = 0;
    }
    return message;
  },
  toJSON(message: CreateBucketResponse): unknown {
    const obj: any = {};
    obj.endpoint = message.endpoint || "";
    obj.cdnEndpoint = message.cdnEndpoint || "";
    obj.name = message.name || "";
    obj.bucketId = message.bucketId || 0;
    return obj;
  },
};

export const GetFileParams = {
  encode(message: GetFileParams, writer: Writer = Writer.create()): Writer {
    if (message.fileId !== undefined && message.fileId !== undefined) {
      Int64Value.encode({ value: message.fileId! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.filename !== undefined && message.filename !== undefined) {
      Filename.encode(message.filename, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetFileParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetFileParams) as GetFileParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileId = Int64Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.filename = Filename.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetFileParams {
    const message = Object.create(baseGetFileParams) as GetFileParams;
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = Number(object.fileId);
    } else {
      message.fileId = undefined;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromJSON(object.filename);
    } else {
      message.filename = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetFileParams>): GetFileParams {
    const message = Object.create(baseGetFileParams) as GetFileParams;
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = object.fileId;
    } else {
      message.fileId = undefined;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromPartial(object.filename);
    } else {
      message.filename = undefined;
    }
    return message;
  },
  toJSON(message: GetFileParams): unknown {
    const obj: any = {};
    obj.fileId = message.fileId || undefined;
    obj.filename = message.filename ? Filename.toJSON(message.filename) : undefined;
    return obj;
  },
};

export const GetFilesParams = {
  encode(message: GetFilesParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pageSize);
    writer.uint32(16).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetFilesParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetFilesParams) as GetFilesParams;
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
  fromJSON(object: any): GetFilesParams {
    const message = Object.create(baseGetFilesParams) as GetFilesParams;
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
  fromPartial(object: DeepPartial<GetFilesParams>): GetFilesParams {
    const message = Object.create(baseGetFilesParams) as GetFilesParams;
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
  toJSON(message: GetFilesParams): unknown {
    const obj: any = {};
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetFilesResponse = {
  encode(message: GetFilesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.files) {
      File.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetFilesResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetFilesResponse) as GetFilesResponse;
    message.files = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.files.push(File.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetFilesResponse {
    const message = Object.create(baseGetFilesResponse) as GetFilesResponse;
    message.files = [];
    if (object.files !== undefined && object.files !== null) {
      for (const e of object.files) {
        message.files.push(File.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetFilesResponse>): GetFilesResponse {
    const message = Object.create(baseGetFilesResponse) as GetFilesResponse;
    message.files = [];
    if (object.files !== undefined && object.files !== null) {
      for (const e of object.files) {
        message.files.push(File.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetFilesResponse): unknown {
    const obj: any = {};
    if (message.files) {
      obj.files = message.files.map(e => e ? File.toJSON(e) : undefined);
    } else {
      obj.files = [];
    }
    return obj;
  },
};

export const GetBucketsParams = {
  encode(message: GetBucketsParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pageSize);
    writer.uint32(16).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetBucketsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetBucketsParams) as GetBucketsParams;
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
  fromJSON(object: any): GetBucketsParams {
    const message = Object.create(baseGetBucketsParams) as GetBucketsParams;
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
  fromPartial(object: DeepPartial<GetBucketsParams>): GetBucketsParams {
    const message = Object.create(baseGetBucketsParams) as GetBucketsParams;
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
  toJSON(message: GetBucketsParams): unknown {
    const obj: any = {};
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetBucketsResponse = {
  encode(message: GetBucketsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.buckets) {
      Bucket.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetBucketsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetBucketsResponse) as GetBucketsResponse;
    message.buckets = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buckets.push(Bucket.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetBucketsResponse {
    const message = Object.create(baseGetBucketsResponse) as GetBucketsResponse;
    message.buckets = [];
    if (object.buckets !== undefined && object.buckets !== null) {
      for (const e of object.buckets) {
        message.buckets.push(Bucket.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetBucketsResponse>): GetBucketsResponse {
    const message = Object.create(baseGetBucketsResponse) as GetBucketsResponse;
    message.buckets = [];
    if (object.buckets !== undefined && object.buckets !== null) {
      for (const e of object.buckets) {
        message.buckets.push(Bucket.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetBucketsResponse): unknown {
    const obj: any = {};
    if (message.buckets) {
      obj.buckets = message.buckets.map(e => e ? Bucket.toJSON(e) : undefined);
    } else {
      obj.buckets = [];
    }
    return obj;
  },
};

export const Bucket = {
  encode(message: Bucket, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.name);
    return writer;
  },
  decode(reader: Reader, length?: number): Bucket {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBucket) as Bucket;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Bucket {
    const message = Object.create(baseBucket) as Bucket;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Bucket>): Bucket {
    const message = Object.create(baseBucket) as Bucket;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
  toJSON(message: Bucket): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.name = message.name || "";
    return obj;
  },
};

export const CutParams = {
  encode(message: CutParams, writer: Writer = Writer.create()): Writer {
    if (message.toSpacesName !== undefined && message.toSpacesName !== undefined) {
      StringValue.encode({ value: message.toSpacesName! }, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.fileId);
    if (message.filename !== undefined && message.filename !== undefined) {
      Filename.encode(message.filename, writer.uint32(26).fork()).ldelim();
    }
    if (message.toSpacesId !== undefined && message.toSpacesId !== undefined) {
      Int64Value.encode({ value: message.toSpacesId! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): CutParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCutParams) as CutParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.toSpacesName = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.fileId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.filename = Filename.decode(reader, reader.uint32());
          break;
        case 4:
          message.toSpacesId = Int64Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CutParams {
    const message = Object.create(baseCutParams) as CutParams;
    if (object.toSpacesName !== undefined && object.toSpacesName !== null) {
      message.toSpacesName = String(object.toSpacesName);
    } else {
      message.toSpacesName = undefined;
    }
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = Number(object.fileId);
    } else {
      message.fileId = 0;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromJSON(object.filename);
    } else {
      message.filename = undefined;
    }
    if (object.toSpacesId !== undefined && object.toSpacesId !== null) {
      message.toSpacesId = Number(object.toSpacesId);
    } else {
      message.toSpacesId = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CutParams>): CutParams {
    const message = Object.create(baseCutParams) as CutParams;
    if (object.toSpacesName !== undefined && object.toSpacesName !== null) {
      message.toSpacesName = object.toSpacesName;
    } else {
      message.toSpacesName = undefined;
    }
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = object.fileId;
    } else {
      message.fileId = 0;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromPartial(object.filename);
    } else {
      message.filename = undefined;
    }
    if (object.toSpacesId !== undefined && object.toSpacesId !== null) {
      message.toSpacesId = object.toSpacesId;
    } else {
      message.toSpacesId = undefined;
    }
    return message;
  },
  toJSON(message: CutParams): unknown {
    const obj: any = {};
    obj.toSpacesName = message.toSpacesName || undefined;
    obj.fileId = message.fileId || 0;
    obj.filename = message.filename ? Filename.toJSON(message.filename) : undefined;
    obj.toSpacesId = message.toSpacesId || undefined;
    return obj;
  },
};

export const CutResponse = {
  encode(message: CutResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.newBucketName);
    writer.uint32(16).int64(message.newBucketId);
    return writer;
  },
  decode(reader: Reader, length?: number): CutResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCutResponse) as CutResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newBucketName = reader.string();
          break;
        case 2:
          message.newBucketId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CutResponse {
    const message = Object.create(baseCutResponse) as CutResponse;
    if (object.newBucketName !== undefined && object.newBucketName !== null) {
      message.newBucketName = String(object.newBucketName);
    } else {
      message.newBucketName = "";
    }
    if (object.newBucketId !== undefined && object.newBucketId !== null) {
      message.newBucketId = Number(object.newBucketId);
    } else {
      message.newBucketId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CutResponse>): CutResponse {
    const message = Object.create(baseCutResponse) as CutResponse;
    if (object.newBucketName !== undefined && object.newBucketName !== null) {
      message.newBucketName = object.newBucketName;
    } else {
      message.newBucketName = "";
    }
    if (object.newBucketId !== undefined && object.newBucketId !== null) {
      message.newBucketId = object.newBucketId;
    } else {
      message.newBucketId = 0;
    }
    return message;
  },
  toJSON(message: CutResponse): unknown {
    const obj: any = {};
    obj.newBucketName = message.newBucketName || "";
    obj.newBucketId = message.newBucketId || 0;
    return obj;
  },
};

export const WipeParams = {
  encode(message: WipeParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.bucketName);
    writer.uint32(16).bool(message.isDeleteSpaces);
    return writer;
  },
  decode(reader: Reader, length?: number): WipeParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWipeParams) as WipeParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bucketName = reader.string();
          break;
        case 2:
          message.isDeleteSpaces = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): WipeParams {
    const message = Object.create(baseWipeParams) as WipeParams;
    if (object.bucketName !== undefined && object.bucketName !== null) {
      message.bucketName = String(object.bucketName);
    } else {
      message.bucketName = "";
    }
    if (object.isDeleteSpaces !== undefined && object.isDeleteSpaces !== null) {
      message.isDeleteSpaces = Boolean(object.isDeleteSpaces);
    } else {
      message.isDeleteSpaces = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<WipeParams>): WipeParams {
    const message = Object.create(baseWipeParams) as WipeParams;
    if (object.bucketName !== undefined && object.bucketName !== null) {
      message.bucketName = object.bucketName;
    } else {
      message.bucketName = "";
    }
    if (object.isDeleteSpaces !== undefined && object.isDeleteSpaces !== null) {
      message.isDeleteSpaces = object.isDeleteSpaces;
    } else {
      message.isDeleteSpaces = false;
    }
    return message;
  },
  toJSON(message: WipeParams): unknown {
    const obj: any = {};
    obj.bucketName = message.bucketName || "";
    obj.isDeleteSpaces = message.isDeleteSpaces || false;
    return obj;
  },
};

export const WipeParamsResponse = {
  encode(message: WipeParamsResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.deletedCount);
    return writer;
  },
  decode(reader: Reader, length?: number): WipeParamsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWipeParamsResponse) as WipeParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deletedCount = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): WipeParamsResponse {
    const message = Object.create(baseWipeParamsResponse) as WipeParamsResponse;
    if (object.deletedCount !== undefined && object.deletedCount !== null) {
      message.deletedCount = Number(object.deletedCount);
    } else {
      message.deletedCount = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<WipeParamsResponse>): WipeParamsResponse {
    const message = Object.create(baseWipeParamsResponse) as WipeParamsResponse;
    if (object.deletedCount !== undefined && object.deletedCount !== null) {
      message.deletedCount = object.deletedCount;
    } else {
      message.deletedCount = 0;
    }
    return message;
  },
  toJSON(message: WipeParamsResponse): unknown {
    const obj: any = {};
    obj.deletedCount = message.deletedCount || 0;
    return obj;
  },
};

export const DeleteParams = {
  encode(message: DeleteParams, writer: Writer = Writer.create()): Writer {
    if (message.fileId !== undefined && message.fileId !== undefined) {
      Int64Value.encode({ value: message.fileId! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.filename !== undefined && message.filename !== undefined) {
      Filename.encode(message.filename, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).bool(message.isPermanent);
    return writer;
  },
  decode(reader: Reader, length?: number): DeleteParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeleteParams) as DeleteParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileId = Int64Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.filename = Filename.decode(reader, reader.uint32());
          break;
        case 3:
          message.isPermanent = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeleteParams {
    const message = Object.create(baseDeleteParams) as DeleteParams;
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = Number(object.fileId);
    } else {
      message.fileId = undefined;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromJSON(object.filename);
    } else {
      message.filename = undefined;
    }
    if (object.isPermanent !== undefined && object.isPermanent !== null) {
      message.isPermanent = Boolean(object.isPermanent);
    } else {
      message.isPermanent = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeleteParams>): DeleteParams {
    const message = Object.create(baseDeleteParams) as DeleteParams;
    if (object.fileId !== undefined && object.fileId !== null) {
      message.fileId = object.fileId;
    } else {
      message.fileId = undefined;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = Filename.fromPartial(object.filename);
    } else {
      message.filename = undefined;
    }
    if (object.isPermanent !== undefined && object.isPermanent !== null) {
      message.isPermanent = object.isPermanent;
    } else {
      message.isPermanent = false;
    }
    return message;
  },
  toJSON(message: DeleteParams): unknown {
    const obj: any = {};
    obj.fileId = message.fileId || undefined;
    obj.filename = message.filename ? Filename.toJSON(message.filename) : undefined;
    obj.isPermanent = message.isPermanent || false;
    return obj;
  },
};

export const DeleteResponse = {
  encode(message: DeleteResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): DeleteResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeleteResponse) as DeleteResponse;
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
  fromJSON(object: any): DeleteResponse {
    const message = Object.create(baseDeleteResponse) as DeleteResponse;
    return message;
  },
  fromPartial(object: DeepPartial<DeleteResponse>): DeleteResponse {
    const message = Object.create(baseDeleteResponse) as DeleteResponse;
    return message;
  },
  toJSON(message: DeleteResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Filename = {
  encode(message: Filename, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.bucketId !== undefined && message.bucketId !== undefined) {
      Int64Value.encode({ value: message.bucketId! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.bucketName !== undefined && message.bucketName !== undefined) {
      StringValue.encode({ value: message.bucketName! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): Filename {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFilename) as Filename;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.bucketId = Int64Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.bucketName = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Filename {
    const message = Object.create(baseFilename) as Filename;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.bucketId !== undefined && object.bucketId !== null) {
      message.bucketId = Number(object.bucketId);
    } else {
      message.bucketId = undefined;
    }
    if (object.bucketName !== undefined && object.bucketName !== null) {
      message.bucketName = String(object.bucketName);
    } else {
      message.bucketName = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Filename>): Filename {
    const message = Object.create(baseFilename) as Filename;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.bucketId !== undefined && object.bucketId !== null) {
      message.bucketId = object.bucketId;
    } else {
      message.bucketId = undefined;
    }
    if (object.bucketName !== undefined && object.bucketName !== null) {
      message.bucketName = object.bucketName;
    } else {
      message.bucketName = undefined;
    }
    return message;
  },
  toJSON(message: Filename): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.bucketId = message.bucketId || undefined;
    obj.bucketName = message.bucketName || undefined;
    return obj;
  },
};

export const File = {
  encode(message: File, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.filename);
    writer.uint32(26).string(message.createdAt);
    writer.uint32(34).string(message.updatedAt);
    writer.uint32(42).string(message.mimeType);
    writer.uint32(48).int64(message.fileSize);
    writer.uint32(56).int64(message.userId);
    writer.uint32(64).bool(message.isDraft);
    writer.uint32(72).int64(message.spacesId);
    writer.uint32(82).string(message.fileUrl);
    return writer;
  },
  decode(reader: Reader, length?: number): File {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFile) as File;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.filename = reader.string();
          break;
        case 3:
          message.createdAt = reader.string();
          break;
        case 4:
          message.updatedAt = reader.string();
          break;
        case 5:
          message.mimeType = reader.string();
          break;
        case 6:
          message.fileSize = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.isDraft = reader.bool();
          break;
        case 9:
          message.spacesId = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.fileUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): File {
    const message = Object.create(baseFile) as File;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = String(object.filename);
    } else {
      message.filename = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = "";
    }
    if (object.mimeType !== undefined && object.mimeType !== null) {
      message.mimeType = String(object.mimeType);
    } else {
      message.mimeType = "";
    }
    if (object.fileSize !== undefined && object.fileSize !== null) {
      message.fileSize = Number(object.fileSize);
    } else {
      message.fileSize = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.isDraft !== undefined && object.isDraft !== null) {
      message.isDraft = Boolean(object.isDraft);
    } else {
      message.isDraft = false;
    }
    if (object.spacesId !== undefined && object.spacesId !== null) {
      message.spacesId = Number(object.spacesId);
    } else {
      message.spacesId = 0;
    }
    if (object.fileUrl !== undefined && object.fileUrl !== null) {
      message.fileUrl = String(object.fileUrl);
    } else {
      message.fileUrl = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<File>): File {
    const message = Object.create(baseFile) as File;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.filename !== undefined && object.filename !== null) {
      message.filename = object.filename;
    } else {
      message.filename = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = "";
    }
    if (object.mimeType !== undefined && object.mimeType !== null) {
      message.mimeType = object.mimeType;
    } else {
      message.mimeType = "";
    }
    if (object.fileSize !== undefined && object.fileSize !== null) {
      message.fileSize = object.fileSize;
    } else {
      message.fileSize = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.isDraft !== undefined && object.isDraft !== null) {
      message.isDraft = object.isDraft;
    } else {
      message.isDraft = false;
    }
    if (object.spacesId !== undefined && object.spacesId !== null) {
      message.spacesId = object.spacesId;
    } else {
      message.spacesId = 0;
    }
    if (object.fileUrl !== undefined && object.fileUrl !== null) {
      message.fileUrl = object.fileUrl;
    } else {
      message.fileUrl = "";
    }
    return message;
  },
  toJSON(message: File): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.filename = message.filename || "";
    obj.createdAt = message.createdAt || "";
    obj.updatedAt = message.updatedAt || "";
    obj.mimeType = message.mimeType || "";
    obj.fileSize = message.fileSize || 0;
    obj.userId = message.userId || 0;
    obj.isDraft = message.isDraft || false;
    obj.spacesId = message.spacesId || 0;
    obj.fileUrl = message.fileUrl || "";
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