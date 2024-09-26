const axios = require("axios");

function genName() {
  const length = Math.floor(Math.random() * 13) + 5;
  const l = "abcdefghijklmnopqrstuvwxyz123456789"
 let name = "";
 for(let i = 0; i <= length; i++) {
   const index = Math.floor(Math.random() * l.length);
   
   if(index > l.length / 2) {
     name += l.charAt(index).toUpperCase();
   } else {
     name += l.charAt(index)
   }
 }
 return name
}

module.exports = {
  config: {
    name: "temp",
    description: "Generate temporary mail at ease",
    role: 0,
    category: "tools",
    author: "Renz",
    guide: {
      en: "{pn}temp || temp inbox <email>"
    }
  },
onStart: function({message}) {
message.reply("Prefix not necessary.")
},
  onChat: async function({message, args,event}) {
    const input = event.body?.trim()?.toLowerCase();
    
    if(input.startsWith("temp")) {
     try{ 
       const body = event.body.split(" ");
       
      switch(body[1] == "inbox") {
        case true:
          
          const email = args[2]
          const emailChecker = /.*@.*\.com.*|.*\.net.*|.*\.org.*/;
        
        if(!email || !emailChecker.test(email)) {
          return message.reply("No email provided.")
        }
        const resp = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${email}&domain=1secmail.com`);
        if(resp.data.length <= 0 ) {
          message.reply("🕸️🕷️ | Spiders on your mailbox...")
        } else {
        message.reply(resp.data.subject)
        }
        break;
        case false:
          message.reply(`${genName()}@1secmail(.)net`)
      }
      } catch(e) {
        console.error(e);
        message.reply(`Error: ${e}`)
      }
    }
  }
}