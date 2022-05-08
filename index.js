const { Client, Intents, Collection } = require("discord.js");

const bot = new Client({
  intents: ["GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILDS"],
});

const TOKEN = process.env.TOKEN;

const prefix = "!";

const { commands } = require("./commands");
bot.commands = commands;
bot.aliases = new Collection();

bot.on("ready", async () => {
  console.log(`${bot.user.tag} is ready!`);
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const action = args.shift().toLowerCase();
  if (action.length === 0) return;

  bot.commands.forEach((command) => {
    if (action === command.name) command.run(bot, message, args);
  });
});

bot.login("YOUR_TOKEN"); //change your Bot Token
