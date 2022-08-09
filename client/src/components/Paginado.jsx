import React from "react";
import styles from './styles/Paginado.module.css'

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <div className={styles.paginado}>
            <ul style={{ display: 'flex' }}>
                {pageNumbers?.map(number => (
                    <li style={{ listStyleType: 'none' }}>
                        <button className={styles.button} onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}