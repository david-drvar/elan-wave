import React, {useEffect, useState} from 'react';
import Footer from "./components/Footer";
import {Button, Table} from "react-bootstrap";
import async from "async";
import booksService from "./services/books.service";
import toastService from "./services/toast.service";


const Library = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks()
    }, []);

    const getBooks = async () => {
        booksService.getBooks()
            .then(response => {
                if(response.status === 200)
                    setBooks(response.data)
            })
            .catch(err => {
                toastService.show("error", "Error")
            })
    }

    return (
        <div>
            <div style={{marginTop:'5%',marginLeft:'10%', marginRight:'10%', marginBottom:'20%'}}>
                <h2 >Books</h2>
                <br/>
                <Table striped bordered hover>
                    <thead style={{backgroundColor : "gray"}}>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book,index) => {
                        return (
                            <tr>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td><Button variant="link" style={{color: 'black'}} >Edit</Button>
                                <Button variant="link" style={{color: 'black'}} >Delete</Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            <Footer/>
        </div>
    )
}

export default Library;