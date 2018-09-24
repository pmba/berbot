const Discord = module.require('discord.js');
const InvalidFormat = module.require('../utilities/exceptions/invalidFormat.js');

module.exports.run = async(client, message, args) => {
    if (!args.length) return message.channel.send(await InvalidFormat.create(this));
    if (!message.content.includes('?')) return message.reply('Isso é uma pergunta, COLOCA UMA INTERROGAÇÃO POR FAVOR.');

    await message.channel.send(new Discord.RichEmbed()
        .setColor(client.colors.get('white'))
        .setTitle(':ballot_box_with_check: Nova Votação!')
        .setDescription('Basta reagir na minha próxima mensagem para votar.')
        .addField('Duração', '1 Minuto')
        .setFooter(`Iniciada por ${message.author.username}`, message.author.displayAvatarURL));

    let pollName = await args.join(' ');
    console.log(`VOTAÇÃO (${pollName}), INICIADA POR ${message.author.username}.`);
    message.delete();

    let poll = await message.channel.send(new Discord.RichEmbed()
        .setColor(client.colors.get('white'))    
        .setTitle(pollName.toUpperCase())
        .setDescription('Escolha uma reação para votar.'));
    
    await poll.react(`👍`);
    await poll.react(`👎`);
    
    let yesFilter = (reaction) => reaction.emoji.name === `👍`;
    let yesCollector = await poll.createReactionCollector(yesFilter, { time: 60000 });
    let noFilter = (reaction) => reaction.emoji.name === `👎`;
    let noCollector = await poll.createReactionCollector(noFilter, { time: 60000 });

    
    yesCollector.on('collect', vote => {
        console.log(`VOTAÇÃO (${pollName}), +1 Sim.`);
    });

    noCollector.on('collect', vote => {
        console.log(`VOTAÇÃO (${pollName}), +1 Não.`);
    });

    let yVotes = nVotes = 0;

    yesCollector.on('end', async collected => {
        yVotes = await collected.size;
    });

    noCollector.on('end', async collected => {
        nVotes = await collected.size;
        console.log(`VOTAÇÃO (${pollName}), Finalizada.`);

        await message.channel.send(new Discord.RichEmbed()
                .setColor(client.colors.get('yellow'))
                .setTitle('Fim de votação :ballot_box_with_check:')
                .addField('Título', pollName)
                .addField('Autor', message.author.username)
                .addField(`👍`, `${yVotes} Votos`)
                .addField(`👎`, `${nVotes} Votos`)
                );
    });
}

module.exports.help = {
    name: "votar",
    information: 'Inicia uma votação de Sim ou Não.',
    usage: [
        '<PERGUNTA DA VOTAÇÃO>'
    ]
}