function loadAssets(fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const head = document.head;
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            doc.head.childNodes.forEach(node => {
                head.appendChild(node);
            });
        })
        .catch(error => console.error('Error loading CDNs:', error));
}

function loadContent(elementId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}