function loadAssets(fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const head = document.head;
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            doc.head.childNodes.forEach(node => {
                if (node.nodeName === 'SCRIPT') {
                    const script = document.createElement('script');
                    script.src = node.src;
                    script.integrity = node.integrity || '';
                    script.crossOrigin = node.crossOrigin || '';
                    head.appendChild(script);
                } else if (node.nodeName === 'LINK' && node.rel === 'stylesheet') {
                    const link = document.createElement('link');
                    link.href = node.href;
                    link.rel = 'stylesheet';
                    link.integrity = node.integrity || '';
                    link.crossOrigin = node.crossOrigin || '';
                    head.appendChild(link);
                } else {
                    head.appendChild(node.cloneNode(true));
                }
            });
        })
        .catch(error => console.error('Error loading Assets:', error));
}
loadAssets('_partials-assets.html');

function loadContent(elementId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById('app');
    const parent = mainContent.parentNode;

    const headerContainer = document.createElement('div');
    parent.insertBefore(headerContainer, mainContent);
    headerContainer.id = 'header-container';

    const footerContainer = document.createElement('div');
    parent.appendChild(footerContainer);
    footerContainer.id = 'footer-container';

    loadContent('header-container', '_partials-header.html');
    loadContent('footer-container', '_partials-footer.html');
});


function waitForJQuery() {
    if (window.jQuery) {
        // jQuery is loaded, execute your code
        $(document).ready(function() {
            $('#main-content').click(() => {
                alert('a');
            });
        });
    } else {
        // jQuery is not loaded yet, wait and check again
        setTimeout(waitForJQuery, 50);
    }
}
waitForJQuery();    