export const slugify = (text: string): string => {
  return text
    .toString() // Ensure it's a string
    .normalize("NFD") // Decompose combined graphemes to split accents
    .replace(/[\u0300-\u036f]/g, "") // Remove decomposed accent marks
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both sides
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars (except hyphens)
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single one
};
