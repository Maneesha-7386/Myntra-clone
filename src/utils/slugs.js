
export const slugify = (text = "") =>
    text
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

export const deslugify = (slug = "") =>
    slug
        .replace(/-/g, " ");
