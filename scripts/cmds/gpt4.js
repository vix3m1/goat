const axios = require("axios");

async function fetchData(prompt, id) {
  const {data} = await axios.get(`https://deku-rest-api.gleeze.com/api/gpt-4o?q=${encodeURIComponent(prompt)}&uid=${id}`);
  
  return data.result
}
module.exports = {
  config: {
    name: "gpt4",
    category: "ai",
    description: "GPT4o AI for study",
    author: "Renz, API by Deku",
    guide: {
      en: "\nThe command works with or without prefix."
        + "\n [{pn} | gpt4] <prompt>"
    }
  },
  onStart: async function({message, api, args, event}) {
    const {threadID, messageID} = event;
    // Takes the message.body string and join them all with space. if the args is undefined then prompt will be null
    const prompt = args.join(" ") || null;
    
    //If the prompt is null and/or the length is less than or equal to 0 then abort the function and return error.
    if(!prompt || prompt.trim()?.length <= 0) return console.error("No prompt")
    
    
    const temp = await message.reply("•••")
    
    const res = await fetchData(prompt, event.senderID);
    api.editMessage(`${res}`, temp.messageID, threadID, messageID)
    
  },
  onChat: async function({message,event, args, api}) {
    const input = event.body.split(" ")[0];

    

    if(input.toLowerCase() == "gpt4") {
        const {threadID, messageID} = event;
    // Takes the message.body string and join them all with space. if the args is undefined then prompt will be null
    const prompt = event.body.replace(/^ai\s/g, "");
    
    //If the prompt is null and/or the length is less than or equal to 0 then abort the function and return error.
    if(!prompt || prompt.trim()?.length <= 0) return console.error("No prompt")
    
    
    const temp = await message.reply("•••")
    
    const res = await fetchData(prompt, event.senderID);
    api.editMessage(`${res}`, temp.messageID, threadID, messageID)
    }
  }
}