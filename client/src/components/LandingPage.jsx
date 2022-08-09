import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css"


export default function LandingPage(){
    return (
        <div className={styles.containerppal}>
            <div className={styles.fontcontainer}>
                <h2 className={styles.henry}>HENRY</h2>
                <h1 className={styles.taste}>Taste!</h1>
            </div>
            <div>
                <Link to='/home'>
                    <button className={styles.buttonlanding}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}