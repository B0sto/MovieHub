export function nextPage(current: number, totalPages: number) {
  return Math.min(current + 1, totalPages);
}

export function previousPage(current: number) {
  return Math.max(current - 1, 1);
}

export function movieDurationConverter(runtime: number) {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;

  return `${hour}h ${minute}m`
}

export function formatVoteAverage(value: number) {
  const str = value.toString();

  const [intPart, decimalPart] = str.split(".");

  if (!decimalPart) return intPart;
  if (decimalPart.length === 1) return value.toFixed(1);

  return `${intPart}.${decimalPart.slice(0,1)}`
}

export function formatReleaseDate(dateString: string) {
  if(!dateString) return '';

  const date =  new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}