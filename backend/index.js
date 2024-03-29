const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:'./src/assets/config.env'})
const session = require('express-session')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const googleAuth = require('./src/Controller/GoogleAuth/googleAuth.js')
const { OAuth2Client, auth } = require('google-auth-library')


const MongoStore = require('connect-mongo')


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}))



const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
)
mongoose.connect(DB)
.then(con =>{
   console.log('baglandi');
})
.catch(err =>{
   if(err) console.log(err, 'veritabanı baglanti hatasi');
})



const authController = require('./src/Controller/authController.js')
const userController = require('./src/Controller/userController.js')


app.use(session({
   name: 'connect-session',
   secret: 'very-long-secret-auth-secret',
   // cookie: { maxAge: 225000 },
   cookie: { maxAge: 15000 },
   saveUninitialized: false,
   // cok sonradan eklendi bi bak nedir ne değildir.
   // cok sonradan eklendi bi bak nedir ne değildir.
   // cok sonradan eklendi bi bak nedir ne değildir.
   resave:true,
   // cok sonradan eklendi bi bak nedir ne değildir.
   // cok sonradan eklendi bi bak nedir ne değildir.
   // cok sonradan eklendi bi bak nedir ne değildir.
   store: new MongoStore({
      mongoUrl: 'mongodb+srv://serkan:serkan123@cluster0.ewau8v3.mongodb.net/twitterclone?retryWrites=true&w=majority',
      collectionName: 'sessions',
      ttl: 7000
   })
}))


app.route('/api/v1/ga')
   .post(googleAuth.googleAuthFirst)
app.route('/api/v1/auth')
   .get(googleAuth.googleAuthSecond)
app.route('/api/v1/auth/payload')
   .get(googleAuth.googleAuthLast)
app.route('/api/v1/clearuserdata')
   .get(googleAuth.clearUserData)


app.route('/api/v1/registeruser')
   .post(userController.registerUser)
app.route('/api/v1/islogged')
   .get(authController.protect,authController.haslogged)






app.listen(4000,()=>{
   console.log('app calisti');
})

