import React from 'react';



const UserData = ({ users }) => {
    console.log(users);
    return (
        <>

                <tr>
                    <td>{users.id}</td>
                    <td>{users.sourceUrl}</td>

                </tr>

        </>
        )
}
export default UserData;