import { Button } from "@/components/Button";
import { auth, signInWithGoogle } from "@/firebase/firebase";
import { User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <nav className="flex items-center justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-black py-5 ">
      <span className="text-3xl">📚</span>

      <ul className="flex list-none items-center gap-4 text-xl uppercase sm:gap-7 sm:text-3xl">
        <li className="no-underline">
          <a
            href="https://github.com/Danylo-tk/book-library"
            className="text-black no-underline hover:text-acidGreen active:text-black"
          >
            About
          </a>
        </li>
        <li>
          <Link
            href={"/book-list"}
            className="text-black no-underline hover:text-acidGreen active:text-black"
          >
            List
          </Link>
        </li>
        <li>
          <Link
            href={"/book-editor"}
            className="text-black no-underline hover:text-acidGreen active:text-black"
          >
            Add
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Home() {
  return (
    <main className="h-full ">
      <Header />
      <div className="flex h-full flex-col items-center">
        <div className="h-14"></div>

        <div className="">
          <div className="flex justify-between text-[5vw] text-gray-300">
            <span>l</span>
            <span>i</span>
            <span>b</span>
            <span>r</span>
            <span>a</span>
            <span>r</span>
            <span>y</span>
          </div>
          <h1 className=" text-[17vw] font-normal uppercase">
            B<span className="text-violet-500">o</span>
            <span className="text-orange-500">o</span>
            <span className="text-blue-500">o</span>
            <span className="text-green-500">o</span>
            ks
          </h1>
        </div>

        <div className="h-20 sm:h-14"></div>

        <div>
          <p className="text-center text-3xl">
            *Unlock the magic of literature in Books library, the ultimate book
            lover&apos;s sanctuary.*
          </p>
        </div>
      </div>
    </main>
  );
}
