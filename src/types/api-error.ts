export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export class ApiError extends Error {
  constructor(
    public response: {
      data: ApiErrorResponse;
      status: number;
    }
  ) {
    super(response.data.message);
    this.name = 'ApiError';
  }
}