const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logado como ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.login('NDEwNjEzNTg4MTkzOTY4MTI4.DnLqpA.u50a246AJjjpzjCWUzJM3NHreYU');