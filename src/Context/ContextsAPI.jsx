import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const editResponseContext = createContext()

function ContextsAPI({ children }) {
    const [addresponse, setAddResponse] = useState("")
    const [editResponse, setEditResponse] = useState("")
    return (
        < >
            <addResponseContext.Provider value={{ addresponse, setAddResponse }}>
                <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
                    {children}
                </editResponseContext.Provider>
            </addResponseContext.Provider>
        </>
    )
}

export default ContextsAPI