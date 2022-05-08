module.exports = {
    name: 'ping',
    aliases: ['ping'],
    category: 'commands',
    description: 'Ping reply',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            message.channel.send("ping cai loz");
        } catch (error) {
            console.log(error);
        }

    }
}