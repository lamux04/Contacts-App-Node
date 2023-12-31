const $appendContactButton = document.querySelector('#appendContactB');
const $aside = document.querySelector('.append-contact');
const $appendContactForm = document.querySelector('#appendContactForm');
const $appendName = document.querySelector('#firstname');
const $appendNameLabel = document.querySelector('label[for="firstname"]');
const $appendLastName = document.querySelector('#lastname');
const $appendLastNameLabel = document.querySelector('label[for="lastname"]');
const $phoneNumber = document.querySelector('#phoneNumber');
const $phoneNumberLabel = document.querySelector('label[for="phoneNumber"]');

let contactDisable = true;

async function openContact () {
    return new Promise((resolve, reject) => {
        const keyframe = [
            { transform: 'translateX(-400px)' },
            { transform: 'translateX(0)' }
        ];
        $aside.animate(keyframe, 300);
        setTimeout(resolve, 300);
    });
}

async function closeContact () {
    return new Promise((resolve, reject) => {
        const keyframe = [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-400px)' }
        ];
        $aside.animate(keyframe, 300);
        setTimeout(resolve, 300);
    });
}

$appendContactButton.addEventListener('click', async ev => {
    if (contactDisable) {
        $aside.style.display = 'inherit';
        contactDisable = false;
        await openContact();
    } else {
        contactDisable = true;
        await closeContact();
        $aside.style.display = 'none';
    }
});

$appendContactForm.addEventListener('submit', ev => {
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
