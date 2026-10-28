export const formatDate = (rawDate) => {
  if (!rawDate) return '';
  const date = new Date(rawDate);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (rawDate) => {
  if (!rawDate) return '';
  const date = new Date(rawDate);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};