const { player, serverQueue } = require('./play');
module.exports = {
    name: 'skip',
    description: 'Chuyển bài tiếp theo',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            await player.stop(true);
        } catch (error) {
            console.log(error);
        }

    }
};