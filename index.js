const Discord = require('discord.js');
const { prefix, token01 ,token02} = require("./config.json");
const say = require('say')
//const ytdl = require('ytdl-core')

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
//const queue = new Map();

let interval;
let all = new Array();
let intc = 0;
const helparray = new Array();
let helpcount =0;

client.on("ready", () => {
console.log(`${client.user.bot} is online`)
client.user.setPresence({ activity: {type:'LISTENING', name: `${prefix}help` },

})
});

client.on("message", async message => {
//const serverQueue = queue.get(message.guild.id);

//if(message.type === "PINS_ADD") message.delete()

if (message.author.bot)  return;

if (!message.content.startsWith(prefix)) return;


if(message.content.toLowerCase().startsWith(`${prefix}help`)) {
  //${prefix}help
  message.delete();
  let asd = client.users.cache.get(message.author.id).displayAvatarURL({format: "png", size: 2048, dynamic: true})
    const help = new Discord.MessageEmbed()
      .setTitle(`**Guide**`)
      .setAuthor(`[ ${message.guild.name} ]`)
      .setColor('#0099E1')
      .setTimestamp()
      const help00 = new Discord.MessageEmbed()
      .setDescription('前綴 : ***-***\n***貼圖使用兩個前綴***')
      .addFields({name: '大頭貼\n', value:`${asd}`})
      const help01 = new Discord.MessageEmbed()
      .addFields({ name: '~~音樂 :~~', value: '~~`play URL\n\np URL\n\nstop\n\nskip`~~', inline: true })
      const help02 = new Discord.MessageEmbed()
      .addFields({ name: '動作 :', value: '`avatar\n\n bmi\n\n dm\n\n\ time  count\n\n roll\n\n tts\n\n embed`' ,inline: true })
      if(helparray.length<1){
        helparray.push(help,help00,help01,help02)}
        //console.log(helpary)
       let p = await message.channel.send(help).catch(err=>{console.log(err)})
       p.react('👉')
      return;

} else if(message.content.toLowerCase()===`${prefix}time`) {
  //${prefix}time
  let asd;
  message.delete()
  asd=await message.channel.send({embed:{title:Date(Date.now()).slice(0,24)}})
  asd.react('💡')
  asd.pin()
  interval = setInterval(()=>{
    asd.edit({embed:{title:Date(Date.now()).slice(0,24)}})
  },3000)
  all.push(asd.id,interval)
  intc = intc+1
  return;
} else if(message.content.toLowerCase()===`${prefix}count`) {
  //${prefix}count
  message.delete()
    //count.forEach(()=> {
    //console.log(test)  
    //})
  if(intc === 0){message.reply('no intervals running rn')
    .then(mes =>{mes.delete({timeout:[3000]})})
    return;}
  if(intc<=-1){
    message.reply(`reset the timer from ${intc} to 0`)
    .then(mes =>{mes.delete({timeout:[3000]})})
    .catch(err=>{console.log(err)})
     intc =0 
    return;}
  message.channel.send(`interval counts : ${intc}`)
  .then(msg=>{msg.delete({timeout:[3000]})})

} else if(message.content.toLowerCase()===`${prefix}roll`) {
  //${prefix}roll
  message.delete()
  let dice = Math.floor( Math.random() *6 ) +1
  if(dice){
    if(dice==6){
      message.channel.send(`OMG!! ${message.author.username} 難以置信!!,竟然擲出了6點!`)
      //.then(msg=>{msg.delete({timeout:[5000]})})
    } else if(dice==1){
      message.channel.send(`${message.author.username} 悲慘...擲出1點的你真可憐`)
      //.then(msg=>{msg.delete({timeout:[10000]})})
    } else{
      message.channel.send(`擲了`+ dice +`點`)
      .then(msg=>{msg.delete({timeout:[2000]})})
    }
  }
} else if(message.content.toLowerCase().startsWith(`${prefix}embed`)) {
  message.delete()
  let args = message.content.split(" ");
      args.splice(0,1);
  let temp = args.join(' ')
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag)
  .setDescription(temp)
  .setTimestamp()
  message.channel.send(embed)
  .catch(err=>{console.log(err)})

/*音樂指令目前因為解碼問題無法使用

} else if (message.content===`${prefix}play`) {
    message.delete({ timeout: 1000 });
    execute(message, serverQueue);
    return;
} else if (message.content===`${prefix}p`) {
    message.delete({ timeout: 1000 });
    execute(message, serverQueue);
    return;
} else if (message.content===`${prefix}skip`) {
    message.delete({ timeout: 1000 });
    skip(message, serverQueue);
    return;} else if (message.content===`${prefix}stop`) {
    message.delete({ timeout: 1000 });
    stop(message, serverQueue);
    return;
*/

/*action*/} else if (message.content.startsWith(`${prefix}avatar`)) {
  //${prefix}avatar @tagSomeone
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
  //${prefix}bmi 身高 體重 @tagSomeone
    message.delete();

    let user = message.mentions.users.first();
    const args = message.content.split(" ");
    let height = args[1];
    let weight = args[2];
    let asd = height*height/10000;
    const bmi = (weight/asd);
    const ans = Math.round(bmi*1000)/1000;

    if(!message.mentions.users.first()) {
      message.channel.send(`Your bmi indexs ${ans}`);
    return;}
      else{
    message.channel.send(`${user.username}的bmi值為${ans}`);}

/*action*/} else if (message.content.startsWith(`${prefix}dm`)) {
  //${prefix}dm @tagSomeone YourMessages
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
  //${prefix}test
  message.delete();
  let asd= client.user.username
  message.channel.send(`${asd} is online`)
  .then(msg => {
    msg.delete({ timeout: 3000 });
  })
  
} else if (message.content.startsWith(`${prefix}tts`)){
  //${prefix}tts YourMessages
    message.delete()
    let args = message.content.split(" ");
    args.splice(0,1);
    let dm = args.join(" ")
    say.speak(dm)
    let path = `./tts-files/${message.author.username}-${dm}.wav`
    say.export(dm,'Alex',1,`${path}`)
    setTimeout(()=>{
      message.author.send(`Your tts file`,{files:[`${path}`]})
    },3000)

} else {message.channel.send("You need to enter a valid command!")
  .then(msg => {
    msg.delete({ timeout: 5000 });
  })
}

})

client.on('messageReactionAdd', async(reaction,user)=>{
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();
  if(user.bot) return
  if(!reaction.message.guild) return
    if(reaction.emoji.name===`💡`) {
      let one =all.indexOf(reaction.message.id)
      let fin = one +1
      clearInterval(all[fin])
      reaction.message.channel.messages.fetch(reaction.message.id)
      .then(msg=>{msg.delete()})
      intc = intc-1;
     all.splice(one,2)
    }
    if(reaction.emoji.name===`👉`) {
      helpcount = helpcount+1

      if(helpcount===helpary.length-1) {
        reaction.message.reactions.cache.get(`👉`).remove()
        reaction.message.reactions.cache.get(`👈`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
      .then(msg=>{
        msg.edit(helpary[helpcount])
        msg.react(`👈`)
      })
      }
      else if(helpcount===0) {
        reaction.message.reactions.cache.get(`👉`).remove()
        reaction.message.reactions.cache.get(`👈`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
      .then(msg=>{
        msg.edit(helpary[helpcount-1])
        msg.react(`👉`)})
      } else{
        reaction.message.reactions.cache.get(`👉`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
        .then(msg=>{
          msg.edit(helpary[helpcount])
          msg.react(`👈`)
          msg.react(`👉`)
        })}
  }
    if(reaction.emoji.name==='👈') {

      helpcount = helpcount-1
      if(helpcount===0) {
        reaction.message.reactions.cache.get(`👉`).remove()
        reaction.message.reactions.cache.get(`👈`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
      .then(msg=>{
        msg.edit(helpary[helpcount])
        msg.react(`👉`)
      })
      } else if(helpcount===helpary.length) {
        reaction.message.reactions.cache.get(`👉`).remove()
        reaction.message.reactions.cache.get(`👈`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
      .then(msg=>{
        msg.edit(helpary[helpcount-1])
        msg.react(`👉`)})
      } else{
        if(helpary.length-helpcount>2){
        reaction.message.reactions.cache.get(`👉`).remove()}
        reaction.message.reactions.cache.get(`👈`).remove()
        reaction.message.channel.messages.fetch(reaction.message.id)
        .then(msg=>{
          msg.edit(helpary[helpcount])
          msg.react(`👈`)
          msg.react(`👉`)
        })}
    }
})
/*
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
*/
client.login(token01+token02);
