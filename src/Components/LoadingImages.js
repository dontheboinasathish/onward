import React from "react";
const LoadingImages=({totalimages,data})=>{
    return(
        <div>
            {<ul>
                {data.map(item => (
                    <li key={item} className={`mt-5`} >

                        <img src={item.thumbnailUrl} height={300} width={300} />

                    </li>

                ))}
            </ul>
            }

        </div>
    )

}
export default LoadingImages;