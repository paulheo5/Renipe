const UserData = ({users }) => {
    return (
        <>
            {
                users.map((curUser) => {
                    const { id, name, sourceUrl } = curUser;

                    return (
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{sourceUrl}</td>
                        </tr>
                        )


                })
            }
        </>
        )
}
export default UserData;