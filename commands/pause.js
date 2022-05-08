const { player } = require('./play');
module.exports = {
    name: 'pause',
    description: 'Tạm dừng chơi nhạc',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            await player.pause(message);
            await message.channel.send("⏸Paused");
        } catch (error) {
            console.log(error);
        }

    }
};