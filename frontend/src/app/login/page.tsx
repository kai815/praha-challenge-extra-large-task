'use client'

export default function Login () {
  const handleClickLogin = ()=>{
    console.log("login")
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
