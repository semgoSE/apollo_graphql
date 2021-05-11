import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import validator from 'validator';
import bcrypt from 'bcrypt';



export default async function sign_up(args: any) {
    if(validator.isEmail(args.email)) {
        let password = await cryptPassword(args.password);
        let i = await prisma.user.count({ where: { email: args.email }});
        if(i === 0) {
            await prisma.user.create({ data: { ...args, password  }});
            return "ok";
        } else {
            return "Вы уже загегистрированы";
        }     
    } else {
        return "Некоректная почта"
    }
}




function cryptPassword(password:string) {
    
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) 
               reject(err);
        
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) 
                    reject(err)
                 resolve(hash);
            });
          });
    })
   
};

function comparePassword(plainPass:string, hashword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
            return err == null ?
                resolve(isPasswordMatch) :
                reject(err);
        });
    })
};