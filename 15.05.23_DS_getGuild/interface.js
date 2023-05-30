import { Cdn } from "./cdn.js";
export class Interface {
    #cdn = null;
    #discord = null;
    constructor() {
        this.#cdn = new Cdn();
    }

    showLogin(loginUrl) {
        let link = document.querySelector('#login a');
        link.href = loginUrl;
        let area = link.parentElement;
        area.style.display = 'block';
    }

    showMain(user) {
        let main = document.querySelector('#main');
        main.style.display = 'block';

        const avatarUrl = this.#cdn.getAvatar(user.id, user.avatar);
        let avatar = document.querySelector('.user-info > img');
        avatar.setAttribute('src', avatarUrl);

        let userName = document.querySelector('.username');
        userName.textContent = user.username;

        let userId = document.querySelector('.user-id');
        userId.textContent = user.id;
    }


    showGuilds(guilds) {

        let guildsBox = document.querySelector('.guild-list');
        for (let x of guilds) {

            let guildLi = document.createElement('li');
            guildLi.classList.add('guild-img');

            let guildImg = document.createElement('img');
            guildImg.src = this.#cdn.getGuildIcon(x.id, x.icon);
            guildImg.onclick = (ev) => {
                this.showGuildChannels(x.id);
            }

            let guildName = document.createElement('div');
            guildName.classList.add('guild-name');
            guildName.textContent = x.name;

            guildLi.append(guildImg);
            guildLi.append(guildName);

            guildsBox.append(guildLi);
        }

    }

    setDiscord(discordInstance) {
        this.#discord = discordInstance;
    }

    showGuildChannels(guildId) {
        this.#discord.getGuildMembers(guildId)
            .then(console.log);
    }


}
