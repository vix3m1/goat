const axios = require("axios");

module.exports = {
  config: {
    name:"blackbox",
    description: "Blackbox Ai",
    author: "Renz, API by Kenlie",
    category: "ai",
    guide: {
      en: "{pn}blackhox <prompt>"
    }
  },
  onStart: async function({api, message, args, event}) {
    const input = args.join(" ")
    if(!input || input.trim()?.length == 0) {
      return message.reply("Prompt not provided by user");
    };
    try{

      const temp = await message.reply("•••")
      const resp = await axios.get(`https://api.kenliejugarap.com/blackbox/?text=${encodeURIComponent(
                input
            )}`);
            const real = resp.data.response.split("Is this answer helpful to you?")
            console.log(real[1])
      api.editMessage(
        `BlackBox AI\n————————————————————\n${resp.data.response}`, temp.messageID, event.threadID, event.messageID);      
    } catch(e) {
      message.reply("An error occured while making your request. Please try again after a few moments.\n Execute @callad <message> to call the maintainer.")
      console.error("An error occured", e)
    }
  }
}