const Discord = module.require('discord.js');
const InvalidFormat = module.require('../msgs/invalidFomat');
const Request = module.require('request');

module.exports.run = async (client, message, args) => {
    if (args.length <= 0) {
        message.channel.send(await InvalidFormat.run(message, '<USUÁRIO DA TWITCH>'));   
    } else {
        let options = {
            method: 'GET',
            url: 'https://api.twitch.tv/helix/streams',
            qs: { user_login: args[0] },
            headers: {   
                'Cache-Control': 'no-cache',
                'Client-ID': process.env.TWITCH_CLIENT 
            }
        };

        Request(options, async (err, res, body) => {
            if (err) console.error(err);

            body = JSON.parse(body);

            let streamURL = `https://twitch.tv/${args[0]}`;
            let msg = await message.channel.send('Buscando stream na Twitch...');

            if (!body.data.length) {
                await message.channel.send(new Discord.RichEmbed()
                    .setURL(streamURL)
                    .setTitle(`Twitch.tv/${args[0]}`)
                    .setColor("#ff3111")
                    .setDescription(`Stream não está online no momento :confused:`));
            } else {
                let streamInfo = body.data[0];

                await message.channel.send(new Discord.RichEmbed()
                    .setColor("#00f254")
                    .setDescription('A stream está online :ok_hand:')
                    .setTitle(streamInfo.title)
                    .addField("Viewers", streamInfo.viewer_count)
                    .setURL(streamURL));

                await message.channel.send(streamURL);
            }

            msg.delete();
        });
    }
}

module.exports.help = {
    name: 'stream',
    information: 'Exibe informações de uma determinada stream da Twitch.tv.',
    usage: [
        '<USUÁRIO DA TWITCH>'
    ]
}