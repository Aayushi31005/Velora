const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const createSlug = (value: string) => {
  const slug = normalize(value);

  return slug.length > 0 ? slug : "item";
};

export const createUniqueSlug = async (
  value: string,
  isTaken: (slug: string) => Promise<boolean>,
) => {
  const baseSlug = createSlug(value);
  let candidate = baseSlug;
  let suffix = 2;

  while (await isTaken(candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
};
