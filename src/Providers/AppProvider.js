import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { API, ERROR, LOADING } from ".";

export const AppContext = React.createContext()

export default AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)



    return (
        <AppContext.Provider value={{
            loading,
            setLoading
        }} >
            {children}
        </AppContext.Provider>
    )
}