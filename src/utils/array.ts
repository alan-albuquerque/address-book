export function concatNotEmpty(values: unknown[], separator = ' '): string {
  return values
    .filter(value => {
      return (
        value !== null &&
        typeof value !== 'undefined' &&
        String(value).trim() !== ''
      );
    })
    .join(separator);
}
