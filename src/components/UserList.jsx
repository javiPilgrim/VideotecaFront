import { useEffect, useState } from "react";
import userService from '../services/users';
import { Link } from "react-router-dom";
import { styled } from '@mui/system';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const initialUsers = await userService.getAll();
                initialUsers.sort((a, b) => a.name.localeCompare(b.name));
                setUsers(initialUsers);
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };
        fetchUsers();
    }, []);

    const ListItem = styled('li')({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    });

    const UserName = styled(Link)({
        textDecoration: 'none',
        color: 'inherit',
        flexGrow: 1,
    });

    return (
        <div>
            <h2>Usuarios del servicio:</h2>
            {users.map(user => (
                <ListItem key={user.id}>
                    <UserName to={`/user/${user.id}`}>Nombre: {user.name}</UserName>
                </ListItem>
            ))}
        </div>
    );
};

export default UserList;