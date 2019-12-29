import { User } from "../rpc/user";

export interface AuthPayload {
  token: string
  refreshToken: string
}