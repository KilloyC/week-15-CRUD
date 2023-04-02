import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddBook from './AddBook';
import EditBooks from './EditBooks';
import Navbar from './Navbar';
import './BookList.css';
import Grid from '@mui/material/Grid';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const BookList = () => {
    const [books, setBooks] = useState([]);

    const endpoint = 'https://64051b18eed195a99f7c3b5c.mockapi.io/books';
    useEffect(() => { //initially renders the fetch call.
        getBooks()
    }, []);//empty dependency array tell useEffect to render the fetch call once.

    const getBooks = () => {
        fetch(endpoint)
            .then((data) => data.json()) //then is a promise that will return the api data if called correctly.
            .then((data) => {
                setBooks(data)
                //console.log(data);
            })
    }

    const deleteBook = (id) => { //api delete method to delete elements in an api. takes in the endpoint and the id of each element.
        fetch(`${endpoint}/${id}`, {
            method: 'DELETE',
        }).then(res => {
            res.json()
            .then((resp) => {
                console.log(resp);
            getBooks();
            })
        })
    }
    
    //passing props to AddBook and EditBook. mapping through the array of objects that is books to return the object values. exporting Navbar as well.
    return (
        <div>
            <Navbar />
           <div className='container mt-5 mb-5'>
                <div className='card'>
                    <div className='card-header text-center display-4'>Book List <hr/>
                    <span className='addBookBtn'><AddBook getBooks={getBooks} endpoint={endpoint}/></span></div>
                    <div className='card-body'>
                        <table className='table table-responsive table-hover'>
                            <thead className='table-header'>
                                <tr>
                                    <th scope='col'>TITLE</th>
                                    <th scope='col'>AUTHOR</th>
                                    <th scope='col'>GENRE</th>
                                    <th scope='col'>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => {
                                    //console.log(book);
                                return <tr key={uuidv4()} className='table-td text-white'>
                                    <td className='text-center'>{book.title}</td>
                                    <td className='text-center'>{book.author}</td>
                                    <td className='text-center'>{book.genre}</td>
                                    <td>
                                        <div className='editDeletButtons'>
                                            <EditBooks getBooks={getBooks} endpoint={endpoint} book={book} />
                                            <Grid className='text-center' style={{cursor: 'pointer'}} item xs={8} onClick={() => deleteBook(book.id)}>
                                                <DeleteForeverOutlinedIcon />
                                            </Grid>
                                        </div>
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookList;