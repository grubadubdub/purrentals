let express = require('express')
let bodyParser = require('body-parser')
let pg = require('pg')
const PORT = 9999

let pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'cs304',
    database: 'purrentals',
    max: 19, // max 10 connections
    port: 5432
})

// express instance 
let app = express()

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// ------------ REST API ------------ //

// C U S T O M E R S

// functions


// ---------------------------------- //

// P U R R E N T S
// worker
// app.get('/worker/')

// stats
// app.get('/animals/popular')
// app.get('/animals/popular-rented')

// animals
// app.put
// app.delete

// POST ANIMALS
app.post('/api/animals', function (req, res) {
    var fname = req.body.fname
    var addr = req.body.address
    var phone = req.body.phone

    pool.connect((err, db, done) => {
        if (err)
            return console.error('error fetching data\n' + err)
        else {
            // db.query("select * from animal", (err, table) => {
            if (err)
                return console.log(err)
            else {
                // console.table(table)
                console.log('connection success, POST success')
            }

        }
    })
})

app.post('/api/customers/signup', function (req, res) {
  const { custid, name, address, pnum } = req.body;
  console.log(`insert into customer values(${custid}, \'${name}\', \'${address}\', \'${pnum}\')`)
  // res.status(200).send(custid)
  pool.connect((err, db, done) => {
      if (err) {
        console.error('error fetching data\n' + err)
        res.send(500, err)
        // res.status(500).send()
      }
      else {
        db.query(`insert into customer values(${custid}, \'${name}\', \'${address}\', \'${pnum}\')`, (err, table) => {
          if (err)
            return res.status(500).send(err)
          // else {
          console.log('nice')
          res.send(200)
          // }
        })
      }
    })
})
/* hi baby */


app.post('/api/customers/login', function (req, res) {
    console.log('request body: ' + req.body.custid);
    let custid = req.body.custid

    // res.status(200).send(custid)
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err)
            res.send(500, err)
            // res.status(500).send()
        }
        else {
            db.query(`select * from customer where custid=${custid}`, (err, table) => {
                done()
                if (table.rowCount === 0)
                    res.send(500, err)
                else {
                    res.status(200).send(custid)
                }
            })
        }
    })
})

// customers
// GET CUSTOMERS
app.get('/api/customers', (req, res) => {
    pool.connect((err, db, done) => {
      if (err)
        return console.error('error fetching data\n' + err)
      db.query("select * from customer", (err, table) => {
        if (err)
            return console.log(err)
        res.json(table)
      })
    })
})

// POST CUSTOMERS
app.post('/api/customers/add', function (req, res) {
    const { custid, name, address, pnum} = req.body

    let found = false;

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            console.log(`INSERT INTO customer VALUES (${custid},\'${name}\',\'${address}\',\'${pnum}\')`)
            db.query(`INSERT INTO customer VALUES (${custid},\'${name}\',\'${address}\',\'${pnum}\')`, (err, table) => {
                if (err) {
                    console.log('customer already exists!');
                    res.status(400).send('customer already exists!');
                } else {
                    console.log('Success!\n');
                    res.status(200).send(true);
                }
            });
        }
    })
});

// member
// app.put

// GET
app.get('/api/animals', (req, res) => {
    pool.connect((err, db, done) => {
        if (err)
            return console.error('error fetching data\n' + err)
        db.query("select * from animal", (err, table) => {
            if (err)
                return console.log(err)
            res.json(table)
        })
    })
})

app.get('/', (req, res) => {
    res.send('HALLO')
})

app.listen(PORT, () => console.log('Server starting on port ' + PORT))
