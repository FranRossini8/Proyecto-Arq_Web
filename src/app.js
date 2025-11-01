const express=require('express');
const userRouter=require('./controller/user/router');
const autoRouter=require('./controller/auto/router');
const app=express();
const session=require('express-session');
app.use(express.json());
app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:false
}));

app.use('/api/users',userRouter);
app.use('/api/autos',autoRouter);
module.exports=app;