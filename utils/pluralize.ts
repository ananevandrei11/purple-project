export function pluralize(count: number | string, words: string[]) {
  const countGuard = typeof count === 'string' ? parseFloat(count) : count;
  const cases = [2, 0, 1, 1, 1, 2];
  return (
    count +
    ' ' +
    words[countGuard % 100 > 4 && countGuard % 100 < 20 ? 2 : cases[Math.min(countGuard % 10, 5)]]
  );
}
