import { useGetUsersQuery } from "./usersApiSlice"

import User from './User'

const UsersList = () => {


    const {

        data: users, 
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {

        pollingInterval: 60000,
        fefetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content 
    if(isLoading) content = <p>Loading...</p>

    if(isError){
        content = <p className = "errmsg" >{error?.data?.message}</p>
    }
    
    if(isSuccess){

        const {ids} = users 

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId}/>)
        

        content = ( 
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table_thuser__username">Username</th>
                        <th scope="col" className="table_thuser__roles">Roles</th>
                        <th scope="col" className="table_thuser__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>



            </table>
        )
    }
    return content 
}
export default UsersList