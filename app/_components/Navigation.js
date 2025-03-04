
import NextAuth, { getServerSession } from "next-auth";
import Link from "next/link";
import {  authOptions, handler } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { useSession } from "next-auth/react";

export  default async function Navigation() {
  const data = await getServerSession()

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {data != null ?
          (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex flex-col items-center"
            >
              <img src={data?.user?.image} alt={data?.user?.name} className="w-8 h-8 rounded-full" />
              <span>Guest Area</span>
            </Link>
          ): (<Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>)}
        </li>
      </ul>
    </nav>
  );
}
