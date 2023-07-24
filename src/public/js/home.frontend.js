const $appendContactButton = document.querySelector('#appendContactB');
const $aside = document.querySelector('.append-contact');

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
