import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
const Toasts = () => {

    const [apidata, setApiData] = useState([])
    const [show, setShow] = useState(false);
    const [showbtn, setShowbtn] = useState(true)



    const [inputdetais, setInputDeatils] = useState({

        id: '',
        user: '',
        email: ''

    })

    const { id, title, completed } = inputdetais

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
                console.log(res.data)
                setApiData(res.data)
            }
            catch {
                console.log("api getting errors")
            }
        }
        fetchdata()
    }, [])



    const deletefn = (id) => {
        console.log(id, "idvalue")
        const deleterow = apidata.filter((_, each) => each !== id)
        setApiData(deleterow)
        console.log(deleterow, "deleterow")

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlechange = (e) => {
        console.log("onchange")
        setInputDeatils({ [e.target.name]: e.target.value })
    }


    const adddetailstotable = (e) => {
        e.preventDefault()
        console.log("add data", apidata)
        setShow(false)
        setApiData([...apidata, inputdetais])
        setInputDeatils({ ...inputdetais, id: '', email: '', user: '' })
    }


    const handleshowupdat = () => {
        setShow(true)

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
                    {
                        apidata.map((each, id) => {
                            return (
                                <tr key={id}>
                                    <td>{each.id}</td>
                                    <td>{each.username}</td>
                                    <td>{each.email}</td>
                                    <td>
                                        <Button onClick={() => deletefn(id)}>DELETE</Button></td>
                                    <td><Button onClick={() => handleshowupdat(apidata)}>UPDATE</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ margin: '10px', padding: '5px' }}>
                        <div className="mb-3">
                            <label htmlFor="id">ID:</label>
                            <input placeholder="enter id" type="text" name="id" value={inputdetais.id} onChange={handlechange} /><br />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="id">Users:</label>
                            <input type="text" placeholder="enter user" name="user" value={inputdetais.user} onChange={handlechange} /><br />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="id">Email:</label>
                            <input type="email" placeholder="enter email" name="email" value={inputdetais.email} onChange={handlechange} />
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={adddetailstotable}>AddtoTable</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
<div>
</div>
export default Toasts;