const Discord = module.require('discord.js');
const Request = module.require('request');

module.exports.run = async(client, message, args) => {
    
    let person = '';
    
    if (!args.length) {
        person = await encodeURI(message.member.nickname);
    } else if (message.mentions.users.first()) {
        person = await encodeURI(message.mentions.users.first().username);
    }

    let options = await { 
        method: 'GET',
        url: `https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${person}`,
        headers: { 
            'Cache-Control': 'no-cache',
            'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' 
        }
    }

    await Request(options, (err, res, body) => {
        if (err) console.error(err);

        body = JSON.parse(body);

        message.channel.send(new Discord.RichEmbed()
            .setTitle('From: **Donald Trump**')
            .setDescription(body.message)
            .setColor(client.colors.get('white'))
            .setThumbnail('https://www.gannett-cdn.com/presto/2018/09/09/USAT/59bcb336-865e-47de-baa5-f1c319c056fe-AFP_AFP_18X75M.JPG?width=534&height=401&fit=bounds&auto=webp')
        );
    });
}

module.exports.help = {
    name: "trumpdiz",
    information: 'Mostra o que o Donald Trump acha de um determinado usuário.',
    usage: [
        '',
        '<MENÇÃO DO USUÁRIO>'
    ]
}