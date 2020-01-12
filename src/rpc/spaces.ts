import DataLoader from 'dataloader';
import { Reader, Writer } from 'protobufjs/minimal';
import hash from 'object-hash';
import * as Long from 'long';
import { Int64Value, StringValue } from './google/protobuf/wrappers';


export interface CreateSpacesParams {
  name: string;
  endpoint: string;
}

export interface CreateSpacesResponse {
  endpoint: string;
  cdnEndpoint: string;
  name: string;
  spacesId: number;
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

export interface GetSpacesParams {
  pageSize: number;
  pageToken: number;
}

export interface GetSpacesResponse {
  spaces: Spaces[];
}

export interface Spaces {
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

const baseCreateSpacesParams: object = {
  name: "",
  endpoint: "",
};

const baseCreateSpacesResponse: object = {
  endpoint: "",
  cdnEndpoint: "",
  name: "",
  spacesId: 0,
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

const baseGetSpacesParams: object = {
  pageSize: 0,
  pageToken: 0,
};

const baseGetSpacesResponse: object = {
  spaces: undefined,
};

const baseSpaces: object = {
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

export interface SpacesService<Context extends DataLoaders> {

  GetFile(ctx: Context, request: GetFileParams): Promise<File>;

  GetFiles(ctx: Context, request: GetFilesParams): Promise<GetFilesResponse>;

  GetSpaces(ctx: Context, request: GetSpacesParams): Promise<GetSpacesResponse>;

  Cut(ctx: Context, request: CutParams): Promise<CutResponse>;

  Delete(ctx: Context, request: DeleteParams): Promise<DeleteResponse>;

  Wipe(ctx: Context, request: WipeParams): Promise<WipeParamsResponse>;

  CreateSpaces(ctx: Context, request: CreateSpacesParams): Promise<CreateSpacesResponse>;

}

export class SpacesServiceClientImpl<Context extends DataLoaders> implements SpacesService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  GetFile(ctx: Context, request: GetFileParams): Promise<File> {
    const dl = ctx.getDataLoader("pepeunlimited.files.SpacesService.GetFile", () => {
      return new DataLoader<GetFileParams, File>((requests) => {
        const responses = requests.map(async request => {
          const data = GetFileParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "GetFile", data);
          return File.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetFiles(ctx: Context, request: GetFilesParams): Promise<GetFilesResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.files.SpacesService.GetFiles", () => {
      return new DataLoader<GetFilesParams, GetFilesResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetFilesParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "GetFiles", data);
          return GetFilesResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetSpaces(ctx: Context, request: GetSpacesParams): Promise<GetSpacesResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.files.SpacesService.GetSpaces", () => {
      return new DataLoader<GetSpacesParams, GetSpacesResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetSpacesParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "GetSpaces", data);
          return GetSpacesResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  Cut(ctx: Context, request: CutParams): Promise<CutResponse> {
    const data = CutParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "Cut", data);
    return promise.then(data => CutResponse.decode(new Reader(data)));
  }

  Delete(ctx: Context, request: DeleteParams): Promise<DeleteResponse> {
    const data = DeleteParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "Delete", data);
    return promise.then(data => DeleteResponse.decode(new Reader(data)));
  }

  Wipe(ctx: Context, request: WipeParams): Promise<WipeParamsResponse> {
    const data = WipeParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "Wipe", data);
    return promise.then(data => WipeParamsResponse.decode(new Reader(data)));
  }

  CreateSpaces(ctx: Context, request: CreateSpacesParams): Promise<CreateSpacesResponse> {
    const data = CreateSpacesParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.files.SpacesService", "CreateSpaces", data);
    return promise.then(data => CreateSpacesResponse.decode(new Reader(data)));
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

export const CreateSpacesParams = {
  encode(message: CreateSpacesParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.endpoint);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateSpacesParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateSpacesParams) as CreateSpacesParams;
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
  fromJSON(object: any): CreateSpacesParams {
    const message = Object.create(baseCreateSpacesParams) as CreateSpacesParams;
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.endpoint) {
      message.endpoint = String(object.endpoint);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateSpacesParams>): CreateSpacesParams {
    const message = Object.create(baseCreateSpacesParams) as CreateSpacesParams;
    if (object.name) {
      message.name = object.name;
    }
    if (object.endpoint) {
      message.endpoint = object.endpoint;
    }
    return message;
  },
  toJSON(message: CreateSpacesParams): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.endpoint = message.endpoint || "";
    return obj;
  },
};

export const CreateSpacesResponse = {
  encode(message: CreateSpacesResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.endpoint);
    writer.uint32(18).string(message.cdnEndpoint);
    writer.uint32(26).string(message.name);
    writer.uint32(32).int64(message.spacesId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateSpacesResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateSpacesResponse) as CreateSpacesResponse;
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
          message.spacesId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateSpacesResponse {
    const message = Object.create(baseCreateSpacesResponse) as CreateSpacesResponse;
    if (object.endpoint) {
      message.endpoint = String(object.endpoint);
    }
    if (object.cdnEndpoint) {
      message.cdnEndpoint = String(object.cdnEndpoint);
    }
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.spacesId) {
      message.spacesId = Number(object.spacesId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateSpacesResponse>): CreateSpacesResponse {
    const message = Object.create(baseCreateSpacesResponse) as CreateSpacesResponse;
    if (object.endpoint) {
      message.endpoint = object.endpoint;
    }
    if (object.cdnEndpoint) {
      message.cdnEndpoint = object.cdnEndpoint;
    }
    if (object.name) {
      message.name = object.name;
    }
    if (object.spacesId) {
      message.spacesId = object.spacesId;
    }
    return message;
  },
  toJSON(message: CreateSpacesResponse): unknown {
    const obj: any = {};
    obj.endpoint = message.endpoint || "";
    obj.cdnEndpoint = message.cdnEndpoint || "";
    obj.name = message.name || "";
    obj.spacesId = message.spacesId || 0;
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
    if (object.fileId) {
      message.fileId = Number(object.fileId);
    }
    if (object.filename) {
      message.filename = Filename.fromJSON(object.filename);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetFileParams>): GetFileParams {
    const message = Object.create(baseGetFileParams) as GetFileParams;
    if (object.fileId) {
      message.fileId = object.fileId;
    }
    if (object.filename) {
      message.filename = Filename.fromPartial(object.filename);
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
    if (object.pageSize) {
      message.pageSize = Number(object.pageSize);
    }
    if (object.pageToken) {
      message.pageToken = Number(object.pageToken);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetFilesParams>): GetFilesParams {
    const message = Object.create(baseGetFilesParams) as GetFilesParams;
    if (object.pageSize) {
      message.pageSize = object.pageSize;
    }
    if (object.pageToken) {
      message.pageToken = object.pageToken;
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
    if (object.files) {
      for (const e of object.files) {
        message.files.push(File.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetFilesResponse>): GetFilesResponse {
    const message = Object.create(baseGetFilesResponse) as GetFilesResponse;
    message.files = [];
    if (object.files) {
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

export const GetSpacesParams = {
  encode(message: GetSpacesParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pageSize);
    writer.uint32(16).int64(message.pageToken);
    return writer;
  },
  decode(reader: Reader, length?: number): GetSpacesParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetSpacesParams) as GetSpacesParams;
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
  fromJSON(object: any): GetSpacesParams {
    const message = Object.create(baseGetSpacesParams) as GetSpacesParams;
    if (object.pageSize) {
      message.pageSize = Number(object.pageSize);
    }
    if (object.pageToken) {
      message.pageToken = Number(object.pageToken);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetSpacesParams>): GetSpacesParams {
    const message = Object.create(baseGetSpacesParams) as GetSpacesParams;
    if (object.pageSize) {
      message.pageSize = object.pageSize;
    }
    if (object.pageToken) {
      message.pageToken = object.pageToken;
    }
    return message;
  },
  toJSON(message: GetSpacesParams): unknown {
    const obj: any = {};
    obj.pageSize = message.pageSize || 0;
    obj.pageToken = message.pageToken || 0;
    return obj;
  },
};

export const GetSpacesResponse = {
  encode(message: GetSpacesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.spaces) {
      Spaces.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetSpacesResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetSpacesResponse) as GetSpacesResponse;
    message.spaces = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spaces.push(Spaces.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetSpacesResponse {
    const message = Object.create(baseGetSpacesResponse) as GetSpacesResponse;
    message.spaces = [];
    if (object.spaces) {
      for (const e of object.spaces) {
        message.spaces.push(Spaces.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetSpacesResponse>): GetSpacesResponse {
    const message = Object.create(baseGetSpacesResponse) as GetSpacesResponse;
    message.spaces = [];
    if (object.spaces) {
      for (const e of object.spaces) {
        message.spaces.push(Spaces.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetSpacesResponse): unknown {
    const obj: any = {};
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Spaces.toJSON(e) : undefined);
    } else {
      obj.spaces = [];
    }
    return obj;
  },
};

export const Spaces = {
  encode(message: Spaces, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.name);
    return writer;
  },
  decode(reader: Reader, length?: number): Spaces {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSpaces) as Spaces;
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
  fromJSON(object: any): Spaces {
    const message = Object.create(baseSpaces) as Spaces;
    if (object.id) {
      message.id = Number(object.id);
    }
    if (object.name) {
      message.name = String(object.name);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Spaces>): Spaces {
    const message = Object.create(baseSpaces) as Spaces;
    if (object.id) {
      message.id = object.id;
    }
    if (object.name) {
      message.name = object.name;
    }
    return message;
  },
  toJSON(message: Spaces): unknown {
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
    if (object.toSpacesName) {
      message.toSpacesName = String(object.toSpacesName);
    }
    if (object.fileId) {
      message.fileId = Number(object.fileId);
    }
    if (object.filename) {
      message.filename = Filename.fromJSON(object.filename);
    }
    if (object.toSpacesId) {
      message.toSpacesId = Number(object.toSpacesId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CutParams>): CutParams {
    const message = Object.create(baseCutParams) as CutParams;
    if (object.toSpacesName) {
      message.toSpacesName = object.toSpacesName;
    }
    if (object.fileId) {
      message.fileId = object.fileId;
    }
    if (object.filename) {
      message.filename = Filename.fromPartial(object.filename);
    }
    if (object.toSpacesId) {
      message.toSpacesId = object.toSpacesId;
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
    if (object.newBucketName) {
      message.newBucketName = String(object.newBucketName);
    }
    if (object.newBucketId) {
      message.newBucketId = Number(object.newBucketId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CutResponse>): CutResponse {
    const message = Object.create(baseCutResponse) as CutResponse;
    if (object.newBucketName) {
      message.newBucketName = object.newBucketName;
    }
    if (object.newBucketId) {
      message.newBucketId = object.newBucketId;
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
    if (object.bucketName) {
      message.bucketName = String(object.bucketName);
    }
    if (object.isDeleteSpaces) {
      message.isDeleteSpaces = Boolean(object.isDeleteSpaces);
    }
    return message;
  },
  fromPartial(object: DeepPartial<WipeParams>): WipeParams {
    const message = Object.create(baseWipeParams) as WipeParams;
    if (object.bucketName) {
      message.bucketName = object.bucketName;
    }
    if (object.isDeleteSpaces) {
      message.isDeleteSpaces = object.isDeleteSpaces;
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
    if (object.deletedCount) {
      message.deletedCount = Number(object.deletedCount);
    }
    return message;
  },
  fromPartial(object: DeepPartial<WipeParamsResponse>): WipeParamsResponse {
    const message = Object.create(baseWipeParamsResponse) as WipeParamsResponse;
    if (object.deletedCount) {
      message.deletedCount = object.deletedCount;
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
    if (object.fileId) {
      message.fileId = Number(object.fileId);
    }
    if (object.filename) {
      message.filename = Filename.fromJSON(object.filename);
    }
    if (object.isPermanent) {
      message.isPermanent = Boolean(object.isPermanent);
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeleteParams>): DeleteParams {
    const message = Object.create(baseDeleteParams) as DeleteParams;
    if (object.fileId) {
      message.fileId = object.fileId;
    }
    if (object.filename) {
      message.filename = Filename.fromPartial(object.filename);
    }
    if (object.isPermanent) {
      message.isPermanent = object.isPermanent;
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
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.bucketId) {
      message.bucketId = Number(object.bucketId);
    }
    if (object.bucketName) {
      message.bucketName = String(object.bucketName);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Filename>): Filename {
    const message = Object.create(baseFilename) as Filename;
    if (object.name) {
      message.name = object.name;
    }
    if (object.bucketId) {
      message.bucketId = object.bucketId;
    }
    if (object.bucketName) {
      message.bucketName = object.bucketName;
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
    if (object.id) {
      message.id = Number(object.id);
    }
    if (object.filename) {
      message.filename = String(object.filename);
    }
    if (object.createdAt) {
      message.createdAt = String(object.createdAt);
    }
    if (object.updatedAt) {
      message.updatedAt = String(object.updatedAt);
    }
    if (object.mimeType) {
      message.mimeType = String(object.mimeType);
    }
    if (object.fileSize) {
      message.fileSize = Number(object.fileSize);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.isDraft) {
      message.isDraft = Boolean(object.isDraft);
    }
    if (object.spacesId) {
      message.spacesId = Number(object.spacesId);
    }
    if (object.fileUrl) {
      message.fileUrl = String(object.fileUrl);
    }
    return message;
  },
  fromPartial(object: DeepPartial<File>): File {
    const message = Object.create(baseFile) as File;
    if (object.id) {
      message.id = object.id;
    }
    if (object.filename) {
      message.filename = object.filename;
    }
    if (object.createdAt) {
      message.createdAt = object.createdAt;
    }
    if (object.updatedAt) {
      message.updatedAt = object.updatedAt;
    }
    if (object.mimeType) {
      message.mimeType = object.mimeType;
    }
    if (object.fileSize) {
      message.fileSize = object.fileSize;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.isDraft) {
      message.isDraft = object.isDraft;
    }
    if (object.spacesId) {
      message.spacesId = object.spacesId;
    }
    if (object.fileUrl) {
      message.fileUrl = object.fileUrl;
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