export class Cdn {
    #baseUrl = 'https://cdn.discordapp.com';

    getAvatar(id, filename) {
        return `${this.#baseUrl}/avatars/${id}/${filename}.png`;
    }

    getGuildIcon(id, filename) {
        return `${this.#baseUrl}/icons/${id}/${filename}.png`;
    }

}
