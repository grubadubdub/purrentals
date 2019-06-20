let express = require('express')
let bodyParser = require('body-parser')
let pg = require('pg')
const PORT = 9999

let pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'honeypot',
    database: 'purrentals',
    max: 19, // max 10 connections
    port: 8888
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

app.post('/api/customers/new-rental', function (req, res) {
  let custid = req.body.custid
  let animalid = req.body.animalid
  let start = req.body.start
  let end = req.body.end
  let paymethod = req.body.paymethod
  let price = Math.random() * (1000000 - 0.01) + 0.01;

  pool.connect((err, db, done) => {
    if (err) {
        console.error('error fetching data\n' + err);
        res.status(500).send();
    } else {
        db.query("insert into transactions values (default, $1, $2, $3, $4);", [price, start, animalid, custid], (err, table) => {
            if (err) {
                console.log('Transaction insertion error!');
                res.status(400).send('transaction insertion error!' + err);
            } else {
                db.query("select transid from transactions where transid = (select max(transid) from transactions)", (err, table) => {
                    let key = table.rows[0]["transid"];
                    db.query("insert into rentals values ($1, $2, $3);", [key, start, end], (err, table) => {
                        if (err) {
                            console.log('Rental insertion error!');
                            res.status(400).send('rental insertion error!' + err);
                        } else {
                            db.query("insert into invoice_records values (DEFAULT, $1, $2);", [key, paymethod], (err, table) => {
                                if (err) {
                                    console.log('Invoice insertion error!');
                                    res.status(400).send('invoice insertion error!' + err);
                                } else {
                                    console.log('All insertions success!');
                                    res.status(200).send('success!');
                                }
                            })
                        }
                    })
                })
            }
        });
    }
  })
});

app.post('/api/customers/new-purrchase', function (req, res) {
    let custid = req.body.custid
    let animalid = req.body.animalid
    let date = req.body.date
    let mchip = req.body.mchip
    let insurance = req.body.insurance
    let paymethod = req.body.paymethod
    let price = Math.random() * (1000000 - 0.01) + 0.01;

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("insert into transactions values (default, $1, $2, $3, $4);", [price, date, animalid, custid], (err, table) => {
                if (err) {
                    console.log('Transaction insertion error!');
                    res.status(400).send('transaction insertion error!' + err);
                } else {
                    db.query("select transid from transactions where transid = (select max(transid) from transactions)", (err, table) => {
                        let key = table.rows[0]["transid"];
                        db.query("insert into purrchases values ($1, $2, $3);", [key, insurance, mchip], (err, table) => {
                            if (err) {
                                console.log('Rental insertion error!');
                                res.status(400).send('rental insertion error!' + err);
                            } else {
                                db.query("insert into invoice_records values (DEFAULT, $1, $2);", [key, paymethod], (err, table) => {
                                    if (err) {
                                        console.log('Invoice insertion error!');
                                        res.status(400).send('invoice insertion error!' + err);
                                    } else {
                                        console.log('All insertions success!');
                                        res.status(200).send('success!');
                                    }
                                })
                            }
                        })
                    })
                }
            });
        }
    })
});



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
            db.query("select * from animal", (err, table) => {
            if (err)
                return console.log(err)
            else {
                // console.table(table)
                console.log('connection success, POST success')
            }

        })
    }
    })
})

// POST CUSTOMERS
app.post('/api/customers/signup', function (req, res) {
    const { custid, name, address, pnum} = req.body

    let found = false;

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            // console.log(`INSERT INTO customer VALUES (${custid},\'${name}\',\'${address}\',\'${pnum}\')`)
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



// member
// app.put

// GET
app.get('/api/animals', (req, res) => {
    pool.connect((err, db, done) => {
        if (err)
            return console.error('error fetching data\n' + err)
        db.query(
            `select a.animalid, a.name, ct.type_of_clinic 
            from animal a, clinic c, clinictype ct
            where a.clinid = c.clinid and ct.typeid = c.typeid`
            , (err, table) => {
            if (err)
                return console.log(err)
            res.json(table)
        })
    })
})



app.post('/api/transactions', function (req, res) {
    let custid = req.body.custid;
    console.log('customer transactions\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query(`SELECT * FROM transactions WHERE custid = ${custid}`, (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('custid was found!\n');
                    res.status(200).send(table.rows);
                }
            })
        }
    })
});


app.get('/', (req, res) => {
    res.send('HALLO')
})

app.listen(PORT, () => console.log('Server starting on port ' + PORT))
