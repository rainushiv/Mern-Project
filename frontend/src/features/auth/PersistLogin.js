import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import {useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice";


const PersistLogin = () =>{

    const [persist] = usePersist()

    const token = useSelector( selectCurrentToken )

    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUnitialized, 
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if(effectRan.current === true || ProcessingInstruction.env.NODE_ENV !== 'devlopment') { 
            const verifyRefreshToken = async () => {
                console.log('verifying refesh token')

                try {

                    await refresh()

                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if(!token && persist) verifyRefreshToken()

        }
        return () => effectRan.current = true 

        }, [])

        let content 

        if(!persist) {

            console.log('no persist')
            content =  <Outlet/>

        }else if(isLoading) {
            console.log('loading')
            content = <p>Loading...</p>
        }else if (isError) {
            console.log('error')
            content = (
                <p className="errmsg">
                    {`${error?.data?.message} - `}
                    <Link to="/login"> Please login again</Link>
                </p>
            )
        } else if (isSuccess && trueSuccess) {

            console.log('success')
            content = <Outlet/>
        } else if (token && isUnitialized) {

            console.log('token and uninit')
            console.log(isUnitialized)
            content = <Outlet/>
        }

        return content 


}
export default PersistLogin