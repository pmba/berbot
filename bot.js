const Discord = require('discord.js');
const Attachment = new Discord.Attachment();
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logado como ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	} else if (msg.content === 'sexy') {
		const image = new Attachment('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c794be42eee9d5a9136331c60616ef70c2c87b6b_full.jpg');
		msg.channel.send(image);
	}
});

client.login('NDEwNjEzNTg4MTkzOTY4MTI4.DnLqpA.u50a246AJjjpzjCWUzJM3NHreYU');