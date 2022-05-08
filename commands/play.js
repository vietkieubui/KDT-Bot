const { checkSameRoom } = require('../utils');
const ytdt = require('ytdl-core');
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const { Player } = require('discord-player');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    AudioPlayerPlayingState,
    demuxProbe
} = require('@discordjs/voice');

const audioPlayer = createAudioPlayer();
const player = createAudioPlayer();

const queue = new Map();
// queue(message.guild.id, queue_constructor object {voice channel, text channel, connection, song[]})


module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    player: player,
    description: 'Chơi nhạc từ Youtube',
    run: async(client, message, args) => {
        console.log(message.content);
        try {
            const voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send("vào voice đi tao hát cho nghe");
            if (!args.length) return message.channel.send("Nhập gì thì tao mới hát được chứ!");
            const serverQueue = queue.get(message.guild.id);
            const connection = connectToChannel(voice_channel);
            let song = {};
            let link = args[0];
            if (ytdl.validateURL(link)) {
                const songInfo = await ytdl.getInfo(link);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                };
            } else {
                const videoFinder = async(query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                const video = await videoFinder(args.join(' '));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url,
                    }
                } else {
                    message.channel.send("Không tìm thấy video nào!");
                }
            }
            const video_player = async(guild, song) => {
                const song_queue = queue.get(guild.id);
                if (!song) {
                    (await connectToChannel(voice_channel)).disconnect();
                    queue.delete(guild.id);
                    return;
                }
                const stream = ytdl(song.url, { filter: 'audioonly' });
                const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
                // const resource = createAudioResource(song.url, { inputType: StreamType.Arbitrary });
                player.play(resource);
                (await connection).subscribe(player);
                setTimeout(() => {
                    player.on(AudioPlayerStatus.Idle, () => {
                        song_queue.songs.shift();
                        video_player(guild, song_queue.songs[0]);
                    })
                }, 10000);
                message.channel.send(`🎶🎶🎶 Now playing --${song.title}-- 🎶🎶`);
            }

            if (!serverQueue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
                try {
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (error) {
                    console.log(error);
                    queue.delete(message.guild.id);
                    message.channel.send("Lỗi kết nối!");
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`✅✅Đã thêm ${song.title} vào hàng chờ!`);
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