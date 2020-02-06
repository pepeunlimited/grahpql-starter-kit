import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface SetProfilePictureParams {
  profilePictureId: number;
  userId: number;
}

export interface DeleteProfilePictureParams {
  userId: number;
}

export interface ProfilePicture {
  profilePictureId: number;
}

export interface CreateUserParams {
  username: string;
  password: string;
  email: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  profilePictureId: number;
}

export interface GetUserParams {
  userId: number;
}

const baseSetProfilePictureParams: object = {
  profilePictureId: 0,
  userId: 0,
};

const baseDeleteProfilePictureParams: object = {
  userId: 0,
};

const baseProfilePicture: object = {
  profilePictureId: 0,
};

const baseCreateUserParams: object = {
  username: "",
  password: "",
  email: "",
};

const baseUser: object = {
  id: 0,
  username: "",
  email: "",
  roles: "",
  profilePictureId: 0,
};

const baseGetUserParams: object = {
  userId: 0,
};

export interface UserService<Context extends DataLoaders> {

  CreateUser(ctx: Context, request: CreateUserParams): Promise<User>;

  GetUser(ctx: Context, request: GetUserParams): Promise<User>;

  SetProfilePicture(ctx: Context, request: SetProfilePictureParams): Promise<ProfilePicture>;

  DeleteProfilePicture(ctx: Context, request: DeleteProfilePictureParams): Promise<ProfilePicture>;

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

  SetProfilePicture(ctx: Context, request: SetProfilePictureParams): Promise<ProfilePicture> {
    const data = SetProfilePictureParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "SetProfilePicture", data);
    return promise.then(data => ProfilePicture.decode(new Reader(data)));
  }

  DeleteProfilePicture(ctx: Context, request: DeleteProfilePictureParams): Promise<ProfilePicture> {
    const data = DeleteProfilePictureParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.users.UserService", "DeleteProfilePicture", data);
    return promise.then(data => ProfilePicture.decode(new Reader(data)));
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

export const SetProfilePictureParams = {
  encode(message: SetProfilePictureParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.profilePictureId);
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): SetProfilePictureParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSetProfilePictureParams) as SetProfilePictureParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profilePictureId = longToNumber(reader.int64() as Long);
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
  fromJSON(object: any): SetProfilePictureParams {
    const message = Object.create(baseSetProfilePictureParams) as SetProfilePictureParams;
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = Number(object.profilePictureId);
    } else {
      message.profilePictureId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SetProfilePictureParams>): SetProfilePictureParams {
    const message = Object.create(baseSetProfilePictureParams) as SetProfilePictureParams;
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = object.profilePictureId;
    } else {
      message.profilePictureId = 0;
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: SetProfilePictureParams): unknown {
    const obj: any = {};
    obj.profilePictureId = message.profilePictureId || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const DeleteProfilePictureParams = {
  encode(message: DeleteProfilePictureParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): DeleteProfilePictureParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeleteProfilePictureParams) as DeleteProfilePictureParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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
  fromJSON(object: any): DeleteProfilePictureParams {
    const message = Object.create(baseDeleteProfilePictureParams) as DeleteProfilePictureParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeleteProfilePictureParams>): DeleteProfilePictureParams {
    const message = Object.create(baseDeleteProfilePictureParams) as DeleteProfilePictureParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: DeleteProfilePictureParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const ProfilePicture = {
  encode(message: ProfilePicture, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.profilePictureId);
    return writer;
  },
  decode(reader: Reader, length?: number): ProfilePicture {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseProfilePicture) as ProfilePicture;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profilePictureId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProfilePicture {
    const message = Object.create(baseProfilePicture) as ProfilePicture;
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = Number(object.profilePictureId);
    } else {
      message.profilePictureId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ProfilePicture>): ProfilePicture {
    const message = Object.create(baseProfilePicture) as ProfilePicture;
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = object.profilePictureId;
    } else {
      message.profilePictureId = 0;
    }
    return message;
  },
  toJSON(message: ProfilePicture): unknown {
    const obj: any = {};
    obj.profilePictureId = message.profilePictureId || 0;
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
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateUserParams>): CreateUserParams {
    const message = Object.create(baseCreateUserParams) as CreateUserParams;
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
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
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

export const User = {
  encode(message: User, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(18).string(message.username);
    writer.uint32(26).string(message.email);
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    writer.uint32(40).int64(message.profilePictureId);
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
        case 5:
          message.profilePictureId = longToNumber(reader.int64() as Long);
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
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
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
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(String(e));
      }
    }
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = Number(object.profilePictureId);
    } else {
      message.profilePictureId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = Object.create(baseUser) as User;
    message.roles = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
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
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(e);
      }
    }
    if (object.profilePictureId !== undefined && object.profilePictureId !== null) {
      message.profilePictureId = object.profilePictureId;
    } else {
      message.profilePictureId = 0;
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
    obj.profilePictureId = message.profilePictureId || 0;
    return obj;
  },
};

export const GetUserParams = {
  encode(message: GetUserParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetUserParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetUserParams) as GetUserParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetUserParams {
    const message = Object.create(baseGetUserParams) as GetUserParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Number(object.userId);
    } else {
      message.userId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetUserParams>): GetUserParams {
    const message = Object.create(baseGetUserParams) as GetUserParams;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = 0;
    }
    return message;
  },
  toJSON(message: GetUserParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
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