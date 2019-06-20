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
                        res.status(200).send(empid);
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
            `select a.animalid, a.name, d.diettype, ct.type_of_clinic
from animal a, clinic c, clinictype ct, diet d
where a.clinid = c.clinid 
and c.typeid = ct.typeid
and d.dietid = a.dietid`
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

            if (pack) {
                sel  = sel + "info, ";
            }
            if (diet) {
                sel  = sel + "diettype, ";
            }
            if (animaltype) {
                sel  = sel + "animaltype, ";
            }
            sel = sel.substring(0,sel.length - 2)
            console.log(sel + " DISTINCT FROM ((SELECT p.dietid, 'furry' AS animaltype, c.info FROM care_package c, furry_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'feathery' AS animaltype, c.info FROM care_package c, feathery_pack p WHERE c.packageid=p.packageid UNION SELECT p.dietid, 'scalie' AS animaltype, c.info FROM care_package c, scalie_pack p WHERE c.packageid=p.packageid) AS t LEFT JOIN diet d ON t.dietid = d.dietid) AS foo")

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
app.post('/api/animal-filter', function (req, res) {
    console.log(req.body)
    let filter = req.body.filter;


    pool.connect((err, db, done) => {
        console.log(req.body);
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('error fetching data\n');
        }
        else {
            let sel = "";
            if (filter==="furry") {
                sel = "furries";
            } else if (filter==="feathery") {
                sel = "featheries";
            } else if (filter==="scaly") {
                sel = "scalies"
            }
            db.query("SELECT a.animalid, a.name, f.address FROM " + sel + " fur, animal a, fungeon f WHERE a.animalid = fur.animalid AND a.business_license_id = f.business_license_id;", (err, table) => {
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('animals were found!\n');
                        res.status(200).send(table.rows);
                    } else {
                        console.log('combination was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});

app.post('/api/purrents/add-animal', function (req, res) {
    let animalid = req.body.animalid
    let animaltype = req.body.animaltype
    let diet = req.body.diet
    let blid = req.body.blid
    let clinid = req.body.clinid
    let packageid = req.body.packageid
    let name = "unnamed"

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("INSERT INTO animal VALUES ($1,$2,$3,$4,$5,$6);", [animalid, name, diet, clinid, blid, packageid], (err, table) => {
                if (err) {
                    console.log('animal already exists!' + err);
                    res.status(400).send('animal already exists!');
                } else {
                    db.query("INSERT INTO " + animaltype + "(animalid) VALUES ($1);", [animalid], (err, table) => {
                        if (err) {
                            console.log('animal already exists!' + err);
                            res.status(400).send('animal already exists!');
                        } else {
                            console.log('Success!\n');
                            res.status(200).send(true);
                        }
                    })
                }
            });
        }
    })
});

app.post('/api/purrents/update-animal', function (req, res) {
    let animalid = req.body.animalid
    let animaltype = req.body.animaltype
    let diet = req.body.diet
    let blid = req.body.blid
    let clinid = req.body.clinid
    let packageid = req.body.packageid
    let name = "unnamed"

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("UPDATE animal SET dietid = $2, clinid = $3, business_license_id = $4, packageid = $5 WHERE animalid = $1;", [animalid, diet, clinid, blid, packageid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('failed' + err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('success!');
                }
            });
        }
    })
});

app.post('/api/purrents/delete-animal', function (req, res) {
    let animalid = req.body.animalid

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("DELETE FROM animal WHERE animalid = $1;", [animalid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('Success!\n');
                }
            });
        }
    })
});

app.post('/api/purrents/delete-cust', function (req, res) {
    let custid = req.body.custid

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("DELETE FROM customer WHERE custid = $1;", [custid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('Success!\n');
                }
            });
        }
    })
});

app.post('/api/purrents/delete-purrent', function (req, res) {
    let empid = req.body.empid

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("DELETE FROM purrent_manages WHERE empid = $1;", [empid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('Success!\n');
                }
            });
        }
    })
});

app.post('/api/purrents/add', function (req, res) {
    let empid = req.body.empid
    let addr = req.body.addr
    let workerid = req.body.workerid
    let salary = req.body.salary
    let blid = req.body.blid
    let name = "unnamed"

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("INSERT INTO purrent_manages VALUES ($1,$2,$3,$4,$5,$6);", [empid, name, addr, salary, workerid, blid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('invalid!!');
                } else {
                    console.log('Success!\n');
                    res.status(200).send(true);
                }
            });
        }
    })
});

app.post('/api/purrents/update', function (req, res) {
    let empid = req.body.empid
    let addr = req.body.addr
    let workerid = req.body.workerid
    let salary = req.body.salary
    let blid = req.body.blid

    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send();
        }
        else {
            db.query("UPDATE purrent_manages SET address = $2, salary = $3, workerid = $4, business_license_id = $5 WHERE empid = $1;", [empid, addr, salary, workerid, blid], (err, table) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('failed' + err);
                } else {
                    console.log('Success!\n');
                    res.status(200).send('success!');
                }
            });
        }
    })
});

app.post('/api/transactions-all', function (req, res) {
    let search = req.body.search;
    let value = req.body.value;
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT t.*, r.*, p.* FROM transactions t LEFT JOIN rentals r ON t.transid = r.transid LEFT JOIN purrchases p ON t.transid = p.transid WHERE " + search + " = $1", [value], (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('DNE');
                        res.status(400).send('not found!');
                    }
                }
            })
        }
    })
});

app.get('/api/all-purrents', function (req, res) {
    console.log('customer transactions\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT p.*, w.*, f.* FROM purrent_manages p LEFT JOIN workertype w ON p.workerid = w.workerid LEFT JOIN fungeon f ON p.business_license_id = f.business_license_id;", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    })
});

app.get('/api/ytd_sales', function (req, res) {
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT SUM(Price) FROM Transactions; ", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    })
});

app.get('/api/get_purrks', function (req, res) {
    console.log('customer transactions\n');
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT * FROM purrks;", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    })
});

app.get('/api/fungeons', function (req, res) {
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query("SELECT * FROM purrks;", (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    })
});

app.post('/api/rental-between-dates', function (req, res) {
    let custid = req.body.custid;
    let start = req.body.start;
    // let end = req.body.end;
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('error fetching data\n');
        }
        else {
            db.query("SELECT * FROM transactions t, rentals r, animal a WHERE r.transid = t.transid AND t.animalid = a.animalid AND t.custid = $1 AND $2::date >= r.start_date", [custid, start], (err, table) => {
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log(table)
                    console.log(table.rows)
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('animals were found!\n');
                        res.status(200).send(table.rows);
                    } else {
                        console.log('combination was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});

app.post('/api/div-payment-method', function (req, res) {
    // req = {visa: "Visa", mc: "MasterCard", debit: "", cash: ""}
    console.log(req.body)
    let visa = req.body.visa;
    let mc = req.body.mc;
    let debit = req.body.debit;
    let cash = req.body.cash;
    // console.log(req)
    pool.connect((err, db, done) => {
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('error fetching data\n');
        }
        else {
            let sel = "";
            if (visa!=="") {
                if (sel !== "") {
                    console.log('in visa: ' + sel)
                    sel = sel + " OR "
                }
                sel = sel + "i.payment_method = \'VISA\'";
            }
            if (mc!=="" ) {
                if (sel !== "") {
                    sel = sel + " OR "
                }
                sel = sel + "i.payment_method = \'MC\'";
            }
            if (debit!=="") {
                if (sel !== "") {
                    sel = sel + " OR "
                }
                sel = sel + "i.payment_method = \'DEBIT\'";
            }
            if (cash!=="") {
                if (sel !== "") {
                    sel = sel + " OR "
                }
                sel = sel + "i.payment_method = \'CASH\'";
            }
            // sel = sel.substring(0, sel.length - 3);
            console.log(sel);
            db.query("SELECT * from transactions AS t WHERE NOT EXISTS (SELECT i.transid FROM invoice_records AS i WHERE " + sel + " EXCEPT SELECT t2.transid FROM transactions AS t2 WHERE t2.transid = t.transid);", (err, table) => {
                if (err) {
                    console.log(visa)
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    if (table && table.rows && table.rows.length != 0) {
                        console.log('payments were found!\n');
                        res.status(200).send(table.rows);
                    } else {
                        console.log('combination was NOT found!\n');
                        res.status(400).send(false);
                    }
                }
            })
        }
    })
});

app.get('/api/fungeon_top', function (req, res) {
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query(`DROP view IF EXISTS fungeontranscount;
CREATE VIEW fungeonTransCount AS(
SELECT f.address as locn, COUNT(a.business_license_id) as NumTransactions
FROM Animal a, Transactions t, Fungeon f
WHERE a.AnimalID = t.animalid AND a.business_license_id = f.business_license_id
GROUP BY f.business_license_id);
select locn, numtransactions
from fungeontranscount
where numtransactions = (
    select max(numtransactions)
    from fungeontranscount);`, (err, table) => {
        
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    console.log(res)
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    });
});

app.get('/api/best_seller', function (req, res) {
    pool.connect((err, db, done) => {
        console.log('connected\n');
        if (err) {
            console.error('error fetching data\n' + err);
            res.status(500).send('Error fetching data\n');
        }
        else {
            db.query(` select a.name, a.animalid, count(t.transid)
                from animal a, transactions t
                where t.animalid = a.animalid
                group by a.animalid
                order by count(t.transid) desc
                limit 1;
            `, (err, table) => {
                console.log(req.body + '\n');
                if (err) {
                    console.log('Query error!\n' + err + '\n');
                    res.status(500).send('query error!\n');
                } else {
                    console.log('Success!');
                    if (table && table.rows && table.rows.length != 0) {
                        res.status(200).send(table.rows);
                    } else {
                        console.log('nothing');
                        res.status(400).send('nothing!');
                    }
                }
            })
        }
    });
});

app.get('/', (req, res) => {
    res.send('HALLO')
})

app.listen(PORT, () => console.log('Server starting on port ' + PORT))
