import { ShoppingItem } from '@prisma/client';
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { trpc } from "../../utils/trpc";

interface ItemModalProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>
    setItems: Dispatch<SetStateAction<ShoppingItem[]>>
}

const ItemModal: FC<ItemModalProps> = ({setModalOpen, setItems}) => {
    const [input, setInput] = useState<string>("")

    const { mutate: addItem } = trpc.item.addItem.useMutation({
        onSuccess(item) {
            setItems((prev) => [...prev, item])
        }
    })

    return (
        <div className="flex justify-center items-center absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-80">
            <div className="w-[280px] bg-white p-6">
                <input
                    className="w-full mb-5 border-2 border-blue-400 p-2"
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Item Name"
                />

                <div className="flex justify-between">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-red-400 px-4 py-2">
                        CANCEL
                    </button>
                    <button
                        onClick={() => {
                            addItem({ name: input })
                            setModalOpen(false)
                        }}
                        className="bg-blue-400 px-4 py-2">
                        ADD
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemModal