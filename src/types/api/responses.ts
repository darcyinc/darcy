interface BaseAPIResponse<T> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: {
    id: string;
    message: string;
  };
}

interface ErrorAPIResponse extends BaseAPIResponse<null> {
  error: {
    id: string;
    message: string;
  };
}

interface SuccessAPIResponse<T> extends BaseAPIResponse<T> {
  data: T;
}

export type ApiResponse<T> = ErrorAPIResponse | SuccessAPIResponse<T>;
