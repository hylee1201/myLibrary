const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');

const app = express();
const book = require('./api-handlers/book-db');
const member = require('./api-handlers/member-db');
const memberAddress = require('./api-handlers/member-address-db');
const memberPhone = require('./api-handlers/member-phone-db');
const port = 3000;

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  response.json({ info: 'server is running' })
})

//============== Book API =================
app.get('/books', (req, res) => {
  book.getBooks(req, res);
});

app.get('/books/:id', (req, res) => {
  book.getBookById(req, res);
});

app.post('/books', (req, res) => {
  book.createBook(req, res);
});

app.put('/books/:id', (req, res) => {
  book.updateBook(req, res);
});

app.delete('/books/:id', (req, res) => {
  book.deleteBook(req, res);
});

//============== Member API =================
app.get('/members', (req, res) => {
  book.getMembers(req, res);
});

app.get('/members/:id', (req, res) => {
  book.getMemberById(req, res);
});

app.post('/members', (req, res) => {
  book.createMember(req, res);
});

app.put('/members/:id', (req, res) => {
  book.updateMember(req, res);
});

app.delete('/members/:id', (req, res) => {
  book.deleteMember(req, res);
});

//============== Member Address API =================
app.get('/memberAddresses', (req, res) => {
  book.getMemberAddresses(req, res);
});

app.get('/memberAddresses/:id', (req, res) => {
  book.getMemberAddressById(req, res);
});

app.post('/memberAddresses', (req, res) => {
  book.createMemberAddress(req, res);
});

app.put('/memberAddresses/:id', (req, res) => {
  book.updateMemberAddress(req, res);
});

app.delete('/memberAddresses/:id', (req, res) => {
  book.deleteMemberAddress(req, res);
});

//============== Member Phone API =================
app.get('/memberPhones', (req, res) => {
  book.getMemberPhones(req, res);
});

app.get('/memberPhones/:id', (req, res) => {
  book.getMemberPhoneById(req, res);
});

app.post('/memberPhones', (req, res) => {
  book.createMemberPhone(req, res);
});

app.put('/memberPhones/:id', (req, res) => {
  book.updateMemberPhone(req, res);
});

app.delete('/memberPhones/:id', (req, res) => {
  book.deleteMemberPhone(req, res);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})




