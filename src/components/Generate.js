import React from "react"
import { Form } from "./Form"

const formOptions = {
    modelDropdown: {type: "dropdown", place: 2, name: "Model", options: ["128x128", "256x256", "512x512"], default: 0 },
    valueSlider: {type: "slider", place: 1, name: "Truncation", max: 2, min: -2, step: 0.1, default: 1 },
    http: {
        url: "/api/v1/post/protected",
        options: {
            audience: process.env.GATSBY_AUDIENCE,
            scope: 'use:all',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }
}

export function Generate({
    setApiLoading,
    setApiData,
    getAccessTokenSilently,
}) {

    return (
        <Form
            formOptions={formOptions}
            setApiLoading={setApiLoading}
            setApiData={setApiData}
            getAccessTokenSilently={getAccessTokenSilently}
        />
    )
}
