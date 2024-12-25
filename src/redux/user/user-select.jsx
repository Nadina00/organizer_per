 const selectUser = state =>  state.user.user;
 const selectisLoaderUser = state => state.user.isLoader;
 const selectIsLogging = state => state.user.isLogging
 const selectIsRefreshingUser = state => state.user.isRefreshingUser
 const selectToken = state => state.user.token
 const selectError = state => state.user.error

 
const authSelector = {
    selectUser, 
    selectisLoaderUser,
    selectIsLogging,
    selectIsRefreshingUser, 
    selectToken,
    selectError
}


export default authSelector