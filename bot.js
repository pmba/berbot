const { Client, Attachment, RichEmbed, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({disableEveryone: true});
const botConfig = require('./botConfig');

client.commands = new Collection();

fs.readdir('./cmds/', (err, files) => {
	if (err) console.error(err);

	let jsFiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsFiles.length <= 0) {
		console.log('Não existe nenhum comando para carregar.');
		return;
	}

	console.log(`Carregando ${jsFiles.length} comandos...`);

	jsFiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} Carregado com sucesso!`);
		client.commands.set(props.help.name, props);
	});
});

require('dotenv').config();

client.on('ready', () => {
	console.log(`\nBerbot está ativo.`);
});

var prefix = botConfig.prefix;
var botid = botConfig.id;

client.on('message', async msg => {

	let sender = msg.author;

	if (sender.id === botid) {
		return;
	}

	let messageArray = msg.content.split(/\s+/g);
	let messageLower = msg.content.toLowerCase();
	let messageLowerArray = messageLower.split(/\s+/g);

	if (messageLowerArray.includes('bolsonaro')) {
		msg.delete();
		msg.channel.send(`${sender}, tentou falar do bononaro... :poop:`);
	}

	let command = messageArray[0];
	let args = messageArray.slice(1);

	if (!command.startsWith(prefix)) return;

	let runnableCommand = command.replace(prefix, '');
	let cmd = client.commands.get(runnableCommand);
	if (cmd) {
		console.log(`COMANDO: ${command} EXECUTADO`);
		cmd.run(client, msg, args);
	}
});

client.login(process.env.BOT_TOKEN)