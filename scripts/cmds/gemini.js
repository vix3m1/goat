const axios = require("axios");
module.exports = {
    config: {
        name: "gemini",
        author: "Renz",
        category: "ai",
        version: "0.0.1",
        description: "Gemini ai bot",
        role: 0,
        guide: { en: "{pn} <prompt> || {pn} what is biology?" }
    },
    onStart: async function ({ api, message, args, event }) {
        let input = args.join(" ");
        const { messageID, threadID } = event;
        try {
     if(!input || input.trim()?.length === 0){
       console.error("Error");

}
                if (event.messageReply.attachments.type == "photo") {
                    const fileUrl = event.messageReply.attachments[0].url;
                    
                    console.log(fileUrl)
                    let temp_1 = await message.reply("Analyzing..");
              const res = await axios.get(
                        `https://api-m4yd.onrender.com/gemini?ask=${encodeURIComponent(input)}&image=${encodeURIComponent(fileUrl)}`
                    );
                    api.editMessage(
                      `Gemini // ${res.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res.data.message}
                    `, temp_1.messageID, threadID, messageID)
                    } else if(event.messageReply &&
                    event.messageReply.senderID == api.getCurrentUserID()) {
               
                    input = event.body;

                    if (!input) {
                        return message.reply(
                            "You must provide a prompt. E.g. What is testicles?"
                        );
                    }

                    const temp_2 = await message.reply("•••");

                    const res_2 = await axios.get(`https://api-m4yd.onrender.com/gemini?ask=${encodeURIComponent(input)}`);

                    api.editMessage(
                      `Gemini // ${res_2.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res_2.data.message}\n━━━━━━━━━━━━━━━━━━`, temp_2.messageID, threadID, messageID)
                    } else {
                
                    const temp_3 = await message.reply("Replying...");

                    const res_3 = await axios.get(`https://api-m4yd.onrender.com/gemini?ask=${encodeURIComponent(input)}`);

                    api.editMessage(
                      `Gemini // ${res_3.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res_3.data.message}
                    `, temp_3.messageID, threadID, messageID)
            }
        } catch (e) {
            console.log(e);
            return message.reply(
                "An error occured. Contact admin for assistance."
            );
        }
    }
};
