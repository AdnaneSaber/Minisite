import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@firebase'
import { onAuthStateChanged } from 'firebase/auth'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin/')) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        console.log(auth.currentUser)
        return NextResponse.redirect(url)
        setTimeout(() => {
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    console.log(user)
                } else {
                    console.log("helele")
                }
            })
        }, 1000);
    }
}
