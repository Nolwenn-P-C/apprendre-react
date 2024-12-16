import React from 'react';
import './card.css'
import { Link } from 'react-router-dom';

const Card = ({ marcel, image}) => {
    console.log(marcel)

    return (
        <Link to={`/service/${marcel.id}`} className="card_link">
            <article className='card_article'>
                <img src={image+marcel.id} alt={marcel.nom}/>
                <div>{marcel.nom}</div>
            </article>
        </Link>
    );
};

export default Card;

