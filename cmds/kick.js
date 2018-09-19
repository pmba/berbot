const Discord = module.require('discord.js');
const InvalidFormat = module.require('../msgs/invalidFomat');

module.exports.run = async (client, message, args) => {
    let role = message.member.roles;
    let user = message.mentions.users.first();

    if (user) {
        if (role.find("name", "it killin") || role.find("name", "it flip")) {
            await message.channel.send('Claro Mestre. Só um momento...');
            
            let member = message.guild.member(user);

            if (member) {
                member.kick('Meu mestre mandou').then(() => {
                    message.reply(`Expulsei ${user.tag} como você me mandou, oh daddy.`);
                }).catch(err => {
                    message.reply('Não consegui expulsar esse usuário, oh senpai.');
                    console.error(`ERRO: Incapaz de expulsar (${err.message})`);
                });
            } else {
                message.channel.send('Mestre... Não consegui encontrar esse usuário.');
            }
        } else {
            message.channel.send(new Discord.RichEmbed()
                .setTitle('Não Permitido')
                .setColor('#ff3111')
                .setDescription('Você não tem permissão suficiente para me obrigar a fazer isso. :kissing_smiling_eyes:')
            );
        }
    } else {
        message.channel.send(await InvalidFormat.run(message, '<MENÇÃO DO USUÁRIO>'));      
    }
        
}

module.exports.help = {
    name: 'kick',
    information: 'Expulsa alguém do servidor.',
    usage: [
        '<MENÇÃO DO USUÁRIO>'
    ]
}