export interface PaginationParams {
  skip: number;
  take: number;
}

export function getPaginationParams(
  page: number,
  limit: number,
): PaginationParams {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}
