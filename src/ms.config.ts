import { MeiliSearch } from "meilisearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

export const msInstance = new MeiliSearch({ host: "http://localhost:7700" });

export const searchClient = instantMeiliSearch("http://127.0.0.1:7700", "");
