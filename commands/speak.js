const { getAudioUrl } = require('google-tts-api');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
} = require('@discordjs/voice');
const play1 = require('./play');

const audioPlayer = createAudioPlayer();

module.exports = {
    name: 'noi',
    aliases: ['!noi'],
    description: 'Cho bot nói gì đó',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            if (!args[0]) return message.channel.send('nhập gì mới nói được chứ');
            const string = args.join(' ');
            if (string.leng > 200) return message.channel.send("Nhập ít thôi nhập lắm đ ai nói được");
            const voice_Channel = message.member.voice.channel;

            const audioURL = await getAudioUrl(string, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000
            });
            console.log('2');
            try {
                if (voice_Channel) {
                    try {
                        const connection = await connectToChannel(voice_Channel);
                        console.log('3');
                        connection.subscribe(audioPlayer);
                        console.log('4');
                        playAudio(audioURL);
                        console.log('5');
                        await message.reply('Playing now!');

                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    await message.reply('Vào voice đã');
                }
            } catch (err) {
                console.log(err);
            }

        } catch (error) {
            console.log(error);
        }
    }
}
async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30000);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
}

function playAudio(audioURL) {
    const resource = createAudioResource(audioURL, {
        inputType: StreamType.Arbitrary,
    });
    audioPlayer.play(resource);
    return entersState(audioPlayer, AudioPlayerStatus.Playing, 5e3);
}