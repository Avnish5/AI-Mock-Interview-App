'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
export default function Home() {

  const user = useUser();
  console.log(user.isSignedIn);
  return (
  <div>



<section
  className=" h-screen  relative bg-[url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat"
>

  <div
    className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
      Introducing AI-Driven 

        <strong className="block font-extrabold text-rose-500"> Interviews </strong>
      </h1>

      <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
      Explore the next generation of interview assessments with our AI-powered platform. 
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <Link
          href={user.isSignedIn?'/dashboard':'/sign-up'}
          className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          {user.isSignedIn?"Go to dashboard":"Get Started"}
        </Link>

        <Link
          href={'/how-it-works'}
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>
  </div>
  );
}
