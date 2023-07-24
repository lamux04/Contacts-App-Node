const $form = document.querySelector('#form');
const $usernameInput = document.querySelector('#username');
const $usernameLabel = document.querySelector('label[for="username"]');
const $passwordLabel = document.querySelector('label[for="password"]');
const $passwordInput = document.querySelector('#password');

$form.addEventListener('submit', ev => {
    if ($usernameInput.value.length === 0) {
        $usernameLabel.style.color = '#c53d3d';
        $passwordLabel.style.color = '#a9c1ac';
        $usernameInput.focus();
        ev.preventDefault();
    } else if ($passwordInput.value.length === 0) {
        $passwordLabel.style.color = '#c53d3d';
        $usernameLabel.style.color = '#a9c1ac';
        $passwordInput.focus();
        ev.preventDefault();
    } else {
        $usernameInput.style.color = '#a9c1ac';
        $passwordInput.style.color = '#a9c1ac';
    }
});
