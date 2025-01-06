interface DirectusParams {
  id?: number;
  slug?: string;
}

type AtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> &
  { [K in Keys]-?: Pick<T, K> }[Keys];

export type ValidDirectusParams = AtLeastOne<DirectusParams, "id" | "slug">;

export interface DirectusItem {
  id: number;
  name: string;
  research_head: string;
  research_lead: string;
  image?: { filename_disk: string };
  video?: { filename_disk: string };
  logos: Array<{ directus_files_id: string }>;
  sdg_images: Array<{ directus_files_id: string }>;
  translations: Array<{
    languages_code: string;
    title: string;
    topic: string;
    description: string;
  }>;
}

export interface DirectusParsedItem {
  image: string | null;
  video: string | null;
  title: Record<string, string>;
  description: Record<string, string>;
  topic: Record<string, string>;
  research_head: string;
  research_lead: string;
  logos: string[] | null;
  sdg_images: string[] | null;
}
