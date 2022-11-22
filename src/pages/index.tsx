import { type NextPage } from "next";
import { useEffect, useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import LoginModal from "../components/Modals/LoginModal";
import Header from "../components/Layout/Header";
import ItemModal from "../components/Modals/ItemModal";
import { ShoppingItem } from "@prisma/client";

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [items, setItems] = useState<ShoppingItem[]>([])

  const { data: itemsData, isLoading } = trpc.item.getItems.useQuery()

  const { mutate: updateItem } = trpc.item.setState.useMutation({
    onSuccess(updatedItem) {
      items.map((item) => {
        if (item.id === updatedItem.id) {
          item.checked = updatedItem.checked
        }
      })
    }
  })

  useEffect(() => {
    setItems(itemsData || [])
  }, [itemsData])

  if (status === "loading" || isLoading) {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" || session === null) {
    return <LoginModal/>
  }

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="A web-based shopping list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header session={session}/>

      {isModalOpen && (
        <ItemModal
          setModalOpen={setModalOpen}
          setItems={setItems}
        />
      )}

      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Shopping List</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-400 px-4 py-2">
              ADD ITEM
            </button>
        </div>

        <ul>
          {items.map(item => (
            <li 
              className={`${item.checked && 'line-through text-green-600'} cursor-pointer`}
              onClick={() => updateItem({ id: item.id, checked: !item.checked })}>
              {item.name}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;