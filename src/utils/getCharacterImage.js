const images = import.meta.glob(
  "../assets/Characters/*.{jpg,jpeg,png}",
  { eager: true }
);

export const getCharacterImage = (name) => {
  if (!name) return null;

  const normalized = name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .replace(/,/g, "")
    .replace(/\./g, "")
    .replace(/é/g, "e");

  const match = Object.keys(images).find((path) =>
    path.toLowerCase().includes(normalized)
  );

  return match ? images[match].default : null;
};
