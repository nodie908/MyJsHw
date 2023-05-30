export class Discord {
    static authUrl = "https://discord.com/api/oauth2/authorize?client_id=1105800756868689974&redirect_uri=http%3A%2F%2Flocalhost%3A52330%2Fmain.html&response_type=code&scope=identify%20guilds";
    #clientId = "1105800756868689974";
    #clientSecret = "bW6DTu-6FF8Cd9s7pqvbNKLuamKqvtz-";
    #apiUrl = 'https://discord.com/api/v10';
    #token = null;
    #user = null;


    async getToken(userCode, origin) {
        const url = this.#apiUrl + '/oauth2/token';
        let data = new URLSearchParams();
        data.append('client_id', this.#clientId);
        data.append('client_secret', this.#clientSecret);
        data.append('grant_type', 'authorization_code');
        data.append('code', userCode);
        data.append('redirect_uri', origin);

        let response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        });

        let token = await response.json();
        if (token.access_token) {
            this.#token = token;
            console.log(token);
            return true;
        }
        return false;
    }

    async getUser() {
        const url = this.#apiUrl + '/users/@me';
        let response = await fetch(url, {
            headers: { 'Authorization': this.#token.token_type + ' ' + this.#token.access_token }
        });

        let user = await response.json();
        if (user.id) {
            this.#user = user;
        }
        return this.#user;
    }

    async getUserGuilds() {
        const url = this.#apiUrl + '/users/@me/guilds';
        let response = await fetch(url, {
            headers: { 'Authorization': this.#token.token_type + ' ' + this.#token.access_token }
        });

        let guilds = await response.json();
        if (this.#user) this.#user.guilds = guilds;
        console.log(guilds);
        return guilds;
    }

    async getGuildChannels(id) {
        const url = this.#apiUrl + `/guilds/${id}/channels`;
        let response = await fetch(url, {
            headers: { 'Authorization': this.#token.token_type + ' ' + this.#token.access_token }
        });

        let channels = await response.json();
        return channels;
    }

    async getGuildMembers(id) {
        const url = this.#apiUrl + `/guilds/${id}/members`;
        let response = await fetch(url, {
            headers: { 'Authorization': this.#token.token_type + ' ' + this.#token.access_token }
        });

        let members = await response.json();
        return members;

    }


}
