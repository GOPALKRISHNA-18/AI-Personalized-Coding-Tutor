const listeners = new Set();

export const showToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  const toastItem = { id, message, type, duration };
  listeners.forEach((listener) => listener(toastItem));
  return id;
};

export const toast = {
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  info: (msg, duration) => showToast(msg, 'info', duration),
  warning: (msg, duration) => showToast(msg, 'warning', duration)
};

export const subscribeToToasts = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};