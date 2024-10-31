import { createDirectus, rest, readItems, readItem } from "@directus/sdk";
import { ValidDirectusParams, DirectusItem, ParsedItem } from "./types";
import { parseDirectusItem } from "./parsers";

const client = createDirectus("https://fari-cms.directus.app").with(rest());

const fetchDirectus = async <T extends ParsedItem = ParsedItem>(
  { id, slug }: ValidDirectusParams,
  parser: (data: DirectusItem) => T = parseDirectusItem as (
    data: DirectusItem,
  ) => T,
): Promise<T | null> => {
  if (!id && !slug) {
    console.error("Either 'id' or 'slug' must be provided.");
    return null;
  }

  try {
    const data = id ? await fetchById(id) : await fetchBySlug(slug!);
    if (!data) {
      console.error("No data found.");
      return null;
    }

    return parser(data);
  } catch (error) {
    console.error("Failed to fetch or parse data:", error);
    return null;
  }
};

const fetchById = async (id: number): Promise<DirectusItem | null> => {
  try {
    const response = await client.request(
      readItem("demos", id, { fields: ["*.*"] }),
    );
    return response as DirectusItem;
  } catch (error) {
    console.error("Error fetching by ID:", error);
    return null;
  }
};

const fetchBySlug = async (slug: string): Promise<DirectusItem | null> => {
  try {
    const response = await client.request(
      readItems("demos", {
        filter: { slug: { _eq: slug } },
        fields: ["*.*"],
        limit: 1,
      }),
    );

    return response[0] as DirectusItem;
  } catch (error) {
    console.error("Error fetching by slug:", error);
    return null;
  }
};

export {
  fetchDirectus,
  fetchById,
  fetchBySlug
}
