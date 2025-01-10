const nodeMailer = require("nodemailer");
const pdfKit = require("pdfkit");
const fs = require('fs')

function createPdf(filePath){
    return new Promise((resolve, reject)=>{
        const doc = new pdfKit();
        const path = fs.createWriteStream(filePath)

        doc.pipe(path)
        doc.text("Hello Aravindan! Welcome to Amazon ",{align: "center"})
        doc.end();

        path.on('finish',()=>  resolve());
        path.on('error',(err)=>reject(err));
    })
}

async function sendMail(){
    const filePath = "offerLetter.pdf";

    try{
        await createPdf(filePath);

        const transporter = nodeMailer.createTransport({
            service : "gmail",
            auth : {
                user : "xxxxxxxxxxxxxxx",
                pass : "xxxxxxxxxxxx"
            }
        })

        const details = {
            from : "xxxxxxxxxxxxxxxx",
            to : "xxxxxxxxxxxxxxxxxxxxxx",
            subject : "Offer letter from Navin Venkat pvt.lt",
            text : "Kindly open the pdf below",
            attachments : [{
                filename : "Ofl.pdf",
                path : filePath
            }]
        }

        await transporter.sendMail(details);
        console.log("Email sent successfully!")

    }catch(err){
        console.log("Error ", err);
    }
}

sendMail();