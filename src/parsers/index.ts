import { DirectusItem, DirectusParsedItem } from "../types";

export const parseDirectusItem = (data: DirectusItem): DirectusParsedItem => {
  const {
    image,
    video,
    research_head,
    research_lead,
    logos,
    sdg_images,
    translations,
  } = data;

  return {
    image: parseMediaFile(image),
    video: parseMediaFile(video),
    research_head,
    research_lead,
    title: parseTranslations(translations, "title"),
    description: parseTranslations(translations, "description"),
    topic: parseTranslations(translations, "topic"),
    logos: parseMediaFiles(logos),
    sdg_images: parseMediaFiles(sdg_images),
  };
};

export const parseMediaFile = (
  file?: { filename_disk: string } | null,
): string | null =>
  file ? `https://fari-cms.directus.app/assets/${file.filename_disk}` : null;

export const parseMediaFiles = (
  files: Array<{ directus_files_id: string }> | null,
): string[] | null =>
  files?.map(
    (file) => `https://fari-cms.directus.app/assets/${file.directus_files_id}`,
  ) || null;

export const parseTranslations = (
  translations: Array<{ languages_code: string; [key: string]: string }>,
  field: "title" | "description" | "topic",
): Record<string, string> =>
  translations.reduce(
    (acc, translation) => {
      acc[translation.languages_code] = translation[field];
      return acc;
    },
    {} as Record<string, string>,
  );
