import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Header from "../components/Header";
import { locations, servers } from "../services/servers";

import homeRouterImage from "../images/home_router.drawio.png";
import homeRouterLoginImage from "../images/home_router_login.png";
import homeRouterWanIPImage from "../images/home_router_wan_ip.png";
import homeRouterWanIP6Image from "../images/home_router_wan_ip6.png";
import win10AdapterListImage from "../images/windows_10_adapter_list.png";
import win10AdapterPropertiesImage from "../images/windows_10_adapter_properties.png";
import win10Ipv4Image from "../images/windows_10_ipv4.png";
import win10Ipv6Image from "../images/windows_10_ipv6.png";

export default function FAQPage() {
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("");

  const locationServers = servers.filter((s) => s.location === location);

  return (
    <>
      <Head>
        <title>Bancuh DNS: Getting Started</title>
        <meta name="description" content="Free Adblock DNS" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header />

        <div className="bg-white">
          <div className="container mx-auto max-w-screen-lg p-10 min-h-screen">
            <p className="text-4xl">Getting Started</p>

            <div className="py-3">
              <p className="text-xl font-semibold py-2">Select a Location</p>
              <p className="text-lg text-indent-2">
                Pick a location of servers closest to you!
              </p>

              <select
                onChange={(e) => setLocation(e.currentTarget.value)}
                value={location}
              >
                <option value="">Select Location</option>
                {locations.map((l) => (
                  <option value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>

            {location && (
              <div className="py-3">
                <p className="text-xl font-semibold py-2">
                  Select device to setup
                </p>
                <select
                  onChange={(e) => setDevice(e.currentTarget.value)}
                  value={device}
                >
                  <option value="">Select Device</option>
                  <option value="wifi">WiFi Router</option>
                  <option value="android">Android</option>
                  <option value="win10">Windows 10</option>
                </select>
              </div>
            )}

            {device === "wifi" && (
              <div className="py-3">
                <p className="text-xl font-semibold py-2">
                  Overview of Common WiFi DNS Setup
                </p>

                <Image src={homeRouterImage} alt="" />

                <p className="text-lg text-indent-2 py-2">
                  The above image shows the typical setup of a home WiFi
                  Network. Usually, there is a WiFi router that connects to the
                  internet via some ISP provided connection. The WiFi router
                  then gets automatically assigned an IP Address and a set of
                  DNS servers to use <b>(WAN DNS)</b>. Usually, this is either
                  Google&apos;s or your ISP&apos;s public DNS servers. Whenever
                  the router needs to resolve a domain name into an ip address,
                  it will use these DNS servers.
                </p>

                <p className="text-lg text-indent-2 py-2">
                  All clients on the network connect to the WiFi router. Each
                  client then gets assigned an IP address automatically via
                  DHCP, and also a DNS server to use <b>(Client DNS)</b>.
                  Usually, the DNS server here is the same as the router ip
                  address. When the client needs to resolve a domain name into
                  ip address, it will use the router DNS endpoint.
                </p>

                <p className="text-lg text-indent-2 py-2">
                  For this typical setup, DNS resolution usually works as
                  follows:
                </p>

                <p className="text-lg text-indent-2 py-2">
                  <ol className="list-decimal list-outside ml-5">
                    <li>
                      Client device needs to resolve Domain Name to an ip
                      address
                    </li>
                    <li>
                      Client device sends the DNS request to router{" "}
                      <b>(Client DNS)</b>
                    </li>
                    <li>
                      Router checks memory cache for the DNS answer, and returns
                      that if available
                    </li>
                    <li>
                      Otherwise, router sends DNS request upstream to Google or
                      ISP&apos;s DNS <b>(WAN DNS)</b>
                    </li>
                    <li>
                      DNS answer from upstream is cached in memory by the
                      router, and also returned to the client
                    </li>
                  </ol>
                </p>

                <p className="text-xl font-semibold py-2">
                  Setup Bancuh DNS via WiFi WAN DNS
                </p>

                <p className="text-lg text-indent-2 py-2">
                  In order to setup Bancuh DNS on your WiFi, we only need to
                  change the <b>WAN DNS</b> setting on the WiFi router to use{" "}
                  <b>Bancuh DNS</b>. With this single change, all DNS requests
                  from all clients in the network will be answered by{" "}
                  <b>Bancuh DNS</b>. There should be no need to make any DNS
                  changes to individual clients.
                </p>

                <p className="text-lg text-indent-2 py-2">
                  The steps can be something like this:
                </p>

                <p className="text-lg text-indent-2 py-2">
                  <ol className="list-decimal list-outside ml-5">
                    <li>
                      On your browser, enter the ip address of your router You
                      might have to enter your router admin credentials to
                      proceed
                      <Image
                        alt=""
                        className="ml-10"
                        src={homeRouterLoginImage}
                        width={400}
                      />
                    </li>
                    <li>
                      Go to WAN settings page. Look for DNS settings.
                      <Image
                        alt=""
                        className="ml-10"
                        src={homeRouterWanIPImage}
                        width={800}
                      />
                    </li>
                    <li>
                      Update the <b>WAN DNS</b> values to use{" "}
                      <b>Bancuh DNS servers</b>. You can use the following
                      values:
                      <ul className="list-disc list-outside ml-5">
                        {locationServers.map((s) => (
                          <li key={s.fullName}>
                            <b>{s.shortName}</b>
                            <ul className="list-disc list-outside ml-5">
                              <li>ipv4: {s.ipv4}</li>
                              <li>ipv6: {s.ipv6}</li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      It is also possible that your router have a separate page
                      for managing <b>ipv6 WAN DNS</b> addresses. If so,
                      you&apos;ll have to change these at the appropriate
                      locations.
                      <Image
                        alt=""
                        className="ml-10"
                        src={homeRouterWanIP6Image}
                        width={800}
                      />
                    </li>
                  </ol>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
