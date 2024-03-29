import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch(); 
    const [name, setName] = useState(""); 

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getTitleRecipes(name))
        setName("")
    }

    return (
        <div className={styles.contenedor}>
            <input 
            className={styles.recipiente}
            type = 'text'
            placeholder="Buscar..."
            onChange={(e) => handleInputChange(e)}
            />
            <button
            className={styles.buttonsearch}
            type='submit' 
            onClick={(e) => handleSubmit(e)
            }>BUSCAR</button>
        </div>
    )
}