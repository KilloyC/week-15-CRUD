import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';


function EditBooks({ getBooks, endpoint, book }) {
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editGenre, setEditGenre] = useState('');
    
    const updateBook = (id) => {
        //console.log(endpoint);
        console.log(id);
        fetch(`${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: editTitle,
                author: editAuthor,
                genre: editGenre
            })
        }).then(() => getBooks())
        //console.log(getBooks());

        setEditTitle('');
        setEditAuthor('');
        setEditGenre('');
    }


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
                    <div className="modal-body">
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={() => updateBook(book.id)}>Update</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBooks;