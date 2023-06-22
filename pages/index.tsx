import { Button } from "@/components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-black py-5">
      <span className="text-3xl">📚</span>

      {!session && (
        <a
          href={`api/auth/signin`}
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <Button>Sign In</Button>
        </a>
      )}
      {session && (
        <ul className="flex list-none items-center gap-7 text-3xl uppercase">
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
          <li>
            <a
              href={`api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <Button>Sign Out</Button>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Header />
      <div className="flex flex-col items-center">
        <div className="h-14"></div>

        <h1 className="max-w-2xl text-3xl md:text-6xl">
          Your next personal super mega dope book library
        </h1>

        <div className="h-28"></div>

        {!session && (
          <div className="flex flex-col items-center gap-5">
            <p>*** You need to log in for further actions ***</p>
            <a
              href={`api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <Button>Sign In</Button>
            </a>
          </div>
        )}
        {session && <p>*** Welcome, {session.user?.name}! ***</p>}
      </div>
    </main>
  );
}
