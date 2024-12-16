import React, {useState} from 'react';
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services';


const Login = () => {
    let navigate=useNavigate ()
    const[credentials, setCredentials] = useState({
        email: 'roger@marcel.com',
        password:'marcel'
    })

    const onChange =(e) =>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = await accountService.login(credentials);
    
            if (data.access_token) {
                accountService.saveToken(data.access_token);
                navigate('/admin', {replace:true})
            } else {
                throw new Error("Le token d'accès est manquant dans la réponse de l'API");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error.message);
        }
    };
    
    return (
        <form onSubmit={onSubmit}>
            <div className="group">
                <label htmlFor="login">Identifiant</label>
                <input type="text" name="email" value={credentials.email} onChange={onChange}/>
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <div className="group">
                <button>Connexion</button>
            </div>
            
        </form>
    );
};

export default Login;