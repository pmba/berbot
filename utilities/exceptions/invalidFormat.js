const Discord = module.require('discord.js');
const Color = module.require('../design/colors.json');
const botConfig = require('../../botConfig');

let prefix = botConfig.prefix;

module.exports.create = async (cmd) => {
    return new Discord.RichEmbed()
    .setTitle('Fomato inválido :robot:')
    .setColor(Color.red)
    .setDescription('Como utilizar esse comando?')
    .addField('Uso', `${prefix}${cmd.help.name} ${cmd.help.usage[0]}`)
}