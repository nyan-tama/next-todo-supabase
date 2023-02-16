import { useState } from 'react'
import { supabase } from '../utils/supabase'
import { useMutation } from 'react-query'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }
  const loginMutation = useMutation(
    // 非同期処理
    async () => {
      // 戻り値でerrorの時を格納
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
    },
    // useMutationではonSuccessもある
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const registerMutation = useMutation(
    async () => {
      console.log('pass1')
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw new Error(error.message)
    },
    // useMutationではonSuccessもある
    {
      onError: (err: any) => {
        console.log('pass2')
        alert(err.message)
        reset()
      },
    }
  )
  // returnで返してuseMutationを使えるようにする
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  }
}
