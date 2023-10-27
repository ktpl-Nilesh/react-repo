"use client"

import { useContext } from "react"
import { useSelector } from "react-redux"

import { AuthContext } from "@data/context/AuthContext"

export default function ClientTest() {
  const data = useSelector((store) => store.appState)
  console.log("🚀 ~ file: client-test.jsx:10 ~ ClientTest ~ data:", data)
  const { token, user, login } = useContext(AuthContext)

  return (
    <div data-id="client-test">
      <h2>
        {token} - {user}
      </h2>
      <button onClick={() => login("new_client_side_token")}>
        Get new token
      </button>
    </div>
  )
}
