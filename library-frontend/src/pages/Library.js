import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import {Button, Table} from "react-bootstrap";
import async from "async";
import booksService from "../services/books.service";
import toastService from "../services/toast.service";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store/actions/user.actions";
import {useHistory} from "react-router-dom";


const Library = () => {
    const [books, setBooks] = useState([]);

    const dispatch = useDispatch();
    const store = useSelector(state => state)

    const history = useHistory();


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

    const handleSignOut = () => {
        dispatch(userActions.logoutRequest())
        history.push({pathname: '/'})
    }

    const deleteBook = (book) => {
        booksService.deleteBook(book)
            .then(response => {
                if(response.status === 200)
                    getBooks();
            })
            .catch(err => {
                toastService.show("error", "Error")
            })
    }

    return (
        <div>
            <div style={{backgroundColor : "#D6DBDF"}}>
                <br/><br/>
                <h2>Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore</h2>
                <p>Hello, username!</p>
                <a style={{color : "blue",textDecoration: "underline"}} onClick={handleSignOut}>Sign out</a>
                <br/>
                <hr/>
            </div>

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
                                <Button variant="link" style={{color: 'black'}} onClick={() => deleteBook(book)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>

                <Button variant="secondary">Add</Button>
            </div>
            <Footer/>
        </div>
    )
}

export default Library;