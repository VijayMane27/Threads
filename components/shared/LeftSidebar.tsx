"use client";

import Link from "next/link";
import React from "react";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, useClerk, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { userId } = useAuth();

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = "/sign-in";
    });
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isactive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname == link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isactive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6" onClick={handleSignOut}>
        <SignedIn>
          <div className="flex cursor-pointer gap-4 p-4">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />

            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
