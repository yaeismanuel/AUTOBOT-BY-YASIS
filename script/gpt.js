const { get } = require('axios');

module.exports.config = {
  name: 'gpt',
  credits: "cliff",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 0,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(' ');
  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, event.messageID);
  }

  const url = "https://markdevs-last-api-2epw.onrender.com/api/adobo/gpt?query=";

  if (!question) return sendMessage("Please provide a question.");

  try {
    const result = await get(`${url}?question=${encodeURIComponent(question)}`);
    sendMessage(result.data.reply);
  } catch (error) {
    sendMessage("An error occurred: " + error.message);
  }
};