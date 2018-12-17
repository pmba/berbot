const Discord = module.require('discord.js');
const Path = module.require('path');

module.exports.run = async (client, message, args) => {
    var channel;

    if (message.mentions.users.first()) {
        channel = message.mentions.users.first().voiceChannel.join();
    } else {
        channel = message.member.voiceChannel.join();
    }
    
    channel.then(async connection => {
        const broadcast = client.createVoiceBroadcast();
        broadcast.playFile(Path.join(__dirname, '../files/gnome.mp3'));
        for (const connection of client.voiceConnections.values()) {
            connection.playBroadcast(broadcast);
        }
    });

}

module.exports.help = {
    name: 'gnome',
    information: 'UHUHUHUHU, I\'M A GNOME!',
    usage: [
        ' ',
        '<MENÇÃO DO USUÁRIO>'
    ]
}