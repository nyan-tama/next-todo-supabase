import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import { Layout } from '../components/Layout'

const Csr: NextPage = () => {
  const router = useRouter()

  // 状態管理
  // 初期化のみだが、この場合、初期値として [] を渡し、tasks が空の配列として初期化されることを意味しています。
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  //   初期レンダリングのみ
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
      // 状態が後で変更される場合は、TypeScript が tasks の型を保証できなくなるので、tasks の型が Task[] であることを保証し、型チェックを通過するようにします
      setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title="CSR">
      {/* CSF client side data fetching */}
      {/* SSRでないものは自動でSSGとなる */}
      {/* ssrとssgはいつレンダリングするかで変わる */}
      {/* また、常に動的にデータを取得する場合、SSGとCSFでわけると理想 */}
      <p className="mb-3 text-blue-500">CSR(SSG + CSF)</p>
      <ul className="mb-3">
        {/* JavaScriptのアロー関数式では、ブロックを使用した複数行の関数本体を定義する場合、明示的にreturn文を使用して値を返す必要があります。 */}
        {/* この場合｛}にすること、returnを省略することで()表記もできる */}
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs">Link to ssr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Router to ssr
      </button>
    </Layout>
  )
}

export default Csr
