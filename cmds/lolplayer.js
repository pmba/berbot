const Discord = module.require('discord.js');
const InvalidFormat = module.require('../msgs/invalidFomat');
const Request = module.require('request');

module.exports.run = async (client, message, args) => {
    if (args.length <= 0) {
        message.channel.send(await InvalidFormat.run(message, '<USUÁRIO DO LOL>'));   
    } else {

        let playerNick = args.join(" ");
        let encodedPlayerNick = encodeURI(playerNick);

        let options = { 
            method: 'GET',
            url: `https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${encodedPlayerNick}`,
            headers: { 
                'Cache-Control': 'no-cache',
                'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'X-Riot-Token': process.env.LOL_API_KEY 
            }
        };

        Request(options, async (err, res, body) => {
            if (err) console.error(err);

            body = JSON.parse(body);

            let msg = await message.channel.send(`Buscando usuário ${playerNick}...`);

            if (body.status) {
                await message.channel.send(new Discord.RichEmbed()
                    .setTitle('Usuário não encontrado')
                    .setDescription('Não foi possivel encontrar esse usuário :confused:')
                    .setColor('#ff3111'));
            } else {
                
                await message.channel.send(new Discord.RichEmbed()
                    .setTitle(body.name)
                    .setColor('#0055ff')
                    .addField('Level', body.summonerLevel)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.17.1/img/profileicon/${body.profileIconId}.png`));
            
                //Get Ranked Information

                options.url = `https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/${body.id}`;

                Request(options, async (err2, res2, body2) => {
                    body2 = JSON.parse(body2);

                    if (body2.length == 0) {
                        message.channel.send(new Discord.RichEmbed()
                            .setTitle('Informações de Ranked')
                            .setDescription('Usuário não está qualificado em nenhum tier.')
                            .setColor('#ff3111'));
                    } else {
                        body2.forEach(async queue => {
                            let queueName, queueTier;

                            switch(queue.queueType) {
                                case 'RANKED_SOLO_5x5':
                                    queueName = await 'Solo/Duo';
                                    break;
                                case 'RANKED_FLEX_SR':
                                    queueName = await '5x5 Flex';
                                    break;
                            }

                            switch(queue.tier) {
                                case 'BRONZE':
                                    queueTier = await 'https://i.imgur.com/2qrBtyP.png';
                                    break;
                                case 'SILVER':
                                    queueTier = await 'https://i.imgur.com/52nCXn7.png';
                                    break;
                                case 'GOLD':
                                    queueTier = await 'https://i.imgur.com/Y7cVFQ3.png';
                                    break;
                                case 'PLATINUM':
                                    queueTier = await 'https://i.imgur.com/xQMsFzP.png';
                                    break;
                                case 'DIAMOND':
                                    queueTier = await 'https://i.imgur.com/mDXsf9j.png';
                                    break;
                                case 'MASTER':
                                    queueTier = await 'https://i.imgur.com/LnGObVL.png';
                                    break;
                                case 'CHALLENGER':
                                    queueTier = await 'https://i.imgur.com/eWcURu0.png';
                                    break;	
                            }

                            
                            await message.channel.send(new Discord.RichEmbed()
                                .setColor("#e5ff00")
                                .setTitle(queueName)
                                .setThumbnail(queueTier)
                                .setDescription(queue.leagueName)
                                .addField("Divisão", `${queue.tier} ${queue.rank}`)
                                .addField("Pontuação na divisão", `**${queue.leaguePoints}**/100`)
                                .addField("Vitórias/Derrotas", `${queue.wins}/${queue.losses}`));
                        });
                    }
                });
            }

            msg.delete();
        });
    }
}

module.exports.help = {
    name: 'lolplayer',
    information: 'Exibe informações de um jogador de League of Legends.',
    usage: [
        '<USUÁRIO>'
    ]
}