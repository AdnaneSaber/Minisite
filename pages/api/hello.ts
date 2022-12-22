import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, User } from "firebase/auth";
import { auth } from '@firebase';

type Data = {
    user: any
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    console.log(req.body)
    const user = auth.currentUser
    res.status(200).json({ user })
}