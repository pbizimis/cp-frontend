import React, { useEffect, useState } from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Loading } from "../../components/Loading"
import { Nav } from "../../components/Nav"
import { Link } from "gatsby"
import { UserImages } from "../../components/UserImages"
import { postApi } from "../../utils/use-api"

const Console = () => {

  const [data, setData] = useState(false)
  const { isLoading, getAccessTokenSilently } = useAuth0()

  const url = process.env.GATSBY_AUDIENCE + "/api/v1/models/"

  useEffect(() => {
    const fetchData = async () => {
      const state = await postApi(
        null,
        url,
        getAccessTokenSilently
      )
      if (state.data && "stylegan_models" in state.data) {
        setData(state.data.stylegan_models)
      }
    }
    fetchData()
  }, [getAccessTokenSilently, url])

  if (isLoading || !data) {
    return <Loading />
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Nav />

      <section className="max-w-7xl m-auto mt-24">
        <div className="bg-white">
          {/* Header */}
          <div className="relative pb-32 bg-gray-800">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
                alt=""
              />
              <div
                className="absolute inset-0 bg-gray-800 mix-blend-multiply"
                aria-hidden="true"
              />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                StyleGan Versions
              </h1>
              <p className="mt-6 max-w-3xl text-xl text-gray-300">
                Varius facilisi mauris sed sit. Non sed et duis dui leo,
                vulputate id malesuada non. Cras aliquet purus dui laoreet diam
                sed lacus, fames. Dui, amet, nec sit pulvinar.
              </p>
            </div>
          </div>

          {/* Overlapping cards */}
          <section
            className="-mt-32 max-w-7xl mx-auto relative z-10 px-4 lg:px-8"
            aria-labelledby="contact-heading"
          >
            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-5 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map(stylegan => (
                    <div
                      key={stylegan.version}
                      className="bg-white overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {stylegan.version}
                              </dt>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <Link
                            to={stylegan.version.toLowerCase()}
                            className="font-medium text-cyan-700 hover:text-cyan-900"
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="max-w-7xl m-auto mt-24">
        <UserImages radioForm={false} />
      </section>
    </div>
  )
}

export default withAuthenticationRequired(Console)
