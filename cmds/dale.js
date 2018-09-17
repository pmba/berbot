const Discord = module.require('discord.js');
const Path = module.require('path');

module.exports.run = async (client, message, args) => {
    message.member.voiceChannel.join()
    .then(async connection => {
        const broadcast = client.createVoiceBroadcast();
        broadcast.playFile(Path.join(__dirname, '../files/dale.mp3'));
        for (const connection of client.voiceConnections.values()) {
            connection.playBroadcast(broadcast);
        }
    });

}

module.exports.help = {
    name: 'dale',
    information: 'Comando desumildorone, dale dele dele doly!',
    usage: [
        ' '
    ]
}