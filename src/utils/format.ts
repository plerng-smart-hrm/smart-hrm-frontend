export const formatDate = (value?: string) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};