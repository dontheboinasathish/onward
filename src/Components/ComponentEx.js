import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
const Toasts = () => {
    const [error, setError] = useState(null)
    const [apidata, setApiData] = useState([])
    const [show, setShow] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(null);
    const [showbtn, setShowbtn] = useState(true)
    const [updatdata, setUPDate] = useState([])
    const [inputdetais, setInputDeatils] = useState({ id: '', username: '', email: '' })
    const { id, title, completed } = inputdetais



    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users")
                console.log(res.data)
                setApiData(res.data);
            } catch {
                console.log("api getting errors")
            }
        }
        fetchdata()
    }, [])

    console.log(apidata, "apidata")


    const deletefn = (id) => {
        // console.log(id, "idvalue")
        const deleterow = apidata.filter((_, each) => each !== id)
        setApiData(deleterow)
        // console.log(deleterow, "deleterow")
    }
    const handleClose = () => {
        setShow(false);
        setDisplayTitle("")

    };
    const handleShow = () => {
        setDisplayTitle("")
        setInputDeatils((prev) => {
            return {
                ...prev, id: '', username: '', email: '',
            }
        })
        setShow(true);
    }
    const handlechange = (e) => {
        setInputDeatils((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })

    }

    console.log(inputdetais, "inputdetais");
    const adddetailstotable = (e) => {
        e.preventDefault()
        console.log("add data", apidata)
        setShow(false)
        setApiData([...apidata, inputdetais])
        setInputDeatils({ ...inputdetais, id: '', username: '', email: '', }
        )

    }

    const handleshowupdat = (e) => {
        console.log("uuu", e)
        setShow(true);
        setDisplayTitle("Edit");
        let filterList = apidata.filter((val, i) => val.id == e.id)
        console.log(filterList, "filterList")
        setInputDeatils((prev) => {
            return { ...prev, id: filterList[0]?.id, username: filterList[0]?.username, email: filterList[0]?.email, }
        })

    }

    const submitEditFn = () => {
        let updateList = apidata.map((e, i) => e.id == inputdetais.id ? { ...e, username: inputdetais.username, email: inputdetais.email } : { ...e })
        setApiData(updateList);
        setInputDeatils((prev) => {
            return { ...prev, id: '', username: '', email: '', }
        })
        setDisplayTitle("")
        handleClose();
    }
    return (
        <div>
            <h1>hello crud</h1>
            <Button onClick={handleShow}>Add</Button>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>Users</td>
                        <td>Email</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {apidata.map((each, id) => {
                        return (
                            <tr key={id}>
                                <td>{each.id}</td>
                                <td>{each.username}</td>
                                <td>{each.email}</td>
                                <td>
                                    <Button onClick={() => deletefn(id)}>DELETE</Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleshowupdat(each)}>UPDATE</Button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        displayTitle == "Edit" ? "Edit Modal" : "Add Modal"
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ margin: '10px', padding: '5px' }}>
                        <div className="mb-3"> <label htmlFor="id">ID:</label>
                            <input value={inputdetais.id} onChange={handlechange} />
                            <br />
                        </div>
                        <div className="mb-3 mt-3"> <label htmlFor="id">Users:</label> 
                        <input type="text" placeholder="enter user" name="username" value={inputdetais.username} onChange={handlechange} /><br /> </div>
                        <div className="mb-3"> <label htmlFor="id">ID:</label>
                        
                        <input></input>
                        </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {
                    displayTitle == "Edit" ? <Button onClick={submitEditFn}>SubmitEdit</Button> : <Button onClick={adddetailstotable}>AddtoTable</Button>
                }
            </Modal.Footer> </Modal>
        </div >
    )
}
export default Toasts;