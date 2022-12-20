import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import KManager from '../../kmanager'

type Props = {
    preview?: boolean
    children: React.ReactNode
}
export function createCtx<A>(defaultValue: A) {
    type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
    const defaultUpdate: UpdateType = () => defaultValue;
    const ctx = createContext({
        state: defaultValue,
        update: defaultUpdate,
    });

    function Provider(props: PropsWithChildren<{}>) {
        const [state, update] = useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }
    return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
}

type contextType = {
    active: boolean,
    path: string
}

const [ctx, TextProvider] = createCtx<contextType>({
    active: false,
    path: ""
});
export const TextContext = ctx;
const LayoutAdmin = ({ preview, children }: Props) => {
    const { state, update } = useContext(TextContext);
    return (
        <TextProvider>
            <div className="min-h-screen">
                <ShowHideKManager />
                <main>{children}</main>
            </div>
        </TextProvider>
    )
}

export default LayoutAdmin

const ShowHideKManager = () => {
    const { state, update } = useContext(TextContext);
    const closeKManager = () => {
        update(e => {
            return { ...e, active: false }
        })
    }
    const [KMImage, setKMImage] = useState("")
    return state.active ? <KManager setImage={setKMImage} close={closeKManager} /> : <div></div>
}