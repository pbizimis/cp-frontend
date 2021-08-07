import React, { useEffect, useState } from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Loading } from "../../components/Loading"
import { Nav } from "../../components/Nav"
import { Methods } from "../../components/Methods"
import { postApi } from "../../utils/use-api"

const StyleGan2ADA = () => {
  const [data, setData] = useState(false)
  const { isLoading, getAccessTokenSilently } = useAuth0()

  const url_prefix = process.env.GATSBY_AUDIENCE + "/api/v1/stylegan2ada/"

  useEffect(() => {
    const fetchData = async () => {
      const state = await postApi(
        null,
        url_prefix + "methods",
        getAccessTokenSilently
      )
      if (state.data) {
        setData(state.data)
      }
    }
    fetchData()
  }, [getAccessTokenSilently, url_prefix])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="h-screen">
      <Nav />

      <section className="max-w-7xl m-auto mt-12">
        <Methods
          getAccessTokenSilently={getAccessTokenSilently}
          data={data}
          url_prefix={url_prefix}
        />
      </section>
    </div>
  )
}

export default withAuthenticationRequired(StyleGan2ADA)
