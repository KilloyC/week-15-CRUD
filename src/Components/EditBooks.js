import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';


function EditBooks({ getBooks, endpoint, book, books }) { //this is where the props are called.
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editGenre, setEditGenre] = useState('');
    
    const updateBook = (e, id) => {
        e.preventDefault();
        //console.log(endpoint);
        console.log(id);
        console.log(editTitle, editAuthor, editGenre);
        fetch(`${endpoint}/${id}`, { //similar to delete method. It takes the endpoint and id of each element.
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //data that is to be converted to json.
                title: editTitle,
                author: editAuthor,
                genre: editGenre
            })
        }).then(() => getBooks())

        setEditTitle(''); //clears out the input fields.
        setEditAuthor('');
        setEditGenre('');
    }

/**setting the onChange event to the text in the input fields. setting the event to onClick and the books id to the updateBook put request to update each book. */

    return (
        <>
            <div>
                <Grid item xs={8} data-bs-toggle='modal' data-bs-target='#myEditModal' className='text-center' style={{cursor: 'pointer'}}>
                    <EditOutlinedIcon />
                </Grid>
            </div>
            <div className="modal fade editModal" id="myEditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {books.map((book, index) => /**mapping through the modal to be able to update each book. I was not able to figure out how to only use one modal :(. */
                    <div key={index} className="modal-body">
                        <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="col-form-label">Title</label>
                            <input type="text" className="form-control" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} id="title"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="col-form-label">Author</label>
                            <input type="text" className="form-control" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} id="author"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genre" className="col-form-label">Genre</label>
                            <input type="text" className="form-control" value={editGenre} onChange={(e) => setEditGenre(e.target.value)} id="genre"></input>
                        </div>
                        </form>
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={(e) => updateBook(e, book.id)}>Update {book.title}</button>
                    </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBooks;