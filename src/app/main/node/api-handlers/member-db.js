

const Pool = require('pg').Pool
const DB = require('../DB');
const pool = new Pool(DB);

console.log(pool);

const getMembers = (req, res) => {
    pool.query('SELECT * FROM member ORDER BY title ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const getMemberById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM member WHERE member_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const createMember = (req, res) => {
    const { last_name, first_name, gender, member_title_id } = req.body
  
    pool.query('INSERT INTO member (last_name, first_name, gender, member_title_id) VALUES ($1, $2, $3, $4)', [last_name, first_name, gender, member_title_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Member created with ID: ${result.insertId}`)
    })
}

const updateMember = (req, res) => {
    const id = parseInt(req.params.id)
    const { last_name, first_name, gender, member_title_id, member_id } = req.body
  
    pool.query(
      'UPDATE member ' + 
      'SET last_name = $1, first_name = $2, gender = $3, member_title_id = $4 ' +
      'WHERE member_id = $5',
      [last_name, first_name, gender, member_title_id, member_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Member updated with ID: ${id}`)
      }
    )
}

const deleteMember = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM member WHERE member_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Member deleted with ID: ${id}`)
    })
}

module.exports = {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
}