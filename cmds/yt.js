const Discord = module.require('discord.js');
const Path = module.require('path');
const ytdl = module.require('ytdl-core');
const streamOptions = {filter:'audioonly', seek:0, volume:.5};
const InvalidFormat = module.require('../utilities/exceptions/invalidFormat.js');

module.exports.run = async (client, message, args) => {
    const broadcast = client.createVoiceBroadcast();
    console.log(args);
    if (args.length <= 0) {
        message.channel.send(await InvalidFormat.create(this));   
    } else {
        message.member.voiceChannel.join()
        .then(async connection => {
            const stream = ytdl(args[0], streamOptions);
            console.log(stream);
            broadcast.playStream(stream);
            const dispatcher = connection.playBroadcast(broadcast);
        })
        .catch(console.error);
    }

}

module.exports.help = {
    name: 'yt',
    information: 'Reproduz o audio de algum vídeo do youtube.',
    usage: [
        '<URL DO VÍDEO>'
    ]
}