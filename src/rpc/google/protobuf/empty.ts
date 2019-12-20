import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Empty {
}

const baseEmpty: object = {
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const Empty = {
  encode(message: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): Empty {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEmpty) as Empty;
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
  fromJSON(object: any): Empty {
    const message = Object.create(baseEmpty) as Empty;
    return message;
  },
  fromPartial(object: DeepPartial<Empty>): Empty {
    const message = Object.create(baseEmpty) as Empty;
    return message;
  },
  toJSON(message: Empty): unknown {
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