import React, { useState } from 'react';

function AddBook({ getBooks, endpoint }) {
    // const [newBook, setNewBook] = useState({
    //     title: '',
    //     author: '',
    //     genre: ''
    // })
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');
    const [newBookGenre, setNewBookGenre] = useState('');

    const createBook = (e) => {
        e.preventDefault();
        //console.log(endpoint);
        console.log(newBookTitle, newBookAuthor, newBookGenre);
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newBookTitle,
                author: newBookAuthor,
                genre: newBookGenre
            })

        }).then(() => getBooks())
        // .then(getBooks)
               
        setNewBookTitle('');
        setNewBookAuthor('');
        setNewBookGenre('');
    }

    return(
        <>
        <div className='add-books'>
            <button className='btn btn-primary addBook'
            data-bs-toggle='modal' data-bs-target='#myModal'>Add Book +</button>
        </div>
        <div className="modal fade addMod" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add a new book</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">Title</label>
                    <input type="text" className="form-control" onChange={(event) => {
                        //console.log(event);
                        setNewBookTitle(event.target.value)}} id="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="col-form-label">Author</label>
                    <input type="text" className="form-control" onChange={(event) => setNewBookAuthor(event.target.value)} id="author"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="col-form-label">Genre</label>
                    <input type="text" className="form-control" onChange={(event) => setNewBookGenre(event.target.value)} id="genre"></input>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={(e) => createBook(e)}>Submit</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default AddBook;