var issueContainerEl = document.querySelector('#issues-container');

var getRepoIssues = function(repo) {
    var apiUrl = 'https://api.github.com/repos' + repo + '/issues/?direction=asc';

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom funtion
                displayIssues(data);
            });
        } else {
            alert(`There was a problem with your request!`);
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = `This repo has no open issues!`;
        return;
    }

    for ( var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issues on github
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        issueContainerEl.append(issueEl);
    }

    //create span to hold issue title
    var titleEl = document.createElement('span');
    titleEl.textContent = issue[i].title;

    //append to container
    issueEl.append(titleEl)

    //check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
        typeEl.textContent = '(Pull request)';
    } else {
        typeEl.textContent = '(Issue)';
    }
    
    //append to container
    issueEl.append(typeEl);
};

getRepoIssues('facebook/react');
