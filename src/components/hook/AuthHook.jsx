import { useSelector } from "react-redux"
import authSelector from "../../redux/user/user-select" 

export const useAuth = () =>{
    const isLogging = useSelector(authSelector.selectIsLogging)
    const isRefreshing = useSelector(authSelector.selectIsRefreshingUser)
    const user = useSelector(authSelector.selectUser)
    const error = useSelector(authSelector.selectError)
    
    return {
        isLogging,
        isRefreshing,
        user,
        error,        
      };
} 