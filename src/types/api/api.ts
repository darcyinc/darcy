interface ErrorAPIResponse {
  success: false;
  error: {
    id: string;
    message: string;
  };
}

interface SuccessAPIResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ErrorAPIResponse | SuccessAPIResponse<T>;

export interface ApiPaginatedQuery {
  limit: number;
  page: number;
}
