const { database } = require('./../db')
const crypto = require('crypto');
const { func } = require('joi');

function saltGen(){
    return crypto.randomBytes(24).toString('hex');
}

function hashPassword(rawPassword, salt){
    const hashed = crypto.pbkdf2Sync(rawPassword, salt, 1000, 12, 'sha512').toString('hex')
    return `pbkdf2Sync:${salt}:${hashed}`
}

function passwordCheck(rawPassword, userPassword){
    const salt = userPassword.split(':')[1];
    const hashed = hashPassword(rawPassword, salt)
    return hashed
}

async function userLogin(body, request, reply){
    const { username, password }  = body;
    console.log(username, password);
    const user = await database.table('users').select().where({ email:username });
    if(user == ''){
        reply.status(400).send({ message:"User not found"});
        return
    }
    const rawPassword = password;
    const userPassword = user[0].password;
    console.log("User password",userPassword)
    const hashedPassword = passwordCheck(rawPassword, userPassword)
    if( hashedPassword == userPassword ){
        reply.status(200).send({ "message":"Login Success"});
        return;
    }
    reply.status(400).send({ "message":"Login Failed"});
} 


async function userRegister(body){
    const { name, email, password } = body; 
    const salt = saltGen();
    const hashedPassword = hashPassword(password, salt);
    body.password = hashedPassword;
    const res = await database('users').insert(body);
    return res;
}

module.exports = {
    userLogin,
    userRegister
}