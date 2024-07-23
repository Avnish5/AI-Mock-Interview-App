"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

function Header() {
  const path = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} alt={"logo image"} height={50} width={50} />
      <ul className="flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-purple-800 font-bold"
            }`}
          >
            Dashboard
          </li>
        </Link>
        <li
          className={`hover:text-primary hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/questions" && "text-purple-800 font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-purple-800 font-bold"
          }`}
        >
          Upgrade
        </li>
        <Link href={'/howitworks'}>
        <li
          className={`hover:text-primary hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/how" && "text-purple-800 font-bold"
          }`}
        >
          How it works?
        </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
