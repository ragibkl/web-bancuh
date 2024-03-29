export type Server = {
  location: string;
  shortName: string;
  fullName: string;
  ipv4: string;
  ipv6: string;
};

export type Location = {
  name: string;
  coordinates: [number, number];
};

export const locations: Location[] = [
  { name: "Tokyo", coordinates: [139.6503, 35.6762] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
  { name: "France", coordinates: [2.2137, 46.2276] },
  { name: "Dallas", coordinates: [-96.797, 32.7767] },
];

export const servers: Server[] = [
  {
    shortName: "sg-dns1",
    location: "Singapore",
    fullName: "sg-dns1.bancuh.com",
    ipv4: "139.59.219.245",
    ipv6: "2400:6180:0:d0::f7:1001",
  },
  {
    shortName: "sg-dns2",
    location: "Singapore",
    fullName: "sg-dns2.bancuh.com",
    ipv4: "139.59.218.207",
    ipv6: "2400:6180:0:d0::f5:7001",
  },
  {
    shortName: "fr-dns1",
    location: "France",
    fullName: "fr-dns1.bancuh.com",
    ipv4: "51.158.99.7",
    ipv6: "2001:bc8:710:1efa:dc00:ff:fe34:a339",
  },
  {
    shortName: "fr-dns2",
    location: "France",
    fullName: "fr-dns2.bancuh.com",
    ipv4: "163.172.180.231",
    ipv6: "2001:bc8:710:1efb:dc00:ff:fe34:a1d7",
  },
  {
    shortName: "jp-dns1",
    location: "Tokyo",
    fullName: "jp-dns1.bancuh.com",
    ipv4: "103.29.68.118",
    ipv6: "2400:8902::f03c:92ff:fe3e:46cd",
  },
  {
    shortName: "jp-dns2",
    location: "Tokyo",
    fullName: "jp-dns2.bancuh.com",
    ipv4: "172.105.195.19",
    ipv6: "2400:8902::f03c:94ff:fee9:70",
  },
  {
    shortName: "us-dns1",
    location: "Dallas",
    fullName: "us-dns1.bancuh.com",
    ipv4: "45.33.24.129",
    ipv6: "2600:3c00::f03c:94ff:fe97:f94f",
  },
];
