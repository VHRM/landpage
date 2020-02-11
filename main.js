(function(){
    const profile = document.getElementById("profile");
    const repository = document.getElementById("repos");
    const url = "https://api.github.com/users/vhrm";
    
    const client_id = "Iv1.75ff3fb1244fd30b";
    const client_secret = "f92b8af6cef8e5a861f3a2d8a24e88ae3f1878ae";

    async function getUser(){
        const profileReceived = await fetch(`${url}?client_id=${client_id}&client_secret=${client_secret}`);
        const reposReceived = await fetch(`${url}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=4&sort=created:asc`);

        const profile = await profileReceived.json();
        const repos = await reposReceived.json();



        return {profile, repos};
    }

    function showProfile(user){
        profile.innerHTML = `<div class="row">
        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" src="${user.avatar_url}">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                    <li class="list-group-item">Seguindo: <span class="badge badge-primary">${user.following}</span></li>
                    <li class="list-group-item">Seguidores: <span class="badge badge-info">${user.followers}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank" c lass="btn btn-warning btn-block ">Ver no GitHub</a>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div id="repos"></div>
        </div>
    </div>`;
    }

    function showRepos(repos){
        let output = '';

        repos.forEach(repo => {
            output += `<div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6"><a href="${repo.html_url}" target="_blank"</a>${repo.name}</div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-success">Watch: ${repo.watchers_count}</span>
                        <span class="badge badge-warning">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>`
        });

        repository.innerHTML = output;
    }

    getUser().then(res => {
        showProfile(res.profile);
        showRepos(res.repos);
        
    });
    
})();