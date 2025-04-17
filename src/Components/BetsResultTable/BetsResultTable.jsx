import React from "react"
import styles from "./BetsResultTable.module.css"


const BetsResultTable = ({data, oddsObject, oddsStatus, totalStack}) => {
    
    const winnings = (item) => {
        const a = Object.values(item).map((item) => oddsObject[`odds${item}`]).reduce((sum,val) => sum * val ,1)
        return a * (totalStack / data.length)
        //ystex guynic kaxvac poxi hashvelu dzevy
    }
    const subOdds = (item) => {
        const odds = Object.values(item).map((item) => oddsObject[`odds${item}`]).reduce((sum,val) => sum * val ,1)
        return odds
        //ystex guynic kaxvac poxi hashvelu dzevy
    }
    const combinations = (item) => {
        Object.values(item).map((item, index) => {
            return(
                <div key={index}>{oddsObject[`odds${item}`]}</div>
            )})
            // ystex petqa guyny poxi
    }

    return(
        <table>
             <thead>
                <tr>
                    <th>N</th>
                    <th>Combinations</th>
                    <th>Odds</th>
                    <th>Winnings</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className={styles['combination-div']}>{combinations(item)}</td>
                            <td>{subOdds(item)}</td>
                            <td>{winnings(item)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default BetsResultTable