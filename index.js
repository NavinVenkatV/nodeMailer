// const nodeMailer = require("nodemailer");
// const pdfKit = require("pdfkit");
// const fs = require('fs')

////////////way of sending mail with pdf contanerized

// function createPdf(filePath){
//     return new Promise((resolve, reject)=>{
//         const doc = new pdfKit();
//         const path = fs.createWriteStream(filePath)

//         doc.pipe(path)
//         doc.text("Hello Aravindan! Welcome to Amazon ",{align: "center"})
//         doc.end();

//         path.on('finish',()=>  resolve());
//         path.on('error',(err)=>reject(err));
//     })
// }

// async function sendMail(){
//     const filePath = "offerLetter.pdf";

//     try{
//         await createPdf(filePath);

//         const transporter = nodeMailer.createTransport({
//             service : "gmail",
//             auth : {
//                 user : "navinvenkatv@gmail.com",
//                 pass : "nbtngmghheazdrzj"
//             }
//         })

//         const details = {
//             from : "navinvenkatv@gmail.com",
//             to : "vnavinvenkat@gmail.com",
//             subject : "Offer letter from Navin Venkat pvt.lt",
//             text : "Kindly open the pdf below",
//             attachments : [{
//                 filename : "Ofl.pdf",
//                 path : filePath
//             }]
//         }

//         await transporter.sendMail(details);
//         console.log("Email sent successfully!")

//     }catch(err){
//         console.log("Error ", err);
//     }
// }

// sendMail();

//Normal way of sending text to mail
const nodeMailer = require("nodemailer")

const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth : {
        user : "navinvenkatv@gmail.com",
        pass : "nbtngmghheazdrzj"
    }
})

function otpNo(){
    let otp = 0;
   for(let i=0;i<4;i++){
    const rand = Math.floor(Math.random() * 1000) ;
    otp += rand;
   }
    return otp;
}
const otp = otpNo();

const detials = {
    from : "navinvenkatv@gmail.com",
    to : "vnavinvenkat@gmail.com",
    subject : "Nodemailer testing",
    html : `Your otp for registeration is ${otp}`
}

transporter.sendMail(detials, (error, info)=>{
    
        if(error){
            console.log("Error Occured ", error)
        }else
        console.log("Email sent successfully ",info.messageId)
})
