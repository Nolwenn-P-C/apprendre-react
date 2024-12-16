import React , {useEffect, useRef, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { userService } from '@/_services/user.services';

let uid

const UserEdit = () => {

    const [user,setUsers] = useState([])
    const flag = useRef(false)
    let navigate = useNavigate ()

    uid = useParams().uid
    console.log(uid)

    const onChange =(e) =>{
        const { name, value } = e.target;
        setUsers({
        ...user, // Conserver les autres valeurs de l'utilisateur
        [name]: value, // Mettre à jour uniquement la clé modifiée
    });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        userService.updateUser(uid, user)
        .then(res => {
            navigate('../index')
        })
        .catch(err => console.log(err))
    }

    useEffect (() => {
        if(flag.current === false){
            userService.getUser (uid)
                .then (res =>{
                    console.log(res.data)
                    setUsers({
                    nom: res.data.nom || '',
                    prenom: res.data.prenom || '',
                    pseudo: res.data.pseudo || '',
                    email: res.data.email || ''
                })
                })
                .catch (err => console.log(err))
        }
        return () => flag.current = true
    }, [])  

    return (
        <div className='UserEdit'>
           edit 
           <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" value={user.nom} onChange={onChange}/>
                </div>
                <div className="group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" name="prenom" value={user.prenom} onChange={onChange}/>
                </div>
                <div className="group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" name="pseudo" value={user.pseudo} onChange={onChange}/>
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={user.email} onChange={onChange}/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            
            </form>
        </div>
    );
};

export default UserEdit;