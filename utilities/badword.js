const Discord = module.require('discord.js');
const forbiddenWords = module.require('./forbidden-words/words.json');

module.exports.run = async (client, message) => {
    let messageLower = message.content.toLowerCase();
	let messageLowerArray = messageLower.split(/\s+/g);

    forbiddenWords.forEach(word => {
        if (messageLowerArray.includes(word)) {
            message.delete();
            message.reply(`Palavra ${word} está banida do servidor! :angry:`);
            return;
        }
    });
}