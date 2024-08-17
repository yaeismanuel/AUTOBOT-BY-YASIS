const axios = require('axios');

module.exports.config = {
 name: "warren",
 version: "1.0.0",
 role: 0,
 aliases: ["warren Hervas"],
 credits: "cliff",
cooldown: 0,
hasPrefix: false,
	usage: "",
};

module.exports.run = async function ({ api, event, args }) {
 const content = encodeURIComponent(args.join(" "));

 if (!content) {
	return api.sendMessage("🟢 Please  Provide your question first", event.61564074353674, event.messageID);
 }

 api.sendMessage("🟡 Homer is typing  Please wait a seconds...", event.61564074353674, event.messageID); 

 const apiUrl = `https://auto-4ltq.onrender.com/hercai?content=${content}`;

 try {
	const response = await axios.get(apiUrl);
	const reply = response.data.reply;

	api.sendMessage(reply, event.61550188503841, event.messageID);
 } catch (error) {
	console.error("Error fetching data:", error.message);
	api.sendMessage("An error occurred while processing your request.", event.61564074353674);
 }
};