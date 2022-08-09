import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import {postRecipe, getDiets} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/RecipeCreate.module.css"


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); //Para redirigir al home o a la página que quiera redigir. 
    const diets = useSelector((state) => state.diets); 
    const [errors, setErrors] = useState()

    const [input, setInput] = useState({
        title: "",
        summary: "", 
        healthScore: "", 
        scope: [], 
        diets:[]
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    function handleChange(event){
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(validate({
            ...input, 
            [event.target.name] : event.target.value,
        }))
    }

    function handleSelect(event){
        setInput({
            ...input,
            diets: [...input.diets, event.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('¡Tu receta se creó correctamente!')
        setInput({
            title:"",
            summary:"",
            healthScore:"",
            scope:[],
            diets:[],
        })
        history.push('/home')
    }

    function handleDeleteDiets(event){
        const inputFilter = input.diets.filter(diet => diet !== event)
        setInput({
            ...input,
            diets: inputFilter
        })
    }

    function validate(input){
        let errors = {};
        if (!input.title){
            errors.title = 'A name is required.'
        }
        if (!input.summary){
            errors.summary = 'A summary is required.'
        }
        if (!input.healthScore){
            errors.healthScore = 'Health score is required.'
        }
        if(!input.steps){
            errors.steps = 'Add one step, at least'
        } 
        return errors; 
    }
    return(
        <div>
            <div className={styles.containerbuttonvolver}>
                <Link to='/home'>
                    <button className={styles.buttonvolver}>VOLVER</button>
                </Link>
            </div>

            <h1 className={styles.titulo}>¡Creá tus recetas!</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>TITLE:</label>
                        <input
                            type='text' 
                            value= {input.title} 
                            name='title'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>SUMMARY:</label>
                        <input
                            type='text'
                            value={input.summary}
                            name='summary'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>HEALTHSCORE:</label>
                        <input
                            type='number'
                            value={input.healthScore}
                            name='healthScore'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>STEPS:</label>
                        <input
                            type='text'
                            value={input.scope}
                            name='scope'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>IMAGE:</label>
                        <input
                        type='text'
                        value={input.image? input.image : ''}
                        name='image'
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <select className={styles.buttoncrear} onChange={(e) => handleSelect(e)}>
                        {diets.map((diet) => (
                            <option value={diet.name}>{diet.name.toUpperCase()}</option>
                        ))}
                    </select>
                    <ul>{input.diets.map(el => (
                        <li className={styles.diets}>
                            <h6 onClick={() =>handleDeleteDiets(el)}>{el}</h6>
                        </li>))}
                    </ul>
                    
                    <button type='submit'>CREAR RECETA</button>
                </form>
            </div>

        </div>
    )
}