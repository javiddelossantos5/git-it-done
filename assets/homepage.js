const userFormEl = document.querySelector('#user-form');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');
const languageButtonsEl = document.querySelector('#language-buttons');

const getFeaturedRepos = function(language) {
    const apiUrl = 'https://api.github.com/search/repositories?q=' + language + 'is:featured&sort=help-wanted-issues';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

const formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    const username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);

        //clear old content
        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert(`Please enter a GitHub username`);
    }
};

const getUserRepos = function(user) {
    //format the github api url
    const apiUrl = 'https://api.github.com/users/' + user + '/repos';

    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            //Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert(`Unable to connect to GitHub`);
        });
};


const displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = `No repositories found.`;
        return;
    }
    

    //clear old content
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (let i = 0; i < repos.length; i++) {
        //format repo name  
        const repoName = repos[i].owner.login + '/' + repos[i].name;

        //create a container for each repo
        const repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', '../single-repo.html?repo=' + repoName);

        //create a span element to hold repository name
        const titleEl = document.createElement('span');
        titleEl.textContent = repoName;

         //append to container
         repoEl.append(titleEl);

        //create a status element
        const statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        //check if current repo gas issus or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)'; 
        } else {
            statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>"; 
        }

        //append to container
        repoEl.append(statusEl);

        //append container to the dom
        repoContainerEl.append(repoEl);
    }
};

const buttonClickHandler = function(event) {
    const language = event.target.getAttribute('data-language');
    if (language) {
        getFeaturedRepos(language);

        //clear old content
        repoContainerEl.textContent = '';
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
