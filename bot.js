const { Client, Attachment, RichEmbed } = require('discord.js');
const client = new Client();

var request = require("request");

require('dotenv').config();

client.on('ready', () => {
	console.log(`Berbot está ativo.`);
});

client.on('message', (msg) => {
	var fmt_msg = msg.content.split(" ");

	if (fmt_msg[0] === '-ping') 
	{
		msg.reply('Pong!');
	} 
	else if (fmt_msg[0] === '-stream')
	{
		if (!fmt_msg[1]) {
			const embed = create_embed('Formato inválido'.toUpperCase(), 'Digite o nome de usuário da stream.\nExemplo "-stream shroud."', 'warning');
			msg.channel.send(embed);
		} else {
			var options = { 
				method: 'GET',
				url: 'https://api.twitch.tv/helix/streams',
				qs: { user_login: fmt_msg[1] },
				headers: {   
					'Cache-Control': 'no-cache',
					'Client-ID': process.env.TWITCH_CLIENT 
				}
			};
	
			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				body = JSON.parse(body);

				if (body.data.length == 0) {
					const embed = create_embed(`Stream ${fmt_msg[1]}:`.toUpperCase(), 'Stream não está online no momento.', 'danger');
					msg.channel.send(embed);
				} else {
					console.log(body);
					var embed_stream = {
						'color': 0x25ce41,
						'description': 	'```' + '\n' + body.data[0].title + '```' + 
										'```css\nViewers: ' + body.data[0].viewer_count + '```'
					};
					const embed = new RichEmbed(embed_stream);
					
					msg.channel.send(embed);
					msg.channel.send('\nhttps://twitch.tv/'+fmt_msg[1]);
				}
			});
		}
	}
	else if (fmt_msg[0] === '-lolchamp')
	{
		if (!fmt_msg[1]) {
			const embed = create_embed('Formato inválido'.toUpperCase(), 'Digite o nome de usuário do jogador.\nExemplo "-lolchamp Pato Papão."', 'warning');
			msg.channel.send(embed);
		} else {
			fmt_msg.splice(0, 1);
			var champion_nick = fmt_msg.join(" ");
			var encoded_champion_nick = encodeURI(champion_nick);

			var options = { 
				method: 'GET',
				url: 'https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + encoded_champion_nick,
				headers: { 
					'Cache-Control': 'no-cache',
					'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
					'X-Riot-Token': process.env.LOL_API_KEY 
				}
			};

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				body = JSON.parse(body);
	
				if (body.status) {
					const embed = create_embed('USUÁRIO INVÁLIDO', `Úsuario (${champion_nick}) não encontrado.`, 'warning');
					msg.channel.send(embed);
				} else {
					const embed = new RichEmbed({
						'title': body.name,
						'color': 0x25ce41,
						'description': 'Level:' + '```css\n'+ body.summonerLevel +'```'
					});

					embed.setThumbnail('http://ddragon.leagueoflegends.com/cdn/8.17.1/img/profileicon/' + body.profileIconId + '.png');
					msg.channel.send(embed);
				}
			});
		}
	}

});

function create_embed(title, msg, type) {
	const embed = new RichEmbed()
		.setTitle(title)
		.setDescription(msg);

	if (type == 'danger') {
		embed.setColor(0xf45042);
	} else if (type == 'success') {
		embed.setColor(0x25ce41);
	} else if (type == 'warning') {
		embed.setColor(0xfffb2d);
	}
	return embed;
}

client.login(process.env.BOT_TOKEN);