const Discord = module.require('discord.js');
const Request = module.require('request');
const botConfig = module.require('../botConfig.json');

let prefix = botConfig.prefix;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports.run = async(client, message, args) => {
    if (args.length < 2 || (!isNumeric(args[0]) || !isNumeric(args[1]))) {
        message.channel.send(new Discord.RichEmbed()
            .setTitle('Erro ao gerar nick :bug:')
            .setDescription('Informações desse comando:')
            .addField('Uso', `${prefix}${this.help.name} ${this.help.usage[0]}`)
            .addField('Numero Mínimo', 2)
            .addField('Numero Máximo', 40)
            .setColor('#ff1111')
        );
    } else {
        let minLength = args[0];
        let maxLength = args[1];

        let options = {
            method: 'GET',
            url: `https://uzby.com/api.php?min=${minLength}&max=${maxLength}`,
            headers: { 
                'Cache-Control': 'no-cache',
                'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' 
            }
        };

        Request(options, (err, res, body) => {
            if (err) console.error(err);

            message.channel.send(new Discord.RichEmbed()
                .setTitle('Nick Gerado')
                .setColor(client.colors.get('yellow'))
                .addField('Resultado', body)
            );
        });
    }
    
}

module.exports.help = {
    name: "geranick",
    information: 'Gera um nick dado um número mínimo e máximo de caracteres.\nNúmero mínimo: **2**\nNúmero máximo: **40**',
    usage: [
        '<NÚMERO MÍNIMO DE CARACTERES> <NÚMERO MÁXIMO DE CARATERES>'
    ]
}