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

async function userLogin(body){
    console.log(body.password);
    const salt = saltGen();
    console.log(hashPassword(body.password, salt))
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