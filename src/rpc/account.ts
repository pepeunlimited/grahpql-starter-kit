import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';
import { StringValue } from './google/protobuf/wrappers';


export interface CreateDepositParams {
}

export interface CreateDepositResponse {
}

export interface CreateWithdrawParams {
}

export interface CreateWithdrawResponse {
}

export interface CreateTransferParams {
}

export interface CreateTransferResponse {
}

export interface GetAccountsParams {
  accountType: string | undefined;
  userId: number;
}

export interface CreateAccountParams {
  accountType: string;
  userId: number;
}

export interface GetAccountsResponse {
  accounts: Account[];
  userId: number;
}

export interface GetAccountParams {
  accountId: number;
  userId: number;
}

export interface Account {
  balance: number;
  type: string;
  userId: number;
  id: number;
}

const baseCreateDepositParams: object = {
};

const baseCreateDepositResponse: object = {
};

const baseCreateWithdrawParams: object = {
};

const baseCreateWithdrawResponse: object = {
};

const baseCreateTransferParams: object = {
};

const baseCreateTransferResponse: object = {
};

const baseGetAccountsParams: object = {
  accountType: undefined,
  userId: 0,
};

const baseCreateAccountParams: object = {
  accountType: "",
  userId: 0,
};

const baseGetAccountsResponse: object = {
  accounts: undefined,
  userId: 0,
};

const baseGetAccountParams: object = {
  accountId: 0,
  userId: 0,
};

const baseAccount: object = {
  balance: 0,
  type: "",
  userId: 0,
  id: 0,
};

export interface AccountService<Context extends DataLoaders> {

  CreateDeposit(ctx: Context, request: CreateDepositParams): Promise<CreateDepositResponse>;

  CreateWithdraw(ctx: Context, request: CreateWithdrawParams): Promise<CreateWithdrawResponse>;

  CreateTransfer(ctx: Context, request: CreateTransferParams): Promise<CreateTransferResponse>;

  CreateAccount(ctx: Context, request: CreateAccountParams): Promise<Account>;

  GetAccounts(ctx: Context, request: GetAccountsParams): Promise<GetAccountsResponse>;

  GetAccount(ctx: Context, request: GetAccountParams): Promise<Account>;

}

export class AccountServiceClientImpl<Context extends DataLoaders> implements AccountService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreateDeposit(ctx: Context, request: CreateDepositParams): Promise<CreateDepositResponse> {
    const data = CreateDepositParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateDeposit", data);
    return promise.then(data => CreateDepositResponse.decode(new Reader(data)));
  }

  CreateWithdraw(ctx: Context, request: CreateWithdrawParams): Promise<CreateWithdrawResponse> {
    const data = CreateWithdrawParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateWithdraw", data);
    return promise.then(data => CreateWithdrawResponse.decode(new Reader(data)));
  }

  CreateTransfer(ctx: Context, request: CreateTransferParams): Promise<CreateTransferResponse> {
    const data = CreateTransferParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateTransfer", data);
    return promise.then(data => CreateTransferResponse.decode(new Reader(data)));
  }

  CreateAccount(ctx: Context, request: CreateAccountParams): Promise<Account> {
    const data = CreateAccountParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "CreateAccount", data);
    return promise.then(data => Account.decode(new Reader(data)));
  }

  GetAccounts(ctx: Context, request: GetAccountsParams): Promise<GetAccountsResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.accounts.AccountService.GetAccounts", () => {
      return new DataLoader<GetAccountsParams, GetAccountsResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetAccountsParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.accounts.AccountService", "GetAccounts", data);
          return GetAccountsResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
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
    return writer;
  },
  decode(reader: Reader, length?: number): CreateDepositParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
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
  fromJSON(object: any): CreateDepositParams {
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
    return message;
  },
  fromPartial(object: DeepPartial<CreateDepositParams>): CreateDepositParams {
    const message = Object.create(baseCreateDepositParams) as CreateDepositParams;
    return message;
  },
  toJSON(message: CreateDepositParams): unknown {
    const obj: any = {};
    return obj;
  },
};

export const CreateDepositResponse = {
  encode(message: CreateDepositResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): CreateDepositResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateDepositResponse) as CreateDepositResponse;
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
  fromJSON(object: any): CreateDepositResponse {
    const message = Object.create(baseCreateDepositResponse) as CreateDepositResponse;
    return message;
  },
  fromPartial(object: DeepPartial<CreateDepositResponse>): CreateDepositResponse {
    const message = Object.create(baseCreateDepositResponse) as CreateDepositResponse;
    return message;
  },
  toJSON(message: CreateDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const CreateWithdrawParams = {
  encode(message: CreateWithdrawParams, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): CreateWithdrawParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
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
  fromJSON(object: any): CreateWithdrawParams {
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
    return message;
  },
  fromPartial(object: DeepPartial<CreateWithdrawParams>): CreateWithdrawParams {
    const message = Object.create(baseCreateWithdrawParams) as CreateWithdrawParams;
    return message;
  },
  toJSON(message: CreateWithdrawParams): unknown {
    const obj: any = {};
    return obj;
  },
};

export const CreateWithdrawResponse = {
  encode(message: CreateWithdrawResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): CreateWithdrawResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateWithdrawResponse) as CreateWithdrawResponse;
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
  fromJSON(object: any): CreateWithdrawResponse {
    const message = Object.create(baseCreateWithdrawResponse) as CreateWithdrawResponse;
    return message;
  },
  fromPartial(object: DeepPartial<CreateWithdrawResponse>): CreateWithdrawResponse {
    const message = Object.create(baseCreateWithdrawResponse) as CreateWithdrawResponse;
    return message;
  },
  toJSON(message: CreateWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const CreateTransferParams = {
  encode(message: CreateTransferParams, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTransferParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTransferParams) as CreateTransferParams;
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
  fromJSON(object: any): CreateTransferParams {
    const message = Object.create(baseCreateTransferParams) as CreateTransferParams;
    return message;
  },
  fromPartial(object: DeepPartial<CreateTransferParams>): CreateTransferParams {
    const message = Object.create(baseCreateTransferParams) as CreateTransferParams;
    return message;
  },
  toJSON(message: CreateTransferParams): unknown {
    const obj: any = {};
    return obj;
  },
};

export const CreateTransferResponse = {
  encode(message: CreateTransferResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTransferResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTransferResponse) as CreateTransferResponse;
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
  fromJSON(object: any): CreateTransferResponse {
    const message = Object.create(baseCreateTransferResponse) as CreateTransferResponse;
    return message;
  },
  fromPartial(object: DeepPartial<CreateTransferResponse>): CreateTransferResponse {
    const message = Object.create(baseCreateTransferResponse) as CreateTransferResponse;
    return message;
  },
  toJSON(message: CreateTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const GetAccountsParams = {
  encode(message: GetAccountsParams, writer: Writer = Writer.create()): Writer {
    if (message.accountType !== undefined && message.accountType !== undefined) {
      StringValue.encode({ value: message.accountType! }, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetAccountsParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetAccountsParams) as GetAccountsParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountType = StringValue.decode(reader, reader.uint32()).value;
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
  fromJSON(object: any): GetAccountsParams {
    const message = Object.create(baseGetAccountsParams) as GetAccountsParams;
    if (object.accountType) {
      message.accountType = String(object.accountType);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetAccountsParams>): GetAccountsParams {
    const message = Object.create(baseGetAccountsParams) as GetAccountsParams;
    if (object.accountType) {
      message.accountType = object.accountType;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: GetAccountsParams): unknown {
    const obj: any = {};
    obj.accountType = message.accountType || undefined;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const CreateAccountParams = {
  encode(message: CreateAccountParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.accountType);
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateAccountParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountType = reader.string();
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
  fromJSON(object: any): CreateAccountParams {
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
    if (object.accountType) {
      message.accountType = String(object.accountType);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateAccountParams>): CreateAccountParams {
    const message = Object.create(baseCreateAccountParams) as CreateAccountParams;
    if (object.accountType) {
      message.accountType = object.accountType;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: CreateAccountParams): unknown {
    const obj: any = {};
    obj.accountType = message.accountType || "";
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetAccountsResponse = {
  encode(message: GetAccountsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.accounts) {
      Account.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetAccountsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetAccountsResponse) as GetAccountsResponse;
    message.accounts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(Account.decode(reader, reader.uint32()));
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
  fromJSON(object: any): GetAccountsResponse {
    const message = Object.create(baseGetAccountsResponse) as GetAccountsResponse;
    message.accounts = [];
    if (object.accounts) {
      for (const e of object.accounts) {
        message.accounts.push(Account.fromJSON(e));
      }
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetAccountsResponse>): GetAccountsResponse {
    const message = Object.create(baseGetAccountsResponse) as GetAccountsResponse;
    message.accounts = [];
    if (object.accounts) {
      for (const e of object.accounts) {
        message.accounts.push(Account.fromPartial(e));
      }
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: GetAccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? Account.toJSON(e) : undefined);
    } else {
      obj.accounts = [];
    }
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const GetAccountParams = {
  encode(message: GetAccountParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.accountId);
    writer.uint32(16).int64(message.userId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetAccountParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = longToNumber(reader.int64() as Long);
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
  fromJSON(object: any): GetAccountParams {
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
    if (object.accountId) {
      message.accountId = Number(object.accountId);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetAccountParams>): GetAccountParams {
    const message = Object.create(baseGetAccountParams) as GetAccountParams;
    if (object.accountId) {
      message.accountId = object.accountId;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    return message;
  },
  toJSON(message: GetAccountParams): unknown {
    const obj: any = {};
    obj.accountId = message.accountId || 0;
    obj.userId = message.userId || 0;
    return obj;
  },
};

export const Account = {
  encode(message: Account, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.balance);
    writer.uint32(18).string(message.type);
    writer.uint32(24).int64(message.userId);
    writer.uint32(32).int64(message.id);
    return writer;
  },
  decode(reader: Reader, length?: number): Account {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseAccount) as Account;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.userId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.id = longToNumber(reader.int64() as Long);
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
    if (object.balance) {
      message.balance = Number(object.balance);
    }
    if (object.type) {
      message.type = String(object.type);
    }
    if (object.userId) {
      message.userId = Number(object.userId);
    }
    if (object.id) {
      message.id = Number(object.id);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Account>): Account {
    const message = Object.create(baseAccount) as Account;
    if (object.balance) {
      message.balance = object.balance;
    }
    if (object.type) {
      message.type = object.type;
    }
    if (object.userId) {
      message.userId = object.userId;
    }
    if (object.id) {
      message.id = object.id;
    }
    return message;
  },
  toJSON(message: Account): unknown {
    const obj: any = {};
    obj.balance = message.balance || 0;
    obj.type = message.type || "";
    obj.userId = message.userId || 0;
    obj.id = message.id || 0;
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