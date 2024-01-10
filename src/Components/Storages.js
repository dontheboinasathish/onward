import React from "react";



const Storages=()=>{
    localStorage.setItem('name',"sathish")
    sessionStorage.setItem('age','25')



    return(
        <div>
            
                <h2>localStorage:{localStorage.getItem('name')}</h2>
                <h2>sessionStorage:{sessionStorage.getItem('age')}</h2>
            
            <h3>Sessionstorage:{sessionStorage.removeItem('age')}</h3>
            <h3>localStorage:{localStorage.removeItem('name')}</h3>

        </div>
    )
}
export default Storages;