import React from "react";
const PaginationLogic = ({ postperpage, totalposts,paginate, }) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalposts / postperpage); i++) {
        pageNumbers.push(i)
    }
    
    return (
        <div>
            <nav>
                <ul className={"pagination "}>
                    <li>
                        {
                            <button onClick={()=>paginate()}> &laquo;Privious</button>
                        }
                    </li>
                    {
                        pageNumbers.map(number => (
                            <li key={number} className={"page-item"}>
                                <button onClick={()=>paginate(number)}>{number}</button>
                            </li>
                        ))
                    }
                    <li>
                        {
                            <button onClick={()=>paginate()}> Next &raquo;</button>
                        }
                    </li>


                </ul>
            </nav>
        </div>
    )
}
export default PaginationLogic;