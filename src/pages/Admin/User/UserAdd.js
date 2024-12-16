import React, { useState } from 'react';
import { userService } from '@/_services/user.services';
import { useParams,useNavigate} from 'react-router-dom';

const UserAdd = () => {

    const [user, setUser] = useState([]);
    let navigate = useNavigate ()

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value, // Met à jour dynamiquement le champ correspondant
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        userService.addUser(user)
            .then(res => {
                navigate('../index')
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='UserEdit'>
            <h2>Ajouter un utilisateur</h2>
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={user.nom}
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={user.prenom}
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        name="pseudo"
                        value={user.pseudo}
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default UserAdd;
