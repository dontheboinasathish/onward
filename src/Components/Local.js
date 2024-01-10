import React, { useState } from "react";
import { useMemo } from "react";
const Local=()=>{
    const[number,setNumber]=useState(0)
    const[count,setCount]=useState(1)
    const Addnumber=useMemo(()=>{Addfn()},[number])


const handlecount=()=>{
    console.log("count functinaty")
    setCount(count+1)
}


const Add=()=>{
    setNumber(number+1)
}
    return(
        <div>
            <h1>count:{count}</h1>

         <button onClick={handlecount}>Count</button>
         <button onClick={Add}>Number</button>
         <h3> {number}:{Addnumber}</h3>

        </div>
    )



}


const Addfn=()=>{
    console.log("add functinaty")
    let  a=20;
    let b=34;
  let   c=a+b
  console.log(c)
  

}
    


export default Local;