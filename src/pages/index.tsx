import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomeLink(props: { children: string }): JSX.Element {
  return (
    <div className="px-5">
      <p className="text-2xl text-white">
        <a>{props.children}</a>
      </p>
    </div>
  );
}

function HeaderLink(props: { children: string }): JSX.Element {
  return (
    <div className="px-5">
      <a>
        <p className="text-lg text-white">{props.children}</p>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="py-2 bg-gray-500">
        <div className="flex">
          <HomeLink>BANCUH</HomeLink>

          <div className="flex-1" />

          <HeaderLink>Articles</HeaderLink>
          <HeaderLink>Adblock DNS</HeaderLink>
          <HeaderLink>About</HeaderLink>
        </div>
      </div>
    </main>
  );
}
