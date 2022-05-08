module.exports = {
    name: 'avatar',
    description: 'Hiện avatar',
    run: async(bot, message, args) => {
        console.log(message.content);
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const URL = member.user.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true });
            message.channel.send({ files: [URL] });
        } catch (err) {
            console.log(err);
        }
    }
}