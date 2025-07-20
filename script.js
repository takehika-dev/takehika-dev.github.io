document.addEventListener('DOMContentLoaded', () => {
    const repositoriesDiv = document.getElementById('repositories');

    if (repositoriesDiv) {
        fetch('https://api.github.com/users/takehika-dev/repos')
            .then(response => response.json())
            .then(repos => {
                repositoriesDiv.innerHTML = ''; // Clear loading message
                if (repos.length === 0) {
                    repositoriesDiv.innerHTML = '<p>No public repositories</p>';
                    return;
                }
                repos.forEach(repo => {
                    const repoCard = document.createElement('div');
                    repoCard.classList.add('repository-card');
                    repoCard.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>Language: ${repo.language || 'Unknown'}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                    `;
                    repositoriesDiv.appendChild(repoCard);
                });
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
                repositoriesDiv.innerHTML = '<p>Error fetching repositories</p>';
            });
    }
});