const Discord = require('discord.js');
const tokens = [
    "ODA1MTc0OTk3NzI2OTIwNzg1.YBXDpg.wfqMtHtdDDsQadz9n4bZAJxB_Ko",
    "ODA1MTc0OTk3NzI2OTIwNzg1.YBXDpg.wfqMtHtdDDsQadz9n4bZAJxB_Ko",
    "ODA1MTc0OTk3NzI2OTIwNzg1.YBXDpg.wfqMtHtdDDsQadz9n4bZAJxB_Ko"
];
const chnls = [
    "810206005982920735",
    "810206005982920735",
    "810206005982920735"
];
const selamlı = [];
for (let index = 0; index < 5; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("795416819019415614").rawPosition)) {//ROLID
                //console.log(selamlı);
                ses = await concon.play('./tekrardan.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("810553634600648714").rawPosition)) { //ROLID
                ses = await concon.play('./hosgeldin.mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('810553630490099712').rawPosition) {//ROLID
                ses = await concon.play('./yetkili.mp3');
                selamlı.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('guildMemberUpdate', async (prev, cur) => {
        if (concon.channel.members.some(biri => biri.user.id === cur.user.id)) {
            if ((prev.roles.highest.rawPosition < cur.roles.highest.rawPosition)) {
                ses = await concon.play('./elveda.mp3');
            }
        } else return;
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}
