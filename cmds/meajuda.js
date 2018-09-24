const Discord = module.require('discord.js');
const botConfig = module.require('../botConfig');

let prefix = botConfig.prefix;
let global = botConfig.global;

module.exports.run = async (client, message, args) => {
    let msg = await message.channel.send('Checando meus segredos mais profundos... :spy::skin-tone-3:');

    let commands = await new Discord.RichEmbed()
        .setTitle('Berbot Comandos')
        .setDescription('Quais comandos eu posso executar?')
        .setColor(client.colors.get('blue'))
        .setFooter('Me use com sabedoria.', 'https://cdn.discordapp.com/avatars/410613588193968128/4278f4541c3d113972fa43f5cc2a93a3.png?size=2048');
    
    await client.commands.forEach(cmd => {
        let cmdUsage = '';
        
        cmd.help.usage.forEach(arg => {
            cmdUsage += '`'+prefix+cmd.help.name+' '+ arg +'` \n';
        });
        
        commands.addField(`${prefix}${cmd.help.name}`, `${cmd.help.information} \n ${cmdUsage}\n\n`);
    });

    if (args.length <= 0) {
        message.author.send(commands);
    } else if (args[0] === global) {
        message.channel.send(commands);
    }

    msg.delete();
}

module.exports.help = {
    name: 'meajuda',
    information: 'Exibe a lista de comandos disponíveis e suas utilizações.\nUtilize -g para enviar para o canal.',
    usage: [
        ' ',
        global
    ]
}