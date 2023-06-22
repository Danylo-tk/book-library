import { Button } from "@/components/Button";
import Link from "next/link";

export function Header() {
  return (
    <nav className="flex items-center justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-black py-5">
      <span className="text-3xl">📚</span>

      <Button>Sign In</Button>
      {/* <ul className="flex list-none gap-5 text-3xl uppercase">
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
      </ul> */}
    </nav>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center">
        <div className="h-14"></div>

        <h1 className="max-w-2xl text-3xl md:text-6xl">
          Your next personal super mega dope book library
        </h1>

        <div className="h-28"></div>

        <div className="flex flex-col items-center gap-5">
          <p>*** You need to log in for further actions ***</p>
          <a href="">
            <Button>Sign In</Button>
          </a>
        </div>
      </div>
    </main>
  );
}
