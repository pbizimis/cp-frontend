import React from "react"
import { useAuth0 } from '@auth0/auth0-react';

export default function Example() {

    const { isAuthenticated, user} = useAuth0();

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
                        
        <div className="hidden md:flex md:items-center md:space-x-6">
        <p className="text-base font-medium text-white hover:text-gray-300">
                            {user.name}
                        </p>
        </div>
    ) : (
        <div className="hidden md:flex md:items-center md:space-x-6">
        <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
        >
            Not logged in.
        </a>
        </div>
    )}
    </div>
  )
}
