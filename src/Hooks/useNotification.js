import { useContext } from "react"
import { useQuery } from "react-query"
import { API } from "../Providers"
import { AuthContext } from "../Providers/AuthProvider"

const useNotification = () => {

    const { userData } = useContext(AuthContext)

    const getNotifications = () => useQuery({
        queryKey: ['notifications', userData?.uid],
        queryFn: () => API.get('user/get-notification?',),
        enabled: !!userData?.uid,
        select: res => res.data.data.notification
    })

    return { getNotifications }
}

export default useNotification