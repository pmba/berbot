const { Client, Attachment, RichEmbed, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({disableEveryone: true});
const botConfig = require('./botConfig');
const color = require('./utilities/design/colors.json');

const badWord = require('./utilities/badword');

client.commands = new Collection();
client.colors = new Collection();

fs.readdir('./cmds/', (err, files) => {
	if (err) console.error(err);

	let jsFiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsFiles.length <= 0) {
		console.log('\nNão existe nenhum comando para carregar.');
	} else {
		console.log(`\nCarregando ${jsFiles.length} comandos...`);
	
		jsFiles.forEach((f, i) => {
			let props = require(`./cmds/${f}`);
			console.log(`${i + 1}: ${f} Carregado com sucesso!`);
			client.commands.set(props.help.name, props);
		});
	}

	let colorLength = Object.keys(color).length;

	if (colorLength <= 0) {
		console.log('Não existe nenhuma cor para carregar.');
	} else {
		console.log(`\nCarregando ${colorLength} cores...`);
		
		let i = 1;

		for (var c in color) {
			client.colors.set(c, color[c]);
			console.log(`${i++}: Cor ${c} Carregada com sucesso!`);
		}
	}
});

require('dotenv').config();

client.on('ready', () => {
	console.log(`\nBerbot está ativo.`);

    client.user.setStatus('away');
});

var prefix = botConfig.prefix;
var botid = botConfig.id;

client.on('message', async msg => {

	let sender = msg.author;

	if (sender.id === botid) {
		return;
	}

	let messageArray = msg.content.split(/\s+/g);

	badWord.run(client, msg);

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