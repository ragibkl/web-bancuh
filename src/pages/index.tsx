import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomeLink(props: { children: string }): JSX.Element {
  return (
    <div className="px-5">
      <a href="_blank">
        <p className="text-2xl text-white">{props.children}</p>
      </a>
    </div>
  );
}

function HeaderLink(props: { children: string }): JSX.Element {
  return (
    <div className="px-5">
      <a href="_blank">
        <p className="text-lg text-white">{props.children}</p>
      </a>
    </div>
  );
}

function Hero(props: {}): JSX.Element {
  return (
    <div className="py-10 max-w-screen-sm mx-auto flex flex-col items-center">
      <div>
        <p className="text-5xl text-white">Adblock DNS</p>
      </div>
      <div className="mt-10">
        <p className="text-2xl text-white">
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
    <main>
      <div className="bg-gray-700">
        <div className="container mx-auto max-w-screen-lg">
          <div className="flex py-10 items-center">
            <HomeLink>BANCUH</HomeLink>
            <HeaderLink>Get Started</HeaderLink>
            <HeaderLink>FAQ</HeaderLink>
            <div className="flex-1" />
          </div>

          <Hero />
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto max-w-screen-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 py-10">
            <Card title="Family-Safe and Ad-free browsing">
              Blocks intrusive ads, tracking services, and malware sites. Blocks
              sites with adult contents. Keep your family browsing experience
              safe.
            </Card>
            <Card title="Zero Cost & Completely FREE">
              This service will remain free for as long as possible. We run and
              maintain the servers out-of-pocket, so you don't have to shell out
              a single penny!
            </Card>
            <Card title="Minimal Setup">
              Zero installation. Point your network to our DNS servers, and you
              are done. Visit the Quick Start link to set up Adblock DNS on your
              network.
            </Card>
            <Card title="Better performance & easy on your cpu">
              Blocking ads removes the unwanted Internet traffic from your
              network. Blocking ads also reduces the processing load on your
              computer. With Adblocking done at the DNS level, there is no
              performance impact on your device. No browser extensions or
              plugins need to run on your computer.
            </Card>
            <Card title="Always updated">
              We keep our servers updated, so you can keep browsing worry-free.
              We also leverage public adblock lists maintained by the wide
              adblocking community, and our servers refresh constantly as the
              upstream lists update.
            </Card>
            <Card title="Open Source FTW!!!">
              Bancuh DNS is powered by open sourced tools and software. All the
              custom codes, scripts, and adblock list sources that we use are
              available publicly on GitHub. We continue to enhance and improve
              the project based on community feedback, and all work is done in
              the open.
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
