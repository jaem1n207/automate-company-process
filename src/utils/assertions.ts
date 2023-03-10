export const isEmptryString = (value: string): boolean => {
  return value === null || value === undefined || value.trim() === "";
};
