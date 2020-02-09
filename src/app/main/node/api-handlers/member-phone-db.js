

const Pool = require('pg').Pool
const DB = require('../DB');
const pool = new Pool(DB);

console.log(pool);

const getMemberPhones = (req, res) => {
    pool.query('SELECT * FROM member_phone ORDER BY last_name ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const getMemberPhoneById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM member_phone WHERE member_phone_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const createMemberPhone = (req, res) => {
    const { member_id, phone_type, phone_number } = req.body
  
    pool.query('INSERT INTO member_phone (member_id, phone_type, phone_number) VALUES ($1, $2, $3)', [member_id, phone_type, phone_number], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Member Phone created with ID: ${result.insertId}`)
    })
}

const updateMemberPhone = (req, res) => {
    const id = parseInt(req.params.id)
    const { member_id, phone_type, phone_number, member_phone_id } = req.body
  
    pool.query(
      'UPDATE member_phone ' + 
      'SET member_id = $1, phone_type = $2, phone_number = $3 ' +
      'WHERE member_phone_id = $4',
      [member_id, phone_type, phone_number, member_phone_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Member Phone updated with ID: ${id}`)
      }
    )
}

const deleteMemberPhone = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM member_phone WHERE member_phone_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Member Phone deleted with ID: ${id}`)
    })
}

module.exports = {
    getMemberPhones,
    getMemberPhoneById,
    createMemberPhone,
    updateMemberPhone,
    deleteMemberPhone
}