import React, { useState } from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Loading } from "../components/Loading"
import { Nav } from "../components/Nav"
import { Models } from "../components/Models"

const Console = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Nav />

      <section className="max-w-7xl m-auto mt-24">
        <Models getAccessTokenSilently={getAccessTokenSilently} />
      </section>
    </div>
  )
}

export default withAuthenticationRequired(Console)
