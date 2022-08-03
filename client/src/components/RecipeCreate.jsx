import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import {postRecipe, getDiets} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); //Para redirigir al home o a la página que quiera redigir. 
    const diets = useSelector((state) => state.diets); 

    const [input, setInput] = useState({
        title: "",
        summary: "", 
        healthScore: "", 
        scope: [], 
        diets:[]
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    function handleChange(event){
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
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
            score:[],
            diets:[],
        })
        history.push('/home')
    }
    return(
        <div>
            <Link to='/home'>
                <button>VOLVER</button>
            </Link>
            <h1>¡Crear tus recetas!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>TÍTULO:</label>
                    <input 
                        type='text' 
                        value= {input.title} 
                        name='title'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>RESUMEN:</label>
                    <input
                        type='text'
                        value={input.summary}
                        name='summary'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>NIVEL DE 'COMIDA SALUDABLE':</label>
                    <input
                        type='number'
                        value={input.healthScore}
                        name='healthScore'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>PASO A PASO:</label>
                    <input
                        type='text'
                        value={input.scope}
                        name='score'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>IMAGEN:</label>
                    <input
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {diets.map((diet) => (
                        <option value={diet.name}>{diet.name.toUpperCase()}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el => el + ' ,')}</li></ul>{/*Renderiza lo que vaya seleccionando*/}
                <button type='submit'>CREAR RECETA</button>
            </form>

        </div>
    )
}