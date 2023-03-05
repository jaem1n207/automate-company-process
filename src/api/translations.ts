export const getTranslations = async () => {
  const res = await fetch("/api/translations");
  return res.json();
};
