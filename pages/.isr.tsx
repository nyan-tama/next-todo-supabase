//Next.jsのフレームワークで使用される型で、Reactコンポーネントを表す型として定義されています。
import { NextPage } from 'next'
//GetStaticPropsの型インポート
import { GetStaticProps } from 'next'
// レイアウト定義
import { Layout } from '../components/Layout'
//API設定
import { supabase } from '../utils/supabase'
// 型インポート
import { Task, Notice } from '../types/types'

// ssgと実装は同じ
// revalidate: 5 のみ違い
export const getStaticProps: GetStaticProps = async () => {
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
  return { props: { tasks, notices }, revalidate: 5 }
}

type StaticProps = {
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

const Isr: NextPage<StaticProps> = ({ tasks, notices }) => {
  return (
    <Layout title="SSG">
      <p className="mb-3 text-indigo-500">ISR</p>
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
    </Layout>
  )
}

export default Isr
