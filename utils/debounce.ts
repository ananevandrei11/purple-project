export function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
