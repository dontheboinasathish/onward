import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import PaginationLogic from "./PaginationLogic"


const Pagination = () => {


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postperpage, setPostPerPage] = useState(10)



    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?`)
            setPosts(res.data)
            setLoading(false)
            console.log(posts)
        }
        fetchdata()

    }, [currentPage])




    // get currentposts
    const lastindexofpost = currentPage * postperpage;
    console.log("lastindexofpost", lastindexofpost)
    const firstindexofpost = lastindexofpost - postperpage
    console.log(firstindexofpost, "firstindexofpost")
    const currntposts = posts.slice(firstindexofpost, lastindexofpost)
    console.log(currntposts, "currntposts")


    const paginate = (pagenumber) => {
        console.log(pagenumber, "pagenumber")
        setCurrentPage(pagenumber)

    }


    return (
        <div className="container mt-5">
            <h1 className="text-primary mb-3">Pagination</h1>
            <Post posts={currntposts} loding={loading} />
            <PaginationLogic postperpage={postperpage}
                totalposts={posts.length} paginate={paginate} />

        </div>
    )
}


export default Pagination;