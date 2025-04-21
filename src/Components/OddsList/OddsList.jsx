import React, {useState, useEffect} from "react"
import styles from "./OddsList.module.css"



const OddsList = ({odds, totalStake, setTotalStake, oddsObject, setOddsObj, oddsStatus, setOddsStatus}) => {

    const arr = new Array(odds).fill(0)
    
    useEffect(() => {
        const oddsStatus = {}
        const oddsObject = {}
        arr.forEach((_, index) => {
            oddsStatus[index + 1] = 'Correct'
            oddsObject[`odds${index + 1}`] = 2

        })
        setOddsStatus(oddsStatus)
        setOddsObj(oddsObject)
    }, [odds])
    const changeHandler = (event) => {
        const {name ,value} = event.target
        console.log(value)
        if(name === 'stack'){
           setTotalStake(value)
        }else {
            setOddsObj((prevState) => ({
                ...prevState,
                [name]: Number(value),
            }))
        }
    }
    const handleRadioChange = (event) => {
        const { name, value } = event.target
        setOddsStatus((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    return (
        <div className={styles['odds-div']}>
            <div className={styles['total-stake-div']}>
                <label htmlFor="stack">Total Stack</label>
                <input type="text" id="stack" name="stack" value={totalStake} onChange={changeHandler} />
            </div>
            <div className={styles['odds-list']}>
                {arr.map((item, index) => (
                    <div key={index} className={styles['odds-item']}>
                        Odds {index + 1}:
                        <input type="text"
                        name={`odds${index + 1}`}
                        value={oddsObject[`odds${index + 1}`] ||'' }
                        onChange={changeHandler}
                        /> 
                        <label className={styles['radio-label']}>
                            Correct
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Correct"
                        checked={oddsStatus[`${index + 1}`] === 'Correct'}
                        onChange={handleRadioChange}
                        />
                        <label className={styles['radio-label']}>
                            Incorrect
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Incorrect"
                        checked={oddsStatus[`${index + 1}`] === 'Incorrect'}
                        onChange={handleRadioChange}
                        />
                        <label className={styles['radio-label']}>
                            Void
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Void"
                        checked={oddsStatus[`${index + 1}`] === 'Void'}
                        onChange={handleRadioChange}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default OddsList