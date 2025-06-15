const { Client, GatewayIntentBits, Collection, PermissionsBitField, REST, Routes } = require('discord.js');
const { setTimeout } = require('node:timers');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'ban',
        description: 'Select a member and ban them.',
        options: [
            {
                name: 'target',
                type: 6, 
                description: 'The member to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 3, 
                description: 'The reason for banning',
                required: false,
            },
        ],
    },
    {
        name: 'kick',
        description: 'Select a member and kick them.',
        options: [
            {
                name: 'target',
                type: 6,
                description: 'The member to kick',
                required: true,
            },
            {
                name: 'reason',
                type: 3, 
                description: 'The reason for kicking',
                required: false,
            },
        ],
    },
    {
        name: 'timeout',
        description: 'Select a member and time them out.',
        options: [
            {
                name: 'target',
                type: 6, 
                description: 'The member to timeout',
                required: true,
            },
            {
                name: 'duration',
                type: 4, 
                description: 'Duration in minutes',
                required: true,
            },
            {
                name: 'reason',
                type: 3, 
                description: 'The reason for timeout',
                required: false,
            },
        ],
    },
    /
];


const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

    
        if (GUILD_ID) {
             await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
            );
            console.log('Successfully reloaded guild (/) commands.');
        } else {
             await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: commands },
            );
            console.log('Successfully reloaded global (/) commands.');
        }


    } catch (error) {
        console.error(error);
    }
})();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'ban') {
        const target = options.getUser('target');
        const reason = options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(target.id);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        if (!member) {
            return interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: 'I cannot ban this user. They might have a higher role or I lack permissions.', ephemeral: true });
        }

        try {
            await member.ban({ reason: reason });
            await interaction.reply(`Successfully banned ${target.tag} for reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to ban that user.', ephemeral: true });
        }

    } else if (commandName === 'kick') {
        const target = options.getUser('target');
        const reason = options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(target.id);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

         if (!member) {
            return interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: 'I cannot kick this user. They might have a higher role or I lack permissions.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            await interaction.reply(`Successfully kicked ${target.tag} for reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to kick that user.', ephemeral: true });
        }

    } else if (commandName === 'timeout') {
        const target = options.getUser('target');
        const duration = options.getInteger('duration'); 
        const reason = options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(target.id);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
             return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

         if (!member) {
            return interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        const msDuration = duration * 60 * 1000;
        if (msDuration > 2_419_200_000) { 
             return interaction.reply({ content: 'Timeout duration cannot exceed 28 days.', ephemeral: true });
        }


        try {
            await member.timeout(msDuration, reason);
            await interaction.reply(`Successfully timed out ${target.tag} for ${duration} minutes for reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to timeout that user.', ephemeral: true });
        }
    }
});

client.login(TOKEN);
