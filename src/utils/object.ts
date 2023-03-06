interface ObjectWithUndefinedOrString {
  [key: string]: string | undefined;
}

export const hasEmptyOrUndefinedProperty = (
  obj: ObjectWithUndefinedOrString
): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === undefined || value === "") {
        return true;
      }
    }
  }
  return false;
};
