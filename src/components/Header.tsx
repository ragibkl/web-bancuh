import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaGithub } from 'react-icons/fa';
import classNames from "classnames";

function HomeLink(props: { href: string, children: string }): JSX.Element {
  return (
    <div className="px-5">
      <Link href={props.href}>
        <p className="text-3xl text-white">{props.children}</p>
      </Link>
    </div>
  );
}

function HeaderLink(props: { href: string, children: string }): JSX.Element {
  const router = useRouter();
  const isActive = router.pathname.startsWith(props.href);

  return (
    <div className="px-5">
      <Link href={props.href}>
        <p className={classNames("text-lg text-white", { 'text-underline': isActive })}>{props.children}</p>
      </Link>
    </div>
  );
}

function GitHubLink() {
  return (
    <Link href="https://github.com/ragibkl/adblock-dns-server">
      <FaGithub size="30px" color="white" />
    </Link>
  )
}

export default function Header(props: React.PropsWithChildren) {
  return (
    <div className="bg-gray-700">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex py-10 items-center">
          {/* Page links */}
          <HomeLink href="/">Bancuh DNS</HomeLink>
          <HeaderLink href="/start">Get Started</HeaderLink>
          <HeaderLink href="/faq">FAQ</HeaderLink>
          <div className="flex-1" />

          {/* External links */}
          <GitHubLink />
        </div>

        {/* Hero Section */}
        {props.children}
      </div>
    </div>
  );
}
