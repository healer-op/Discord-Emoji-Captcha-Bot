var emojis = require('emoji.json')
const token = 'TOKEN' // bad practice, in production use env


// do not edit below if you dont understand what you are doing



const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
const disbut = require('discord-buttons')(client); // yeah fuck the api references
emojis = Object.values(emojis)

function rdm(max) {
    return Math.floor(Math.random() * max);
} // OMG SKID HE SKID OFF STACK OVER LOW..,

client.on('ready', () => {
    client.user.setActivity('z!verify', ({type: "WATCHING"}))
})

let acm = {}
client.on('message', async m => {
    if (!m.guild) return;
    if (m.content == 'z!verify') {
        m.channel.send('💬 **Check Your Dm**').then(m=>m.delete({timeout:"5000"/*Time until delete in milliseconds*/}));
        if (acm[m.author.id]) {
            m.channel.send('❌ You are being rate limited.');
            return;
        }
        let emoji = emojis[parseInt(Math.random() * emojis.length)]
        let bad = emojis[parseInt(Math.random() * emojis.length)]
        if (bad == emoji) {
            bad = emojis[parseInt(Math.random() * emojis.length)]
            if (bad == emoji) {
                bad = emojis[parseInt(Math.random() * emojis.length)]
                if (bad == emoji) {
                    bad = emojis[parseInt(Math.random() * emojis.length)]
                }
                if (bad == emoji) {
                    bad = {
                        'char': 'ok',
                        'name': 'ok'
                    }
                } // yes ik ik fuck u tho - yandere dev 2.0
            }
        }
        let button = new disbut.MessageButton()
            .setStyle('gray') //default: blurple
            .setLabel(emoji['char']) //default: NO_LABEL_PROVIDED
            .setID('v_bot')

        let btn2 = new disbut.MessageButton()
            .setStyle('gray') //default: blurple
            .setLabel(bad['char']) //default: NO_LABEL_PROVIDED
            .setID('v_bot_inv')

        var rdmn = rdm(2)
        if (rdmn == 0) {
            m.author.send('Click the ``' + emoji['name'] + '`` button', {
                buttons: [
                    button, btn2
                ]
            }).catch(() => {
                m.channel.send('❌ Couldnt DM you.')
                return;
            })
            acm[m.author.id] = {
                'message': m,
                'guild': m.guild.id,
            }
        } else {
            m.author.send('Click the ``' + emoji['name'] + '`` button', {
                buttons: [
                    btn2, button
                ]
            }).catch(() => {
                m.channel.send('❌ Couldnt DM you.')
                return;
            })
            acm[m.author.id] = {
                'message': m,
                'guild': m.guild.id,
            }
        }

    }
})
client.on('clickButton', async (button) => {
    if (button.id === 'v_bot') {
        if (acm[button.clicker.user.id.toString()]) {
            var m = acm[button.clicker.user.id.toString()]['message']
            var role = m.guild.roles.cache.find(role => role.name === "• Member");
            await m.member.roles.add(role)
            button.channel.send(`☑️ **Your Are Now Verified**.\n **🔗All Links** \n ⚡**Website : config** \n ⚡**Client : config** \n ⚡**Panel : config**`);
            button.message.delete()

            console.log(acm[button.clicker.user.id.toString()])
            setTimeout(() => {
                acm[button.clicker.user.id.toString()] = null
            }, 30000);
        } else {
            button.channel.send('Invalid verification request, try again.')
        }
    } else {
        if (acm[button.clicker.user.id.toString()]) {

            console.log('failed')
            button.message.delete()
            button.channel.send('Verification Failed - Wait 30 seconds to try again after rejoining.')
            var men = acm[button.clicker.user.id.toString()]['message'].member
            men.kick('Verification Failed - Wait 30 seconds to try again after rejoining.')
            setTimeout(() => {
                acm[button.clicker.user.id.toString()] = null
            }, 30000);
        } else {
            button.channel.send('Invalid verification request, try again.')
        }
    }
});
client.on('ready', () => {
console.log("                           "),
console.log(" _____         _           "),
console.log(" |  |  |___ ___| |___ ___  "),
console.log(" |     | -_| .'| | -_|  _| "),
console.log(" |__|__|___|__,|_|___|_|   "),
console.log("           https://github.com/healer-op ");
console.log(`          ⚡${client.user.tag} is Ready To Work`)
})
client.login(token)
