const Discord = module.require('discord.js');

module.exports.run = async(client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Essas são as informações do usuário.")
        .setColor(client.colors.get('blue'))
        .addField("Username", message.author.tag)
        .addField("ID", message.author.id)
        .addField("Criado Em", message.author.createdAt)
        .setThumbnail(message.author.avatarURL);

        message.channel.send(embed);
}

module.exports.help = {
    name: "usuarioinfo",
    information: 'Exibe informações de um determinado usuário do servidor.',
    usage: [
        ''
    ]
}