 'use client'

import { login } from "@/lib/login"

export default function Login () {
  const handleClickLogin = () => {
    login()
  }

  return (
    <div className="m-auto w-64">
      <h2>Login</h2>
      <button onClick={handleClickLogin}>
        Googleでログイン
      </button>
    </div>
  )
}
