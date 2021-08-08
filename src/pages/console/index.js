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

  const url = process.env.GATSBY_AUDIENCE + "/api/v1/models"

  useEffect(() => {
    const fetchData = async () => {
      const state = await postApi(null, url, getAccessTokenSilently)
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
          <div className="relative pb-16 bg-gray-900 overflow-hidden">
            <div className="absolute inset-0">
              
            <div
              className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-400 opacity-20"
              aria-hidden="true"
            />
            <svg
              className="absolute m-2 animate-pulse"
              fill="none"
              viewBox="0 0 1000 1000"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-green-900 opacity-50" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={2000} height={2000} fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
            </svg>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                StyleGan Versions
              </h1>
              <p className="mt-6 max-w-3xl text-xl text-gray-300">
                Welcome to your personal <strong>WebDesigan Console</strong>! Below you can see
                the currently supported StyleGan versions. Below that, you can
                view your created images and delete them.
              </p>
            </div>
          </div>

          {/* Overlapping cards */}
          <section
            className="-mt-24 max-w-7xl mx-auto relative z-10 px-4 lg:px-8"
            aria-labelledby="contact-heading"
          >
            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-2 grid grid-cols-1 gap-5 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map(stylegan => (
                    <div
                      key={stylegan.version}
                      className="bg-white overflow-hidden shadow-lg rounded-lg"
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
                            View all methods
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
        <UserImages radioForm={false} enableDeletion={true} />
      </section>
    </div>
  )
}

export default withAuthenticationRequired(Console)
