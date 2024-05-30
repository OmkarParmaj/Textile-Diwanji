import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const port = 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(
    {
        origin: ['https://www.textilediwanji.com', 'https://textilediwanji.com'],
        methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
        credentials: true
    }
));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "omkar@8653",
    database: "reactlogin"
})

connection.connect((err) => {
    if(err) {
        return console.log("err in connecting");
    }
    else {
        return console.log("connected successfully!");
    }
})



app.get('/packingdata', (req, res) => {
    let { packingslipno, uidno, serialno, emailid } = req.query;

    const sql = `SELECT *
    FROM packingslip
    JOIN beaminward ON packingslip.Email = beaminward.Email
    JOIN companyreg ON beaminward.company = companyreg.companyname
    JOIN partyentry ON beaminward.party = partyentry.partyname
    WHERE packingslip.Packingslipno = ? AND packingslip.uid = ? AND packingslip.serialno = ? AND beaminward.Email = ? AND partyentry.Email= ? `;

    connection.query(sql, [packingslipno, uidno, serialno, emailid, emailid], (err, result) => {
        if(err) return res.json(err);
        
        return res.json(result);
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './omkarparmaj');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.post('/companyregister', upload.single('file'), (req, res) => {
  
   

    const value = [
        req.file.filename,
        req.body.emailid,
    ];

    const sql = "INSERT INTO `companyname`(`companyna`, `emailid`) VALUES (?, ?)";

    connection.query(sql, value, (err, result) => {
        if(err) return res.json(err)
        return res.json(result);
    });
});


app.post('/packinfo', (req, res) => {
    const { hey } = req.body;

    console.log(hey)

    const sql = "SELECT * FROM `companyname` WHERE emailid = ?";

    connection.query(sql, [hey], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);
    })
})


app.post('/packinginfo', (req, res) => {
    const { mailid } = req.body;

    // console.log(mailid)

    const sql = "SELECT * FROM `companyname` WHERE emailid = ?";

    connection.query(sql, [mailid], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);
    })
})





app.get('/reconsilation', (req, res) => {
    const {setno, designno, recoemail} =req.query;

    const sql = "SELECT * FROM `beaminward` WHERE SetNo = ? AND DesignNo = ? AND Email = ?";

    connection.query(sql, [setno, designno, recoemail], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);

    })

})

app.get('/packslip', (req, res) => {
    const {setno, designno, recoemail} =req.query;

    const sql = "SELECT * FROM `packingslip` WHERE SetNo = ? AND DesignNo = ? AND Email = ?";

    connection.query(sql, [setno, designno, recoemail], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);
            
    })

})

app.get('/billingreport', (req, res) => {
    const {setno, designno, recoemail} =req.query;

    const sql = "SELECT * FROM `billing` WHERE SetNo = ? AND DesignNo = ? AND Email = ?";

    connection.query(sql, [setno, designno, recoemail], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);
            
    })

})

app.get('/yarninward', (req, res) => {
    const {setno, recoemail} =req.query;

    const sql = "SELECT * FROM `yarninward` WHERE setNo = ? AND Email = ?";

    connection.query(sql, [setno, recoemail], (err, result) => {
        if(err) return res.json(err)

            return res.json(result);
            
    })

})



app.get('/reconsilecompany', (req, res) => {
    // const recomail = req.session.uemail;
    const {setno, recoemail} = req.query;

    const sql = `SELECT
    beaminward.*,
    companyreg.*
  FROM
    beaminward
  JOIN
     companyreg ON beaminward.company = companyreg.companyname
  WHERE
   beaminward.Email = ? AND SetNo =?;`;

    connection.query(sql, [recoemail, setno], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})





app.use('/omkarparmaj', express.static(path.join(__dirname, 'omkarparmaj')));



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})