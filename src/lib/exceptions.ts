export function NOT_FOUND_ACTION(message?: string) {
  throw new Error(message ?? "Not found");
}

export function METHOD_NOT_ALLOWED_ACTION(message?: string) {
  throw new Error(message ?? "Method not allowed");
}

export function BAD_REQUEST_ACTION(message?: string) {
  throw new Error(message ?? "Bad request");
}

export function UNAUTHORIZED_ACTION(message?: string) {
  throw new Error(message ?? "Unauthorized");
}

export function FORBIDDEN_ACTION(message?: string) {
  throw new Error(message ?? "Forbidden");
}

export function RATE_LIMIT_EXCEEDED_ACTION(message?: string) {
  throw new Error(message ?? "Rate limit exceeded");
}

export function INTERNAL_SERVER_ERROR_ACTION(message?: string) {
  throw new Error(message ?? "Internal server error");
}
