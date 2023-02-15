import Link from 'next/link'
import { useRouter } from 'next/router'
//Next.jsのフレームワークで使用される型で、Reactコンポーネントを表す型として定義されています。
import { NextPage } from 'next'
//GetStaticPropsの型インポート
import { GetServerSideProps } from 'next'
// レイアウト定義
import { Layout } from '../components/Layout'
//API設定
import { supabase } from '../utils/supabase'
// 型インポート
import { Task, Notice } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getStaticProps/ssg invoked')
  // supabaseからデータ取得例
  // {
  //   data: [
  //     { ... }, // レコード1
  //     { ... }, // レコード2
  //     { ... }, // レコード3
  //     // ...
  //   ]
  // }
  // 分割代入 型ではない　通常は型のプロパティ名として、キャメルケースで記述することが推奨されています。
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  // JavaScriptのオブジェクトリテラルの構文では、プロパティ名とプロパティ値をコロン(:)で区切り、プロパティとプロパティの間はカンマ(,)で区切ります。
  return { props: { tasks, notices } }
}

type ServerProps = {
  tasks: Task[]
  // ex Task = {
  //    id: string
  //    created_at: string
  //    title: string
  //    user_id: string | undefined
  // }
  notices: Notice[]
  // ex  Notice = {
  //      id: string
  //      created_at: string
  //      content: string
  //      user_id: string | undefined
  // }
}

const Ssr: NextPage<ServerProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <p className="mb-3 text-pink-500">SSR</p>
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
      <Link href="/ssg" prefetch={false}>
        <a className="my-3 text-xs">Link to ssg</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="mb-3 text-xs">Link to isr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Router to ssg
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
        Router to isr
      </button>
    </Layout>
  )
}

export default Ssr
