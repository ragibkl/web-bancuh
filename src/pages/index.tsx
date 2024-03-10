import Head from "next/head";

import MapChart from "@/components/MapChart";
import Header from "@/components/Header";

function Hero(props: {}): JSX.Element {
  return (
    <div className="py-10 max-w-screen-sm mx-auto flex flex-col items-center">
      <div>
        <p className="text-5xl text-white">Adblock DNS</p>
      </div>
      <div className="mt-10">
        <p className="text-2xl text-white mx-10">
          Block ads on your entire wifi, laptop, PC, tablets and phones.
        </p>
      </div>
    </div>
  );
}

function Card(props: { title: string; children: string }): JSX.Element {
  return (
    <div className="p-5">
      <div>
        <p className="text-2xl">{props.title}</p>
      </div>
      <div className="mt-3">
        <p className="text-lg">{props.children}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Bancuh DNS: Home</title>
        <meta name="description" content="Free Adblock DNS" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header>
          <Hero />
        </Header>

        <div className="bg-white">
          <div className="container mx-auto max-w-screen-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 py-5">
              <Card title="Family-Safe and Ad-free browsing">
                Blocks intrusive ads, tracking services, and malware sites.
                Blocks sites with adult contents. Keep your family browsing
                experience safe.
              </Card>
              <Card title="Zero Cost & Completely FREE">
                This service will remain free for as long as possible. We run
                and maintain the servers out-of-pocket, so you don&apost have to
                shell out a single penny!
              </Card>
              <Card title="Minimal Setup">
                Zero installation. Point your network to our DNS servers, and
                you are done. Visit the Quick Start link to set up Adblock DNS
                on your network.
              </Card>
              <Card title="Better performance & easy on your cpu">
                Blocking ads removes the unwanted Internet traffic from your
                network. Blocking ads also reduces the processing load on your
                computer. With Adblocking done at the DNS level, there is no
                performance impact on your device. No browser extensions or
                plugins need to run on your computer.
              </Card>
              <Card title="Always updated">
                We keep our servers updated, so you can keep browsing
                worry-free. We also leverage public adblock lists maintained by
                the wide adblocking community, and our servers refresh
                constantly as the upstream lists update.
              </Card>
              <Card title="Open Source FTW!!!">
                Bancuh DNS is powered by open sourced tools and software. All
                the custom codes, scripts, and adblock list sources that we use
                are available publicly on GitHub. We continue to enhance and
                improve the project based on community feedback, and all work is
                done in the open.
              </Card>
            </div>

            <div className="py-5">
              <div className="py-5">
                <p className="text-2xl">Server locations:</p>
              </div>
              <div className="py-2">
                <MapChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
