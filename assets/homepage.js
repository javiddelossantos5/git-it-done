var getUserRepos = function() {
    var response = fetch('https://api.github.com/users/octocat/repos').then(function (response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

getUserRepos();