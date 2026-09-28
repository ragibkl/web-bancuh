// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://bancuh.com",
  // Dev and preview run behind the Coder workspace proxy, whose hostnames vary.
  // Production is served by nginx, so this has no effect there.
  server: { allowedHosts: true },
  integrations: [
    starlight({
      title: "Bancuh DNS",
      description:
        "Free public adblock DNS. Blocks ads, trackers, malware and adult content for your whole network.",
      favicon: "/favicon.ico",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ragibkl/adblock-dns-server",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/ragibkl/web-bancuh/edit/master/",
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Get started",
          items: [
            { label: "Quick start", slug: "start" },
            { label: "Servers", slug: "servers" },
            {
              label: "Service status",
              link: "https://status.bancuh.com",
              attrs: { target: "_blank" },
            },
          ],
        },
        {
          label: "Set up your device",
          items: [
            { label: "Wi-Fi router", slug: "setup/router" },
            { label: "Android", slug: "setup/android" },
            { label: "iPhone, iPad & Mac", slug: "setup/apple" },
            { label: "Windows 11", slug: "setup/windows-11" },
            { label: "Windows 10", slug: "setup/windows-10" },
            { label: "Linux", slug: "setup/linux" },
            { label: "Web browsers", slug: "setup/browsers" },
          ],
        },
        {
          label: "About the service",
          items: [
            { label: "What gets blocked", slug: "filtering" },
            { label: "Query logs & privacy", slug: "logs" },
            { label: "Troubleshooting", slug: "troubleshooting" },
            { label: "FAQ", slug: "faq" },
          ],
        },
        {
          label: "Self-hosting",
          items: [
            { label: "Overview", slug: "self-hosting" },
            {
              label: "Run with Docker Compose",
              slug: "self-hosting/docker-compose",
            },
            { label: "Enable DoT & DoH", slug: "self-hosting/tls" },
            {
              label: "Customise the blocklist",
              slug: "self-hosting/blocklists",
            },
            {
              label: "Configuration reference",
              slug: "self-hosting/configuration",
            },
          ],
        },
      ],
    }),
  ],
});
