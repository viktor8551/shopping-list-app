import { FC } from 'react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

interface HeaderProps {
    session: Session
}

const Header: FC<HeaderProps> = ({session}) => {
    return (
        <header className="flex justify-between relative left-0 right-0 px-12 py-4 bg-gray-700 text-white">
            <h1 className="text-3xl font-bold">Shopping List</h1>

            <div className="flex gap-8">
                <button
                    onClick={() => signOut()}
                    className="bg-blue-400 px-4 py-2">
                    Sign Out
                </button>

                <div className="flex items-center gap-2">
                    <img
                        src={session.user?.image!}
                        className="w-8 rounded-full"
                    />
                    <p>{session.user?.name}</p>
                </div>
            </div>
        </header>
    )
}

export default Header