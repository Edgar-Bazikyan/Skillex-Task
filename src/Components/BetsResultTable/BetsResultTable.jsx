import React, { useState } from "react"
import styles from "./BetsResultTable.module.css"


const BetsResultTable = ({data, oddsObject, oddsStatus, totalStake, allWinings}) => {
    
    const checkStatusAndSub = (item) => {
        let result = 1
        for(let i of Object.values(item)){
            if(oddsStatus[i] === 'Correct'){
                result *= oddsObject[`odds${i}`]
            }else if(oddsStatus[i] === 'Incorrect'){
                result *= 0
            }else{
                result *= 1
            }
        }
        
        return result
    }
    const winingsFunc = (item) => {
        const sub = checkStatusAndSub(item)
        const result = Number((sub * (totalStake / data.length)).toFixed(2))
        return result

    }
   
    
    function combinations(item) {
        return Object.values(item).map((item, index) => {
            return(
                <div key={index} className={styles[oddsStatus[item]]}>{oddsObject[`odds${item}`]}</div>
            )})
    }

    return(
        <div>
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
                                <td className={styles['combination-div']}>
                                    {combinations(item)}
                                </td>
                                <td>{checkStatusAndSub(item)}</td>
                                <td>{winingsFunc(item)}</td> 
                                {/* kame useEffect ov anenq u yste dnenq statey */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <p>Winings : {allWinings} </p>
                <p>Stake : {totalStake}</p>
                <p>Stake per combination {Number(totalStake / data.length).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default BetsResultTable