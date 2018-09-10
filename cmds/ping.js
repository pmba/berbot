const Discord = module.require('discord.js');

module.exports.run = async(client, message, args) => {
    message.channel.send(new Discord.RichEmbed()
        .setTitle('Pong! :ping_pong:')
        .setDescription('Brincadeirinha :poop:')
        .addField('Seu Ping', `${client.ping}ms`)
        .setColor('#59ff00'));
}

module.exports.help = {
    name: "ping",
    information: 'Mostra seu ping no servidor.',
    usage: [
        ''
    ]
}