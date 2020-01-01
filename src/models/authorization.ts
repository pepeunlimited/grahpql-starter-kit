import { User } from "../rpc/user";

export interface AuthPayload {
  accessToken: string
  refreshToken: string
}