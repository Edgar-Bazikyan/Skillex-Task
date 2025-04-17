import React, { useState, useEffect } from "react"
import styles from "./BetsCalculator.module.css"
import OddsList from "../OddsList/OddsList";
import BetsResultTable from "../BetsResultTable/BetsResultTable";


const BetsCalculator = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [result, setResult] = useState(0);
    const [objC, setObjC] = useState({n: 3, k: 2});
    const [combArray, setCombArray] = useState([])
    const [totalStake, setTotalStake] = useState(100)
    const [oddsObject, setOddsObj] = useState({})
    const [oddsStatus, setOddsStatus] = useState({})
    const [allWinings, setAllWinings] = useState(0)

    useEffect(() => {
        setResult(getCombinations(new Array(objC.n).fill(0).map((_, i) => i + 1), objC.k).length)
        setCombArray(getCombinations(new Array(objC.n).fill(0).map((_, i) => i + 1), objC.k))
    }, [selectedOption])
    useEffect(() => {
        setAllWinings(0)
        calcAllWinings()
    },[selectedOption, totalStake, oddsStatus, oddsObject])

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        const arr = event.target.value.split('/')
        const k = parseInt(arr[0])
        const n = parseInt(arr[1])
        setObjC({...objC ,n , k})
        
      };

    const calcAllWinings = () => {
        combArray.map(item => {
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
            
            setAllWinings(prev => prev + (Number((result * (totalStake / combArray.length)).toFixed(2))))
        })
    }
    
      const getCombinations = (arr, k) => {
        const result = []
      
        const combine = (start, arrayK) => {
          if (arrayK.length === k) {
            const obj = {};
            arrayK.forEach((val, index) => {
                obj[`num${index + 1}`] = val;
            });
            result.push(obj);
            return
          }
          for (let i = start; i < arr.length; i++) {
            arrayK.push(arr[i])
            combine(i + 1, arrayK)
            arrayK.pop()
          }
        }
        combine(0, [])
        return result
    }
    // const factorial = (n) => {
    //     if (n < 0) {
    //         return "Undefined";
    //     }
    //     if (n === 0 || n ===1) {
    //         return 1;
    //     }
    //     return n * factorial(n - 1);       

    // }

    // const calculateCombinatorics = () => {

    //     const result = factorial(objC.n) / (factorial(objC.n - objC.k) * factorial(objC.k))
    //     return result
    
    // }
    return(
        <div className={styles['main-div']}>
            <div className={styles['upper-div']}>
                <div className={styles['left-div']}>
                    <div className={styles['select-div']}>
                        <label htmlFor="select">System</label>
                        <select id="select" className={styles['select']} value={selectedOption} onChange={handleChange}>
                            <option value="2/3">2 from 3</option>
                            <option value="3/4">3 from 4</option>
                            <option value="2/4">2 from 4</option>
                            {/* map a linielu */}
                        </select>
                    </div>
                    <div className={styles['select-div']}>
                        A System {objC.k} from {objC.n} + undefined contains {result} combinations
                    </div>
                </div>
                <div className={styles['right-div']}>
                    <OddsList   odds={objC.n} 
                                totalStake={totalStake}  
                                setTotalStake={setTotalStake}
                                oddsObject={oddsObject}
                                setOddsObj={setOddsObj}
                                oddsStatus={oddsStatus}
                                setOddsStatus={setOddsStatus}
                                />
                </div>
            </div>
            <div className={styles['lower-div']}>
                <BetsResultTable data={combArray} oddsObject={oddsObject} oddsStatus={oddsStatus} totalStake={totalStake} allWinings={allWinings} />
            </div>
        </div>
    )
}

export default BetsCalculator
