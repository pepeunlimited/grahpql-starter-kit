import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';
import { StringValue } from './google/protobuf/wrappers';


export interface CreateDepositParams {
  userId: number;
  amount: number;
  referenceNumber: string | undefined;
}

export interface CreateWithdrawParams {
  userId: number;
  amount: number;
}

export interface CreateAccountParams {
  userId: number;
}

export interface GetAccountParams {
  userId: number;
}

export interface Account {
  id: number;
  balance: number;
  userId: number;
}

export interface UpdateAccountVerifiedParams {
  userId: number;
}

const baseCreateDepositParams: object = {
  userId: 0,
  amount: 0,
  referenceNumber: undefined,
};

const baseCreateWithdrawParams: object = {
  userId: 0,
  amount: 0,
};

const baseCreateAccountParams: object = {
  userId: 0,
};

const baseGetAccountParams: object = {
  userId: 0,
};

const baseAccount: object = {
  id: 0,
  balance: 0,
  userId: 0,
};

const baseUpdateAccountVerifiedParams: object = {
  userId: 0,
};

export interface AccountService<Context extends DataLoaders> {

  CreateDeposit(ctx: Context, request: CreateDepositParams): Promise<Account>;

  CreateWithdraw(ctx: Context, request: CreateWithdrawParams): Promise<Account>;

  CreateAccount(ctx: Context, request: CreateAccountParams): Promise<Account>;

  GetAccount(ctx: Context, request: GetAccountParams): Promise<Account>;

  UpdateAccountVerified(ctx: Context, request: UpdateAccountVerifiedParams): Promise<Account>;

}

export class AccountServiceClientImpl<Context extends DataLoaders> implements AccountService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateDeposit(ctx: Context, request: CreateDepositParams): Promise<Account> {
    const data = CreateDepositParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateDeposit", data);
    return promise.then(data => Account.decode(new Reader(data)));
  }

  CreateWithdraw(ctx: Context, request: CreateWithdrawParams): Promise<Account> {
    const data = CreateWithdrawParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateWithdraw", data);
    return promise.then(data => Account.decode(new Reader(data)));
  }

  CreateAccount(ctx: Context, request: CreateAccountParams): Promise<Account> {
    const data = CreateAccountParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateAccount", data);
    return promise.then(data => Account.decode(new Reader(data)));
  }

  GetAccount(ctx: Context, request: GetAccountParams): Promise<Account> {
    const dl = ctx.getDataLoader("pepeunlimited.accounts.AccountService.GetAccount", () => {
      return new DataLoader<GetAccountParams, Account>((requests) => {
        const responses = requests.map(async request => {
          const data = GetAccountParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "GetAccount", data);
          return Account.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  UpdateAccountVerified(ctx: Context, request: UpdateAccountVerifiedParams): Promise<Account> {
    const data = UpdateAccountVerifiedParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "UpdateAccountVerified", data);
    return promise.then(data => Account.decode(new Reader(data)));
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

export const CreateDepositParams = {
  encode(message: CreateDepositParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int64(message.amount);
    if (message.referenceNumber !== undefined && message.referenceNumber !== undefined) {
      StringValue.encode({ value: message.referenceNumber! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): CreateDepositParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.amount = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.referenceNumber = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateDepositParams {
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.amount) {
      message.amount = Number(object.amount);
    }
    if (object.referenceNumber) {
      message.referenceNumber = String(object.referenceNumber);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateDepositParams>): CreateDepositParams {
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.amount) {
      message.amount = object.amount;
    }
    if (object.referenceNumber) {
      message.referenceNumber = object.referenceNumber;
    }
    return message;
  },
  toJSON(message: CreateDepositParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.amount = message.amount || 0;
    obj.referenceNumber = message.referenceNumber || undefined;
    return obj;
  },
};

export const CreateWithdrawParams = {
  encode(message: CreateWithdrawParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(16).int64(message.amount);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateWithdrawParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.amount = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateWithdrawParams {
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.amount) {
      message.amount = Number(object.amount);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateWithdrawParams>): CreateWithdrawParams {
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.amount) {
      message.amount = object.amount;
    }
    return message;
  },
  toJSON(message: CreateWithdrawParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    obj.amount = message.amount || 0;
    return obj;
  },
};

export const CreateAccountParams = {
  encode(message: CreateAccountParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateAccountParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
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
  fromJSON(object: any): CreateAccountParams {
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateAccountParams>): CreateAccountParams {
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: CreateAccountParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetAccountParams = {
  encode(message: GetAccountParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetAccountParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
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
  fromJSON(object: any): GetAccountParams {
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetAccountParams>): GetAccountParams {
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: GetAccountParams): unknown {
    const obj: any = {};
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const Account = {
  encode(message: Account, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).int64(message.balance);
    writer.uint32(24).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): Account {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseAccount) as Account;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.balance = longToNumber(reader.int64() as Long);
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
  fromJSON(object: any): Account {
    const message = Object.create(baseAccount) as Account;
    if (object.id) {
      message.id = Number(object.id);
    }
    if (object.balance) {
      message.balance = Number(object.balance);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Account>): Account {
    const message = Object.create(baseAccount) as Account;
    if (object.id) {
      message.id = object.id;
    }
    if (object.balance) {
      message.balance = object.balance;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: Account): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.balance = message.balance || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const UpdateAccountVerifiedParams = {
  encode(message: UpdateAccountVerifiedParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): UpdateAccountVerifiedParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpdateAccountVerifiedParams) as UpdateAccountVerifiedParams;
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
  fromJSON(object: any): UpdateAccountVerifiedParams {
    const message = Object.create(baseUpdateAccountVerifiedParams) as UpdateAccountVerifiedParams;
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdateAccountVerifiedParams>): UpdateAccountVerifiedParams {
    const message = Object.create(baseUpdateAccountVerifiedParams) as UpdateAccountVerifiedParams;
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: UpdateAccountVerifiedParams): unknown {
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