export default function setupFormHandler() {
    const form = document.querySelector('.questions__form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isValid = validation.isValid;
        if (!isValid) {
            return
        }
        let formData = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            agree: document.querySelector('#agree').value,
        }
        await sendFormData(formData);
    });
}

async function sendFormData(formData, url = 'https://httpbin.org/post') {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Ошибка сервера');
            createSuccessModal(err);
        }
        createSuccessModal(ok);
        document.querySelector('.questions__form').reset();
    } catch (error) {
        console.error('Ошибка');
    }
}

let ok = {
    link: 'images/sprite.svg#icon-POSTok',
    title: 'Благодарим за обращение!',
    text: 'Мы получили вашу заявку и свяжемся с вами в ближайшее время',
}

let err = {
    link: 'images/sprite.svg#icon-POSTerr',
    title: 'Не удалось отправить обращение',
    text: 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.',
}

function createSuccessModal(result) {
    const modal = document.createElement('div');
    modal.className = 'questions__ok';

    const wrap = document.createElement('div');
    wrap.className = 'questions__ok-wrap';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'questions__ok-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    closeBtn.addEventListener('click', function () {
        modal.remove()
    });

    const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSvg.setAttribute('width', '24');
    closeSvg.setAttribute('height', '24');
    closeSvg.setAttribute('aria-hidden', 'true');

    const closeUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    closeUse.setAttribute('href', 'images/sprite.svg#icon-close');
    closeUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-close');
    closeSvg.appendChild(closeUse);
    closeBtn.appendChild(closeSvg);

    const mainSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mainSvg.setAttribute('class', 'questions__ok-svg');
    mainSvg.setAttribute('width', '44');
    mainSvg.setAttribute('height', '44');
    mainSvg.setAttribute('aria-hidden', 'true');

    const mainUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    mainUse.setAttribute('href', result.link);
    mainUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', result.link);
    mainSvg.appendChild(mainUse);

    const title = document.createElement('h3');
    title.className = 'questions__ok-title';
    title.textContent = result.title;

    const text = document.createElement('span');
    text.className = 'questions__ok-text';
    text.textContent = result.text;

    wrap.appendChild(closeBtn);
    wrap.appendChild(mainSvg);
    wrap.appendChild(title);
    wrap.appendChild(text);
    modal.appendChild(wrap);

    document.querySelector('.questions__wrapper').append(modal);
}