import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import userService from '../services/users';
import './UserView.css'


const UserView = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const desconocido = '/images/desconocido.jpg'

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await userService.getById(id);
                setUser(user);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No se encontró el usuario.</div>;
    }

    

    return (
        <div className="twitter-card">
            {user.image?
            <img className="avatar" src={user.image} alt={`${user.name}'s avatar`} />
            :<img className="avatar" src={desconocido} alt={`${user.name}'s avatar`} />}
            <div className="user-info">
                <div className="user-details">
                    <h3 className="name">{user.name}</h3>
                    <p className="username">@{user.username}</p>
                    <p className="email">{user.email}</p>
                </div>
                {user.online ? (
                    <img  src='/images/verde.png' alt='on-line' />
                ):( <img  src='/images/rojo.png' alt='disconect' />
                )}
                
            </div>
        </div>
    );
};

export default UserView;