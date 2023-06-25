'use client'

import { getAuth } from "firebase/auth";
import { login,logout } from "@/lib/login"
import { useState } from "react";

type Task ={
  description:String
  id:string
  reason:string,
  title:string,
}
export default function Login () {
  const [tasks,setTaks] = useState<Task[]>([])
  const handleClickLogin = () => {
    login()
  }
  const handleClickLogout = () => {
    logout()
  }
  const handleClickLoginCheck = () => {
    const auth = getAuth()
    if(auth.currentUser){
      alert(`${auth.currentUser?.displayName}でログインしてます。`)
    }else{
      alert('ログインしてないです。')
    }
  }
  const handleClickGetTask = () => {
    fetch(`${process.env.NEXT_PUBLIC_BE_API_URL}/task`)
    .then((response) => response.json())
    .then((data) => {
      console.log({data})
      setTaks(data.tasks)
    });
  }

  return (
    <div className="w-72 mx-auto">
      <div className="mb-8">
        <h2>Login</h2>
        <div>
          <button onClick={handleClickLogin}>
            Googleでログイン
          </button>
        </div>
        <div>
          <button onClick={handleClickLogout}>
            ログアウト
          </button>
        </div>
        <div>
          <button onClick={handleClickLoginCheck}>
            ログインチェック
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2>タスク一覧</h2>
        <div>
          <button onClick={handleClickGetTask}>
            タスクの取得
          </button>
        </div>
        <ul>
          {tasks?.map(task => 
            (<li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}


