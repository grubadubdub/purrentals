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
    // IF YOU GET ECONNECT ERROR AGAIN CHANGE TO 5432
})

// express instance
let app = express()

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
            console.log(err)
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

// WORKING ENDPOINTSSSSSSS ----------------------------
app.post('/api/customers/login', function (req, res) {
    console.log('request body: ' + req.body.custid);
    let custid = req.body.custid;
    console.log('customer login\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err)
            res.send(500, err)
            // res.status(500).send()
        }
        else {
            db.query("SELECT * FROM customer WHERE custid = " + custid + ";", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('custid was found!\n');
                        res.status(200).send(custid);
                    } else {
                        console.log('custid was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});

app.post('/api/customers/add', function (req, res) {
    let custid = req.body.custid
    let name = req.body.name
    let address = req.body.address
    let pnum = req.body.pnum
    console.log('adding cust')
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("INSERT INTO customer VALUES ($1,$2,$3,$4);", [custid, name, address, pnum], (err, table) => {
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

app.post('/api/customers/login', function (req, res) {
    console.log('request body: ' + req.body.custid);
    let custid = req.body.custid;
    console.log('customer login\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err)
            res.send(500, err)
            // res.status(500).send()
        }
        else {
            db.query("SELECT * FROM customer WHERE custid = " + custid + ";", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('custid was found!\n');
                        res.status(200).send(custid);
                    } else {
                        console.log('custid was NOT found!\n');
                        res.status(400).send();
                    }
                }
            })
        }
    })
});


// login employee
app.post('/api/purrents/login', function (req, res) {
    console.log('request body: ' + req.body.empid);
    let empid = req.body.empid;
    console.log('employee login\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err)
            res.send(500, err)
            // res.status(500).send()
        }
        else {
            db.query("SELECT * FROM purrent_manages WHERE empid = " + empid + ";", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('empid was found!\n');
                        res.status(200).send(true);
                    } else {
                        console.log('empid was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});


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
            db.query("SELECT * FROM transactions WHERE custid = $1", [custid], (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

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
        }
        else {
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
// WORKING ENDPOINTSSSSSSS ----------------------------

// MORE ENDPOINTS THAT WORKKKKKKK ---------------------

app.post('/api/customers/update', function (req, res) {
    let custid = req.body.custid
    let name = req.body.name
    let address = req.body.address
    let pnum = req.body.pnum
    console.log(custid)
    console.log(name)
    console.log(address)
    console.log(custid)
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("UPDATE customer SET name = $2, address = $3, phone_number = $4 WHERE custid = $1;", [custid, name, address, pnum], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('failed ' + err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('success!');
                }
            });
        }
    })
});

app.post('/api/invoice', function (req, res) {
    let custid = req.body.custid;
    console.log('invoicing')
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT * FROM invoice_records WHERE transid IN (SELECT transid FROM transactions WHERE custid = $1)", [custid], (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

app.post('/api/curr-cust', function (req, res) {
    let custid = req.body.custid;
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT c.name, count(t.transid) FROM customer c, transactions t WHERE t.custid = $1 AND c.custid = $1 GROUP BY (c.custid, c.name)", [custid], (err, table) => {
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

app.post('/api/curr-cust-pts', function (req, res) {
    let custid = req.body.custid;
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT points FROM purrfect_member WHERE custid = $1", [custid], (err, table) => {
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(400).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows[0]);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

app.post('/api/customers/misc-animal-info', function (req, res) {
    var pack = req.body.package
    var diet = req.body.diet
    var animaltype = req.body.animaltype
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            let sel = "SELECT ";
            if (info === "true") {
                sel = sel + "info, ";
            }
            if (diet === "true") {
                sel = sel + "diettype, ";
            }
            if (animaltype === "true") {
                sel = sel + "animaltype, ";
            }
            sel = sel.substring(0,sel.length - 2)
            console.log(sel + " FROM ((SELECT p.dietid, 'furry' AS animaltype, c.info FROM care_package c, furry_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'feathery' AS animaltype, c.info FROM care_package c, feathery_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'scalie' AS animaltype, c.info FROM care_package c, scalie_pack p WHERE c.packageid=p.packageid) AS t LEFT JOIN diet d ON t.dietid = d.dietid) AS foo")

            db.query(sel + " FROM ((SELECT p.dietid, 'furry' AS animaltype, c.info FROM care_package c, furry_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'feathery' AS animaltype, c.info FROM care_package c, feathery_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'scalie' AS animaltype, c.info FROM care_package c, scalie_pack p WHERE c.packageid=p.packageid) AS t LEFT JOIN diet d ON t.dietid = d.dietid) AS foo", (err, table) => {

                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(400).send('query error!\n');
                } else {
                    console.log('Success!');
                    console.table(res.rows)
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

app.post('/api/customers/redeem-purrks', function (req, res) {
    console.log('req: '+req.body)
    let custid = req.body.custid;
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT * FROM purrks WHERE EXISTS (SELECT custid from purrfect_member WHERE custid = $1)", [custid], (err, table) => {
                console.log(table)
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(400).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows[0]);
                    } else {
                        console.log('custid DNE');
                        res.status(400).send('custid not found!');
                    }
                }
            })
        }
    })
});

app.post('/api/purrents/curr-purrent', function (req, res) {
    let custid = req.body.empid;
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('error fetching data\n');
        }
        else {
            db.query("SELECT * FROM purrent_manages WHERE empid = $1;", [custid], (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('empid was found!\n');
                        res.status(200).send(custid);
                    } else {
                        console.log('empid was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});

app.get('/', (req, res) => {
    res.send('HALLO')
})

app.listen(PORT, () => console.log('Server starting on port ' + PORT))
