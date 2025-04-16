import React, { useState, useEffect } from "react"
import styles from "./BetsCalculator.module.css"
import OddsList from "../OddsList/OddsList";

const BetsCalculator = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [result, setResult] = useState(0);
    const [objC, setObjC] = useState({n: 3, k: 2});
    const [combArray, setCombArray] = useState([])

    useEffect(() => {
        setResult(getCombinations(new Array(objC.n).fill(0).map((_, i) => i + 1), objC.k).length)
        setCombArray(getCombinations(new Array(objC.n).fill(0).map((_, i) => i + 1), objC.k))
    }, [selectedOption])


    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        const arr = event.target.value.split('/')
        const k = parseInt(arr[0])
        const n = parseInt(arr[1])
        setObjC({...objC ,n , k})
        
      };
    
      function getCombinations(arr, k) {
        const result = []
      
        function combine(start, arrayK) {
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
    console.log('result',combArray)
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
                <OddsList  odds={objC.k}/>
            </div>
        </div>
    )
}

export default BetsCalculator
