import React from "react";
import styles from "../components/styles/Card.module.css"

export default function Card({title, image, healthScore}) {
    return (
        <div>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.title}>{title}</h3>
                </div>
                {/* {diet?.map(e => (<h5>{e.name}</h5>))} */}
                <img src={image} alt='image not found' width='200px' height='250px'/> 
                <h3>{healthScore}</h3>
            </div> 
        </div>
    )
}