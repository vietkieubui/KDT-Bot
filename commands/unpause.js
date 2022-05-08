const { player } = require('./play');
module.exports = {
    name: 'unpause',
    description: 'Tiếp tục chơi nhạc',
    run: async(client, message, args) => {
        console.log(message.content);

        await player.unpause(message);
        await message.channel.send("▶ Unpaused");

    }
};