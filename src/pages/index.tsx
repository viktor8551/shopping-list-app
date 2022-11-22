import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import LoginModal from "../components/LoginModal";

const Home: NextPage = () => {
  const { data: Session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <LoginModal/>
  }

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="A web-based shopping list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="mx-auto my-12 max-w-3xl">
        <h1 className="text-3xl font-semibold">Shopping List</h1>

        <ul>
          <li></li>
        </ul>
      </main>
    </>
  );
};

export default Home;