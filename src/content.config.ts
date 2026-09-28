import { defineCollection, reference } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const locations = defineCollection({
  loader: file("src/data/locations.yaml"),
  schema: z.object({
    name: z.string(),
    provider: z.string(),
    coordinates: z.tuple([
      z.number().min(-180).max(180),
      z.number().min(-90).max(90),
    ]),
  }),
});

const servers = defineCollection({
  loader: file("src/data/servers.yaml"),
  schema: z.object({
    location: reference("locations"),
    ipv4: z.ipv4(),
    ipv6: z.ipv6(),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  locations,
  servers,
};
