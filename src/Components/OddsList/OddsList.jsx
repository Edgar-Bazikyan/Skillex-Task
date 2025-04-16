import React, {useState, useMemo, use, useEffect} from "react"
import styles from "./OddsList.module.css"



const OddsList = ({odds}) => {

    const [totalStake, setTotalStake] = useState(0)
    const [oddsObject, setOddsObj] = useState({})
    const arr = new Array(odds).fill(0)
    
    useEffect(() => {
        const oddsObj = {}
        arr.forEach((_, index) => {
            oddsObj[index + 1] = 'Correct'
        })
        setOddsObj(oddsObj)
    }, [odds])
    const changeHandler = (event) => {
        const value = event.target.value
        setTotalStake(value)
    }
    const handleRadioChange = (event) => {
        const { name, value } = event.target
        setOddsObj((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

console.log('oddsObject', oddsObject)
    return (
        <div className={styles['odds-div']}>
            <div className={styles['total-stake-div']}>
                <label htmlFor="stack">Total Stack</label>
                <input type="text" id="stack" value={totalStake} onChange={changeHandler} />
            </div>
            <div className={styles['odds-list']}>
                {arr.map((item, index) => (
                    <div key={index} className={styles['odds-item']}>
                        odds {index + 1}: 
                        <label>
                            Correct
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Correct"
                        checked={oddsObject[`${index + 1}`] === 'Correct'}
                        onChange={handleRadioChange}
                        />
                        <label>
                            Incorrect
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Incorrect"
                        checked={oddsObject[`${index + 1}`] === 'Incorrect'}
                        onChange={handleRadioChange}
                        />
                        <label>
                            void
                        </label>
                        <input
                        type="radio"
                        name={index + 1}
                        value="Void"
                        checked={oddsObject[`${index + 1}`] === 'Void'}
                        onChange={handleRadioChange}
                        />
                    </div>
                ))}

            </div>
            <button className={styles['btn']}>Compute</button>
        </div>
    )
}

export default OddsList