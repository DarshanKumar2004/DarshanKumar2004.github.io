function applyTheme(dark) {
    const favicon = document.getElementById('favicon');
    const icon = document.getElementById('darkModeID');

    if (dark) {
        document.body.classList.add('dark');
        favicon.setAttribute('href', 'PhotosAndVideos/DarkFavicon.png');
        if (icon) icon.classList.add('fa-toggle-on');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        favicon.setAttribute('href', 'PhotosAndVideos/favicon.png');
        if (icon) icon.classList.remove('fa-toggle-on');
        localStorage.setItem('theme', 'light');
    }
}

function darkMode() {
    applyTheme(!document.body.classList.contains('dark'));
}

function toggleIcon() {}

if (localStorage.getItem('theme') === 'dark') {
    applyTheme(true);
}
