import React from "react";
import {useState, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipeByDiets, orderByTitle } from "../actions"; 
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './styles/Home.module.css'

export default function Home(){
    
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1) //Página actual.
    const [recipesPerPage] = useState(9) //Personajes por páginas.
    const indexOfLastRecipe = currentPage * recipesPerPage //Cantidad de páginas por cantidad de personajes por página.
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes =  allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) 

    const [orden, setOrden] = useState('')

    const paginado = (pageNumber) => {
        console.log('hola')
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault(); 
        dispatch(getRecipes()) 
        } //PARA RESETEAR TODOS LAS RECETAS

    function handleFilterStatus(e){
            dispatch(filterRecipeByDiets(e.target.value))
    }

    function handleSorted(e){
            e.preventDefault();
            dispatch(orderByTitle(e.target.value))
            setCurrentPage(1);
            setOrden(`ORDENADO ${e.target.value}`)
    }

    return(
        <div className={styles.contenedorppal}>
            <div style={{display:'flex'}}>
                <h1 className={styles.h1henry}>HENRY</h1> 
                <h2 className={styles.h2taste}>Taste!</h2>
                <button className={styles.buttonrecetas} onClick={e => {handleClick(e)}}>
                    Todas las recetas.
                </button>
            </div>
            <SearchBar/>
            <div className={styles.divcontenedor}>
                <Link className={styles.crearreceta}to='/recipe'> Crear receta</Link>
                
            </div>

            <div>
                <div className={styles.contenedorfiltros}>
                    <select className={styles.filtroAZ} onChange={e => handleSorted(e)}>
                        <option value='a-z'>A-Z</option>
                        <option value='z-a'>Z-A</option>
                    </select>
                    <select className={styles.filtrodiets} onChange={e => handleFilterStatus(e)}>
                        <option value='dairy free'>Dairy Free</option>
                        <option value='ketogenic'>Ketogenic</option>
                        <option value='gluten free'>Gluten Free</option>
                        <option value='paleolitich'>Paleolitich</option>
                        <option value='whole 30'>Whole 30</option>
                        <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                        <option value='vegan'>Vegan</option>
                        <option value='vegetarian'>Vegetarian</option>
                        <option value='primal'>Primal</option>
                    </select>
                </div>

                <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                /> 
                <div className={styles.containerCards}>
                {
                    (currentRecipes ? currentRecipes.map(e => {
                        return(
                            <div className={styles.card}>
                                <Link style={{textDecoration: 'none'}}to={'/recipe/' + e.id}>
                                <Card title={e.title} diet={e.diets} image={e.image} key={e.id}/>
                                </Link>
                            </div>
                        )
                    }) : <p>Loading...</p>)
                }
                </div>
            </div>
        </div>
    )
}