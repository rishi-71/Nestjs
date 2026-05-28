/* eslint-disable prettier/prettier */
import { ConfigService } from "@nestjs/config";//.env file se humari secret keys nikalne ke liye
import { PassportStrategy } from "@nestjs/passport";//NestJs aur Passport.js(Node.js ka sabse famous auth library) ko connect krne ke liye
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt'; //yeh JWT ko dhoondhne aur usko verify karne ke algorithms h

@Injectable() //nestjs ka dependency injection isko samagh sake isliye @Injectable lgaya
export class jwtStrategy extends PassportStrategy(Strategy) { // we build a class and inherit it from PassportStrategy,
    constructor(configService: ConfigService){ // hum nestjs se bol rhe h jab bhi yeh strategy bne mughe configService de dena
        super({
            jwtFromRequest: ExtractJwt.
            fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>
            ('MY_JWT_SECRET') //hum parent class PassportStrategy ke engine ko start kr rhe h aur unko 2 strict rules bta rhe h, 1. jwtFromRequest bta rha h ki token dhoondhna kha h, fromAuthHeaderAsBearerToken() ka matlab h api request ke header me jao wahan Authorization check kro, aur usme Bearer<token> fromat mein jo likha h usko nikal lo , 2 secretOrKey api .env wali asli 'secret key' de rhe h, Magic Step: Yeh super() automatically token ke Signature ko is MY_JWT_SECRET ke sath math/cryptography karke check karega. Agar kisi hacker ne token change kiya hoga, ya token expire ho gaya hoga, toh code yahin fail ho jayega aur user ko 401 Unauthorized error mil jayega. Neeche wala function chalega hi nahi!
        });
    }

    async validate(payload:any){
        return { useId: payload.sub, email: payload.email}
    }
//     Kya ho raha hai: Agar upar super() ne token ko "Asli" ghoshit kar diya, tabhi yeh function chalta hai. payload wo decoded JSON data hai jo token ke andar chhupa tha (jaise aapne login ke time token banate waqt daala hoga).

// Kyu kara: Passport ka ek rule hai ki validate function jo bhi object return karta hai, wo usko aage jaakar Request object mein attach kar deta hai (req.user bana deta hai).

// Fayda: Agar aap return { userId: payload.sub, email: payload.email } karte ho, toh aage aapke Controller ke andar aapko direct req.user.userId mil jayega. Jisse aap data database mein save kar sakte ho (e.g. "Yeh naya quiz kis user ne banaya? Achha, req.user.userId wale ne banaya").
// (Note: sub JWT ka standard naam hota hai 'subject' ke liye, jisme usually User ki ID store ki jati hai).
 }