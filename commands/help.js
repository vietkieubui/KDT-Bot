const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Danh sách lệnh',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            let string1 = "";
            let string2 = "";
            client.commands.forEach(command => {
                string1 += `!${command.name}\n`;
                string2 += `${command.description}\n`;
            })
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Danh sách lệnh',
                fields: [{
                        name: 'Lệnh',
                        value: string1,
                        inline: true,
                    },
                    {
                        name: 'Chức năng',
                        value: string2,
                        inline: true,
                    },
                ],
            };
            message.channel.send({ embeds: [exampleEmbed] });
        } catch (error) {
            console.log(error);
        }


    }
}