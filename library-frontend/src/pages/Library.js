import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import {Button, FormControl, Modal, Table} from "react-bootstrap";
import booksService from "../services/books.service";
import toastService from "../services/toast.service";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store/actions/user.actions";
import {useHistory} from "react-router-dom";
import bookService from "../services/books.service";
import ISBN from "isbn-verify";


const Library = () => {
    const [books, setBooks] = useState([]);
    const [bookForAddOrEdit, setBookForAddOrEdit] = useState({
        bookId : "",
        isbn : "",
        author : "",
        genre : "",
        title : ""
    });
    const [bookTempTitle, setBookTempTitle] = useState("")
    const [show, setShow] = useState(false);
    const [authorErr, setAuthorErr] = useState("Cannot be empty");
    const [titleErr, setTitleErr] = useState("Cannot be empty");
    const [genreErr, setGenreErr] = useState("Cannot be empty");
    const [isbnErr, setIsbnErr] = useState("Invalid ISBN");

    const dispatch = useDispatch();
    const store = useSelector(state => state)

    const history = useHistory();
    const handleClose = () => {
        setBookTempTitle("")
        setShow(false);
        setBookForAddOrEdit({
            bookId : "",
            isbn : "",
            author : "",
            genre : "",
            title : ""
        })
        setAuthorErr("Cannot be empty")
        setTitleErr("Cannot be empty")
        setGenreErr("Cannot be empty")
        setIsbnErr("Cannot be empty")
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        getBooks(store.user.jwt)
    }, []);

    const getBooks = async () => {
        booksService.getBooks(store.user.jwt)
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
        booksService.deleteBook(book, store.user.jwt)
            .then(response => {
                if(response.status === 200)
                    getBooks();
            })
            .catch(err => {
                toastService.show("error", "Error")
            })
    }

    const addOrEditBook = (book = null) => {
        if (book != null) {
            setBookTempTitle(book.title)
            setBookForAddOrEdit(book)
            setAuthorErr("")
            setGenreErr("")
            setTitleErr("")
            setIsbnErr("")
        }
        setShow(true)
    }

    const handleInputChange = (event) => {
        setBookForAddOrEdit({
            ...bookForAddOrEdit,
            [event.target.name]: event.target.value
        })
    }

    // const isISBN13 = (str) =>{
    //     let sum, digit, check, i;
    //
    //     str = str.replace(/[^0-9X]/gi, '');
    //
    //     if (str.length !== 13) {
    //         return false;
    //     }
    //
    //     if (str.length === 13) {
    //         sum = 0;
    //         for (i = 0; i < 12; i++) {
    //             digit = parseInt(str[i]);
    //             if (i % 2 === 1) {
    //                 sum += 3*digit;
    //             } else {
    //                 sum += digit;
    //             }
    //         }
    //         check = (10 - (sum % 10)) % 10;
    //         return (check === str[str.length-1]);
    //     }
    //
    // }

    const validationErrorMessage = (event) => {
        const { name } = event.target;

        switch (name) {
            case 'isbn':
                checkIsbnAPI();
                break;
            case 'title':
                setTitleErr( bookForAddOrEdit.title !== "" ? '' : 'Cannot be empty')
                break;
            case 'author':
                setAuthorErr( bookForAddOrEdit.author !== "" ? '' : 'Cannot be empty')
                break;
            case 'genre':
                setGenreErr( bookForAddOrEdit.genre !== "" ? '' : 'Cannot be empty')
                break;
        }
    }

    // const checkIsbn = () => {
    //     const ISBN = require('isbn-verify');
    //     return ISBN.Verify( bookForAddOrEdit.isbn);
    // }

    const checkIsbnAPI = () => {
        let isbn = require('node-isbn');
        isbn.resolve(bookForAddOrEdit.isbn, function (err, book) {
            if (err) {
                console.log('Book not found', err);
                setIsbnErr('Invalid ISBN')
            } else {
                console.log('Book found %j', book);
                setIsbnErr('');
            }
        });
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const errors = ['author','title', 'isbn', 'genre'];
        if (validateForm(errors)) {
            await sendParams()
        } else {
            console.log('Invalid Form')
        }
    }

    const validateForm = (errors) => {
        let valid = true;
        for(const Error of errors) {
            validationErrorMessage(createTarget(Error));
        }
        if(authorErr !== "" ||  genreErr !== "" || titleErr !== "" || isbnErr !== "")
            return !valid;
        return valid;
    }

    const createTarget =  (error) => {
        return {target : {value : error, name : error}}
    }

    const sendParams = async () => {
        const response = bookForAddOrEdit.bookId === "" ? await bookService.createBook(bookForAddOrEdit, store.user.jwt) : await booksService.updateBook(bookForAddOrEdit, store.user.jwt);
        if (response.status === 200) {
            toastService.show("success", "Successfully updated!Please log-in.")
            handleClose()
            getBooks()
        } else {
            toastService.show("error", "Error! Try again")
        }
    }

    return (
        <div>
            <div style={{backgroundColor : "#D6DBDF"}}>
                <br/><br/>
                <div style={{float : "right", marginRight : "40px"}}>
                    Hello, {store.user.username}!
                    <br/>
                    <a style={{color : "blue",textDecoration: "underline"}} onClick={handleSignOut}>Sign out</a>
                </div>
                <div style={{marginLeft : "40px"}}>
                    <h2>Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore</h2>
                </div>
                
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
                                <td><Button variant="link" style={{color: 'black'}} onClick={() => addOrEditBook(book)}>Edit</Button>
                                <Button variant="link" style={{color: 'black'}} onClick={() => deleteBook(book)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>

                <Button variant="secondary" onClick={() => addOrEditBook()}>Add</Button>
            </div>
            <Footer/>


            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>{bookForAddOrEdit.bookId !== "" ? <span>Edit {bookTempTitle}</span> : <span>Add new book</span>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row" style={{marginTop: '1rem'}}>
                        <label  className="col-sm-2 col-form-label">ISBN *</label>
                        <div className="col-sm-6 mb-2">
                            <input     type="text" value={bookForAddOrEdit.isbn} name="isbn" placeholder="ISBN" onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage}  className="form-control" />
                            {isbnErr.length > 0 && <span className="text-danger">{isbnErr}</span>}

                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                    <div className="row" style={{marginTop: '1rem'}}>
                        <label className="col-sm-2 col-form-label">Title *</label>
                        <div className="col-sm-6 mb-2">
                            <FormControl name="title" type="text" placeholder="Title"  value={bookForAddOrEdit.title} onChange={(e) => handleInputChange(e) }  onBlur={validationErrorMessage}/>
                            {titleErr.length > 0 &&  <span className="text-danger">{titleErr}</span>}
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>

                    <div className="row" style={{marginTop: '1rem'}}>
                        <label  className="col-sm-2 col-form-label">Author *</label>
                        <div className="col-sm-6 mb-2">
                            <FormControl name="author" type="text" placeholder="Author" value={bookForAddOrEdit.author} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage} />
                            {authorErr.length > 0 &&  <span className="text-danger">{authorErr}</span>}
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>

                    <div className="row" style={{marginTop: '1rem'}}>
                        <label  className="col-sm-2 col-form-label">Genre *</label>
                        <div className="col-sm-6 mb-2">
                            <FormControl name="genre" type="genre" placeholder="Genre" value={bookForAddOrEdit.genre} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage} />
                            {genreErr.length > 0 &&  <span className="text-danger">{genreErr}</span>}
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>


                    <div className="row" style={{marginTop: '1rem'}}>
                        <div className="col-sm-5 mb-2">
                        </div>
                        <div className="col-sm-4">
                            <Button variant="success" onClick={submitForm}>Confirm</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Library;