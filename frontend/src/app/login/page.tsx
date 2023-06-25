 'use client'

 import { getAuth } from "firebase/auth";
import { login,logout } from "@/lib/login"

export default function Login () {
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

  return (
    <div className="m-auto w-64">
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
  )
}
function useSate(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.")
}

