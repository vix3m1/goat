const axios = require('axios');



module.exports = {
  config: {
    name: "ai",
    role: 0,
    version: "1.0.0",
    credits: "Jonell Magallanes, port to goatbot by renz",
    description: "EDUCATIONAL",
    category: "AI",
    usages: "[question]",
    cooldowns: 5,
  },
  onReply: async function({api,args, event}) {
    const { messageID, threadID } = event;

    const id = event.senderID;
      if(!args[0]) {
          return;
      }
      const input = event.body
    const apiUrl = `https://jonellccprojectapis10.adaptable.app/api/gptconvo?ask=${encodeURIComponent(input)}&id=${id}`;

    try {
        const lad = message.reply("🔎 Searching for an answer. Please wait...");
        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━\n`;
        api.editMessage(responseMessage, lad.messageID, threadID, messageID);
    } catch (error) {
        console.error(error);
        message.reply("An error occurred while processing your request.", threadID, messageID);
    }
  },
  onStart: function({message, api, args}) {
    
      
      const input = args[0]?.trim();
    if(!input) {
      return message.reply("Provide a prompt.")
    }
  },
  onChat: async function({api,args, message, event}) {
      const prefix = event.body.trim().toLowerCase();
      if(prefix.startsWith("ai")) {
 const { messageID, threadID} = event;
      const input = prefix.replace(/^ai\s*/, "").trim()
    const id = event.senderID;

    const apiUrl = `https://jonellccprojectapis10.adaptable.app/api/gptconvo?ask=${encodeURIComponent(args.join(" "))}&id=${id}`;

    const lad = await message.reply("🔎 Searching for an answer. Please wait...");

    try {
        if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
            const attachment = event.messageReply.attachments[0];

            if (attachment.type === "photo") {
                const imageURL = attachment.url;

                const geminiUrl = `https://joncll.serv00.net/chat.php?ask=${encodeURIComponent(args.join(" "))}&imgurl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiUrl);
                const { vision } = response.data;

                if (vision) {
                    return api.editMessage(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗩𝗶𝘀𝗶𝗼𝗻 𝗜𝗺𝗮𝗴𝗲 𝗥𝗲𝗰𝗼𝗴𝗻𝗶𝘁𝗶𝗼𝗻 \n━━━━━━━━━━━━━━━━━━\n${vision}\n━━━━━━━━━━━━━━━━━━\n`, lad.messageID, event.threadID, event.messageID);
                } else {
                    return api.sendMessage("🤖 Failed to recognize the image.", threadID, messageID);
                }
            }
        }

        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`;
        api.editMessage(responseMessage, lad.messageID, event.threadID, event.messageID);
        message.reply({
            name: this.config.name,
            messageID: lad.messageID,
            author: event.senderID
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
      }
      }
      
};