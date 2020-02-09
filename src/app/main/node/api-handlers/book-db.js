
const Pool = require('pg').Pool
const DB = require('../DB');
const pool = new Pool(DB);

console.log(pool);

const getBooks = (req, res) => {
    pool.query('SELECT * FROM book ORDER BY title ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const getBookById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM book WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const createBook = (req, res) => {
    const { title, subtitle, author, publisher, book_type_id, note, ISBN, compiler } = req.body
  
    pool.query('INSERT INTO book (title, subtitle, author, publisher, book_type_id, note, ISBN, compiler) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [title, subtitle, author, publisher, book_type_id, note, ISBN, compiler], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Book created with ID: ${result.insertId}`)
    })
}

const updateBook = (req, res) => {
    const id = parseInt(req.params.id)
    const { title, subtitle, author, publisher, book_type_id, note, ISBN, compiler } = req.body
  
    pool.query(
      'UPDATE book ' + 
      'SET title = $1, subtitle = $2, author = $3, publisher = $4, book_type_id = $5, note = $6, ISBN = $7, compiler = $8 ' +
      'WHERE id = $9',
      [title, subtitle, author, publisher, book_type_id, note, ISBN, compiler, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Book updated with ID: ${id}`)
      }
    )
}

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM book WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book deleted with ID: ${id}`)
    })
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}