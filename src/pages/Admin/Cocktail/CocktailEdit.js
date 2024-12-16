import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cocktailService } from '../../../_services/cocktail.service';

const CocktailEdit = () => {
    const [cocktail, setCocktail] = useState({
        nom: '',
        description: '',
        recette: ''
    });
    const flag = useRef(false);
    let navigate = useNavigate();

    // Récupération ID du cocktail
    const { cid } = useParams();

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCocktail({
            ...cocktail,
            [e.target.name]: e.target.value
        });
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        cocktailService.updateCocktail(cid, cocktail)
            .then(res => {
                console.log("Cocktail mis à jour avec succès :", res);
                navigate('../index');
            })
            .catch(err => console.log(err));
    };

    // Récupération du cocktail à l'affichage
    useEffect(() => {
        if (flag.current === false) {
            cocktailService.getCocktail(cid)
                .then(res => {
                    console.log("Données du cocktail récupérées :", res); // Ajoutez ce log
                    setCocktail({
                        nom: res.data.nom || '',
                        description: res.data.description || '',
                        recette: res.data.recette || ''
                    });
                })
                .catch(err => console.log(err));
        }
    
        return () => flag.current = true;
    }, [cid]);
    

    return (
        <div className="CocktailEdit">
            Modifier un Cocktail
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" value={cocktail.nom} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={cocktail.description} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="recette">Recette</label>
                    <input type="text" name="recette" value={cocktail.recette} onChange={onChange} />
                </div>
                <div className="group">
                    <button type="submit">Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default CocktailEdit;
