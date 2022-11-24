import { FC, ReactNode } from 'react'

interface ListProps {
    children: ReactNode
}

const List: FC<ListProps> = ({children}) => {
    return (
        <ul className="flex flex-col gap-2 my-2">
            {children}
        </ul>
    )
}

export default List