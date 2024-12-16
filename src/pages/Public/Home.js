import React, { useEffect, useRef, useState } from 'react';
import { cocktailService } from '@/_services/cocktail.service';
import Card from '@/components/Card'; 

const Home = () => {
    const [cocktails, setCocktails] = useState([]);
    const flag = useRef(false);
    const [isLoad, setLoad] = useState (false)

    useEffect(() => {
        if (flag.current === false) {
            cocktailService.getAllCocktails()
                .then(res => {
                     setCocktails(res.data) 
                     setLoad(true)
                })
                .catch(err => console.log(err));
        }
        return () => flag.current = true;
    }, []);

    if (!isLoad){
        return <div>Loading</div>
    }

    return (
        <div className='home'>
            {
                cocktails.map((ckt,id) => (
                    <Card key={id} marcel={ckt} image='https://picsum.photos/1200/800?random='/>
                   
                ))
            }
        </div>
    );
};

export default Home;
