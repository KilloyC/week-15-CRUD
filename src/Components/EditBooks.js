import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';


function EditBooks({ getBooks, endpoint, book }) { //this is where the props are called.
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editGenre, setEditGenre] = useState('');
    const [bookId, setBookId] = useState('');
    const modalId = `myEditModal${book.id}`; //uses the id of the modal and the book id to allow individual books to be selected.
    
    const updateBook = (id) => {
        //console.log(endpoint);
        // console.log(id);
        // console.log(editTitle, editAuthor, editGenre);
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
        }).then(() => {
            setEditTitle(''); //clears out the input fields.
            setEditAuthor('');
            setEditGenre('');
            getBooks();
        })

    }

    const handleEditClick = (book) => { //populates the input fields with the desired content.
        setEditTitle(book.title);
        //console.log(book.title);
        setEditAuthor(book.author);
        //console.log(book.author);
        setEditGenre(book.genre);
        //console.log(book.genre)
        setBookId(book.id)
        //console.log(book.id);
      }

/**setting the onChange event to the text in the input fields. setting the event to onClick and the books id to the updateBook put request to update each book.
 * data-bs-target uses the id modalId to set the id for each book so that when you hit the edit button it knows what book you selected.
 */

    return (
        <>
            <div>
            <Grid item xs={8} onClick={() => handleEditClick(book)} data-book-id={book.id} data-bs-toggle='modal' data-bs-target={`#${modalId}`} className='text-center' style={{cursor: 'pointer'}}>
                <EditOutlinedIcon />
            </Grid>
            </div>
            <div className="modal fade editModal" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
 
                    <div key={book.id} className="modal-body">
                        <form>
                        <div className="mb-3">
                            <label htmlFor="editTitle" className="col-form-label">Title</label>
                            <input type="text" className="form-control" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} id="editTitle"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editAuthor" className="col-form-label">Author</label>
                            <input type="text" className="form-control" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} id="editAuthor"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editGenre" className="col-form-label">Genre</label>
                            <input type="text" className="form-control" value={editGenre} onChange={(e) => setEditGenre(e.target.value)} id="editGenre"></input>
                        </div>
                        <div className="mb-3">
                            <input type="hidden" className="form-control" value={bookId} onChange={(e) => setBookId(e.target.value)} id="bookId"></input>
                        </div>
                        </form>
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={() => updateBook(book.id)}>Update {book.title}</button>
                    </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBooks;