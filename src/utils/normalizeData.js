export const normalizeArrayValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  return [];
};

export const normalizeListData = (value) => normalizeArrayValue(value);
