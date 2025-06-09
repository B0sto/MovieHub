export function nextPage(current: number, totalPages: number) {
  return Math.min(current + 1, totalPages);
}

export function previousPage(current: number) {
  return Math.max(current - 1, 1);
}
