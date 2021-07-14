import React, { useEffect, useState } from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Loading } from "../../components/Loading"
import { Nav } from "../../components/Nav"
import { Models } from "../../components/Models"
import { postApi } from "../../utils/use-api"

const StyleGan2ADA = () => {
  const [data, setData] = useState(false)
  const { isLoading, getAccessTokenSilently } = useAuth0()

  const url_prefix = "http://localhost:8000/api/v1/stylegan2ada/"

  const fetchData = async () => {
      const state = await postApi(null, url_prefix + "methods", getAccessTokenSilently)
      setData(state.data)
  }

  useEffect(() => {
      fetchData();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Nav />

      <section className="max-w-7xl m-auto mt-24">
        <Models getAccessTokenSilently={getAccessTokenSilently} data={data} url_prefix={url_prefix}/>
      </section>
    </div>
  )
}

export default withAuthenticationRequired(StyleGan2ADA)
