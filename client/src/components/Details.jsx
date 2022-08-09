import React from "react";
import { Link } from "react-router-dom";
import { detailRecipe } from "../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/Details.module.css"

export default function Details({ id }) {
    const dispatch = useDispatch(); 

    const recipe = useSelector((state) => state.detail);
    const recipeModified = recipe.diets?.map(el => el.name)
    


    useEffect( () => {
        dispatch(detailRecipe(id)) //se accede al ID del detalle.
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.divbutton}>
            <h1 className={styles.h1}>{recipe.title }</h1>
                <Link to='/home'>
                <button className={styles.button}> HOME </button>
                </Link>
                
            </div>
            {recipe ? 
                <div >
                    <div className={styles.divhyd}>
                        <h3 className={styles.h3}>Health Score: {recipe.healthScore}</h3>
                        <h3 className={styles.h3}>{recipe.dishTypes? (
                        <p style={{margin : '0px'}}>Dish type/s: {recipe.dishTypes.join(', ')}</p>): "Does'nt have Dishtype"}</h3>
                    </div>
                    <h3 className={styles.diets}>Diet/s: {recipeModified?.join(', ')}</h3>
                    <div className={styles.divIyS}>
                        <div style={{display:'flex' , flexDirection: 'column'}}>
                            <h2>Summary: </h2>
                            <h3 className={styles.summary}>{recipe.summary}</h3>
                        </div>
                        <img className={styles.img} src={recipe.image}/> 
                    </div>
                    <div>
                        <h2 className={styles.h2}>Steps:</h2>
                        {recipe.steps?.map((step, index) =>
                        <li  style={{listStyleType: 'none'}}>
                            <b >{index+1}</b><p className={styles.pstep}>{step.step}</p>
                        </li>)}

                    </div>

                </div> : <p>Loading...</p>
            }
        </div>
    )
}