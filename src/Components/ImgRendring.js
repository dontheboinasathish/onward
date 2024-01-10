import React from "react";
const ImgRendring = ({currentimg,totalimages}) => {
    return (
        <div>

            {<ul>
               

                {currentimg.map(item => (
                    <li key={item} className={`mt-5`}>

                        <img src={item.thumbnailUrl} height={300} width={300} />

                    </li>

                ))}
            </ul>
            }

        </div>
    )
}
export default ImgRendring;