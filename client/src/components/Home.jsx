import React from "react";
import {useState, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipeByDiets, orderByTitle } from "../actions"; 
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home(){
    
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1) //Página actual.
    const [recipesPerPage,setRecipesPerPage] = useState(9) //Personajes por páginas.
    const indexOfLastRecipe = currentPage * recipesPerPage //Cantidad de páginas por cantidad de personajes por página.
    const [orden, setOrden] = useState('')
    const indexOfFisrtRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes =  allRecipes.slice(indexOfFisrtRecipe, indexOfLastRecipe) 

    const paginado = (pageNumber) => {
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
        <div>
            <h1>Tortilla de papa</h1>
            <Link to='/recipe'> Crear receta</Link>
            <h1>COSA</h1>
            <button onClick={e => {handleClick(e)}}>
                Todas las recetas.
            </button>
            <div>
                <select onChange={e => handleSorted(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilterStatus(e)}>
                    <option value='all'>All Diets</option>
                    <option value='dairy free'>Dairy Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='glutenFree'>Gluten Free</option>
                    <option value='paleolitich'>Paleolitich</option>
                    <option value='whole 30'>Whole 30</option>
                    <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='primal'>Primal</option>
                </select>

                <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                /> 
                {
                    (currentRecipes.map(e => {
                        return(
                            <fragment>
                                <Link to={'/home/' + e.id}>
                                <Card title={e.title} diet={e.diets} image={e.image} key={e.id}/>
                                </Link>
                            </fragment>
                        )
                    }))
                }
                <SearchBar/>
            </div>
        </div>
    )
}