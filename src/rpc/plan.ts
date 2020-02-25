import { Reader, Writer } from 'protobufjs/minimal';
import DataLoader from 'dataloader';
import hash from 'object-hash';
import * as Long from 'long';


export interface CreatePlanParams {
  titleI18nId: number;
  length: number;
  unit: string;
  startAtDay: number;
  startAtMonth: number;
  endAtDay: number;
  endAtMonth: number;
  price: number;
  discount: number;
  productId: number;
  thirdPartyPriceId: number;
}

export interface Plan {
  id: number;
  titleI18nId: number;
  unit: string;
  length: number;
  price: number;
  discount: number;
  startAt: string;
  endAt: string;
  thirdPartyPriceId: number;
  productId: number;
}

export interface GetPlanParams {
  planId: number;
}

export interface GetPlansParams {
  productId: number;
  productSku: string;
}

export interface GetPlansResponse {
  plans: Plan[];
}

export interface EndPlanAtParams {
  planId: number;
  endAtDay: number;
  endAtMonth: number;
}

const baseCreatePlanParams: object = {
  titleI18nId: 0,
  length: 0,
  unit: "",
  startAtDay: 0,
  startAtMonth: 0,
  endAtDay: 0,
  endAtMonth: 0,
  price: 0,
  discount: 0,
  productId: 0,
  thirdPartyPriceId: 0,
};

const basePlan: object = {
  id: 0,
  titleI18nId: 0,
  unit: "",
  length: 0,
  price: 0,
  discount: 0,
  startAt: "",
  endAt: "",
  thirdPartyPriceId: 0,
  productId: 0,
};

const baseGetPlanParams: object = {
  planId: 0,
};

const baseGetPlansParams: object = {
  productId: 0,
  productSku: "",
};

const baseGetPlansResponse: object = {
  plans: undefined,
};

const baseEndPlanAtParams: object = {
  planId: 0,
  endAtDay: 0,
  endAtMonth: 0,
};

export interface PlanService<Context extends DataLoaders> {

  CreatePlan(ctx: Context, request: CreatePlanParams): Promise<Plan>;

  GetPlans(ctx: Context, request: GetPlansParams): Promise<GetPlansResponse>;

  GetPlan(ctx: Context, request: GetPlanParams): Promise<Plan>;

  EndPlanAt(ctx: Context, request: EndPlanAtParams): Promise<Plan>;

}

export class PlanServiceClientImpl<Context extends DataLoaders> implements PlanService<Context> {

  private readonly rpc: Rpc<Context>;

  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
  }

  CreatePlan(ctx: Context, request: CreatePlanParams): Promise<Plan> {
    const data = CreatePlanParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.PlanService", "CreatePlan", data);
    return promise.then(data => Plan.decode(new Reader(data)));
  }

  GetPlans(ctx: Context, request: GetPlansParams): Promise<GetPlansResponse> {
    const dl = ctx.getDataLoader("pepeunlimited.products.PlanService.GetPlans", () => {
      return new DataLoader<GetPlansParams, GetPlansResponse>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPlansParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.PlanService", "GetPlans", data);
          return GetPlansResponse.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  GetPlan(ctx: Context, request: GetPlanParams): Promise<Plan> {
    const dl = ctx.getDataLoader("pepeunlimited.products.PlanService.GetPlan", () => {
      return new DataLoader<GetPlanParams, Plan>((requests) => {
        const responses = requests.map(async request => {
          const data = GetPlanParams.encode(request).finish();
          const response = await this.rpc.request(ctx, "pepeunlimited.products.PlanService", "GetPlan", data);
          return Plan.decode(new Reader(response));
        })
        return Promise.all(responses);
      }, { cacheKeyFn: hash });
    });
    return dl.load(request);
  }

  EndPlanAt(ctx: Context, request: EndPlanAtParams): Promise<Plan> {
    const data = EndPlanAtParams.encode(request).finish();
    const promise = this.rpc.request(ctx, "pepeunlimited.products.PlanService", "EndPlanAt", data);
    return promise.then(data => Plan.decode(new Reader(data)));
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

export const CreatePlanParams = {
  encode(message: CreatePlanParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.titleI18nId);
    writer.uint32(16).int32(message.length);
    writer.uint32(26).string(message.unit);
    writer.uint32(32).int32(message.startAtDay);
    writer.uint32(40).int32(message.startAtMonth);
    writer.uint32(48).int32(message.endAtDay);
    writer.uint32(56).int32(message.endAtMonth);
    writer.uint32(64).uint32(message.price);
    writer.uint32(72).uint32(message.discount);
    writer.uint32(80).int64(message.productId);
    writer.uint32(88).int64(message.thirdPartyPriceId);
    return writer;
  },
  decode(reader: Reader, length?: number): CreatePlanParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreatePlanParams) as CreatePlanParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.titleI18nId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.length = reader.int32();
          break;
        case 3:
          message.unit = reader.string();
          break;
        case 4:
          message.startAtDay = reader.int32();
          break;
        case 5:
          message.startAtMonth = reader.int32();
          break;
        case 6:
          message.endAtDay = reader.int32();
          break;
        case 7:
          message.endAtMonth = reader.int32();
          break;
        case 8:
          message.price = reader.uint32();
          break;
        case 9:
          message.discount = reader.uint32();
          break;
        case 10:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.thirdPartyPriceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreatePlanParams {
    const message = Object.create(baseCreatePlanParams) as CreatePlanParams;
    if (object.titleI18nId !== undefined && object.titleI18nId !== null) {
      message.titleI18nId = Number(object.titleI18nId);
    } else {
      message.titleI18nId = 0;
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = Number(object.length);
    } else {
      message.length = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = String(object.unit);
    } else {
      message.unit = "";
    }
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = Number(object.startAtDay);
    } else {
      message.startAtDay = 0;
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = Number(object.startAtMonth);
    } else {
      message.startAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = Number(object.endAtDay);
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = Number(object.endAtMonth);
    } else {
      message.endAtMonth = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price);
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = Number(object.discount);
    } else {
      message.discount = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = Number(object.thirdPartyPriceId);
    } else {
      message.thirdPartyPriceId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreatePlanParams>): CreatePlanParams {
    const message = Object.create(baseCreatePlanParams) as CreatePlanParams;
    if (object.titleI18nId !== undefined && object.titleI18nId !== null) {
      message.titleI18nId = object.titleI18nId;
    } else {
      message.titleI18nId = 0;
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = object.length;
    } else {
      message.length = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    } else {
      message.unit = "";
    }
    if (object.startAtDay !== undefined && object.startAtDay !== null) {
      message.startAtDay = object.startAtDay;
    } else {
      message.startAtDay = 0;
    }
    if (object.startAtMonth !== undefined && object.startAtMonth !== null) {
      message.startAtMonth = object.startAtMonth;
    } else {
      message.startAtMonth = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = object.endAtDay;
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = object.endAtMonth;
    } else {
      message.endAtMonth = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    } else {
      message.discount = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = object.thirdPartyPriceId;
    } else {
      message.thirdPartyPriceId = 0;
    }
    return message;
  },
  toJSON(message: CreatePlanParams): unknown {
    const obj: any = {};
    obj.titleI18nId = message.titleI18nId || 0;
    obj.length = message.length || 0;
    obj.unit = message.unit || "";
    obj.startAtDay = message.startAtDay || 0;
    obj.startAtMonth = message.startAtMonth || 0;
    obj.endAtDay = message.endAtDay || 0;
    obj.endAtMonth = message.endAtMonth || 0;
    obj.price = message.price || 0;
    obj.discount = message.discount || 0;
    obj.productId = message.productId || 0;
    obj.thirdPartyPriceId = message.thirdPartyPriceId || 0;
    return obj;
  },
};

export const Plan = {
  encode(message: Plan, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.id);
    writer.uint32(16).int64(message.titleI18nId);
    writer.uint32(26).string(message.unit);
    writer.uint32(32).int32(message.length);
    writer.uint32(40).uint32(message.price);
    writer.uint32(48).uint32(message.discount);
    writer.uint32(58).string(message.startAt);
    writer.uint32(66).string(message.endAt);
    writer.uint32(72).int64(message.thirdPartyPriceId);
    writer.uint32(80).int64(message.productId);
    return writer;
  },
  decode(reader: Reader, length?: number): Plan {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePlan) as Plan;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.titleI18nId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.unit = reader.string();
          break;
        case 4:
          message.length = reader.int32();
          break;
        case 5:
          message.price = reader.uint32();
          break;
        case 6:
          message.discount = reader.uint32();
          break;
        case 7:
          message.startAt = reader.string();
          break;
        case 8:
          message.endAt = reader.string();
          break;
        case 9:
          message.thirdPartyPriceId = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Plan {
    const message = Object.create(basePlan) as Plan;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.titleI18nId !== undefined && object.titleI18nId !== null) {
      message.titleI18nId = Number(object.titleI18nId);
    } else {
      message.titleI18nId = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = String(object.unit);
    } else {
      message.unit = "";
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = Number(object.length);
    } else {
      message.length = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price);
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = Number(object.discount);
    } else {
      message.discount = 0;
    }
    if (object.startAt !== undefined && object.startAt !== null) {
      message.startAt = String(object.startAt);
    } else {
      message.startAt = "";
    }
    if (object.endAt !== undefined && object.endAt !== null) {
      message.endAt = String(object.endAt);
    } else {
      message.endAt = "";
    }
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = Number(object.thirdPartyPriceId);
    } else {
      message.thirdPartyPriceId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Plan>): Plan {
    const message = Object.create(basePlan) as Plan;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.titleI18nId !== undefined && object.titleI18nId !== null) {
      message.titleI18nId = object.titleI18nId;
    } else {
      message.titleI18nId = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    } else {
      message.unit = "";
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = object.length;
    } else {
      message.length = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = 0;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    } else {
      message.discount = 0;
    }
    if (object.startAt !== undefined && object.startAt !== null) {
      message.startAt = object.startAt;
    } else {
      message.startAt = "";
    }
    if (object.endAt !== undefined && object.endAt !== null) {
      message.endAt = object.endAt;
    } else {
      message.endAt = "";
    }
    if (object.thirdPartyPriceId !== undefined && object.thirdPartyPriceId !== null) {
      message.thirdPartyPriceId = object.thirdPartyPriceId;
    } else {
      message.thirdPartyPriceId = 0;
    }
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    return message;
  },
  toJSON(message: Plan): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    obj.titleI18nId = message.titleI18nId || 0;
    obj.unit = message.unit || "";
    obj.length = message.length || 0;
    obj.price = message.price || 0;
    obj.discount = message.discount || 0;
    obj.startAt = message.startAt || "";
    obj.endAt = message.endAt || "";
    obj.thirdPartyPriceId = message.thirdPartyPriceId || 0;
    obj.productId = message.productId || 0;
    return obj;
  },
};

export const GetPlanParams = {
  encode(message: GetPlanParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.planId);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPlanParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPlanParams) as GetPlanParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.planId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPlanParams {
    const message = Object.create(baseGetPlanParams) as GetPlanParams;
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = Number(object.planId);
    } else {
      message.planId = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPlanParams>): GetPlanParams {
    const message = Object.create(baseGetPlanParams) as GetPlanParams;
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = object.planId;
    } else {
      message.planId = 0;
    }
    return message;
  },
  toJSON(message: GetPlanParams): unknown {
    const obj: any = {};
    obj.planId = message.planId || 0;
    return obj;
  },
};

export const GetPlansParams = {
  encode(message: GetPlansParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(16).int64(message.productId);
    writer.uint32(26).string(message.productSku);
    return writer;
  },
  decode(reader: Reader, length?: number): GetPlansParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPlansParams) as GetPlansParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.productId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.productSku = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPlansParams {
    const message = Object.create(baseGetPlansParams) as GetPlansParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = Number(object.productId);
    } else {
      message.productId = 0;
    }
    if (object.productSku !== undefined && object.productSku !== null) {
      message.productSku = String(object.productSku);
    } else {
      message.productSku = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPlansParams>): GetPlansParams {
    const message = Object.create(baseGetPlansParams) as GetPlansParams;
    if (object.productId !== undefined && object.productId !== null) {
      message.productId = object.productId;
    } else {
      message.productId = 0;
    }
    if (object.productSku !== undefined && object.productSku !== null) {
      message.productSku = object.productSku;
    } else {
      message.productSku = "";
    }
    return message;
  },
  toJSON(message: GetPlansParams): unknown {
    const obj: any = {};
    obj.productId = message.productId || 0;
    obj.productSku = message.productSku || "";
    return obj;
  },
};

export const GetPlansResponse = {
  encode(message: GetPlansResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.plans) {
      Plan.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): GetPlansResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetPlansResponse) as GetPlansResponse;
    message.plans = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plans.push(Plan.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPlansResponse {
    const message = Object.create(baseGetPlansResponse) as GetPlansResponse;
    message.plans = [];
    if (object.plans !== undefined && object.plans !== null) {
      for (const e of object.plans) {
        message.plans.push(Plan.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPlansResponse>): GetPlansResponse {
    const message = Object.create(baseGetPlansResponse) as GetPlansResponse;
    message.plans = [];
    if (object.plans !== undefined && object.plans !== null) {
      for (const e of object.plans) {
        message.plans.push(Plan.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: GetPlansResponse): unknown {
    const obj: any = {};
    if (message.plans) {
      obj.plans = message.plans.map(e => e ? Plan.toJSON(e) : undefined);
    } else {
      obj.plans = [];
    }
    return obj;
  },
};

export const EndPlanAtParams = {
  encode(message: EndPlanAtParams, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.planId);
    writer.uint32(16).int32(message.endAtDay);
    writer.uint32(24).int32(message.endAtMonth);
    return writer;
  },
  decode(reader: Reader, length?: number): EndPlanAtParams {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEndPlanAtParams) as EndPlanAtParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.planId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.endAtDay = reader.int32();
          break;
        case 3:
          message.endAtMonth = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EndPlanAtParams {
    const message = Object.create(baseEndPlanAtParams) as EndPlanAtParams;
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = Number(object.planId);
    } else {
      message.planId = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = Number(object.endAtDay);
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = Number(object.endAtMonth);
    } else {
      message.endAtMonth = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<EndPlanAtParams>): EndPlanAtParams {
    const message = Object.create(baseEndPlanAtParams) as EndPlanAtParams;
    if (object.planId !== undefined && object.planId !== null) {
      message.planId = object.planId;
    } else {
      message.planId = 0;
    }
    if (object.endAtDay !== undefined && object.endAtDay !== null) {
      message.endAtDay = object.endAtDay;
    } else {
      message.endAtDay = 0;
    }
    if (object.endAtMonth !== undefined && object.endAtMonth !== null) {
      message.endAtMonth = object.endAtMonth;
    } else {
      message.endAtMonth = 0;
    }
    return message;
  },
  toJSON(message: EndPlanAtParams): unknown {
    const obj: any = {};
    obj.planId = message.planId || 0;
    obj.endAtDay = message.endAtDay || 0;
    obj.endAtMonth = message.endAtMonth || 0;
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