const Discord = require('discord.js');
const { prefix, token} = require("./config.json");
const say = require('say')


const client = new Discord.Client();
const queue = new Map();

let interval;
/*
 1.cd to this folder
 2.type < npm install > in command prompt to get node modules
 3.put your disocrd bot token at the bottom
 4.run < node . > in command prompt 
*/

client.on("ready", () => {
console.log(`${client.user.bot} is online`)
client.user.setPresence({ activity: {type:'LISTENING', name: `${prefix}help` },

})
});

client.on("message", async message => {

if (message.author.bot)  return;


const serverQueue = queue.get(message.guild.id);

say.speak(message.content)

if (!message.content.startsWith(prefix)) return;


if(message.content.startsWith(`${prefix}help`)) {
  message.delete();
  let asd = client.users.cache.get(message.author.id).displayAvatarURL({format: "png", size: 2048, dynamic: true})
    const help = new Discord.MessageEmbed()
      .setTitle(`**Guide**`)
      .setDescription('前綴 : ***-***\n***貼圖使用兩個前綴***')
      .setAuthor(`[ ${message.guild.name} ]`)
      .setColor('#0099E1')
      .addFields(
        {name: '建議', value:'You can create a new role called "default" for the add-permission command'},
        { name: '\u200B', value: '\u200B' },
        { name: '音樂 :', value: '`play URL\n\np URL\n\nstop\n\nskip`', inline: true },
        { name: '動作 :', value: '`avatar @someone\n\nbmi (height) (weight) @someone\n\nlick @someone\n\ndm @someone messages`' ,inline: true },
        { name:'歷史紀錄 :' , value: '**started at 2020 09 20**\n`history (20xx) (months) (days)\n\nhistory bot (20xx) (months) (days)`' , inline: true },
        { name: '動作超連結 :', value: `[🔥](${asd}): Your avatar\n[🔥](https://server-asd35084591.p.tnnl.in//)`, inline: true },
        { name: '\u200B', value: '\u200B' }
        )
      .setTimestamp()
      message.channel.send(help)
      return;

} else if(message.content.startsWith(`${prefix}time`)) {
      let asd;
      message.delete()
      asd=await message.channel.send({embed:{title:Date(Date.now()).slice(0,24)}})
     // if (!interval) {
        interval = setInterval(()=>{
          asd.edit({embed:{title:Date(Date.now()).slice(0,24)}})
            },3000)
          //}
         
} else if(message.content===`${prefix}x`){
          message.delete()
          clearInterval(interval)
          interval = null;
          return;
    
/*music*/} else if (message.content===`${prefix}play`) {
    message.delete({ timeout: 1000 });
    execute(message, serverQueue);
    return;
/*music*/} else if (message.content===`${prefix}p`) {
    message.delete({ timeout: 1000 });
    execute(message, serverQueue);
    return;
/*music*/} else if (message.content===`${prefix}skip`) {
    message.delete({ timeout: 1000 });
    skip(message, serverQueue);
    return;
/*music*/} else if (message.content===`${prefix}stop`) {
    message.delete({ timeout: 1000 });
    stop(message, serverQueue);
    return;

/*action*/} else if (message.content.startsWith(`${prefix}avatar`)) {
      message.delete();
      let embed = new Discord.MessageEmbed();
      if(!message.mentions.users.first()) {
        message.channel.send(`You need to tag someone${message.author.toString()}`)
        .then(msg => {
          msg.delete({ timeout: 3000 });
         })
        return;
    } else {
        let user = message.mentions.users.first();
        embed.setTitle(`‹${user.username}›'s avatar`);
        embed.setDescription(`Links:\n[png](${user.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${user.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${user.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${user.displayAvatarURL({format: "webp", size: 2048})})`);
        embed.setColor(0x8b0000);
        embed.setTimestamp();
        embed.setFooter(user.username);
        embed.setImage(client.users.cache.get(user.id).displayAvatarURL({size: 2048, dynamic: true}));
        message.channel.send(embed); 
        //console.log(typeof user);
      }
/*action*/} else if (message.content.startsWith(`${prefix}bmi`)) {
    message.delete();
    if(!message.mentions.users.first()) {
      message.channel.send(`You need to tag someone${message.author.toString()}`);
      return;}
      else{
    let user = message.mentions.users.first();
    const args = message.content.split(" ");
    let height = args[1];
    let weight = args[2];
    let asd = height*height/10000;
    const bmi = (weight/asd);
    const ans = Math.round(bmi*1000)/1000;
    message.channel.send(`${user.username}的bmi值為${ans}`);}

/*action*/} else if (message.content.startsWith(`${prefix}dm`)) {
    message.delete();
    let args = message.content.split(" ");
    let dUser = message.guild.member(message.mentions.users.first());
    if (!dUser) return message.channel.send("user not found")
    args.splice(0,2);
    let dm = args.join(" ")
    //let asd = message.author.username;
    //say.speak(dm)
    //say.export(dm,'Alex',1,`./text-to-speak/${asd}-${dm}.wav`)
    dUser.send(`${message.author.username} sent you ${dm} `)
    message.author.send(`You have sent your message : " ***${dm}***  " to ${dUser}`)

} else if (message.content===`${prefix}test`) {
  message.delete();
  let asd= client.user.username
  message.channel.send(`${asd} is online`)
  .then(msg => {
    msg.delete({ timeout: 3000 });
  })
  
} else if (message.content.startsWith(`${prefix}tts`)){
    message.delete()
    let args = message.content.split(" ");
    args.splice(0,1);
    let dm = args.join(" ")
    say.speak(dm)
    let path = `./text-to-speak/${message.author.username}-${dm}.wav`
    say.export(dm,'Alex',1,`${path}`)
    setTimeout(()=>{
      message.author.send({files:[`${path}`]})
    },3000)

} else {message.channel.send("You need to enter a valid command!")
  .then(msg => {
    msg.delete({ timeout: 5000 });
  })
}

})

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      `You need to be in a voice channel ${message.author.toString()} you idiot`
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);

    let asd = message.channel.send(`${song.title} has been added to the queue`)
    .then(msg => {
      msg.delete({ timeout: 5000 });
     })
     return asd;
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel"
    );
  if (!serverQueue)
    return message.channel.send("queue is empty");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url), {
      quality: 'highestaudio',
      highWaterMark: 1 << 25
  })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`now playing: **${song.title}**`)
  .then(msg => {
    msg.delete({ timeout: 5000 });
   })
}

client.login('your bot token');
