import { auth, authors, posts } from '@firebase'
import {
    User,
    signOut,
    setPersistence,
    signInWithPopup,
    GithubAuthProvider,
    onAuthStateChanged,
    browserLocalPersistence,
} from 'firebase/auth'
import { get } from 'firebase/database'
import {
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import Link from 'next/link'
import React, { useState } from 'react'
import Author from '../../interfaces/author'
import PostType from '../../interfaces/post'

type propType = {
    postsData: PostType[]
}
type linkType = {
    text: string,
    link: string
}
const Admin = ({ postsData }: propType) => {
    const links: linkType[] = [
        {
            link: "/admin/create",
            text: "Create a new blog"
        }
    ]

    const [user, setUser] = useState<User>()

    const handleSignUp = async () => {
        const provider = new GithubAuthProvider();
        setPersistence(auth, browserLocalPersistence).then(() => {
            return signInWithPopup(auth, provider)
                .then((result) => {
                    GithubAuthProvider.credentialFromResult(result);
                }).catch((error) => {
                    alert("oAuth failed please try again later")
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // const email = error.customData.email;
                    // const credential = GithubAuthProvider.credentialFromError(error);
                });
        })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        }
    });
    const handleLogout = async () => {
        await signOut(auth)
        setUser(null)
    }
    return (
        <div className='mx-auto container px-5'>
            {user ? (
                <>
                    <button className="my-5 border p-3 rounded bg-gray-50 hover:bg-gray-100 transition-all text-md" onClick={handleLogout}>Log out</button>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="my-8 w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">Options</span>
                    </div>
                    <div className="grid grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                        {links.map(link => <Link href={link.link} key={link.link} className="border p-3 rounded bg-gray-50 hover:bg-gray-100 transition-all text-md" >{link.text}</Link>)}
                    </div>
                </>
            ) : (
                <button onClick={handleSignUp} className="bg-gray-900 text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 mt-2">
                    <svg viewBox="0 0 24 24" className="fill-current mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span className="border-l border-gray-800 h-6 w-1 block mr-1"></span>
                    <span className="pl-3">Sign up with Github</span>
                </button>
            )}
        </div>
    )
}



export const getStaticProps = async () => {
    const _posts = await get(posts)
    const _authors = await get(authors)
    const __authors: Author[] = _authors.val()
    let postsData: { [key: string]: PostType } = _posts.val()
    let _postsData: PostType[] = []
    for (const key in postsData) {
        if (Object.prototype.hasOwnProperty.call(postsData, key)) {
            const post = postsData[key];
            _postsData.push({
                ...post,
                author: {
                    ...__authors['author_' + post.author]
                }
            })
        }
    }
    return {
        props: { postsData: _postsData },
    }
}
export default Admin
// export const getServerSideProps = withAuthUserTokenSSR({
//     whenAuthed: AuthAction.REDIRECT_TO_APP,
// })()

// export default withAuthUser({
//     whenAuthed: AuthAction.REDIRECT_TO_APP,
// })(Admin)