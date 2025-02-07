// Import the necessary libraries
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the bot token from the .env file
const token = process.env.BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command registration details
const commands = [
    {
        name: 'ping',
        description: 'Replies with the bot ping!',
    },
];

// Register commands with Discord API
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(client.user.id), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Respond to /ping command
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        // Respond with bot's ping
        await interaction.reply(`Pong! 🏓 Latency is ${client.ws.ping}ms`);
    }
});

// Log in to Discord with the app's token
client.login(token);
