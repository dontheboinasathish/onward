import React from "react";
const Post=({posts,loding})=>{
    if(loding){
        return <h1>Loading.....</h1>
    }
    return(
        <div>
        <ul className="list-group mb-4">
            {
            posts.map((item)=>(
                <li key={item} className="list-group-item">
                    {item.id}
                {item.title}
            </li>
            ))
        }

        </ul>
        </div>

    
    )
    
}
export default Post;