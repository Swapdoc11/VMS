import { createContext, useEffect, useReducer } from "react"


export const INNITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user'))||null,
}
export const UserInformation = createContext(INNITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state

    }
}
export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INNITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(state.user))
    },[state.user])
    return(

        <UserInformation.Provider value={{
            user:state.user,
            dispatch
        }}>
            {children}
        </UserInformation.Provider>
    )

    

}