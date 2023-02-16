// カスタムフック
// タスクの一覧取得
import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import { Notice } from "../types/types"

export const useQueryNotices = () => {
    const getNotices = async () => {
        const { data, error } = await supabase
            .from("notices")
            .select("*")
            .order("created_at", { ascending: true })
        if (error) {
            throw new Error(`${error.message}: ${error.details}`)
        }
        return data
    }
    // queryKey: React Query のキャッシュに保存されるデータのキーを指定します。この場合、["todos"] という文字列の配列が指定されており、このキーでキャッシュされたデータにアクセスできます。
    // queryFn: データを取得する関数を指定します。この場合、 getTasks 関数が指定されています。
    // staleTime: キャッシュされたデータが古くなってから再取得するまでの時間をミリ秒単位で指定します。この場合、 Infinity が指定されているため、キャッシュされたデータは期限切れになりません。
    return useQuery<Notice[], Error>({
        queryKey: ["notices"],
        queryFn: getNotices,
        staleTime: 0, //リアルタイム
        refetchOnWindowFocus: true,
    })
}