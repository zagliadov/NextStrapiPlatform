"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as _ from "lodash";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  // {
  //   name: "Invoices",
  //   href: "/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  { name: "Glossary", href: "/glossary", icon: UserGroupIcon },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {_.map(links, (link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${pathname === link.href && "bg-sky-100 text-blue-600"} flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
