import { Empty } from './google/protobuf/empty';
import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { StringValue } from './google/protobuf/wrappers';


export interface VerifySignInParams {
  username: string;
  password: string;
}

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordParams {
  username: string | undefined;
  email: string | undefined;
  language: string;
}

export interface ResetPasswordParams {
  ticketToken: string;
  password: string;
}

export interface VerifyPasswordParams {
  ticketToken: string;
}

export interface VerifySignInResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const baseVerifySignInParams: object = {
  username: "",
  password: "",
};

const baseUpdatePasswordParams: object = {
  currentPassword: "",
  newPassword: "",
};

const baseForgotPasswordParams: object = {
  username: undefined,
  email: undefined,
  language: "",
};

const baseResetPasswordParams: object = {
  ticketToken: "",
  password: "",
};

const baseVerifyPasswordParams: object = {
  ticketToken: "",
};

const baseVerifySignInResponse: object = {
  id: 0,
  username: "",
  email: "",
  roles: "",
};

export interface CredentialsService<Context extends DataLoaders> {

  UpdatePassword(ctx: Context, request: UpdatePasswordParams): Promise<Empty>;

  ForgotPassword(ctx: Context, request: ForgotPasswordParams): Promise<Empty>;

  VerifyResetPassword(ctx: Context, request: VerifyPasswordParams): Promise<Empty>;

  ResetPassword(ctx: Context, request: ResetPasswordParams): Promise<Empty>;

  VerifySignIn(ctx: Context, request: Empty): Promise<VerifySignInResponse>;

}

export class CredentialsServiceClientImpl<Context extends DataLoaders> implements CredentialsService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  UpdatePassword(ctx: Context, request: UpdatePasswordParams): Promise<Empty> {
    const data = UpdatePasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.CredentialsService", "UpdatePassword", data);
    return promise.then(data => Empty.decode(new Reader(data)));
  }

  ForgotPassword(ctx: Context, request: ForgotPasswordParams): Promise<Empty> {
    const data = ForgotPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.CredentialsService", "ForgotPassword", data);
    return promise.then(data => Empty.decode(new Reader(data)));
  }

  VerifyResetPassword(ctx: Context, request: VerifyPasswordParams): Promise<Empty> {
    const data = VerifyPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.CredentialsService", "VerifyResetPassword", data);
    return promise.then(data => Empty.decode(new Reader(data)));
  }

  ResetPassword(ctx: Context, request: ResetPasswordParams): Promise<Empty> {
    const data = ResetPasswordParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.CredentialsService", "ResetPassword", data);
    return promise.then(data => Empty.decode(new Reader(data)));
  }

  VerifySignIn(ctx: Context, request: Empty): Promise<VerifySignInResponse> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.CredentialsService", "VerifySignIn", data);
    return promise.then(data => VerifySignInResponse.decode(new Reader(data)));
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

export const ResetPasswordParams = {
  encode(message: ResetPasswordParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ticketToken);
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
          message.ticketToken = reader.string();
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
    if (object.ticketToken) {
      message.ticketToken = String(object.ticketToken);
    }
    if (object.password) {
      message.password = String(object.password);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ResetPasswordParams>): ResetPasswordParams {
    const message = Object.create(baseResetPasswordParams) as ResetPasswordParams;
    if (object.ticketToken) {
      message.ticketToken = object.ticketToken;
    }
    if (object.password) {
      message.password = object.password;
    }
    return message;
  },
  toJSON(message: ResetPasswordParams): unknown {
    const obj: any = {};
    obj.ticketToken = message.ticketToken || "";
    obj.password = message.password || "";
    return obj;
  },
};

export const VerifyPasswordParams = {
  encode(message: VerifyPasswordParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ticketToken);
    return writer;
  },
  decode(reader: Reader, length?: number): VerifyPasswordParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifyPasswordParams) as VerifyPasswordParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticketToken = reader.string();
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
    if (object.ticketToken) {
      message.ticketToken = String(object.ticketToken);
    }
    return message;
  },
  fromPartial(object: DeepPartial<VerifyPasswordParams>): VerifyPasswordParams {
    const message = Object.create(baseVerifyPasswordParams) as VerifyPasswordParams;
    if (object.ticketToken) {
      message.ticketToken = object.ticketToken;
    }
    return message;
  },
  toJSON(message: VerifyPasswordParams): unknown {
    const obj: any = {};
    obj.ticketToken = message.ticketToken || "";
    return obj;
  },
};

export const VerifySignInResponse = {
  encode(message: VerifySignInResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.username);
    writer.uint32(26).string(message.email);
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): VerifySignInResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVerifySignInResponse) as VerifySignInResponse;
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
  fromJSON(object: any): VerifySignInResponse {
    const message = Object.create(baseVerifySignInResponse) as VerifySignInResponse;
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
  fromPartial(object: DeepPartial<VerifySignInResponse>): VerifySignInResponse {
    const message = Object.create(baseVerifySignInResponse) as VerifySignInResponse;
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
  toJSON(message: VerifySignInResponse): unknown {
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