import { ShoppingItem } from '@prisma/client'
import { FC } from 'react'

interface ListItemProps {
    item: ShoppingItem
    updateItem: any
    deleteItem: any
}

const ListItem: FC<ListItemProps> = ({item, updateItem, deleteItem}) => {
    return (
        <li className="flex justify-between items-center p-2 border-[1px] border-dashed border-gray-600">
            <span>{item.name}</span>

            <div className="flex gap-2">
                <button 
                    className="bg-green-600 text-white p-1"
                    onClick={() => updateItem({ id: item.id, checked: !item.checked })}>
                    { !item.checked ? 'CHECK' : 'UNCHECK' }
                </button>
                <button
                    className="bg-red-600 text-white p-1"
                    onClick={() => deleteItem({ id: item.id })}>
                    DELETE
                </button>
            </div>
        </li>
    )
}

export default ListItem