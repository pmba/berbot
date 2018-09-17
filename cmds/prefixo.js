const Discord = module.require('discord.js');
const botConfig = module.require('../botConfig.json');

let prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    await message.channel.send(`Meu prefixo tá ai, meu querido: ${prefix}`);
}

module.exports.help = {
    name: 'prefixo',
    information: 'Mostra qual o prefixo dos meus comandos.',
    usage: [
        ' '
    ]
}