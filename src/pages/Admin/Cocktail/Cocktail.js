import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cocktailService } from '../../../_services/cocktail.service';

const Cocktail = () => {
    const [cocktails, setCocktails] = useState([]);
    const flag = useRef(false);

    // Récupération de la liste des cocktails à l'affichage
    useEffect(() => {
        if (flag.current === false) {
            cocktailService.getAllCocktails()
                .then(res => {
                    console.log(res); // Inspectez la réponse
                    setCocktails(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    // Gestion du bouton de suppression
    const delCocktail = (cocktailId) => {
        cocktailService.deleteCocktail(cocktailId)
            .then(res => {
                // Mise à jour du state pour affichage
                setCocktails((current) => current.filter(cocktail => cocktail.id !== cocktailId));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="Cocktail">
            Liste des cocktails
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Créé</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cocktails && Array.isArray(cocktails) && cocktails.map(cocktail => (
                            <tr key={cocktail.id}>
                                <td><span className='del_ubtn' onClick={() => delCocktail(cocktail.id)}>X</span></td>
                                <td><Link to={`/admin/cocktail/edit/${cocktail.id}`}>{cocktail.id}</Link></td>
                                <td>{cocktail.nom}</td>
                                <td>{cocktail.description}</td>
                                <td>{cocktail.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Cocktail;
