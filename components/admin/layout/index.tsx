import React, { useState } from 'react'
import KManager from '../../kmanager'

type Props = {
    preview?: boolean
    children: React.ReactNode
}

const LayoutAdmin = ({ preview, children }: Props) => {
    const [activeKManager, setActiveKManager] = useState(true)
    const [KMImage, setKMImage] = useState("")
    const closeKManager = () => {
        setActiveKManager(false)
    }
    return (

        <>
            <div className="min-h-screen">
                <button onClick={() => setActiveKManager(!activeKManager)}>{KMImage || "h"}</button>
                {activeKManager ? <KManager setImage={setKMImage} active close={closeKManager} /> : <div></div>}
                <main>{children}</main>
            </div>
        </>
    )
}

export default LayoutAdmin