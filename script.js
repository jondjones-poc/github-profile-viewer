const USER_API_URL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const getUser = async (username) => {
    try {
        const { data: userData} = await axios(USER_API_URL + username);
        const { data: repoData} = await axios(USER_API_URL + username + '/repos');
        console.log(repoData)
        createUserCard(userData, repoData);
    } catch(e) {
        if (e?.response?.status === 404) {
            createNotFoundCard();
        } else {
            console.log(e);
        }
    }
}

const createUserCard = (user, repoData) => {

    const repoList = repoData.map((item => `<a href="${item.url}" class="repo">${item.name}</a>`)).join('');
    const cardHTML = `
    <div class="card fade-in">
        <div>
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.login.toUpperCase()}</h2>
            <p>
            ${user.bio}
            </p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repositories</strong></li>
            </ul>

            <div class="repos" id="repos">
                ${repoList}
            </div>
        </div>
    </div>`;

    main.innerHTML = cardHTML;
}

const createNotFoundCard = () => {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="https://randomuser.me/api/portraits/women/18.jpg" alt="Profile" class="avatar">
        </div>
        <div class="user-info">
            <h2>Not Found</h2>
            <p>
               Profile not found!
            </p>
        </div>
    </div>`;

    main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if (user) {
        getUser(user)
        search.value = '';
    }
})
