import express, { query } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const json = bodyParser.json;
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from 'http2';
import nodemailer from 'nodemailer';


const port = 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use(cors(
    {
        origin: ['https://www.textilediwanji.com','https://textilediwanji.com'],
        methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
        credentials: true
    }
));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret', // Generating a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "omkar@8653",
    database: "reactlogin",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connection to database successful");
    }
});


app.all('/customer', (req, res) => {
    const { Name, Email, Password } = req.body;

    // Check for duplicate email
    const sqlDuplicate = "SELECT * FROM customer WHERE Email = ?";
    connection.query(sqlDuplicate, [Email], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.json({ message: "Internal server error" });
        }

        if (result.length > 0) {
            return res.json({ message: "Duplicate data" });
        }

        // Insert new customer
        const sqlInsert = "INSERT INTO `customer` (`Name`, `Email`, `Password`) VALUES (?, ?, ?)";
        connection.query(sqlInsert, [Name, Email, Password], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({ message: "Internal server error" });
            }

            return res.json({ message: "Data inserted successfully" });
        });
    });
});




// Login endpoint
app.post('/login', (req, res) => {
    const { Email, Password } = req.body;

    // Check if the email exists in the database
    const sqlQuery = "SELECT * FROM customer WHERE Email = ? AND Password = ?";
    connection.query(sqlQuery, [Email, Password], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.json({ message: "User not found" });
        }


        // Compare the provided password with the stored password
        const user = result[0];
        if (user.Password !== Password) {
            return res.json({ message: "Incorrect password" });
        }





        // Store user data in session
        req.session.user = result[0];
        req.session.uemail = result[0].Email;
        req.session.yesmail = result[0].Email;

        console.log(req.session.uemail);

        // Redirect user to dashboard component
        return res.json({ redirectTo: "/dashboard" });

    });
});




//mail recovery code start
app.post("/", (req, res) => {
    const { email } = req.body;
  
    // Check if email exists in MySQL database
    connection.query('SELECT * FROM `customer` WHERE Email = ?', email, (error, results) => {
      if (error) {
        console.error('Error querying MySQL: ' + error.stack);
        return res.status(500).send('Something went wrong!');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Email not found in the database');
      }
  
      // Email found, retrieve password and send email
      const password = results[0].Password;
      sendEmail({ email, password })
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
    });
  });
  
  function sendEmail({ email, password }) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "textilediwanji@gmail.com",
          pass: "cyuf nyev sugk tqos",
        },
      });
  
      const mailConfigs = {
        from: "textilediwanji@gmail.com",
        to: email,
        subject: "Email recovery",
        html: `
          <p>This mail is for email recovery </p>
          <p>Password: ${password}</p>
          <p>Best Regards</p>
        `
      };
  
      transporter.sendMail(mailConfigs, function (error, info) {
        if (error) {
          console.error(error);
          return reject({ message: `An error occurred while sending email` });
        }
        return resolve({ message: "Email sent successfully" });
      });
    });
  }  


//mail recovery code ends









// Dashboard endpoint
app.get('/dashboard', (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Render dashboard component
    return res.json({ message: "Welcome to the dashboard!" });
});


app.get('/sidebar', (req, res) => {
    const usermail = req.session.uemail;

    const sql = "SELECT * FROM `customer` WHERE Email = ?";

    connection.query(sql, [usermail], (err, result) => {
        if (err) return res.json({ message: "err inside server" });
        return res.json(result);
    })
})


app.post('/beaminward', (req, res) => {
    const user = req.session.uemail;
    const yesid = req.session.yesmail;
    console.log(yesid);

    const values = [
        user,
        req.body.Date,
        req.body.uid,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1,
        req.body.Count2,
        req.body.Count3,
        req.body.Count4,
        req.body.Count5,
        req.body.Countwt1,
        req.body.Countwt2,
        req.body.Countwt3,
        req.body.Countwt4,
        req.body.Countwt5,
        req.body.selectCompany,
        req.body.selectParty,
        req.body.width,
    ];

    const sql = "INSERT INTO `beaminward`(`Email`, `Date`, `UID`, `SetNo`, `DesignNo`, `WarpCount`, `WeftCount`, `Reed`, `Pick`, `SizingName`, `SizingMtr`, `Count1`, `Count2`, `Count3`, `Count4`, `Count5`, `Countwt1`, `Countwt2`, `Countwt3`, `Countwt4`, `Countwt5`, `company`, `party`, `width`) VALUES (?)";

    connection.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        console.log(err);
        return res.json({ message: "inserted" });
    });
});




app.get('/beaminwardreport', (req, res) => {

    const report = req.session.uemail;
    const umail = req.session.yesmail;
    console.log(umail);

    const sql = "SELECT * FROM `beaminward` WHERE `Email` =?";

    connection.query(sql, [report], (err, result) => {
        if (err) return res.json("err in the internal server", err);
        return res.json(result);
    })
})


app.delete('/delete/:id', (req, res) => {

    const mail = req.session.uemail;
    const id = req.params.id;

    console.log(id);
    console.log(mail);

    const sql = "DELETE FROM `beaminward` WHERE Email =? AND DesignNo =?";

    connection.query(sql, [mail, id], (err, result) => {
        if (err) return res.json({ message: "err in the internal server" })
        return res.json(result);
    })
})


// app.get('/beaminwardprint/:id1/:id2', (req, res) => {
//     const maild = req.session.uemail;
//     const { id1, id2 } = req.params; // Destructure id1 and id2 from req.params

//     console.log(maild);
//     console.log(id1); // Use id1 instead of DesignNo
//     console.log(id2); // Use id2 instead of srno

//     const sql = "SELECT * FROM `beaminward` WHERE Email = ? AND DesignNo = ? AND srno = ?";

//     connection.query(sql, [maild, id1, id2], (err, result) => {
//         if (err) return res.json({ message: "err in the internal server" })
//         return res.json(result);
//     });
// });

app.get('/beaminwardeditchange/:id', (req, res) => {
    const beaminwardeditchangemail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `beaminward` WHERE `Email`=? AND `DesignNo`=?";

    connection.query(sql, [beaminwardeditchangemail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    });
});



app.all('/beaminwardedit/:id', (req, res) => {

    const idmail = req.session.uemail;
    const idedit = req.params.id;

    console.log(idmail);
    console.log(idedit);

    // const sqlfetch = "SELECT * FROM `beaminward` WHERE Email =? AND DesignNo =?";

    // connection.query(sqlfetch, [idmail,idedit], (err,result) => {
    //     if(err) return res.json({message: "err in the internal server"})
    //     return res.json(result);
    // })

    const values = [
        req.body.Date,
        req.body.UID,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1,
        req.body.Count2,
        req.body.Count3,
        req.body.Count4,
        req.body.Count5,
        req.body.Countwt1,
        req.body.Countwt2,
        req.body.Countwt3,
        req.body.Countwt4,
        req.body.Countwt5,
        req.body.width,
        idmail,
        idedit,
    ];

    const sqlput = "UPDATE `beaminward` SET `Date` = ?, `UID` = ?, `SetNo` = ?, `DesignNo` = ?, `WarpCount` = ?, `WeftCount` = ?, `Reed` = ?, `Pick` = ?, `SizingName` = ?, `SizingMtr` = ?, `Count1` = ?, `Count2` = ?, `Count3` = ?, `Count4` = ?, `Count5` = ?, `Countwt1` = ?, `Countwt2` = ?, `Countwt3` = ?, `Countwt4` = ?, `Countwt5` = ?, width =? WHERE `Email` = ? AND `DesignNo` = ?";

    connection.query(sqlput, values, (err, result) => {
        if (err) return res.json({ message: "err in the internal server" })
        return res.json({ message: "added suss" });

    })


})


app.get('/productiondashboard', (req, res) => {
    const productiondashmail = req.session.uemail;

    const sql = `SELECT *
    FROM production
    WHERE MONTH(date) = MONTH(CURRENT_DATE())
    AND YEAR(date) = YEAR(CURRENT_DATE())
    AND Email =?`;

    connection.query(sql, [productiondashmail], (err, result) => {
        if(err) return res.json(err);

        return res.json(result);
    })
})


app.get('/totalmtrinproduction', (req, res) => {
    const totalmtrpromail = req.session.uemail;

    const sql = `SELECT SUM(avragemtr) AS Totalmeter, SUM(totalprice) AS Totalprice FROM production WHERE MONTH(date) = MONTH(CURRENT_DATE())
    AND YEAR(date) = YEAR(CURRENT_DATE()) AND Email =?`;

    connection.query(sql, [totalmtrpromail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billpending', (req, res) =>{
    const billpendingmail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE Email =?";
    connection.query(sql, [billpendingmail], (err, result) => {
        if(err) return res.json(err);

        return res.json(result);
    })

})

app.post('/billpendingupdate', (req, res) => {
    const billpendingupdatemail = req.session.uemail;

    const { billNo, status } = req.body;

    const sql = "UPDATE `billing` SET status = ? WHERE billNo = ? AND Email =?";

    connection.query(sql, [status, billNo, billpendingupdatemail], (err, result) => {
        if(err) return res.json(err);

        return res.json({message: "updated"})
    })
})

app.post('/packislipbeam', (req, res) => {
    const packslipbeaminfomail = req.session.uemail;
    const {designno} = req.body;

    const sql =`SELECT EXISTS(SELECT 1 FROM beaminward WHERE DesignNo =? AND Email =?) AS yes`;

    connection.query(sql, [designno, packslipbeaminfomail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})

app.post('/billingdesignnofetch', (req, res) => {
    const packslipbeaminfomail = req.session.uemail;
    const {designNo} = req.body;

    const sql =`SELECT EXISTS(SELECT 1 FROM beaminward WHERE DesignNo =? AND Email =?) AS yes`;

    connection.query(sql, [designNo, packslipbeaminfomail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})


app.post('/packslip', (req, res) => {
    const { date, packno, setno, designno, uid, rows, totalmtr, totalwt, totalrolls } = req.body;
    const mailpack = req.session.uemail;

    // Convert rows array to JSON string
    const packingdata = JSON.stringify(rows);

    // Insert the rows data into the database
    const sql = 'INSERT INTO `packingslip`(`Packingslipno`, `uid`, `Email`, `date`, `SetNo`, `DesignNo`, `packingdata`, `toalmtr`, `totalwt`, `totalrolls`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [packno, uid, mailpack, date, setno, designno, packingdata, totalmtr, totalwt, totalrolls], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to insert data into database' });
            return;
        }
        console.log('Data inserted successfully:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.get('/packslipnofetch', (req, res) => {
    const packslipnofetchmail = req.session.uemail;

    const sql = "SELECT * FROM `packingslip` WHERE Email =?";

    connection.query(sql, [packslipnofetchmail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})


app.get('/packingslipreport', (req, res) => {

    const packreportmail = req.session.uemail;
    console.log(packreportmail);

    const sql = "SELECT * FROM `packingslip` WHERE `Email` =?";

    connection.query(sql, [packreportmail], (err, result) => {
        if (err) return res.json({ message: "err in the internal server" })
        return res.json(result);
    })
})

app.get('/getshiftdata', (req, res) => {
    const fetchshiftmail = req.session.uemail;

    const sql = "SELECT * FROM `shift` WHERE `Email` = ?";

    connection.query(sql, [fetchshiftmail], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result);
    });
});

app.delete('/shiftdelete', (req, res) => {
    const shiftDeleteEmail = req.session.uemail;
    const srno = req.body.srno;
    const sql = "DELETE FROM `shift` WHERE Email = ? AND srno = ?";

    connection.query(sql, [shiftDeleteEmail, srno], (err, result) => {
        if(err) return res.json(err);

        return res.json({ message: "shift deleted" });
    });
});

app.get('/shiftnumber', (req, res) => {
    const shiftnumbermail = req.session.uemail;

    const sql = "SELECT COUNT(sname) AS totalshift FROM shift WHERE Email = ?";

    connection.query(sql, [shiftnumbermail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
}
)


app.get('/packingprint/:id1/:id2', (req, res) => {
    const packingprintmail = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `SELECT *
    FROM packingslip
    JOIN beaminward ON packingslip.Email = beaminward.Email
    JOIN companyreg ON beaminward.company = companyreg.companyname
    JOIN partyentry ON beaminward.party = partyentry.partyname
    WHERE packingslip.Packingslipno = ? AND beaminward.UID = ? AND beaminward.Email =? AND partyentry.Email=?`;

    connection.query(sql, [id1, id2, packingprintmail, packingprintmail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.get('/beaminward/:uid', (req, res) => {
    const { uid } = req.params;
    const selfemail = req.session.uemail; // Assuming uemail is the key for user's email in the session

    const query = `SELECT * FROM beaminward WHERE Email = ? AND UID = ?`;
    connection.query(query, [selfemail, uid], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});



// send packing slip to mail starts

// Backend Code
// const nodemailer = require("nodemailer");

app.post("/mailpackslip", (req, res) => {
  const sendmailpack = req.session.uemail;
  const { yesurl } = req.body;

  sendPackmail({ recipientEmail: sendmailpack, yesurl })
    .then(() => res.send({ message: "Email sent successfully" }))
    .catch((error) => res.status(500).send({ message: "Failed to send email" }));
});

function sendPackmail({ recipientEmail, yesurl }) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "textilediwanji@gmail.com",
          pass: "cyuf nyev sugk tqos",
        },
      });
  
      // Inline CSS styles for email body
      const emailStyle = `
        <style>
          /* Your CSS styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          .button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
          }
        </style>
      `;
  
      const mailConfigs = {
        from: "textilediwanji@gmail.com",
        to: recipientEmail,
        subject: "Packing slip",
        html: `
          <html>
            <head>
              <title>Packing Slip</title>
              ${emailStyle} <!-- Include inline CSS styles -->
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Packing Slip</h1>
                </div>
                <div class="content">
                  <p>This mail is for Downloading Packing slip</p>
                  <p>Url to download Packing slip: ${yesurl}</p>
                  <p>Best Regards</p>
                  <a href="${yesurl}" class="button">Download Packing Slip</a>
                </div>
              </div>
            </body>
          </html>
        `
      };
  
      transporter.sendMail(mailConfigs, function (error, info) {
        if (error) {
          console.error(error);
          return reject({ message: `An error occurred while sending email` });
        }
        return resolve({ message: "Email sent successfully" });
      });
    });
  }
  
// send packing slip to mail ends



// send reconsilation to mail starts

app.post("/mailreconsile", (req, res) => {
    const sendmailpack = req.session.uemail;
    const { heyurl } = req.body;
  
    sendReconsilemail({ recipientEmail: sendmailpack, heyurl })
      .then(() => res.send({ message: "Email sent successfully" }))
      .catch((error) => res.status(500).send({ message: "Failed to send email" }));
  });
  
  function sendReconsilemail({ recipientEmail, heyurl }) {
      return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "textilediwanji@gmail.com",
            pass: "cyuf nyev sugk tqos",
          },
        });
    
        // Inline CSS styles for email body
        const emailStyle = `
          <style>
            /* Your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .button {
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              display: inline-block;
              border-radius: 5px;
            }
          </style>
        `;
    
        const mailConfigs = {
          from: "textilediwanji@gmail.com",
          to: recipientEmail,
          subject: "Reconsilation slip",
          html: `
            <html>
              <head>
                <title>Reconsilation Slip</title>
                ${emailStyle} <!-- Include inline CSS styles -->
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Reconsilation Slip</h1>
                  </div>
                  <div class="content">
                    <p>This mail is for Downloading Reconsilation slip</p>
                    <p>Url to download Reconsilation slip: ${heyurl}</p>
                    <p>Best Regards</p>
                    <a href="${heyurl}" class="button">Download Reconsilation Slip</a>
                  </div>
                </div>
              </body>
            </html>
          `
        };
    
        transporter.sendMail(mailConfigs, function (error, info) {
          if (error) {
            console.error(error);
            return reject({ message: `An error occurred while sending email` });
          }
          return resolve({ message: "Email sent successfully" });
        });
      });
    }
  




// send reconsilation to mail ends



app.get('/reconsilation/:id', (req, res) => {

    const reconsilemail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE Email =? AND SetNo =?";

    connection.query(sql, [reconsilemail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the sql" })
        return res.json(result);
    })
})


// app.get('/packslip/:id', (req,res) => {

//     const paprintemailid = req.session.uemail;

//     const sql = "SELECT * FROM packingslip WHERE Email =? AND SetNo =?";

//     connection.query(sql, [paprintemailid, req.session.id], (err,result) => {
//         if(err) return res.json({message: "err in the database"})
//         return res.json(result);
//     })
// })



app.get('/packslip/:id/:id1', (req, res) => {
    //reconsilation packing slip data
    const packmail = req.session.uemail;

    const sql = "SELECT * FROM packingslip WHERE Email =? AND SetNo =? AND DesignNo =?";

    connection.query(sql, [packmail, req.params.id, req.params.id1], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/packingslipedit/:id', (req, res) => {
    const packingslipeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `packingslip` WHERE Email =? AND Packingslipno =?";

    connection.query(sql, [packingslipeditmail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.post('/yarninward', (req, res) => {
    const { setNo, Designno, date, yarnParty, count, party, weight } = req.body;
    const mailpack = req.session.uemail;

    // Insert the rows data into the database
    const sql = 'INSERT INTO `yarninward` (setNo, Designno, date, yarnParty, count, party, weight, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [setNo, Designno, date, yarnParty, count, party, weight, mailpack], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to insert data into database' });
            return;
        }
        console.log('Data inserted successfully:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.get('/yarninward/:id', (req, res) => {
    const yarnmail = req.session.uemail;

    const sql = "SELECT * FROM yarninward WHERE Email =? AND setNo =?";

    connection.query(sql, [yarnmail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "database connection problem" })
        return res.json(result);
    })
})


app.get('/beaminwarduniqueidno', (req, res) => {
    const beaminwarduniqueidnomail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE Email = ? ";

    connection.query(sql, [beaminwarduniqueidnomail], (err, result) => {
        if(err) return res.json(err) 

            return res.json(result);
    })
})

app.get('/billingreport/:id/:id1', (req, res) => {

    //this route is for reconsilation billing 
    const billreportemail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE Email =? AND setNo =? AND DesignNo =?";

    connection.query(sql, [billreportemail, req.params.id, req.params.id1], (err, result) => {
        if (err) return res.json({ message: "database connection problem" })
        return res.json(result);
    })
})


app.get('/reconsilationbeaminward/:id/:id1', (req, res) => {
    //this route id reconsilation beaminward summary route 
    const reconsilationbeaminwardmailsummary = req.session.uemail;
    const { id, id1 } = req.params;

    const sql = "SELECT * FROM `beaminward` WHERE Email =? AND SetNo =?  AND DesignNo =? "

    connection.query(sql, [reconsilationbeaminwardmailsummary, id, id1], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})



app.post('/billingpost', (req, res) => {
    const { date } = req.body;
    const userDate = new Date(date);
    const billingFetchEmail = req.session.umail;

    const sql = "SELECT `date` FROM `billing` WHERE Email = ?";
    connection.query(sql, [billingFetchEmail], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query error' });
        }

        const isInvalidDate = results.some(bill => new Date(bill.date) >= userDate);
        if (isInvalidDate) {
            return res.status(400).json({ message: "Date cannot be earlier than or equal to existing record dates" });
        }





        // If the date is valid, proceed with inserting the new record
        const { billno, setNo, designNo, rows, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst } = req.body;
        const mailpack = req.session.uemail;
        const sqlInsert = 'INSERT INTO `billing` (`billNo`, `SetNo`, `DesignNo`, `tableData`, `Email`, `date`, `UID`, `partyname`, `totalmeters`, `totalquantity`, `billpackingslipno`, `Totalcgst`, `Totalsgst`, `Totaligst`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const tableDataString = JSON.stringify(rows); // Convert rows data to JSON string

        const values = [billno, setNo, designNo, tableDataString, mailpack, date, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst];

        connection.query(sqlInsert, values, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting data:', insertErr);
                return res.status(500).json({ message: 'Failed to insert data into database' });
            }
            res.status(200).json({ message: 'Data inserted successfully' });
        });

    });
});





app.delete('/billdelete/:id', (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM `billing` WHERE srno =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "bill deleted" })
    })
});



app.get('/billing', (req, res) => {

    const billmail = req.session.uemail;

    const sql = "SELECT * FROM billing WHERE Email =?";

    connection.query(sql, [billmail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })

        return res.json(result);


    })
})


app.get('/packdatafetch', (req, res) => {
    const packdataquerymail = req.session.uemail;

    const {query1, query2} = req.query;

    if (!query1 || !query2) {
        return res.status(400).json({ error: 'Both query1 and query2 are required.' });
      }

      const sql ="SELECT * FROM packingslip WHERE Email =? AND Packingslipno =? AND uid =?";

      connection.query(sql, [packdataquerymail, query1, query2], (err, result) => {
        if(err) return res.json(err);

        return res.json(result);
      })
})

app.get('/packingdata', (req, res) => {
    const pppdata = req.session.uemail;
    const { query1, query2 } = req.query;

    const sql = "SELECT * FROM packingslip WHERE Packingslipno = ? AND uid = ? AND Email = ? ";

    connection.query(sql, [query1, query2, pppdata], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    });
});


app.get('/billedit/:id', (req, res) => {


    const { id } = req.params;

    const sql = "SELECT * FROM `billing` WHERE `srno` =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.put('/billingedit/:id', (req, res) => {

    const { id } = req.params;

    const {
        date,
        billNo,
        setNo,
        designNo,
        tabledata,
        Uid,
        selectedOption,
        totalmtr,
        totalquantity,
        billpackingslipno,
        cgst,
        sgst,
        othergst
    } = req.body;

    const tabledata1 = JSON.stringify(tabledata);

    const sql = "UPDATE `billing` SET  `billNo`= ?, `SetNo`= ?, `DesignNo`= ?, `tableData`= ?,  `date`= ?, `UID`= ?, `partyname`= ?, `totalmeters`= ? ,`totalquantity`= ? ,`billpackingslipno`= ? ,`Totalcgst`= ? ,`Totalsgst`= ? ,`Totaligst`= ?  WHERE srno =? ";

    connection.query(sql, [billNo, setNo, designNo, tabledata1, date, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst, id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "bill updated" })
    })

})

app.post('/companybankdetails', (req, res) => {
    const companybankdemail = req.session.uemail;

    const {
        bankname,
        accountno,
        branch,
        ifsccode,
        bankaddress
    } = req.body;

    const sql = "INSERT INTO `companybankdetails`(`bankname`, `accountno`, `branch`, `ifsccode`, `bankaddress`, `Email`) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(sql, [bankname, accountno, branch, ifsccode, bankaddress, companybankdemail], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "data submmited" })
    })

})


app.get('/companybankdetails', (req, res) => {
    const companyfetchbankmail = req.session.uemail;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =?";

    connection.query(sql, [companyfetchbankmail], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })


})

app.get('/companybankedit/:id', (req, res) => {
    const companyeditbankmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =? AND srno =?";

    connection.query(sql, [companyeditbankmail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})


app.put('/companybanked/:id', (req, res) => {
    const { id } = req.params;

    const { bankname, accountno, branch, ifsccode, bankaddress } = req.body;

    const sql = "UPDATE `companybankdetails` SET `bankname`=? ,`accountno`=? ,`branch`=? ,`ifsccode`=? ,`bankaddress`=?  WHERE srno =?";

    connection.query(sql, [bankname, accountno, branch, ifsccode, bankaddress, id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "Bank details updated" });
    })
})


app.get('/partyedit/:id', (req, res) => {
    const getpartyeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `partyentry` WHERE Email =? AND srno =?";

    connection.query(sql, [getpartyeditmail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})

app.put('/partyedit/:id', (req, res) => {
    const putpartyeditmail = req.session.uemail;
    const { partyname, personname, address, gst, phoneno } = req.body;
    const { id } = req.params;

    const sql = "UPDATE `partyentry` SET `partyname`=?,`personname`=?,`address`=?,`gst`=?,`phoneno`=? WHERE Email =? AND srno =?";

    connection.query(sql, [partyname, personname, address, gst, phoneno, putpartyeditmail, id], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "party updated" })
    })
})

app.delete('/partydelete/:id', (req, res) => {
    const partydeletemail = req.session.uemail;
    const { id } = req.params;

    const sql = "DELETE FROM `partyentry` WHERE Email =? AND srno =?";

    connection.query(sql, [partydeletemail, id], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "party deleted" });
    })

})

app.get('/getpassword', (req, res) => {
    const getpasswordmail = req.session.uemail;

    const sql ="SELECT * FROM `customer` WHERE Email =?"

    connection.query(sql , [getpasswordmail], (err, result) => {
        if(err) return res.json(err) 

        return res.json(result);
    })
})


app.put('/recoverpassword', (req, res) => {
    const recoverypassmail = req.session.uemail;
    const { password } = req.body;

    const sql = "UPDATE `customer` SET `Password` =? WHERE Email =?";
    connection.query(sql, [password, recoverypassmail], (err, result) => {
        if(err) return res.json(err)

        return res.json({message :"Password changed"})
    })
})


app.get('/billingreport', (req, res) => {

    const billreportemail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE `Email` =?";


    connection.query(sql, [billreportemail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })



})

app.post('/production', (req, res) => {
    const productionmail = req.session.uemail;

    const {
        date,
        rows,
        avpick,
        avgwarpbr,
        avgweftbr,
        avrageeff,
        avragejobrate,
        avragemtr,
        totalprice
    } = req.body;

    const prodata = JSON.stringify(rows);

    const sql = "INSERT INTO `production`(`date`, `productiontable`, `Email`, `avragepick`, `avragewarpbreak`, `avrageweftbreak`, `avrageeff`, `avragejobrate`, `avragemtr`, `totalprice`) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ? )";

    connection.query(sql, [date, prodata, productionmail, avpick, avgwarpbr, avgweftbr, avrageeff, avragejobrate, avragemtr, totalprice], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "production inserted" })
    })



})


app.post('/updatePackingslipStatus', (req, res) => {

    const updatepackingslipstatusmail = req.session.uemail;
    const { billpackingslipno } = req.body;

    // Check if billpackingslipno is provided
    if (!billpackingslipno) {
        return res.status(400).json({ message: "billpackingslipno is required" });
    }

    // Update the packingslip status to 'yes' for the provided billpackingslipno
    connection.query('UPDATE packingslip SET status = ? WHERE Packingslipno = ? AND Email =?', ['yes', billpackingslipno, updatepackingslipstatusmail], (error, results) => {
        if (error) {
            console.error("Error updating packingslip status:", error);
            return res.status(500).json({ message: "Error updating packingslip status" });
        }
        
        console.log("Packingslip status updated successfully!");
        return res.status(200).json({ message: "Packingslip status updated successfully!" });
    });
});

app.get('/designwisemtr', (req, res) => {
    const designwisemtrmail = req.session.uemail;

    const sql = "SELECT * FROM  production WHERE Email =?";

    connection.query(sql, [designwisemtrmail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})

app.get('/api/production/reports', (req, res) => {
    const dailypromail = req.session.uemail;

    const { date } = req.query;

    const sql = "SELECT * FROM `production` WHERE Email =? AND date =?";
    connection.query(sql, [dailypromail, date], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/bankdetails', (req, res) => {
    const bankdetailsmail = req.session.uemail;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =?";

    connection.query(sql, [bankdetailsmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billreport2', (req, res) => {
    const breportmail2 = req.session.uemail;
    const sql = 'SELECT SUM(Amount) AS total_amount FROM billing  WHERE `Email` =? AND MONTH(`Date`) = MONTH(CURRENT_DATE())';

    connection.query(sql, [breportmail2], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })

})

app.get('/totalcompany', (req, res) => {
    const totalcompanymail = req.session.uemail;

    const sql = `SELECT COUNT(companyname) AS totalcompany FROM companyreg WHERE Email = ?`;

    connection.query(sql, [totalcompanymail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);    
    })
})


app.get('/totalparty', (req, res) => {
    const totalpartymail = req.session.uemail;

    const sql = `SELECT COUNT(partyname) AS totalparty FROM partyentry WHERE Email = ?`;

    connection.query(sql, [totalpartymail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);    
    })
})


app.post('/addshift', (req, res) => {
    const addshiftmail = req.session.uemail;
    const { shiftname } = req.body;

    const sql ="INSERT INTO `shift`(`sname`, `Email`) VALUES (? ,? )";

    connection.query(sql, [shiftname ,addshiftmail], (err, result) => {
       if(err) return res.json(err)

        return res.json({message: "shift added"})


    })
})



app.get('/bill2', (req, res) => {
    const bill2mail = req.session.uemail;

    const sql =`SELECT COUNT(status) AS pending 
    FROM billing 
    WHERE status = 'unpaid' AND Email =?;`;

    connection.query(sql, [bill2mail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billprint/:id', (req, res) => {
    const billprintemailid = req.session.uemail;

    const sql = "SELECT * FROM billing WHERE Email =? AND billNo =?";

    connection.query(sql, [billprintemailid, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })

})





app.get('/companyreport', (req, res) => {
    const comrepoemail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE Email =?";

    connection.query(sql, [comrepoemail], (err, result) => {
        if (err) return res.json({ message: "Err in the database connection" })
        // res.send(result);
        return res.json(result);
    })

})

app.get('/companyedit/:id', (req, res) => {
    const comeditemail = req.session.uemail;


    const sql = "SELECT * FROM `companyreg` WHERE Email =? AND companyname =?";

    connection.query(sql, [comeditemail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})


app.post('/party', (req, res) => {
    const pertyemailid = req.session.uemail;
    const values = [
        pertyemailid,
        req.body.partyname,
        req.body.personname,
        req.body.address,
        req.body.gst,
        req.body.phoneno
    ];

    const sql = "INSERT INTO `partyentry` (`Email`, `partyname`, `personname`, `address`, `gst`, `phoneno`) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Error in the database connection" });

        }
        return res.json({ message: "Data inserted" });
    });
});



app.get('/party', (req, res) => {
    const partemailid = req.session.uemail;
    // const selectedOption = req.query.selectedOption;

    const sql = "SELECT * FROM partyentry WHERE Email =?";

    connection.query(sql, [partemailid], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/party', (req, res) => {
    const partyname = req.query.partyname;
    console.log(partyname);
    let query = 'SELECT * FROM partyentry';
    if (partyname) {
        // Use parameterized query to prevent SQL injection
        query += ' WHERE partyname = ?';
        db.query(query, [partyname], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching party data' });
            } else {
                res.json(results);
            }
        });
    } else {
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching party data' });
            } else {
                res.json(results);
            }
        });
    }
});



app.get('/billprint', (req, res) => {
    const partyname = req.query.partyname;
    const emailpartycompany = req.session.uemail;
    if (!partyname) {
        res.status(400).json({ message: 'Party name is required' });
        return;
    }

    const query = 'SELECT * FROM `partyentry` WHERE partyname =? AND Email =?';
    connection.query(query, [partyname, emailpartycompany], (err, results) => {
        if (err) {
            console.error('Error fetching bill print company data:', err);
            res.status(500).json({ message: 'Error fetching bill print company data' });
        } else {

            return res.json(results);
        }
    });
});



app.get('/yarninwardreport', (req, res) => {
    const yarnreportmail = req.session.uemail;


    const sql = "SELECT * FROM `yarninward` WHERE Email =?";

    connection.query(sql, [yarnreportmail], (err, result) => {
        if (err) return res.json({ message: "fail to connection with database" })
        return res.json(result);
    })
})


app.get('/board2', (req, res) => {
    const yesmail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE `Email` =?";

    connection.query(sql, [yesmail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/sizingmtr', (req, res) => {
    const sizingmtrmail = req.session.uemail;

    const sql = `SELECT SUM(Sizingmtr) AS sizingmeter, COUNT(DesignNo) AS designno FROM beaminward WHERE MONTH(Date) = MONTH(CURRENT_DATE())
    AND YEAR(Date) = YEAR(CURRENT_DATE()) AND Email =?`;

    connection.query(sql, [sizingmtrmail], (err, result) => {
        if(err) return res.json(err)

        return res.json(result);
    })
})


app.get('/party', (req, res) => {
    const partymailfetch = req.session.uemail;

    const sql = "SELECT * FROM `partyentry` WHERE `Email` =?";

    connection.query(sql, [partymailfetch], (err, result) => {
        if (err) return res.json({ message: "err in the database conenction" })
        return res.json(result);
    })


})

app.get('/companyregister/:id', (req, res) => {
    const companyreemail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE `Email` =?";

    connection.query(sql, [companyreemail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})


// Route to handle POST request from React frontend
app.post('/cost', (req, res) => {
    // Extract data from the request body sent by the frontend
    const costemail = req.session.uemail;
    const { number, Description, date, reed, pick, width, totalmtr, sizingprice, weavingjob, profit, gst, rows } = req.body;

    // Prepare SQL query to insert main data
    const query = `
  INSERT INTO fabric (Email, number, Description, date, reed, pick, width, totalMtr, sizingPrice, weavingJob, profit, GST, countData)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;




    // Stringify the rows array to insert it as JSON
    const rowsJSON = JSON.stringify(rows);

    // Execute the SQL query to insert data into the "fabric" table
    connection.query(query, [costemail, number, Description, date, reed, pick, width, totalmtr, sizingprice, weavingjob, profit, gst, rowsJSON], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error inserting data into fabric table' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.get('/company', (req, res) => {
    const companymail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE Email =?";

    connection.query(sql, [companymail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.get('/partyname', (req, res) => {
    const partyemailid = req.session.uemail;

    const sql = "SELECT * FROM `partyentry` WHERE Email =?";

    connection.query(sql, [partyemailid], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


app.get('/beaminwardcompany/:id1/:id2', (req, res) => {
    const companyemailid = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `
        SELECT 
            beaminward.*,
            companyreg.*
        FROM
            beaminward
        JOIN
            companyreg ON beaminward.company = companyreg.companyname
        WHERE
            beaminward.DesignNo = ? AND beaminward.srno = ?`;

    connection.query(sql, [id1, id2], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    });
});


app.get('/beaminwardparty/:id1/:id2', (req, res) => {
    const { id1, id2 } = req.params;

    const sql = `SELECT 
    beaminward.*,
    partyentry.*
  FROM
     beaminward
  JOIN
      partyentry ON beaminward.party = partyentry.partyname
  WHERE
    beaminward.DesignNo =? AND beaminward.srno= ?;`;
    connection.query(sql, [id1, id2], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


app.get('/yarninwardedit/:id', (req, res) => {
    const yarninwardeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `yarninward` WHERE Email =? AND srnoyarn =?";

    connection.query(sql, [yarninwardeditmail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.put('/yarninwardedit/:id', (req, res) => {
    const yarneditmail = req.session.uemail;

    const { id } = req.params;

    const { date, setno, designno, yarnparty, count, party, yarnwt } = req.body;

    const sql = "UPDATE `yarninward` SET `setNo` =?, `Designno` =?, `date` =?, `yarnParty` =?, `count` =?, `party` =?, `weight` =? WHERE Email =? AND srnoyarn =?";
    connection.query(sql, [setno, designno, date, yarnparty, count, party, yarnwt, yarneditmail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "Updated" })
    })
})



app.get('/reconsilecompany/:id', (req, res) => {
    const recomail = req.session.uemail;
    const id = req.params.id;

    const sql = `SELECT
    beaminward.*,
    companyreg.*
  FROM
    beaminward
  JOIN
     companyreg ON beaminward.company = companyreg.companyname
  WHERE
   beaminward.Email = ? AND SetNo =?;`;

    connection.query(sql, [recomail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.delete('/packingdelete/:id', (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM `packingslip` WHERE  serialno =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "deleted" });
    })
})

app.get('/beaminwardprintnew/:id1/:id2', (req, res) => {
    const beaminwardprintnewmail = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `SELECT *
   FROM beaminward
 
   JOIN companyreg ON beaminward.company = companyreg.companyname
   JOIN partyentry ON beaminward.party = partyentry.partyname
   WHERE beaminward.DesignNo = ? AND beaminward.srno = ? AND beaminward.Email = ? AND partyentry.Email= ? AND companyreg.Email = ?;`;

    connection.query(sql, [id1, id2, beaminwardprintnewmail, beaminwardprintnewmail, beaminwardprintnewmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './companyimage');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});




const upload = multer({ storage: storage });


app.post('/companyregister', upload.single('file'), (req, res) => {
    const cregistrymail = req.session.uemail;

    const values = [
        req.body.companyname,
        req.body.personname,
        req.body.companyaddress,
        req.body.phoneno,
        req.body.emailid,
        req.body.gst,
        cregistrymail,
        req.file.filename
    ];

    const sql = "INSERT INTO `companyreg`(`companyname`, `personname`, `companyaddress`, `phoneno`, `emailid`, `gst`, `Email`, `filenameas`) VALUES (?)";

    connection.query(sql, [values], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })

        return res.json({ message: "data inserted successfully" });
    })

})





app.delete('/companydelete/:id', (req, res) => {
    const companydelemail = req.session.uemail;
    const companyName = req.params.id;

    const sql = "DELETE FROM `companyreg` WHERE `companyname` = ? AND Email =?";

    connection.query(sql, [companyName, companydelemail], (err, result) => {
        if (err) {
            console.error('Error deleting company:', err);
            res.status(500).json({ message: 'Failed to delete company' });
            return;
        }

        console.log('Company deleted successfully:', result);
        res.status(200).json({ message: 'Company deleted successfully' });
    });
});

app.put('/companyedit/:id', upload.single('file'), (req, res) => {
    const companyId = req.params.id;
    const companyediteditmail = req.session.uemail;


    const { companyname, personname, companyaddress, phoneno, emailid, gst } = req.body;

    let file = null;
    if (req.file) {
        file = req.file.filename;
    }

    let sql = "UPDATE companyreg SET companyname = ?, personname = ?, companyaddress = ?, phoneno = ?, emailid = ?, gst = ?, filenameas = ? WHERE companyname = ? AND Email =?";
    let values = [companyname, personname, companyaddress, phoneno, emailid, gst, file, companyId, companyediteditmail];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating company details:', err);
            res.status(500).json({ message: 'Failed to update company details in database' });
            return;
        }

        console.log('Company details updated successfully:', result);
        res.status(200).json({ message: 'Company details updated successfully' });
    });
});


app.put('/packingslipedit/:id', (req, res) => {
    const packingeditslipmail = req.session.uemail;
    const { id } = req.params;

    const
        { packingslipno,
            uid,
            date,
            SetNo,
            DesignNo,
            packingrowdata,
            totalmtr,
            totalwt,
            wt,
            totalrolls,

        } = req.body;

    const packdata = JSON.stringify(packingrowdata);





    const sql = "UPDATE `packingslip` SET `Packingslipno`= ?, `uid`= ?, `date`= ?, `SetNo`= ?, `DesignNo`= ?, `packingdata`= ?, `toalmtr`= ?, `totalwt`= ?, `totalrolls`= ? WHERE Email = ? AND Packingslipno = ?";


    connection.query(sql, [packingslipno, uid, date, SetNo, DesignNo, packdata, totalmtr, totalwt, totalrolls, packingeditslipmail, id], (err, result) => {
        if (err) return res.json(err);
        console.log(err);
        return res.json({ message: "data updated" })
    })
})


app.delete('/yarninwarddelete/:sryarn', (req, res) => {
    const yarndeletemail = req.session.uemail;
    const { sryarn } = req.params;

    const sql = "DELETE FROM `yarninward` WHERE Email =? AND srnoyarn =?";

    connection.query(sql, [yarndeletemail, sryarn], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "message deleted" });
    })
})




app.use('/companyimage', express.static(path.join(__dirname, 'companyimage')));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});