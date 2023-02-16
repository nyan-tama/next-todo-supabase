export type Task = {
    id: string
    created_at: string
    title: string
    user_id: string | undefined
}
export type Notice = {
    id: string
    created_at: string
    content: string
    user_id: string | undefined
}

// 取り除いた記述
// idとtitleだけ
export type EditedTask = Omit<Task, "created_at" | "user_id">
// idとcontentだけ
export type EditedNotice = Omit<Notice, "created_at" | "user_id"> 