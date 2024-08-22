const axios = require('axios');

module.exports.config = {
  name: "assistant",
  version: "1.0",  
  credits: "cliff",
  description: "Reply with a message or by attachment"
};

module.exports.handleEvent = async function ({ api, event }) {
  if (event.body) {
    const input = event.body;

    api.sendTypingIndicator(event.threadID);

    try {
      const url = event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo"
        ? { link: event.messageReply.attachments[0].url }
        : {};

      const { data } = await axios.post('https://satomoigpt.onrender.com/chat', {
        prompt: `${encodeURIComponent(input)}`,
        customId: event.senderID,
        ...url
      });

      api.sendMessage(data.message, event.threadID, event.messageID);
    } catch {
      api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};