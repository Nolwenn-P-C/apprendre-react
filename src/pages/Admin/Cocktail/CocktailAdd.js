import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cocktailService } from '../../../_services/cocktail.service';
import { accountService } from '../../../_services/account.service';

const CocktailAdd = () => {
    const [cocktail, setCocktail] = useState({});
    let navigate = useNavigate();

    // Gestionnaire de modification du formulaire
    const onChange = (e) => {
        setCocktail({
            ...cocktail,
            [e.target.name]: e.target.value
        });
    };

    // Gestionnaire de soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        const tokenInfo = accountService.getTokenInfo();
        if (tokenInfo) {
            cocktail.user_id = tokenInfo.id;

            cocktailService.addCocktail(cocktail)
                .then(res => {
                    console.log("Cocktail ajouté avec succès :", res);
                    navigate('/admin/cocktail/index'); // Rediriger vers la liste des cocktails
                })
                .catch(err => console.log(err));
        } else {
            console.error("Token non valide ou manquant");
        }
    };

    return (
        <div className="CocktailEdit">
            Ajouter un Cocktail
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="recette">Recette</label>
                    <input type="text" name="recette" onChange={onChange} />
                </div>
                <div className="group">
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default CocktailAdd;
