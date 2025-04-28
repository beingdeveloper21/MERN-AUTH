import {createContext} from "react";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'




export const AppContent = createContext()
export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const backendURL = import.meta.env.VITE_BACKENDURL
    const [isLoggedin,setIsLoggedin]=useState(false)
    const[userData,setUserData]=useState(null)




//     const getAuthState=async()=>{
// try{
// const {data}=await axios.get(backendURL + '/api/auth/is-auth')
// if(data.success){
//     setIsLoggedin(true)
//     getUserData()
// }
// }
// catch(error){
//     toast.error(error.message)
// }

//     }
const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      // if it's a 401, that just means “not logged in yet”—so ignore it
      if (error.response?.status !== 401) {
        toast.error(error.message);
      }
    }
  };
  const getUserData = async () => {
    try {
        const { data } = await axios.get(backendURL + '/api/user/data', {
            withCredentials: true
        });
        data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching user data.';
        toast.error(errorMessage);
    }
};

    // const getUserData = async () => {
    //     try {
    //         const { data } = await axios.get(backendURL + '/api/user/data');
    //         console.log("Backend response:", data); // Log the entire response
    //         if (data.success) {
    //             setUserData(data.userData);
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || 'An error occurred while fetching user data.';
    //         console.error("Error fetching user data:", errorMessage); // Log the error
    //         toast.error(errorMessage);
    //     }
    // };
    useEffect(() => {
      getAuthState();
    }, [])
    
    
    const value={
         backendURL,
         isLoggedin,setIsLoggedin,
         userData,setUserData,
         getUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
