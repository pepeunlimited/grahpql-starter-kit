import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


export interface SignInParams {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  refreshToken: string;
}

export interface RefreshParams {
  refreshToken: string;
}

export interface RefreshResponse {
  token: string;
}

export interface VerifyParams {
  token: string;
}

export interface VerifyResponse {
  username: string;
  email: string;
  userId: number;
  roles: string[];
}

const baseSignInParams: object = {
  username: "",
  password: "",
};

const baseSignInResponse: object = {
  token: "",
  refreshToken: "",
};

const baseRefreshParams: object = {
  refreshToken: "",
};

const baseRefreshResponse: object = {
  token: "",
};

const baseVerifyParams: object = {
  token: "",
};

const baseVerifyResponse: object = {
  username: "",
  email: "",
  userId: 0,
  roles: "",
};

export interface AuthorizationService<Context extends DataLoaders> {

  SignIn(ctx: Context, request: SignInParams): Promise<SignInResponse>;

  Refresh(ctx: Context, request: RefreshParams): Promise<RefreshResponse>;

  Verify(ctx: Context, request: VerifyParams): Promise<VerifyResponse>;

}

export class AuthorizationServiceClientImpl<Context extends DataLoaders> implements AuthorizationService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  SignIn(ctx: Context, request: SignInParams): Promise<SignInResponse> {
    const data = SignInParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authorization.AuthorizationService", "SignIn", data);
    return promise.then(data => SignInResponse.decode(new Reader(data)));
  }

  Refresh(ctx: Context, request: RefreshParams): Promise<RefreshResponse> {
    const data = RefreshParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authorization.AuthorizationService", "Refresh", data);
    return promise.then(data => RefreshResponse.decode(new Reader(data)));
  }

  Verify(ctx: Context, request: VerifyParams): Promise<VerifyResponse> {
    const data = VerifyParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authorization.AuthorizationService", "Verify", data);
    return promise.then(data => VerifyResponse.decode(new Reader(data)));
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

export const SignInParams = {
  encode(message: SignInParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.username);
    writer.uint32(18).string(message.password);
    return writer;
  },
  decode(reader: Reader, length?: number): SignInParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSignInParams) as SignInParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignInParams {
    const message = Object.create(baseSignInParams) as SignInParams;
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.password) {
      message.password = String(object.password);
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignInParams>): SignInParams {
    const message = Object.create(baseSignInParams) as SignInParams;
    if (object.username) {
      message.username = object.username;
    }
    if (object.password) {
      message.password = object.password;
    }
    return message;
  },
  toJSON(message: SignInParams): unknown {
    const obj: any = {};
    obj.username = message.username || "";
    obj.password = message.password || "";
    return obj;
  },
};

export const SignInResponse = {
  encode(message: SignInResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    writer.uint32(18).string(message.refreshToken);
    return writer;
  },
  decode(reader: Reader, length?: number): SignInResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSignInResponse) as SignInResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignInResponse {
    const message = Object.create(baseSignInResponse) as SignInResponse;
    if (object.token) {
      message.token = String(object.token);
    }
    if (object.refreshToken) {
      message.refreshToken = String(object.refreshToken);
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignInResponse>): SignInResponse {
    const message = Object.create(baseSignInResponse) as SignInResponse;
    if (object.token) {
      message.token = object.token;
    }
    if (object.refreshToken) {
      message.refreshToken = object.refreshToken;
    }
    return message;
  },
  toJSON(message: SignInResponse): unknown {
    const obj: any = {};
    obj.token = message.token || "";
    obj.refreshToken = message.refreshToken || "";
    return obj;
  },
};

export const RefreshParams = {
  encode(message: RefreshParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.refreshToken);
    return writer;
  },
  decode(reader: Reader, length?: number): RefreshParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseRefreshParams) as RefreshParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RefreshParams {
    const message = Object.create(baseRefreshParams) as RefreshParams;
    if (object.refreshToken) {
      message.refreshToken = String(object.refreshToken);
    }
    return message;
  },
  fromPartial(object: DeepPartial<RefreshParams>): RefreshParams {
    const message = Object.create(baseRefreshParams) as RefreshParams;
    if (object.refreshToken) {
      message.refreshToken = object.refreshToken;
    }
    return message;
  },
  toJSON(message: RefreshParams): unknown {
    const obj: any = {};
    obj.refreshToken = message.refreshToken || "";
    return obj;
  },
};

export const RefreshResponse = {
  encode(message: RefreshResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    return writer;
  },
  decode(reader: Reader, length?: number): RefreshResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseRefreshResponse) as RefreshResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RefreshResponse {
    const message = Object.create(baseRefreshResponse) as RefreshResponse;
    if (object.token) {
      message.token = String(object.token);
    }
    return message;
  },
  fromPartial(object: DeepPartial<RefreshResponse>): RefreshResponse {
    const message = Object.create(baseRefreshResponse) as RefreshResponse;
    if (object.token) {
      message.token = object.token;
    }
    return message;
  },
  toJSON(message: RefreshResponse): unknown {
    const obj: any = {};
    obj.token = message.token || "";
    return obj;
  },
};

export const VerifyParams = {
  encode(message: VerifyParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyParams) as VerifyParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VerifyParams {
    const message = Object.create(baseVerifyParams) as VerifyParams;
    if (object.token) {
      message.token = String(object.token);
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyParams>): VerifyParams {
    const message = Object.create(baseVerifyParams) as VerifyParams;
    if (object.token) {
      message.token = object.token;
    }
    return message;
  },
  toJSON(message: VerifyParams): unknown {
    const obj: any = {};
    obj.token = message.token || "";
    return obj;
  },
};

export const VerifyResponse = {
  encode(message: VerifyResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.username);
    writer.uint32(18).string(message.email);
    writer.uint32(24).int64(message.userId);
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyResponse) as VerifyResponse;
    message.roles = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.roles.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VerifyResponse {
    const message = Object.create(baseVerifyResponse) as VerifyResponse;
    message.roles = [];
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.email) {
      message.email = String(object.email);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.roles) {
      for (const e of object.roles) {
        message.roles.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyResponse>): VerifyResponse {
    const message = Object.create(baseVerifyResponse) as VerifyResponse;
    message.roles = [];
    if (object.username) {
      message.username = object.username;
    }
    if (object.email) {
      message.email = object.email;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.roles) {
      for (const e of object.roles) {
        message.roles.push(e);
      }
    }
    return message;
  },
  toJSON(message: VerifyResponse): unknown {
    const obj: any = {};
    obj.username = message.username || "";
    obj.email = message.email || "";
    obj.userId = message.userId || 0;
    if (message.roles) {
      obj.roles = message.roles.map(e => e || "");
    } else {
      obj.roles = [];
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