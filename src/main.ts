import { UserServiceClientImpl } from './rpc/user';
import http from 'http';
class Rpc {
  
  private readonly host: string;
  private readonly port: number;

  constructor(host: string, port: number) {
    this.host = host
    this.port = port
  }

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const path = "/twirp/" + service + "/" + method;
      const req = http
        .request(
          {
            hostname: this.host,
            port: this.port,
            path: path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/protobuf',
              'Content-Length': Buffer.byteLength(data),
            },
          },
          res => {
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
              const data = Buffer.concat(chunks);
              if (res.statusCode != 200) {
                reject(onError(data));
              } else {
                resolve(data);
              }
            });
            res.on('error', err => {
              reject(onUnknownError(err, null));
            });
          },
        )
        .on('error', err => {
          reject(onUnknownError(err, null));
        });
      req.end(data);
    });
  }
}

export type FetchError = | TwirpError | UnknownError;

function onError(data: Uint8Array): Error {
  try {
    const json = JSON.parse(data.toString());
    const error = new Error();
    (error as TwirpError).isTwirpError = true;
    (error as TwirpError).reason = json.meta['reason'];
    (error as TwirpError).msg = json.msg;
    (error as TwirpError).code = json.code;
    return error;
  } catch (error) {
    return onUnknownError(error, data.toString())
  }
}

function onUnknownError(error: Error, data: string | null): Error {
  (error as UnknownError).isUnknownError = true;
  if (data == null) {
    (error as UnknownError).msg = error.message;
  } else {
    (error as UnknownError).msg = data;
  }
  return error
}

export interface TwirpError extends Error {
  isTwirpError:   boolean
  reason:         string
  code:           string
  msg:            string
}

export interface UnknownError extends Error {
  isUnknownError: boolean
  msg:            string
}

export const isTwirpError = (
  err: TwirpError | any,
): err is TwirpError => {
  return !!(err instanceof Error && (err as TwirpError).isTwirpError);
};

export const isUnknownError = (
  err: UnknownError | any,
): err is UnknownError => {
  return !!(err instanceof Error && (err as UnknownError).isUnknownError);
};

async function run() {
  try {
    const client = new UserServiceClientImpl(new Rpc("localhost", 8080));
    const user = await client.CreateUser({ password: "asd", username: "ASD", email: "simao@gmail.com" })
    console.log(user)
  } catch (error) {
    if (isTwirpError(error)) {
      console.log(error)
      return
    }
    console.log(error)
  }
}
run();