const repoNameEl = document.querySelector('#repo-name');
const issueContainerEl = document.querySelector('#issues-container');
const limitWarningEl = document.querySelector('#limit-warning');
const repoNameEl = document.querySelector('#repo-name');
 
const getRepoName = function() {
    //grab repo name frim url query string
    const queryString = document.location.search;
    //splits queryString between the = sing and calls the array at index 1
    const repoName = queryString.split('=')[1];
    //checks if theres a value in repoName then run this code
    if (repoName) {
        //update the text from repoNameEl to repoName text
        repoNameEl.textContent = repoName;
        //call getRepoIssues and transfer the value of repoName
        getRepoIssues(repoName);
    } else {
        //if no repo was given, redirect to the homepage
        document.location.replace('../index.html');
    }
};

const getRepoIssues = function(repo) {
    //format to the github api url
    const apiUrl = 'https://api.github.com/repos' + repo + '/issues/?direction=asc';

    //make a get request to url
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get('Link')) {
                    displayWarning(repo);
                }
            });
        } else {
            //if not successful, redirect to the homepage
            document.location.replace('../index.html');
        }
    });
};

const displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = `This repo has no open issues!`;
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        //create a link element to take users to the issues on github
        const issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        // issueContainerEl.append(issueEl);
    

        //create span to hold issue title
        const titleEl = document.createElement('span');
        titleEl.textContent = issue[i].title;

        //append to container
        issueEl.append(titleEl)

        //creat a type element
        const typeEl = document.createElement('span');

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = '(Pull request)';
        } else {
            typeEl.textContent = '(Issue)';
        }
        
        //append to container
        issueEl.append(typeEl);

        //append to the dom
        issueContainerEl.append(issueEl);
    }
};

const displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = 'To see more than 30 issues, visit ';  

    const linkEl = document.createElement('a');
    linkEl.textContent = `See more Issues on GitHub.com`;
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
    linkEl.setAttribute('target', '_blank');

    //append to warning container
    limitWarningEl.addEventListener(linkEl)
};

getRepoName();

