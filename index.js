let express = require("express")
let fs = require("fs")
let app = express()
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.send("Hello this is my First App")
})

app.get("/about", function(req, res){
    res.send("This is basic express application and we are seeing about page.")
})

app.get("/users/:userid/books/:bookid", function(req, res){
    res.send(req.params)
})

app.get('/GetStudents',function (req,res){ 
    studentdata={}
    fs.readFile(__dirname + "/" + "student.json", 'utf8',
        function (err, data) { console.log( data );
    res.json({ 
        'status':true, 
        'Status_Code':200, 
        'requested at': req.localtime, 
        'requrl':req.url,
        'request Method':req.method, 
        'studentdata':JSON.parse(data)
    });
    });
})

app.get('/GetStudentid/:id',(req,res)=>{
    studentdata={}
    fs.readFile(__dirname + "/" + "Student.json", 'utf8', 
        function (err, data) {
            let students= JSON.parse(data)
            let student=students["Student"+req.params.id]
            console.log("student",student)
        if (student)
            res.json(student)
        else
            res.json({ 
            'status':true, 
            'Status_Code':200,
            'requested at': req.localtime, 
            'requrl':req.url,
            'request Method':req.method, 
            'studentdata':JSON.parse(data)
        });
    });
})

app.get('/studentinfo',function(req,res){
    res.sendFile('StudentInfo.html', { root: __dirname });
})


app.post('/submit-data', function (req, res) {
    let name = req.body.firstName + ' ' + req.body.lastName+' ';
    let Age= req.body.myAge+ ' Gender: ' + req.body.gender+' ';
    let Qual= ' Qualification'+ req.body.Qual
    
    console.log(req.body.Qual)
    
    res.send({
        status: true,
        message: 'form Details', 
            data: {
            name: name, 
            age:Age, 
            Qualification:Qual,
            }
        });
    });

app.listen(5000, function(){
    console.log("server running on port 5000")
})

