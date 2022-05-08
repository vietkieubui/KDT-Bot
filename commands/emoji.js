const { Util } = require('discord.js');
const { parse } = require('../node_modules/twemoji-parser');

module.exports = {
    name: 'emoji',
    description: 'Phóng to emoji',
    run: async(bot, message, args) => {
        console.log(message.content);
        try {
            const emoji = args[0];
            if (!emoji) return message.channel.send("nhap emoji di!");
            let custom = Util.parseEmoji(emoji);
            message.channel.send("Zoom in emoji: " + custom.name);
            if (custom.id) {
                let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated? "gif" : "png"}`;
                message.channel.send({ files: [link] });
            } else {
                let parsed = parse(emoji, { assetType: 'png' });
                if (!parsed[0]) return message.channel.send("ko hop le");
                message.channel.send({ files: [parsed[0].url] });
            }
        } catch (error) {
            console.log(error);
        }

    }
}