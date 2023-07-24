const $editContactForm = document.querySelector('#editContactForm');
const $appendName = document.querySelector('#firstname');
const $appendNameLabel = document.querySelector('label[for="firstname"]');
const $appendLastName = document.querySelector('#lastname');
const $appendLastNameLabel = document.querySelector('label[for="lastname"]');
const $phoneNumber = document.querySelector('#phoneNumber');
const $phoneNumberLabel = document.querySelector('label[for="phoneNumber"]');

$editContactForm.addEventListener('submit', ev => {
    if ($appendName.value.length === 0) {
        $appendNameLabel.style.color = '#c53d3d';
        $appendLastNameLabel.style.color = '#a9c1ac';
        $appendName.focus();
        ev.preventDefault();
    } else if ($appendLastName.value.length === 0) {
        $appendLastNameLabel.style.color = '#c53d3d';
        $appendNameLabel.style.color = '#a9c1ac';
        $appendLastName.focus();
        ev.preventDefault();
    } else if ($phoneNumber.value.length > 9) {
        $phoneNumberLabel.style.color = '#c53d3d';
        document.querySelector('#labelp').textContent = 'Phone number (no valido)';
        ev.preventDefault();
    } else {
        $appendNameLabel.style.color = '#a9c1ac';
        $appendLastNameLabel.style.color = '#a9c1ac';
        $phoneNumberLabel.style.color = '#a9c1ac';
        document.querySelector('#labelp').textContent = 'Phone number';
    }
});
