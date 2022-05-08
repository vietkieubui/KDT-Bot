const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.channel.send("vào voice chat đã!");
    if (!message.guild.me.voice.channelID || message.channel.me.voice.channelID == message.member.voice.channelID) return;
    return message.reply("cùng phòng với bot mới thực hiện được");
}
module.exports = {
    checkSameRoom,
}