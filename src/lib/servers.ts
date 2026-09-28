import { getCollection } from "astro:content";

export const DOMAIN = "bancuh.com";

export type Server = {
  id: string;
  hostname: string;
  ipv4: string;
  ipv6: string;
  doh: string;
  logs: {
    https: string;
    ipv4: string;
    ipv6: string;
  };
  location: Location;
};

export type Location = {
  id: string;
  name: string;
  provider: string;
  coordinates: [number, number];
};

export type LocationWithServers = Location & { servers: Server[] };

export async function getLocations(): Promise<Location[]> {
  const entries = await getCollection("locations");
  return entries.map((e) => ({ id: e.id, ...e.data }));
}

export async function getServers(): Promise<Server[]> {
  const locations = await getLocations();
  const entries = await getCollection("servers");

  return entries.map(({ id, data }) => {
    const location = locations.find((l) => l.id === data.location.id);
    if (!location) {
      throw new Error(`server ${id}: unknown location ${data.location.id}`);
    }

    const hostname = `${id}.${DOMAIN}`;
    return {
      id,
      hostname,
      ipv4: data.ipv4,
      ipv6: data.ipv6,
      doh: `https://${hostname}/dns-query`,
      logs: {
        // Only the hostname has a certificate, so https needs it. The plain
        // http links pin the address family, which the logs page matches on.
        https: `https://${hostname}:8443/logs`,
        ipv4: `http://${data.ipv4}:8080/logs`,
        ipv6: `http://[${data.ipv6}]:8080/logs`,
      },
      location,
    };
  });
}

export async function getLocationsWithServers(): Promise<
  LocationWithServers[]
> {
  const [locations, servers] = await Promise.all([
    getLocations(),
    getServers(),
  ]);

  return locations
    .map((l) => ({
      ...l,
      servers: servers.filter((s) => s.location.id === l.id),
    }))
    .filter((l) => l.servers.length > 0);
}
