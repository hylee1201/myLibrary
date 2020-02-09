

const Pool = require('pg').Pool
const DB = require('../DB');
const pool = new Pool(DB);

console.log(pool);

const getMemberAddresses = (req, res) => {
    pool.query('SELECT * FROM member_address', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const getMemberAddressById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM member_address WHERE member_address_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const createMemberAddress = (req, res) => {
    const { member_id, street_no, street_name, city, province, zip_code } = req.body
  
    pool.query('INSERT INTO member_address (member_id, street_no, street_name, city, province, zip_code) VALUES ($1, $2, $3, $4, $5, $6)', [member_id, street_no, street_name, city, province, zip_code], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Member Address created with ID: ${result.insertId}`)
    })
}

const updateMemberAddress = (req, res) => {
    const id = parseInt(req.params.id)
    const { member_id, street_no, street_name, city, province, zip_code, member_address_id } = req.body
  
    pool.query(
      'UPDATE member_address ' + 
      'SET member_id = $1, street_no = $2, street_name = $3, city = $4, province = $5, zip_code = $6 ' +
      'WHERE member_address_id = $7',
      [member_id, street_no, street_name, city, province, zip_code, member_address_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Member Address updated with ID: ${id}`)
      }
    )
}

const deleteMemberAddress = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM member_address WHERE member_address_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Member Address deleted with ID: ${id}`)
    })
}

module.exports = {
    getMemberAddresses,
    getMemberAddressById,
    createMemberAddress,
    updateMemberAddress,
    deleteMemberAddress
}