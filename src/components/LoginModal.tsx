import { FC } from 'react'
import { signIn } from 'next-auth/react'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <h2>You must be logged in to be able to interact on the website.</h2>
            <button onClick={() => signIn('google')} className="bg-blue-400 px-4 py-2 text-white">Sign in with Google</button>
        </div>
    )
}

export default LoginModal