const Discord = module.require('discord.js');

module.exports.run = async (message, arg) => {
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    
    let embed = new Discord.RichEmbed()
                                .setColor("#ff3111")
                                .setTitle('Formato Inválido')
                                .setDescription('Erro ao executar o comando :sob:')
                                .addField('Utilização', `${command} ${arg}`);

    return embed;
}