const express= require('express');
const bodyParser=require('body-parser');
const UserRouter = require('./Routes/UserRoute');
const mongoose = require('mongoose');
const fs = require('fs');
const mime =require('mime');
const app = express();
const Constants=require('./Extras/Constants');
const morganLogger = require('morgan')

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Files/')
    },
    filename: function (req, file, cb) {
   
        cb(null,  file.originalname+'.' + mime.extension(file.mimetype));
      
    }
  });

  var upload = multer({ storage: storage });
const CREDENTIALS_PATH="./credentials.json";

mongoose.connect(Constants.DB_URL,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise=global.Promise;

// app.use((req,res)=>{
// 	res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers',
//     'Origin,X-Request-With,Content-Type,Accept,Authorization');
// 	// if(req.method=='OPTIONS'){
// 	// 	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
// 	// 	return res.status(200).json({});
// 	// }
// })	
//middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morganLogger('dev'));

//Routers
app.use('/users',UserRouter);


function main()
{


app.get('/',function(req,res){
            res.end(Constants.URL+"/users"); 
    
})


app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Request-With,Content-Type,Accept,Authorization');
    console.log(req.body);
        console.log(req.file);
        res.end("done");

  })
app.post('/uploadFile',(req,res)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Request-With,Content-Type,Accept,Authorization');
    console.log(req.body);
    res.status(200).json([{status:"I love u !"},req.body]);
})
app.get('/file',(req,res)=>{
    
    var filePath ='./Files/android.exe';
    var filePathDes= "./Files/dest.png";
    var fileSrc = fs.createReadStream(filePath);
    // // var fileDes=fs.createWriteStream(filePathDes);
    fileSrc.pipe(res);
  
    // fs.readFile(filePath,(data,err)=>{
    //     if(err) {
    //         res.end(err);
    //     }else{
    //         res.end(data);
    //     }
    // })
})

//listening to ports
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
//Listening to requests
app.listen(port,function(){
    console.log("Listening to the requests on "+Constants.URL )
})

}

main();












