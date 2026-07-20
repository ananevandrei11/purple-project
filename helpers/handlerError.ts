import { AxiosError } from 'axios';

export function handlerError(error: unknown, defaultMessage = 'Internal Server Error') {
  let message = defaultMessage;
  if (error instanceof AxiosError) {
    message = error?.response?.data?.message;
  } else if (error instanceof Error) {
    message = error?.message;
  }
  return message;
}
