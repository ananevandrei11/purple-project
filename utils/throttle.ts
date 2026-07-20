export function throttle(callback: (...args: unknown[]) => void, time: number) {
  let throttleTimer;
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}
