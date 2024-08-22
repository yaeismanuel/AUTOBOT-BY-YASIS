const axios = require('axios');

module.exports.config = {
		name: "ask",
		version: 1.0,
		credits: "OtinXSandip",
		description: "AI",
		hasPrefix: false,
		usages: "{pn} [prompt]",
		aliases: [],
		cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
		try {
				const prompt = args.join(" ");
				if (!prompt) {
						await api.sendMessage("Hey I'm Homer AI Bot your virtual assistant, ask me a question.", event.threadID);
						return;
				}

				const response = await axios.get(`https://markdevs-last-api-2epw.onrender.com/api/v3/gpt4?ask=${encodeURIComponent(prompt)}`);
				const answer = response.data.answer;

				await api.sendMessage(answer, event.threadID);
		} catch (error) {
				console.error("Error:", error.message);
		}
};