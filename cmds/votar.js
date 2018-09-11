const Discord = module.require('discord.js');

module.exports.run = async(client, message, args) => {
    if (!args.length) return message.reply('Você precisa por algo na votação, querido.');
    if (!message.content.includes('?')) return message.reply('Isso é uma pergunta, COLOCA UMA INTERROGAÇÃO POR FAVOR.');

    await message.channel.send(new Discord.RichEmbed()
        .setColor('#fafafa')
        .setTitle(':ballot_box_with_check: Nova Votação!')
        .setAuthor(message.author.username)
        .setDescription('Basta reagir na minha próxima mensagem para votar.')
        .addField('Duração', '1 Minuto'));

    console.log(`VOTAÇÃO (${args.join(' ')}), INICIADA POR ${message.author.username}.`);

    let poll = await message.channel.send(new Discord.RichEmbed()
        .setColor('#fafafa')    
        .setTitle(args.join(' ').toUpperCase())
        .setDescription('Escolha uma reação para votar.'));
    await poll.react(`✅`);
    await poll.react(`⛔`);

    let yesFilter = (reaction) => reaction.emoji.name === `✅`;

    let yesCollector = poll.createReactionCollector(yesFilter, { time: 60000 });
    
    yesCollector.on('collect', vote => {
        console.log(`VOTAÇÃO (${args.join(' ')}), +1 Sim.`);
    });

    yesCollector.on('end', collected => {
        console.log(`VOTAÇÃO (${args.join(' ')}), Finalizada.`);

        message.channel.send(new Discord.RichEmbed()
            .setColor('#ffbc00')
            .setTitle('Fim de votação :ballot_box_with_check:')
            .addField('Título', args.join(' '))
            .addField('Autor', message.author.username)
            .addField('Resultado', `${collected.size} pessoas votaram Sim.`));
    });
}

module.exports.help = {
    name: "votar",
    information: 'Inicia uma votação de Sim ou Não.',
    usage: [
        '<PERGUNTA DA VOTAÇÃO>'
    ]
}