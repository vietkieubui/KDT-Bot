const axios = require('axios');

module.exports = {
    name: 'chat',
    description: 'Chat với brainbot',
    run: async(bot, message, args) => {
        console.log(message.content);
        try {
            try {
                const res = await axios.get(`http://api.brainshop.ai/get?bid=158855&key=Cr8v8ybgaoHqWe4P&uid=[uid]&msg=${message.content}`);
                message.channel.send(res.data.cnt);

            } catch (e) {
                message.channel.send("Bot ngu đ trả lời đc");
            }
        } catch (error) {
            console.log(error);
        }
    }
}