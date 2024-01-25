export function debounce<T>(func: (...args: T[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: T[]) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
