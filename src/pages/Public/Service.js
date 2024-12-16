import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cocktailService } from '@/_services/cocktail.service';
import './layout.css'


const Service = () => {

    const [cocktail, setCocktail] = useState({})
    let {cid} = useParams()

    useEffect(() =>{
        cocktailService.getCocktail(cid)
            .then(res => setCocktail(res.data))
            .catch(err => console.log(err))
    }, [] )

    return (
        <div className="service">
            <img src={'https://picsum.photos/1200/800?random='+cocktail.id} alt={cocktail.nom} />
            <div>{cocktail.nom}</div>
            <div>{cocktail.description}</div>
            <div>{cocktail.recette}</div>
        </div>
    );
};

export default Service;