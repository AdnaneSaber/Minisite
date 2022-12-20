import React from 'react'
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const AuthIndex = () => {
    const handleSignUp = () => {
        const auth = getAuth();
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token)

                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div>
            <button onClick={handleSignUp}>handleSignUp</button>
        </div>
    )
}

export default AuthIndex