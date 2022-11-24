import { type NextPage } from "next";
import { useEffect, useState } from 'react'
import Head from "next/head";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import LoginModal from "../components/Modals/LoginModal";
import Header from "../components/Layout/Header";
import ItemModal from "../components/Modals/ItemModal";
import { ShoppingItem } from "@prisma/client";
import ListItem from "../components/Core/ListItem";
import List from "../components/Core/List";

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

  const { mutate: deleteItem } = trpc.item.deleteItem.useMutation({
    onSuccess(deletedItem) {
      const newList = items.filter((item) => item.id !== deletedItem.id)
      setItems(newList)
    }
  })

  useEffect(() => {
    setItems(itemsData || [])
  }, [itemsData])

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    )
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

      <main className="grid gap-8 mx-4 md:grid-cols-2 md:gap-14 md:mx-12 my-12">
        <div className="border-2 border-dashed border-gray-300 p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Shopping List</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-400 px-4 py-2">
                ADD ITEM
              </button>
          </div>

          <List>
            {items.map(item => !item.checked && (
              <ListItem
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
          </List>
        </div>

        <div className="border-2 border-dashed border-gray-300 p-5">
          <h1 className="text-3xl font-semibold">Checked Items</h1>

          <List>
            {items.map(item => item.checked && (
              <ListItem
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
          </List>
        </div>
      </main>
    </>
  );
};

export default Home;