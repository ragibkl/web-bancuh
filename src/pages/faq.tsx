import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header";
import { servers } from "../services/servers";

function FAQ(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-3">
      <p className="text-xl font-semibold py-2">{props.title}</p>
      <div className="text-lg text-indent-2">{props.children}</div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>Bancuh DNS: FAQ</title>
        <meta name="description" content="Free Adblock DNS" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header />

        <div className="bg-white">
          <div className="container mx-auto max-w-screen-lg py-10">
            <p className="text-4xl">FAQ</p>

            <FAQ title="How much does this cost?">
              It&apos;s free. I never intended to charge people for this anyway.
              I might set up some ways for you to be able to donate to me to
              keep this running. I am open to suggestions.
            </FAQ>

            <FAQ title="What are the IP addresses of your DNS servers?">
              My servers:
              <ul className="list-disc list-inside">
                {servers.map((s) => (
                  <li key={s.fullName}>
                    <b>{s.shortName}</b>
                    <ul className="list-none list-inside ml-5">
                      <li>DoT: {s.fullName}</li>
                      <li>DoH: https://{s.fullName}/dns-query</li>
                      <li>Do53-ipv4: {s.ipv4}</li>
                      <li>Do53-ipv6: {s.ipv6}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </FAQ>

            <FAQ title="How do I set it up?">
              Follow the instructions on the{" "}
              <Link href="/start">Get Started</Link> page to get started.
            </FAQ>

            <FAQ title="Who should use this service?">
              If you don&apos;t like to see ads while browsing, use this.
              Currently, we also filter out some known adult content sites, so
              if you apply this to your home router, we can make the internet a
              little safer for your kids.
            </FAQ>

            <FAQ title="What type of content is blocked?">
              We try to block the following:
              <ul className="list-disc list-inside">
                <li>Known ad servers</li>
                <li>Known malware sites</li>
                <li>Known adult content sites</li>
              </ul>
            </FAQ>

            <FAQ title="How does DNS adblocking work?">
              Whenever your browser or apps need to load content from the
              Internet, your device will first have to find out the IP address
              of the server with that content. It will first look in your
              system&apos;s hosts file. Next, it will try your DNS servers. DNS
              servers then provides the IP address of the domain name that
              serves the content. Having the correct IP address of domain names
              is crucial for loading Internet content.
              <br />
              <br />
              An adblock DNS server however, does something extra. If the domain
              name is known for hosting ads, we perform a &apos;white lie&apos;,
              and redirect to a null server. Not having the correct IP address
              for adservers means that ads will fail to load.
              <br />
              <br />
              If you use any available adblock DNS server on your home router,
              or your laptop, ads won&apos;t load.
              <br />
            </FAQ>

            <FAQ title="Why not use a browser extension instead?">
              Ideally, you should use browser adblock extensions whenever they
              are available. Also use adblock dns servers to cover other use
              cases.
              <br />
              <br />
              The most common way to block ads, is to install a browser
              extension that block ads on the browser. If you use Firefox or
              Chrome on a laptop/PC, then there are several extensions to choose
              from. It is also quite effective.
              <br />
              <br />
              However not all browsers and devices will have available
              extensions. Some mobile apps nowadays also have ads placeholder
              in-app, and extensions will not apply here.
              <br />
              <br />
              Extensions also only apply to a single browser where it&apos;s
              installed. You probably don&apos;t want to install adblock
              extensions on every single device on your home network. In
              comparison, adblock dns will apply to your entire network.
            </FAQ>

            <FAQ title="Why not edit the hosts file instead?">
              Actually, using hosts file would be slightly faster and more
              reliable than using our adblock DNS servers. When possible, you
              should use hosts file instead. Again, you can still use our
              adblock DNS servers to cover for other use cases. Here&apos;s why.
              <br />
              <br />
              Host files work offline, your device will immediately know which
              ad domains to block, without relying on external providers. You
              can then stick to Google&apos;s DNS or OpenDNS servers for regular
              content, which should be more reliable and faster than my own
              servers.
              <br />
              <br />
              There are also tools that can help you configure this. AdAway
              works on rooted Android devices. Some projects
              (https://github.com/StevenBlack/hosts) provide hosts files that
              you can use straight away.
              <br />
              <br />
              But again, it does not work for all devices. I am not sure if it
              is possible on IOS, and doing this on Android requires the device
              to be rooted. And you have to configure each single device on your
              network.
              <br />
              <br />
              It is also possible that you are also using your hosts file for
              other purposes, and you don&apos;t want to pollute it with
              thousands of lines of ad domains. Also, a misconfigured host file
              will disrupt your Internet.
              <br />
              <br />
              Use adblock DNS when you don&apos;t want to deal with hosts file.
              It&apos;s easier.
            </FAQ>

            <FAQ title="Is it possible to host adblock DNS servers myself?">
              Certainly. There are several guides on the Internet on how to set
              this up. This has been done before numerous times.
              <br />
              <br />I recommend you get started with my project on github at
              https://github.com/ragibkl/adblock-dns-server. Using a few
              commands, you can get up and running within minutes.
            </FAQ>

            <FAQ title="It does not seem to work. How do I fix this?">
              At the moment, we don&apos;t have a dedicated troubleshooting page
              or help page yet. Will add this soon.
              <br />
              <br />
              For now, head over to the project issues page on GitHub at
              https://github.com/ragibkl/adblock-dns-server/issues
            </FAQ>
          </div>
        </div>
      </main>
    </>
  );
}
