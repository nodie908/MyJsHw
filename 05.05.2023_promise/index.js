const postUrl = 'https://reqres.in/api/users';
const getUrl = 'https://reqres.in/api/users/';
let id = 175;

document.forms[0].onsubmit = async (ev) => {
    ev.preventDefault();

    let dataUser = {
        first_name: ev.target[0].value,
        last_name: ev.target[1].value,
        email: ev.target[2].value,
        avatar: ev.target[3].value
    };
    console.log(dataUser);

    try {
        const response = await fetch(postUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataUser)
        });
        
        if (response.ok) {
            const user = await response.json();
            id = user.id;
            console.log(user);
            console.log(id);
        } else {
            throw new Error('Ошибка при выполнении запроса POST');
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('#get').onclick = async () => {
    try {
        const response = await fetch(getUrl + id);
        
        if (response.ok) {
            const dataUser = await response.json();
            console.log(dataUser);
            document.getElementById("user-ava").src = dataUser.data.avatar;
            document.getElementById("user-data").textContent = JSON.stringify(dataUser);
        } else {
            throw new Error('Ошибка при выполнении запроса GET');
        }
    } catch (error) {
        console.log(error);
    }
};
