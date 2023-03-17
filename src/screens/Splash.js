import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default Splash = ()=>{

    const { redirect } = useContext(AuthContext)
    useEffect(() => {
        redirect()
    }, [])

    return (
        null
    )
}