const express = require('express')
const app = express()
app.use(express.json());

var cors = require('cors');
app.use(cors());

const mysql = require('mysql')
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'hospital'
  });

  db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to MySql...")
    }
})

// app.get('/doctor', (req, res) => {
//     let sql =   `SELECT * FROM doctors`
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     })
// })

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.get('/doctor', (req,res)=>{
    let sql
    if (req.query.username) {
        sql = `SELECT d_id,passkeys FROM doctors WHERE username = "${req.query.username}"`
    } else {
        sql = `SELECT * FROM doctors`
    }
    console.log(req.query)
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})



app.get('/doctor/:id', (req,res)=>{
    // console.log(req);
    let sql = `SELECT * FROM doctors WHERE d_id = "${req.params.id}"`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
})

app.post('/doctor', (req,res) => {
    // const post_data = {name:req.body.name, email:req.body.email, feedback:req.body.feedback, place_id:req.body.id, rating:req.body.rating}
    let sql = `INSERT INTO doctors (d_id, name, surname, username, gender, dept_id, passkeys, date_of_birth, date_of_joining, address, specilization, charges,salary, documents, cabin_no, email, phone_no)
                VALUES(NULL,"${req.body.name}","${req.body.surname}","${req.body.username}","${req.body.gender}","${req.body.dept_id}","${req.body.passkeys}","${req.body.date_of_birth}","${req.body.date_of_joining}","${req.body.address}","${req.body.specilization}","${req.body.charges}","${req.body.salary}",NULL,"${req.body.cabin_no}","${req.body.email}","${req.body.phone_no}")`
    db.query(sql, (err,result) => {
        console.log(result);
        res.send('added')
    } )
})

app.patch('/doctor/:id', (req,res) => {
    console.log(req);
    let sql = `UPDATE doctors 
                SET name="${req.body.name}",surname="${req.body.surname}",username="${req.body.username}",gender="${req.body.gender}",
                dept_id="${req.body.dept_id}",passkeys="${req.body.passkeys}",date_of_birth="${req.body.date_of_birth}",
                date_of_joining="${req.body.date_of_joining}",address="${req.body.address}",specilization="${req.body.specilization}"
                ,salary="${req.body.salary}",cabin_no="${req.body.cabin_no}",
                email="${req.body.email}",phone_no="${req.body.phone_no}"
                WHERE doctors.d_id = "${req.params.id}";`
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    } )
})

// app.patch('/doctor/:id', (req,res) => {
//     // console.log(req);
//     let sql = `UPDATE doctors SET username="${req.body.username}",passkeys="${req.body.passkeys}",address="${req.body.address}",email="${req.body.email}",phone_no="${req.body.phone_no}" WHERE doctors.d_id = ${req.params.id};`
//     db.query(sql, (err,result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send(result)
//     } )
// })

app.delete('/doctor/:id', (req,res) => {
    // console.log(req);
    let sql = `DELETE FROM doctors WHERE doctors.d_id = "${req.params.id}"`
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    } )
})

app.get('/doctor/:id/discharged', (req,res)=>{
    console.log(req);
    let sql = `SELECT patient.id,patient.firstname,patient.lastname,in_patient.illness,in_patient.pat_condition,medicine.name,in_patient.date_of_admittance,admits.w_id,ward.ward_type,in_patient.date_of_discharge
    FROM patient,consults,doctors,admits,in_patient,ward,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and doctors.d_id="${req.params.id}"
    and patient.id=consults.p_id 
    AND consults.p_id = admits.p_id
    AND consults.ailments=in_patient.illness 
    AND admits.p_id = in_patient.p_id
    AND admits.w_id = ward.w_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "discharged"
    and DATEDIFF(admits.date_of_leaving,in_patient.date_of_discharge)=0;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/doctor/:id/pending', (req,res)=>{
    console.log(req);
    let sql = `SELECT patient.id,patient.firstname,patient.lastname,consults.ailments,consults.date_of_consultant,consults.appointment_status
    FROM patient,consults,doctors,out_patient,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and doctors.d_id="${req.params.id}"
    and patient.id=consults.p_id
    AND consults.ailments=out_patient.illness 
    AND consults.p_id = out_patient.p_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "pending"
    ORDER BY consults.date_of_consultant;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.patch('/doctor/:id/pending', (req,res)=>{
    console.log(req);
    let sql = `UPDATE consults SET m_id = ${req.body.m_id},appointment_status='${req.body.appointment_status}' WHERE consults.p_id =${req.body.id} AND consults.d_id =${req.params.id} AND consults.appointment_status = 'pending';`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/doctor/:id/admitted', (req,res)=>{
    console.log(req);
    let sql = `SELECT patient.id,patient.firstname,patient.lastname,in_patient.illness,in_patient.pat_condition,medicine.m_id,medicine.name,in_patient.date_of_admittance,admits.w_id,ward.ward_type
    FROM patient,consults,doctors,admits,in_patient,ward,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and doctors.d_id="${req.params.id}"
    and patient.id=consults.p_id
    AND consults.ailments=in_patient.illness 
    AND consults.p_id = admits.p_id 
    AND admits.p_id = in_patient.p_id
    AND admits.w_id = ward.w_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "admitted"
    AND DATEDIFF(consults.date_of_consultant,in_patient.date_of_admittance)=0
    AND DATEDIFF(in_patient.date_of_admittance,admits.date_of_occupancy)=0`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.patch('/doctor/:id/admitted', (req,res)=>{
    console.log(req);
    // let sql = `UPDATE in_patient SET pat_condition = 'Fatal' WHERE in_patient.p_id = '3007' AND in_patient.date_of_discharge IS NULL ;UPDATE consults SET m_id = '9004' WHERE consults.p_id ='3007'  AND consults.d_id = '2007' AND consults.appointment_status="admitted";`
    let sql = `CALL update_patient('${req.body.pat_condition}',${req.body.id},${req.params.id},${req.body.m_id});`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/doctor/:id/completed', (req,res)=>{
    console.log(req);
    let sql = `SELECT patient.id,patient.firstname,patient.lastname,consults.ailments,medicine.name,consults.date_of_consultant,consults.appointment_status
    FROM patient,consults,doctors,out_patient,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and doctors.d_id="${req.params.id}"
    and patient.id=consults.p_id
    AND consults.ailments=out_patient.illness 
    AND consults.p_id = out_patient.p_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "completed"
    AND DATEDIFF(consults.date_of_consultant,out_patient.date_of_appointment)=0;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/doctor/:id/labs', (req,res)=>{
    console.log(req);
    let sql = `SELECT  lab_report.report_id,lab_report.amount,patient.firstname,patient.lastname,doctors.name,doctors.surname,lab.lab_type,lab_report.test,lab_report.result,date_of_issue,lab_report.p_id,lab_report.d_id,lab_report.lab_id
    FROM lab_report,patient,doctors,lab 
    WHERE doctors.d_id="${req.params.id}"
    AND lab_report.p_id=patient.id
    AND lab_report.d_id=doctors.d_id
    AND lab_report.lab_id=lab.lab_id;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.patch('/doctor/:id/labs', (req,res)=>{
    console.log(req);
    let sql = `UPDATE lab_report SET result = '${req.body.result}' WHERE lab_report.report_id = ${req.body.report_id};`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// app.get('/labs/:repid', (req,res)=>{
//     console.log(req);
//     let sql = `SELECT  lab_report.report_id,lab_report.amount,patient.firstname,patient.lastname,doctors.name,doctors.surname,lab.lab_type,lab_report.test,lab_report.result,date_of_issue,lab_report.p_id,lab_report.d_id,lab_report.lab_id
//     FROM lab_report,patient,doctors,lab 
//     WHERE lab_report.report_id="${req.params.repid}"
//     AND lab_report.p_id=patient.id
//     AND lab_report.d_id=doctors.d_id
//     AND lab_report.lab_id=lab.lab_id;`;
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     })
// })

app.get('/patient',(req,res)=>{
    // console.log(req.query);
    let sql
    if (req.query.username) {
        sql = `SELECT id,passkeys FROM patient WHERE username = "${req.query.username}"`
    } else {
        sql = `SELECT * FROM patient,in_patient WHERE patient.id = in_patient.p_id AND date_of_discharge IS NULL`
    }
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.delete(`/patient/:id`,(req,res)=>{
    let sql = `CALL discharge_patient(${req.params.id})`
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})
app.post('/patient',(req,res)=>{
    // console.log(req.query);
    let sql = `CALL create_account("${req.body.firstname}", '${req.body.lastname}', '${req.body.gender}', '${req.body.username}','${req.body.passkeys}' , '${req.body.date_of_birth}', '${req.body.address}', '${req.body.email}', '${req.body.phone_no}');`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/patient/admit',(req,res)=>{
    // console.log(req.query);
    let sql = `CALL admit_patient("${req.body.firstname}", '${req.body.lastname}', '${req.body.gender}', '${req.body.username}','${req.body.passkeys}' , '${req.body.date_of_birth}', '${req.body.address}', '${req.body.email}', '${req.body.phone_no}','${req.body.d_id}','${req.body.illness}','${req.body.w_id}','${req.body.pat_condition}');`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id',(req,res)=>{
    let sql = `SELECT * FROM patient WHERE id="${req.params.id}";`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/discharged', (req,res)=>{
    console.log(req);
    let sql = `SELECT doctors.d_id,doctors.name AS firstname,doctors.surname,in_patient.illness,in_patient.pat_condition,medicine.name,in_patient.date_of_admittance,admits.w_id,ward.ward_type,in_patient.date_of_discharge
    FROM patient,consults,doctors,admits,in_patient,ward,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and patient.id="${req.params.id}"
    and patient.id=consults.p_id 
    AND consults.ailments=in_patient.illness
    AND consults.p_id = admits.p_id 
    AND admits.p_id = in_patient.p_id
    AND admits.w_id = ward.w_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "discharged"
    and DATEDIFF(admits.date_of_leaving,in_patient.date_of_discharge)=0;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/admitted/all', (req,res)=>{
    console.log(req);
    let sql = `SELECT *,patient.address,patient.email,patient.phone_no FROM patient,consults,doctors,admits,in_patient,ward,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and patient.id="${req.params.id}"
    AND consults.ailments=in_patient.illness
    and patient.id=consults.p_id 
    AND consults.p_id = admits.p_id 
    AND admits.p_id = in_patient.p_id
    AND admits.w_id = ward.w_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "admitted";`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/pending', (req,res)=>{
    console.log(req);
    let sql = `SELECT doctors.d_id,doctors.name AS firstname,doctors.surname,consults.ailments,consults.date_of_consultant,consults.appointment_status
    FROM patient,consults,doctors,out_patient,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and patient.id="${req.params.id}"
    and patient.id=consults.p_id 
    AND consults.p_id = out_patient.p_id
    AND consults.ailments=out_patient.illness
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "pending"
    AND DATEDIFF(consults.date_of_consultant,out_patient.date_of_appointment)=0
    ORDER BY consults.date_of_consultant;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})
app.get('/patient/:id/admitted', (req,res)=>{
    console.log(req);
    let sql = `SELECT doctors.d_id,doctors.name AS firstname,doctors.surname,in_patient.illness,in_patient.pat_condition,medicine.m_id,medicine.name,in_patient.date_of_admittance,admits.w_id,ward.ward_type
    FROM patient,consults,doctors,admits,in_patient,ward,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and patient.id="${req.params.id}"
    and patient.id=consults.p_id 
    AND consults.p_id = admits.p_id 
    AND admits.p_id = in_patient.p_id
    AND consults.ailments=in_patient.illness
    AND admits.w_id = ward.w_id
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "admitted";`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})



app.get('/patient/:id/completed', (req,res)=>{
    console.log(req);
    let sql = `SELECT doctors.d_id,doctors.name AS firstname,doctors.surname,consults.ailments,medicine.name,consults.date_of_consultant,consults.appointment_status
    FROM patient,consults,doctors,out_patient,medicine
    WHERE 
    doctors.d_id = consults.d_id 
    and patient.id="${req.params.id}"
    and patient.id=consults.p_id 
    AND consults.p_id = out_patient.p_id
    AND consults.ailments=out_patient.illness
    AND consults.m_id = medicine.m_id
    and consults.appointment_status = "completed"
    AND DATEDIFF(consults.date_of_consultant,out_patient.date_of_appointment)=0;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/labs', (req,res)=>{
    console.log(req);
    let sql = `SELECT  lab_report.report_id,lab_report.amount,patient.firstname,patient.lastname,doctors.name,doctors.surname,lab.lab_type,lab_report.test,lab_report.result,date_of_issue,lab_report.p_id,lab_report.d_id,lab_report.lab_id
    FROM lab_report,patient,doctors,lab 
    WHERE patient.id="${req.params.id}"
    AND lab_report.p_id=patient.id
    AND lab_report.d_id=doctors.d_id
    AND lab_report.lab_id=lab.lab_id;`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/request_ward', (req,res)=>{
    console.log(req);
    let sql = `SELECT * FROM request_ward WHERE p_id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/request_test', (req,res)=>{
    console.log(req);
    let sql = `SELECT * FROM request_test WHERE p_id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/request_medicine', (req,res)=>{
    console.log(req);
    let sql = `SELECT * FROM request_medicine WHERE p_id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/patient/:id/request_appointment', (req,res)=>{
    console.log(req);
    let sql = `SELECT * FROM request_appointment WHERE p_id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/patient/:id/request_ward', (req,res)=>{
    console.log(req);
    let sql = `INSERT INTO request_ward (req_id, w_id, p_id, d_id, illness, pat_condition, status) VALUES (NULL, "${req.body.w_id}", "${req.body.id}", "${req.body.d_id}", "${req.body.illness}", "${req.body.pat_condition}", 'pending');`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/patient/:id/request_test', (req,res)=>{
    console.log(req);
    let sql = `INSERT INTO request_test (req_id, test_id, p_id, d_id, status) VALUES (NULL, '${req.body.test_id}', '${req.body.id}', '${req.body.d_id}', 'pending');`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/patient/:id/request_medicine', (req,res)=>{
    console.log(req);
    let sql = `INSERT INTO request_medicine (req_id, m_id, p_id, units, status) VALUES (NULL, '${req.body.m_id}', '${req.body.id}', '${req.body.units}', 'pending');`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/patient/:id/request_appointment', (req,res)=>{
    console.log(req);
    let sql = `INSERT INTO request_appointment (req_id, d_id, p_id, ailments, status) VALUES (NULL, '${req.body.d_id}', '${req.body.id}', '${req.body.ailments}', 'pending');`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})
// app.post('/admit',(req,res)=>{
//     // console.log(req.query);
//     let sql = `INSERT INTO patient (id, firstname, lastname, gender, username, passkeys, date_of_birth, address, email, phone_no,images) VALUES (NULL, "${req.body.firstname}", '${req.body.lastname}', '${req.body.gender}', '${req.body.username}', '${req.body.passkeys}', '${req.body.date_of_birth}', '${req.body.address}', '${req.body.email}', '${req.body.phone_no}',NULL);
//                 INSERT INTO in_patient(p_id,date_of_admittance,date_of_discharge,illness,pat_condition) VALUES 
//     `
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     })
// })

app.patch('/patient/:id',(req,res)=>{
    let sql = `UPDATE patient 
    SET firstname="${req.body.firstname}",lastname="${req.body.lastname}",gender="${req.body.gender}",username="${req.body.username}",passkeys="${req.body.passkeys}",date_of_birth="${req.body.date_of_birth}",address="${req.body.address}",email="${req.body.email}",phone_no="${req.body.phone_no}"
    WHERE id=${req.body.id};`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})


app.get('/staff/request_appointment',(req,res)=>{
    let sql = `SELECT * FROM request_appointment WHERE status="pending";`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/staff/request_test',(req,res)=>{
    let sql = `SELECT * FROM request_test WHERE status="pending";`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/staff/request_ward',(req,res)=>{
    let sql = `SELECT * FROM request_ward WHERE status="pending"`
    // console.log(req);
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/staff/request_medicine',(req,res)=>{
    let sql = `SELECT * FROM request_medicine WHERE status="pending";`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/staff/request_appointment',(req,res)=>{
    let sql = `CALL grant_appointment(${req.body.req_id});`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/staff/request_test',(req,res)=>{
    let sql = `CALL grant_test(${req.body.req_id});`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/staff/request_ward',(req,res)=>{
    let sql = `CALL grant_ward(${req.body.req_id});`
    // console.log(req);
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/staff/request_medicine',(req,res)=>{
    let sql = `CALL grant_medicine(${req.body.req_id});`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/staff',(req,res)=>{
    let sql = `SELECT s_id,passkeys FROM staff WHERE username = "${req.query.username}"`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/staff/:id',(req,res)=>{
    let sql = `SELECT * FROM staff WHERE s_id = "${req.params.id}"`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.patch('/staff/:id',(req,res)=>{
    let sql = `UPDATE staff 
    SET firstname="${req.body.firstname}",lastname="${req.body.lastname}",gender="${req.body.gender}",username="${req.body.username}",passkeys="${req.body.passkeys}",date_of_birth="${req.body.date_of_birth}",address="${req.body.address}",email="${req.body.email}",phone_no="${req.body.phone_no}"
    WHERE s_id=${req.body.s_id};`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/ward',(req,res)=>{
    let sql = `SELECT * FROM ward ORDER BY is_avaliable DESC;`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/lab/test',(req,res)=>{
    let sql = `SELECT * FROM lab_offers`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})
app.get('/ward/avaliable',(req,res)=>{
    let sql = `SELECT * FROM ward WHERE is_avaliable="1";`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/medicine',(req,res)=>{
    let sql = `SELECT * FROM medicine ORDER BY units_in_stock;`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/bill/:id/issued',(req,res)=>{
    let sql = `SELECT * FROM bill WHERE is_issued=1 and p_id='${req.params.id}'`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get('/bill/:id',(req,res)=>{
    let sql = `SELECT * FROM bill WHERE is_issued=0 and p_id='${req.params.id}'`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/bill/:id',(req,res)=>{
    let sql = `CALL issue_bill(${req.params.id})`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// app.post('/post/review', (req,res) => {
//     const post_data = {name:req.body.name, email:req.body.email, feedback:req.body.feedback, place_id:req.body.id, rating:req.body.rating}
//     let sql = `INSERT INTO data(name,email,feedback,place_id,rating) 
//                 VALUES("${req.body.name}","${req.body.email}","${req.body.feedback}","${req.body.place_id}",${req.body.rating})`
//     db.query(sql, (err,result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('added')
//     } )
// })

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on ${port} .....`))