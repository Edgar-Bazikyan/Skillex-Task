import React from "react"
import styles from "./MainPage.module.css"
import BetsCalculator from "../Components/BetsCalculator/BetsCalculator"


const MainPage = () => {
    return (
        <div className={styles['main-div']}>
            <BetsCalculator />
        </div>
    )
}


export default MainPage