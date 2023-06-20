import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaGithub, FaBars } from "react-icons/fa";
import classNames from "classnames";

import { Menu, Transition } from "@headlessui/react";

function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50">
          <FaBars className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-4 z-10 mt-2 w-36 origin-top-right rounded-md bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <HeaderLink href="/start">Get Started</HeaderLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => <HeaderLink href="/faq">FAQ</HeaderLink>}
            </Menu.Item>
            <Menu.Item>{({ active }) => <GitHubLink />}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function HomeLink(props: { href: string; children: string }): JSX.Element {
  return (
    <div className="px-5 py-1">
      <Link href={props.href}>
        <p className="text-xl md:text-3xl text-white">{props.children}</p>
      </Link>
    </div>
  );
}

function HeaderLink(props: { href: string; children: string }): JSX.Element {
  const router = useRouter();
  const isActive = router.pathname.startsWith(props.href);

  return (
    <div className="px-5 py-1">
      <Link href={props.href}>
        <p
          className={classNames("md:text-2xl text-white", {
            "text-underline": isActive,
          })}
        >
          {props.children}
        </p>
      </Link>
    </div>
  );
}

function GitHubLink() {
  return (
    <div className="px-5 py-1">
      <Link href="https://github.com/ragibkl/adblock-dns-server">
        <FaGithub size="30px" color="white" />
      </Link>
    </div>
  );
}

export default function Header(props: React.PropsWithChildren) {
  return (
    <div className="bg-gray-700">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex md:invisible">
          <HomeLink href="/">Bancuh DNS</HomeLink>
          <div className="flex-1" />
          <Dropdown />
        </div>
        <div className="flex py-10 items-center max-md:hidden">
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
