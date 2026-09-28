// Apple configuration profiles (iOS 14+, iPadOS 14+, macOS 11+) that switch
// the device's system DNS to one Bancuh server over DNS-over-HTTPS.
import { createHash } from "node:crypto";
import type { APIRoute, GetStaticPaths } from "astro";

import { DOMAIN, getServers, type Server } from "../../lib/servers";

export const getStaticPaths = (async () => {
  const servers = await getServers();
  return servers.map((server) => ({
    params: { id: server.id },
    props: { server },
  }));
}) satisfies GetStaticPaths;

// Profiles are matched by UUID when reinstalled, so these must be stable
// across builds: derive them from a name rather than generating them.
function stableUuid(name: string): string {
  const h = createHash("sha256").update(name).digest("hex");
  const variant = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  return [
    h.slice(0, 8),
    h.slice(8, 12),
    `5${h.slice(13, 16)}`,
    `${variant}${h.slice(17, 20)}`,
    h.slice(20, 32),
  ]
    .join("-")
    .toUpperCase();
}

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function profile(server: Server): string {
  const identifier = `${DOMAIN.split(".").reverse().join(".")}.dns.${server.id}`;
  const name = `Bancuh DNS (${server.id})`;
  const str = (s: string) => `<string>${escapeXml(s)}</string>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>DNSSettings</key>
      <dict>
        <key>DNSProtocol</key>
        ${str("HTTPS")}
        <key>ServerURL</key>
        ${str(server.doh)}
        <key>ServerAddresses</key>
        <array>
          ${str(server.ipv4)}
          ${str(server.ipv6)}
        </array>
      </dict>
      <key>PayloadDisplayName</key>
      ${str(name)}
      <key>PayloadIdentifier</key>
      ${str(`${identifier}.settings`)}
      <key>PayloadType</key>
      ${str("com.apple.dnsSettings.managed")}
      <key>PayloadUUID</key>
      ${str(stableUuid(`${identifier}.settings`))}
      <key>PayloadVersion</key>
      <integer>1</integer>
    </dict>
  </array>
  <key>PayloadDescription</key>
  ${str(`Sends this device's DNS queries to ${server.hostname} over DNS-over-HTTPS, blocking ads, trackers and unsafe sites. See https://${DOMAIN}/setup/apple/`)}
  <key>PayloadDisplayName</key>
  ${str(name)}
  <key>PayloadIdentifier</key>
  ${str(identifier)}
  <key>PayloadRemovalDisallowed</key>
  <false/>
  <key>PayloadType</key>
  ${str("Configuration")}
  <key>PayloadUUID</key>
  ${str(stableUuid(identifier))}
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
`;
}

export const GET: APIRoute = ({ props }) =>
  new Response(profile(props.server as Server), {
    headers: { "Content-Type": "application/x-apple-aspen-config" },
  });
