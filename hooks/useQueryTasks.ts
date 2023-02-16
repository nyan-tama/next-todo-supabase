// カスタムフック
// タスクの一覧取得
import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import { Task } from "../types/types"

export const useQueryTasks = () => {
    const getTasks = async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .order("created_at", { ascending: true })
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    // queryKey: React Query のキャッシュに保存されるデータのキーを指定します。この場合、["todos"] という文字列の配列が指定されており、このキーでキャッシュされたデータにアクセスできます。
    // queryFn: データを取得する関数を指定します。この場合、 getTasks 関数が指定されています。
    // staleTime: キャッシュされたデータが古くなってから再取得するまでの時間をミリ秒単位で指定します。この場合、 Infinity が指定されているため、キャッシュされたデータは期限切れになりません。
    return useQuery<Task[], Error>({
        queryKey: ["todos"],
        queryFn: getTasks,
        staleTime: Infinity,
    })
}