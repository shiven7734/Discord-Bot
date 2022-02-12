const Discord = require('discord.js');


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.message, Intents.channel, Intents.reaction] });
const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log('bot is online!');
});


client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        client.commands.get('ping').excecute(message, args);
    }
    if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    }

});

client.login('');


module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '876575997338742786';
        const extrovertRole = message.guild.roles.cache.find(role => role.name === "Extrovert");
        const introvertRole = message.guild.roles.cache.find(role => role.name === "Introvert");

        const hotFaceEmoji = ':hot_face:';
        const coldFaceEmoji = ':cold_face:';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('What kind of personality do you havc?')
            .setDescription('Choosing a personality allows people to know how to approach you/n/n'
                + `${hotFaceEmoji} for Extrovert \n`
                + `${coldFaceEmoji} for Introvert`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(hotFaceEmoji);
        messageEmbed.react(coldFaceEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === hotFaceEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(extrovertRole);
                }
                if (reaction.emoji.name === coldFaceEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(introvertRole);
                }
            } else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === hotFaceEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(extrovertRole);
                }
                if (reaction.emoji.name === coldFaceEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(introvertRole);
                }
            } else {
                return;
            }
        });
    }

}


