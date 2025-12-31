import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Link href={"/signin"}>
        <button>
          Sign In
        </button>
      </Link>
      <Link href={"/signup"}>
        <button>
          Sign Up
        </button>
      </Link>
    </>
  );
}
