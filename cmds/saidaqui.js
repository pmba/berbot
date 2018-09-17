const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    await message.channel.send(':middle_finger: Flw, otário :middle_finger:')
    message.member.voiceChannel.leave();
}

module.exports.help = {
    name: 'saidaqui',
    information: 'Me expulsa do canal (se usar, é um otário)',
    usage: [
        ' '
    ]
}