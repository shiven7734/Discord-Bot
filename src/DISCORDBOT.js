require('dotenv').config();

// console.log(process.env.DISCORD_BOT_JS);

const discord=require('discord.js');

const fetch=require("node-fetch");
const {Client}=require('discord.js');
const pre="%";


const words=["sad","unhappy","not good","depress","cry"];
const en=["Dont Give up Man!","Stay There","Bright Days Ahead"];


const c = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

function inspire(){
    return fetch("https://zenquotes.io/api/random")
    .then(res=>{
        return res.json();
    })
    .then(r=>{
        return r[0]["q"] + " -"+r[0]["a"];
    })
}

function updatem(enm){
    en.push([enm]);

}
c.on('ready',()=>{
    console.log('Bot logged in')


});

c.on('message',async(m)=>{
    if(m.author.bot) return;
    console.log(`[${m.author.tag}]: ${m.content}`);
    if(m.content==='hello'){
       m.channel.send("Hello from bot")
    }
    if(m.content==='$inspire'){
        inspire().then(md=>m.channel.send(md));
    }
    if(m.content.startsWith('$add')){
        enm=m.content.split("$add")[1]
        updatem(enm);
        m.channel.send("New Message added");
        
    }
    // if(m.content.startsWith('gif')){
    //     let res= m.content.split[1].join(" ");
    // }
    if(words.some(word=>m.content.includes(word))){
        const g=en[Math.floor(Math.random()*en.length)]
        m.reply(g);
    }
    if(m.content.startsWith('gif')){
        let res= m.content.split(" ");
        if(res.length>1){
            res1=res.slice(1,res.length).join("");
        }
        let site=`https://g.tenor.com/v1/search?q=${res1}&key=QTGNLUPAC1PS&ContentFilter=H`
        let result= await fetch(site);
        let json= await result.json();
        // console.log(json);
        let fine=Math.floor(Math.random()*json.results.length);
        m.channel.send(json.results[fine].url);




    }
    if(m.content.startsWith(pre)){
        const [CMD_NAME,...args]= m.content.trim().substring(pre.length).split(" ");
        if(CMD_NAME==='kick'){
            if(!m.member.permissions.has('KICK_MEMBERS')){
               return m.reply("You dont have the permission to Kick ")
            }
            if(args.length===0){
                return m.reply('Provide the UserId')
            }
          const part= m.guild.members.cache.get(args[0])
          if(part){
              part.kick().then((part)=>{
                  m.channel.send(`${part} was kicked from the server`);

              })
              .catch((err)=>{
                  m.channel.send("Dont have the permission to kick");

              })
          }
          else{
              m.channel.send('Not Found');
          }
        }
        else if(CMD_NAME==='ban'){
            if(!m.part.permissions.has('BAN_MEMBERS')){
               return m.reply("You dont have the permission to Kick ")
            }
            if(args.length===0){
                return m.reply('Provide the UserId')
            }
        
            try{
                 const user=await m.guild.part.ban(args[0]);
                 m.channel.send('User was banned successfully');

            }catch(err){
                console.log(err);
                m.channel.send('An error occured. Either I do not have permissions or the user was not found');


            }

        }

    }
})
// c.on('messageReactionAdd',(reaction,user)=>{
//     const n= reaction.emoji;
//     if(reaction.message.id==='https://discord.com/channels/931940943320477726/931940943320477729/931980551882166343'){

//     switch(n){
//         case 
//     }

//     }
// })

// c.on('messageReactionAdd', (reaction, user) => {
//     const { name } = reaction.emoji;
//     const member = reaction.message.guild.members.cache.get(user.id);
//     if (reaction.message.id === '738666523408990258') {
//       switch (name) {
//         case '🍎':
//           member.roles.add('738664659103776818');
//           break;
//         case '🍌':
//           member.roles.add('738664632838782998');
//           break;
//         case '🍇':
//           member.roles.add('738664618511171634');
//           break;
//         case '🍑':
//           member.roles.add('738664590178779167');
//           break;
//       }
//     }
//   });
  
//   c.on('messageReactionRemove', (reaction, user) => {
//     const { name } = reaction.emoji;
//     const member = reaction.message.guild.members.cache.get(user.id);
//     if (reaction.message.id === '738666523408990258') {
//       switch (name) {
//         case '🍎':
//           member.roles.remove('738664659103776818');
//           break;
//         case '🍌':
//           member.roles.remove('738664632838782998');
//           break;
//         case '🍇':
//           member.roles.remove('738664618511171634');
//           break;
//         case '🍑':
//           member.roles.remove('738664590178779167');
//           break;
//       }
//     }
//   });



c.login("OTMxOTM5OTUyNTc5NzE1MTAz.YeLutw.O2My1UbvDYmBZT2faX51e5xxlRM")
