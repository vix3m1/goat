const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt","stat"],
    version: "1.0",
    author: "JARiF@Cock",
    role: 2,
    category: "owner",
    guide: {
      en: "Use {p}info"
    }
  },
  onStart: async function ({ message }) {

    const uptime = process.uptime();
    const formattedUptime = formatMilliseconds(uptime * 1000);

    const systemInfo = {
    
      botUptime: formattedUptime
   
    };

    const response = `Running since: \n${systemInfo.botUptime}\n`

    message.reply(response);
  }
};
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${days}d ${hours}h ${minutes}m`;
}

function formatMilliseconds(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

function prettyBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}