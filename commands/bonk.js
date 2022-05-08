module.exports = {
    name: 'bonk',
    description: 'Bonk',
    run: async(bot, message, args) => {
        console.log(message.content);
        try {
            const member = message.mentions.members.first();
            if (member === undefined) {
                message.channel.send({ files: ["https://i1.wp.com/lucloi.vn/wp-content/uploads/2020/08/b73-1.jpg?fit=800%2C462&ssl=1"] });
            } else {
                nameID = "<@" + member.id + ">";
                message.channel.send(nameID);
                message.channel.send({ files: ["https://i1.wp.com/lucloi.vn/wp-content/uploads/2020/08/b73-1.jpg?fit=800%2C462&ssl=1"] });
            }
        } catch (error) {
            console.log(error);
        }
    }
}