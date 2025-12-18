import type { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "axios";

export interface HookResponse<T> {
  ok: boolean,
  message: string,
  status: HttpStatusCode,
  statusCode?: number,
  datas?: T
}

export function errorHookResponse<T>(error: AxiosError | any): HookResponse<T> {
  return {
    ok: false,
    message: error.response?.data.message || error.message,
    status: error.response?.status as HttpStatusCode || HttpStatusCode.BadRequest
  }
}

export function successHookResponse<T>(props: Omit<HookResponse<T>, "ok">): HookResponse<T> {
  return {
    ok: true,
    ...props
  }
}

export function successHookResponseByAxios<T>(response: AxiosResponse, endMessage: string): HookResponse<T> {
  return {
    ok: true,
    message: `Sucesso ao ${endMessage}.`,
    status: response.status,
    datas: response.data
  }
}