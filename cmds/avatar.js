const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    let msg = await message.channel.send("Buscando avatar...");

    if (message.mentions.users.first()) {
        await message.channel.send(new Discord.RichEmbed()
            .setColor(client.colors.get('white'))
            .setImage(message.mentions.users.first().displayAvatarURL));
    } else {
        await message.channel.send(new Discord.RichEmbed()
            .setColor(client.colors.get('white'))
            .setImage(message.author.displayAvatarURL));
    }

    msg.delete();
}

module.exports.help = {
    name: 'avatar',
    information: 'Envia uma URL com o avatar do respectivo usuário.',
    usage: [
        ' ',
        '<MENÇÃO DO USUÁRIO>'
    ]
}