/**
 * A specialized Error for API errors
 */
export class ApiError extends Error {
  static is(error: Error): error is ApiError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(error as any).code;
  }

  readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
