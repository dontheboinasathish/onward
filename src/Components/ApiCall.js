import React, { useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useEffect, useRef } from "react";
import Loading from "./Loading";

import ImgRendring from "./ImgRendring";
import LoadingImages from "./LoadingImages";


const ApiCall = () => {
    const [data, setData] = useState([])
    const [spin, setSpinner] = useState(false)
    const [showimg, setShowImg] = useState(1)
    const [showimgperpage, setShowImgPerPage] = useState(3)

    const fetchdata = async () => {
        setSpinner(true)
        const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
        console.log(res.data, "dataaa")
        setData(res.data)
        setSpinner(false)
    }

    useEffect(() => {

        fetchdata()
    }, [])


    //get 
    const lastindeximage = showimg * showimgperpage
    console.log(lastindeximage, "lastindeximage")
    const firstindexofimage = lastindeximage - showimgperpage
    console.log(firstindexofimage, "firstindexofimage")
    const currentimg = data.slice(firstindexofimage, lastindeximage)
    console.log(currentimg, "currentimg")

    const totalimages = data.length;
    console.log(totalimages, "totalimages")


    const pagenumbers = [];
    for (let i = 1; i <= Math.ceil(totalimages / showimgperpage); i++) {
        pagenumbers.push(i)
    }
    console.log(pagenumbers, "pagenumbers")
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", flexDirection: "row" }}>

<span > 
            {
                spin ? <Loading /> : null
            }
</span>
            {/* <ImgRendring currentimg={currentimg} /> */}
            
            
            <div>
                <LoadingImages data={data} />
            </div>


        </div>
    )
}
export default ApiCall;