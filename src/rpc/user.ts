import { Empty } from './google/protobuf/empty';
import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';
import { StringValue } from './google/protobuf/wrappers';


export interface VerifySignInParams {
  username: string;
  password: string;
}

export interface CreateUserParams {
  username: string;
  password: string;
  email: string;
}

export interface GetUserParams {
}

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
}

export interface ForgotPasswordParams {
  username: string | undefined;
  email: string | undefined;
  language: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface ResetPasswordParams {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
}

export interface VerifyPasswordParams {
  token: string;
}

export interface VerifyPasswordResponse {
}

const baseVerifySignInParams: object = {
  username: "",
  password: "",
};

const baseCreateUserParams: object = {
  username: "",
  password: "",
  email: "",
};

const baseGetUserParams: object = {
};

const baseUpdatePasswordParams: object = {
  currentPassword: "",
  newPassword: "",
};

const baseUpdatePasswordResponse: object = {
};

const baseForgotPasswordParams: object = {
  username: undefined,
  email: undefined,
  language: "",
};

const baseUser: object = {
  id: 0,
  username: "",
  email: "",
  roles: "",
};

const baseResetPasswordParams: object = {
  token: "",
  password: "",
};

const baseResetPasswordResponse: object = {
};

const baseVerifyPasswordParams: object = {
  token: "",
};

const baseVerifyPasswordResponse: object = {
};

export interface UserService<Context extends DataLoaders> {

  CreateUser(ctx: Context, request: CreateUserParams): Promise<User>;

  UpdatePassword(ctx: Context, request: UpdatePasswordParams): Promise<UpdatePasswordResponse>;

  ForgotPassword(ctx: Context, request: ForgotPasswordParams): Promise<Empty>;

  VerifyResetPassword(ctx: Context, request: VerifyPasswordParams): Promise<VerifyPasswordResponse>;

  ResetPassword(ctx: Context, request: ResetPasswordParams): Promise<ResetPasswordResponse>;

  GetUser(ctx: Context, request: GetUserParams): Promise<User>;

  VerifySignIn(ctx: Context, request: VerifySignInParams): Promise<User>;

}

export class UserServiceClientImpl<Context extends DataLoaders> implements UserService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateUser(ctx: Context, request: CreateUserParams): Promise<User> {
    const data = CreateUserParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "CreateUser", data);
    return promise.then(data => User.decode(new Reader(data)));
  }

  UpdatePassword(ctx: Context, request: UpdatePasswordParams): Promise<UpdatePasswordResponse> {
    const data = UpdatePasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "UpdatePassword", data);
    return promise.then(data => UpdatePasswordResponse.decode(new Reader(data)));
  }

  ForgotPassword(ctx: Context, request: ForgotPasswordParams): Promise<Empty> {
    const data = ForgotPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "ForgotPassword", data);
    return promise.then(data => Empty.decode(new Reader(data)));
  }

  VerifyResetPassword(ctx: Context, request: VerifyPasswordParams): Promise<VerifyPasswordResponse> {
    const data = VerifyPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "VerifyResetPassword", data);
    return promise.then(data => VerifyPasswordResponse.decode(new Reader(data)));
  }

  ResetPassword(ctx: Context, request: ResetPasswordParams): Promise<ResetPasswordResponse> {
    const data = ResetPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "ResetPassword", data);
    return promise.then(data => ResetPasswordResponse.decode(new Reader(data)));
  }

  GetUser(ctx: Context, request: GetUserParams): Promise<User> {
    const dl = ctx.getDataLoader("pepeunlimited.users.UserService.GetUser", () => {
      return new DataLoader<GetUserParams, User>((requests) => {
        const responses = requests.map(async request => {
          const data = GetUserParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.users.UserService", "GetUser", data);
          return User.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  VerifySignIn(ctx: Context, request: VerifySignInParams): Promise<User> {
    const data = VerifySignInParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "VerifySignIn", data);
    return promise.then(data => User.decode(new Reader(data)));
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

export const VerifySignInParams = {
  encode(message: VerifySignInParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.username);
    writer.uint32(18).string(message.password);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifySignInParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifySignInParams) as VerifySignInParams;
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
  fromJSON(object: any): VerifySignInParams {
    const message = Object.create(baseVerifySignInParams) as VerifySignInParams;
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.password) {
      message.password = String(object.password);
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifySignInParams>): VerifySignInParams {
    const message = Object.create(baseVerifySignInParams) as VerifySignInParams;
    if (object.username) {
      message.username = object.username;
    }
    if (object.password) {
      message.password = object.password;
    }
    return message;
  },
  toJSON(message: VerifySignInParams): unknown {
    const obj: any = {};
    obj.username = message.username || "";
    obj.password = message.password || "";
    return obj;
  },
};

export const CreateUserParams = {
  encode(message: CreateUserParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.username);
    writer.uint32(18).string(message.password);
    writer.uint32(26).string(message.email);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateUserParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateUserParams) as CreateUserParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateUserParams {
    const message = Object.create(baseCreateUserParams) as CreateUserParams;
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.password) {
      message.password = String(object.password);
    }
    if (object.email) {
      message.email = String(object.email);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateUserParams>): CreateUserParams {
    const message = Object.create(baseCreateUserParams) as CreateUserParams;
    if (object.username) {
      message.username = object.username;
    }
    if (object.password) {
      message.password = object.password;
    }
    if (object.email) {
      message.email = object.email;
    }
    return message;
  },
  toJSON(message: CreateUserParams): unknown {
    const obj: any = {};
    obj.username = message.username || "";
    obj.password = message.password || "";
    obj.email = message.email || "";
    return obj;
  },
};

export const GetUserParams = {
  encode(message: GetUserParams, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): GetUserParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetUserParams) as GetUserParams;
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
  fromJSON(object: any): GetUserParams {
    const message = Object.create(baseGetUserParams) as GetUserParams;
    return message;
  },
  fromPartial(object: DeepPartial<GetUserParams>): GetUserParams {
    const message = Object.create(baseGetUserParams) as GetUserParams;
    return message;
  },
  toJSON(message: GetUserParams): unknown {
    const obj: any = {};
    return obj;
  },
};

export const UpdatePasswordParams = {
  encode(message: UpdatePasswordParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.currentPassword);
    writer.uint32(18).string(message.newPassword);
    return writer;
  },
  decode(reader: Reader, length?: number): UpdatePasswordParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpdatePasswordParams) as UpdatePasswordParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentPassword = reader.string();
          break;
        case 2:
          message.newPassword = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdatePasswordParams {
    const message = Object.create(baseUpdatePasswordParams) as UpdatePasswordParams;
    if (object.currentPassword) {
      message.currentPassword = String(object.currentPassword);
    }
    if (object.newPassword) {
      message.newPassword = String(object.newPassword);
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdatePasswordParams>): UpdatePasswordParams {
    const message = Object.create(baseUpdatePasswordParams) as UpdatePasswordParams;
    if (object.currentPassword) {
      message.currentPassword = object.currentPassword;
    }
    if (object.newPassword) {
      message.newPassword = object.newPassword;
    }
    return message;
  },
  toJSON(message: UpdatePasswordParams): unknown {
    const obj: any = {};
    obj.currentPassword = message.currentPassword || "";
    obj.newPassword = message.newPassword || "";
    return obj;
  },
};

export const UpdatePasswordResponse = {
  encode(message: UpdatePasswordResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): UpdatePasswordResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpdatePasswordResponse) as UpdatePasswordResponse;
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
  fromJSON(object: any): UpdatePasswordResponse {
    const message = Object.create(baseUpdatePasswordResponse) as UpdatePasswordResponse;
    return message;
  },
  fromPartial(object: DeepPartial<UpdatePasswordResponse>): UpdatePasswordResponse {
    const message = Object.create(baseUpdatePasswordResponse) as UpdatePasswordResponse;
    return message;
  },
  toJSON(message: UpdatePasswordResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ForgotPasswordParams = {
  encode(message: ForgotPasswordParams, writer: Writer = Writer.create()): Writer {
    if (message.username !== undefined && message.username !== undefined) {
      StringValue.encode({ value: message.username! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.email !== undefined && message.email !== undefined) {
      StringValue.encode({ value: message.email! }, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).string(message.language);
    return writer;
  },
  decode(reader: Reader, length?: number): ForgotPasswordParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseForgotPasswordParams) as ForgotPasswordParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.email = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.language = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ForgotPasswordParams {
    const message = Object.create(baseForgotPasswordParams) as ForgotPasswordParams;
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.email) {
      message.email = String(object.email);
    }
    if (object.language) {
      message.language = String(object.language);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ForgotPasswordParams>): ForgotPasswordParams {
    const message = Object.create(baseForgotPasswordParams) as ForgotPasswordParams;
    if (object.username) {
      message.username = object.username;
    }
    if (object.email) {
      message.email = object.email;
    }
    if (object.language) {
      message.language = object.language;
    }
    return message;
  },
  toJSON(message: ForgotPasswordParams): unknown {
    const obj: any = {};
    obj.username = message.username || undefined;
    obj.email = message.email || undefined;
    obj.language = message.language || "";
    return obj;
  },
};

export const User = {
  encode(message: User, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.username);
    writer.uint32(26).string(message.email);
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): User {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUser) as User;
    message.roles = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.email = reader.string();
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
  fromJSON(object: any): User {
    const message = Object.create(baseUser) as User;
    message.roles = [];
    if (object.id) {
      message.id = Number(object.id);
    }
    if (object.username) {
      message.username = String(object.username);
    }
    if (object.email) {
      message.email = String(object.email);
    }
    if (object.roles) {
      for (const e of object.roles) {
        message.roles.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = Object.create(baseUser) as User;
    message.roles = [];
    if (object.id) {
      message.id = object.id;
    }
    if (object.username) {
      message.username = object.username;
    }
    if (object.email) {
      message.email = object.email;
    }
    if (object.roles) {
      for (const e of object.roles) {
        message.roles.push(e);
      }
    }
    return message;
  },
  toJSON(message: User): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.username = message.username || "";
    obj.email = message.email || "";
    if (message.roles) {
      obj.roles = message.roles.map(e => e || "");
    } else {
      obj.roles = [];
    }
    return obj;
  },
};

export const ResetPasswordParams = {
  encode(message: ResetPasswordParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    writer.uint32(18).string(message.password);
    return writer;
  },
  decode(reader: Reader, length?: number): ResetPasswordParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseResetPasswordParams) as ResetPasswordParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
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
  fromJSON(object: any): ResetPasswordParams {
    const message = Object.create(baseResetPasswordParams) as ResetPasswordParams;
    if (object.token) {
      message.token = String(object.token);
    }
    if (object.password) {
      message.password = String(object.password);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ResetPasswordParams>): ResetPasswordParams {
    const message = Object.create(baseResetPasswordParams) as ResetPasswordParams;
    if (object.token) {
      message.token = object.token;
    }
    if (object.password) {
      message.password = object.password;
    }
    return message;
  },
  toJSON(message: ResetPasswordParams): unknown {
    const obj: any = {};
    obj.token = message.token || "";
    obj.password = message.password || "";
    return obj;
  },
};

export const ResetPasswordResponse = {
  encode(message: ResetPasswordResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): ResetPasswordResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseResetPasswordResponse) as ResetPasswordResponse;
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
  fromJSON(object: any): ResetPasswordResponse {
    const message = Object.create(baseResetPasswordResponse) as ResetPasswordResponse;
    return message;
  },
  fromPartial(object: DeepPartial<ResetPasswordResponse>): ResetPasswordResponse {
    const message = Object.create(baseResetPasswordResponse) as ResetPasswordResponse;
    return message;
  },
  toJSON(message: ResetPasswordResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const VerifyPasswordParams = {
  encode(message: VerifyPasswordParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyPasswordParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyPasswordParams) as VerifyPasswordParams;
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
  fromJSON(object: any): VerifyPasswordParams {
    const message = Object.create(baseVerifyPasswordParams) as VerifyPasswordParams;
    if (object.token) {
      message.token = String(object.token);
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyPasswordParams>): VerifyPasswordParams {
    const message = Object.create(baseVerifyPasswordParams) as VerifyPasswordParams;
    if (object.token) {
      message.token = object.token;
    }
    return message;
  },
  toJSON(message: VerifyPasswordParams): unknown {
    const obj: any = {};
    obj.token = message.token || "";
    return obj;
  },
};

export const VerifyPasswordResponse = {
  encode(message: VerifyPasswordResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyPasswordResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyPasswordResponse) as VerifyPasswordResponse;
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
  fromJSON(object: any): VerifyPasswordResponse {
    const message = Object.create(baseVerifyPasswordResponse) as VerifyPasswordResponse;
    return message;
  },
  fromPartial(object: DeepPartial<VerifyPasswordResponse>): VerifyPasswordResponse {
    const message = Object.create(baseVerifyPasswordResponse) as VerifyPasswordResponse;
    return message;
  },
  toJSON(message: VerifyPasswordResponse): unknown {
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