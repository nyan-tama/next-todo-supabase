// ザスタンド以外の候補としてrecoil reduxがある
// zustandの特徴は軽量なこと
import { create } from "zustand"
import { EditedTask, EditedNotice } from "./types/types"

type State = {
    editedTask: EditedTask
    editedNotice: EditedNotice
    updateEditedTask: (payload: EditedTask) => void
    updateEditedNotice: (payload: EditedNotice) => void
    resetEditedTask: () => void
    resetEditedNotice: () => void
}

// const reset = useStore((state) => state.resetEditedTask)のように呼び出される
const useStore = create<State>((set) => ({
    editedTask: { id: "", title: "" },
    editedNotice: { id: "", content: "" },
    // ペイロードから値の取り出し
    updateEditedTask: (payload) =>
        set({
            editedTask: {
                id: payload.id,
                title: payload.title
            },
        }),
    resetEditedTask: () => set({ editedTask: { id: "", title: "" } }),
    updateEditedNotice: (payload) =>
        set({
            editedNotice: {
                id: payload.id,
                content: payload.content
            },
        }),
    resetEditedNotice: () => set({ editedNotice: { id: "", content: "" } }),
}))


export default useStore