import React from "react";


export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for (let i=0; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return (
        <nav>
            <ul>
                {pageNumbers?.map(number =>(
                    <li>
                    <a onCLick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}