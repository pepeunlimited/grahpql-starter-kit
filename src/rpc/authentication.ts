import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


export interface SignInParams {
  username: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshAccessTokenParams {
  refreshToken: string;
}

export interface RefreshAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyAccessTokenParams {
  accessToken: string;
}

export interface VerifyAccessTokenResponse {
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
  accessToken: "",
  refreshToken: "",
};

const baseRefreshAccessTokenParams: object = {
  refreshToken: "",
};

const baseRefreshAccessTokenResponse: object = {
  accessToken: "",
  refreshToken: "",
};

const baseVerifyAccessTokenParams: object = {
  accessToken: "",
};

const baseVerifyAccessTokenResponse: object = {
  username: "",
  email: "",
  userId: 0,
  roles: "",
};

export interface AuthenticationService<Context extends DataLoaders> {

  SignIn(ctx: Context, request: SignInParams): Promise<SignInResponse>;

  RefreshAccessToken(ctx: Context, request: RefreshAccessTokenParams): Promise<RefreshAccessTokenResponse>;

  VerifyAccessToken(ctx: Context, request: VerifyAccessTokenParams): Promise<VerifyAccessTokenResponse>;

}

export class AuthenticationServiceClientImpl<Context extends DataLoaders> implements AuthenticationService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  SignIn(ctx: Context, request: SignInParams): Promise<SignInResponse> {
    const data = SignInParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authentication.AuthenticationService", "SignIn", data);
    return promise.then(data => SignInResponse.decode(new Reader(data)));
  }

  RefreshAccessToken(ctx: Context, request: RefreshAccessTokenParams): Promise<RefreshAccessTokenResponse> {
    const data = RefreshAccessTokenParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authentication.AuthenticationService", "RefreshAccessToken", data);
    return promise.then(data => RefreshAccessTokenResponse.decode(new Reader(data)));
  }

  VerifyAccessToken(ctx: Context, request: VerifyAccessTokenParams): Promise<VerifyAccessTokenResponse> {
    const data = VerifyAccessTokenParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.authentication.AuthenticationService", "VerifyAccessToken", data);
    return promise.then(data => VerifyAccessTokenResponse.decode(new Reader(data)));
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
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignInParams>): SignInParams {
    const message = Object.create(baseSignInParams) as SignInParams;
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
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
    writer.uint32(10).string(message.accessToken);
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
          message.accessToken = reader.string();
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
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = String(object.accessToken);
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = String(object.refreshToken);
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignInResponse>): SignInResponse {
    const message = Object.create(baseSignInResponse) as SignInResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = object.accessToken;
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = object.refreshToken;
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  toJSON(message: SignInResponse): unknown {
    const obj: any = {};
    obj.accessToken = message.accessToken || "";
    obj.refreshToken = message.refreshToken || "";
    return obj;
  },
};

export const RefreshAccessTokenParams = {
  encode(message: RefreshAccessTokenParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.refreshToken);
    return writer;
  },
  decode(reader: Reader, length?: number): RefreshAccessTokenParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseRefreshAccessTokenParams) as RefreshAccessTokenParams;
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
  fromJSON(object: any): RefreshAccessTokenParams {
    const message = Object.create(baseRefreshAccessTokenParams) as RefreshAccessTokenParams;
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = String(object.refreshToken);
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<RefreshAccessTokenParams>): RefreshAccessTokenParams {
    const message = Object.create(baseRefreshAccessTokenParams) as RefreshAccessTokenParams;
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = object.refreshToken;
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  toJSON(message: RefreshAccessTokenParams): unknown {
    const obj: any = {};
    obj.refreshToken = message.refreshToken || "";
    return obj;
  },
};

export const RefreshAccessTokenResponse = {
  encode(message: RefreshAccessTokenResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.accessToken);
    writer.uint32(18).string(message.refreshToken);
    return writer;
  },
  decode(reader: Reader, length?: number): RefreshAccessTokenResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseRefreshAccessTokenResponse) as RefreshAccessTokenResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessToken = reader.string();
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
  fromJSON(object: any): RefreshAccessTokenResponse {
    const message = Object.create(baseRefreshAccessTokenResponse) as RefreshAccessTokenResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = String(object.accessToken);
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = String(object.refreshToken);
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<RefreshAccessTokenResponse>): RefreshAccessTokenResponse {
    const message = Object.create(baseRefreshAccessTokenResponse) as RefreshAccessTokenResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = object.accessToken;
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = object.refreshToken;
    } else {
      message.refreshToken = "";
    }
    return message;
  },
  toJSON(message: RefreshAccessTokenResponse): unknown {
    const obj: any = {};
    obj.accessToken = message.accessToken || "";
    obj.refreshToken = message.refreshToken || "";
    return obj;
  },
};

export const VerifyAccessTokenParams = {
  encode(message: VerifyAccessTokenParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.accessToken);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyAccessTokenParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyAccessTokenParams) as VerifyAccessTokenParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VerifyAccessTokenParams {
    const message = Object.create(baseVerifyAccessTokenParams) as VerifyAccessTokenParams;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = String(object.accessToken);
    } else {
      message.accessToken = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyAccessTokenParams>): VerifyAccessTokenParams {
    const message = Object.create(baseVerifyAccessTokenParams) as VerifyAccessTokenParams;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = object.accessToken;
    } else {
      message.accessToken = "";
    }
    return message;
  },
  toJSON(message: VerifyAccessTokenParams): unknown {
    const obj: any = {};
    obj.accessToken = message.accessToken || "";
    return obj;
  },
};

export const VerifyAccessTokenResponse = {
  encode(message: VerifyAccessTokenResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.username);
    writer.uint32(18).string(message.email);
    writer.uint32(24).int64(message.userId);
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyAccessTokenResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyAccessTokenResponse) as VerifyAccessTokenResponse;
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
  fromJSON(object: any): VerifyAccessTokenResponse {
    const message = Object.create(baseVerifyAccessTokenResponse) as VerifyAccessTokenResponse;
    message.roles = [];
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyAccessTokenResponse>): VerifyAccessTokenResponse {
    const message = Object.create(baseVerifyAccessTokenResponse) as VerifyAccessTokenResponse;
    message.roles = [];
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(e);
      }
    }
    return message;
  },
  toJSON(message: VerifyAccessTokenResponse): unknown {
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