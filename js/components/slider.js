import { state } from "../main.js";

export default function Slide() {
    const goodsOfDay = state.productsData.filter(item => item.goodsOfDay);
    function SlideCard(data) {
        const ul = document.querySelector('.day-products__list');
        const li = document.createElement('li');
        li.classList.add('day-products__item');
        li.classList.add('swiper-slide');

        const card = document.createElement('div');
        card.className = 'product-card product-card--small';

        const visual = document.createElement('div');
        visual.className = 'product-card__visual';

        const img = document.createElement('img');
        img.className = 'product-card__img';
        img.src = data.image;
        img.width = 290;
        img.height = 344;
        img.alt = 'Изображение товара';

        const more = document.createElement('div');
        more.className = 'product-card__more';

        const cartLink = document.createElement('a');
        cartLink.href = '#';
        cartLink.className = 'product-card__link btn btn--icon';
        const cartSpan = document.createElement('span');
        cartSpan.className = 'btn__text';
        cartSpan.textContent = 'В корзину';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('aria-hidden', 'true');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', 'images/sprite.svg#icon-basket');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-basket');
        svg.appendChild(use);
        cartLink.append(cartSpan, svg);

        const detailLink = document.createElement('a');
        detailLink.href = '#';
        detailLink.className = 'product-card__link btn btn--secondary';
        const detailSpan = document.createElement('span');
        detailSpan.className = 'btn__text';
        detailSpan.textContent = 'Подробнее';
        detailLink.appendChild(detailSpan);

        more.append(cartLink, detailLink);
        visual.append(img, more);

        const info = document.createElement('div');
        info.className = 'product-card__info';

        const title = document.createElement('h2');
        title.className = 'product-card__title';
        title.textContent = data.name;

        const oldPrice = document.createElement('span');
        oldPrice.className = 'product-card__old';
        const oldNumber = document.createElement('span');
        oldNumber.className = 'product-card__old-number';
        oldNumber.textContent = data.price.old.toLocaleString('ru-RU');
        const oldAdd = document.createElement('span');
        oldAdd.className = 'product-card__old-add';
        oldAdd.textContent = '₽';
        oldPrice.append(oldNumber, oldAdd);

        const price = document.createElement('span');
        price.className = 'product-card__price';
        const priceNumber = document.createElement('span');
        priceNumber.className = 'product-card__price-number';
        priceNumber.textContent = data.price.new.toLocaleString('ru-RU');
        const priceAdd = document.createElement('span');
        priceAdd.className = 'product-card__price-add';
        priceAdd.textContent = '₽';
        price.append(priceNumber, priceAdd);

        const tooltip = document.createElement('div');
        tooltip.className = 'product-card__tooltip tooltip';

        const tooltipBtn = document.createElement('button');
        tooltipBtn.className = 'tooltip__btn';
        tooltipBtn.setAttribute('aria-label', 'Показать подсказку');
        const tooltipIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tooltipIcon.setAttribute('class', 'tooltip__icon');
        tooltipIcon.setAttribute('width', '5');
        tooltipIcon.setAttribute('height', '10');
        tooltipIcon.setAttribute('aria-hidden', 'true');
        const iconUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        iconUse.setAttribute('href', 'images/sprite.svg#icon-i');
        iconUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-i');
        tooltipIcon.appendChild(iconUse);
        tooltipBtn.appendChild(tooltipIcon);

        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip__content';

        const tipText = document.createElement('span');
        tipText.className = 'tooltip__text';
        tipText.textContent = 'Наличие товара по городам:';

        const list = document.createElement('ul');
        list.className = 'tooltip__list';

        const cities = [
            { name: 'Москва', count: data.availability.moscow },
            { name: 'Оренбург', count: data.availability.orenburg },
            { name: 'Санкт-Петербург', count: data.availability.saintPetersburg }
        ];

        cities.forEach(city => {
            const item = document.createElement('li');
            item.className = 'tooltip__item';
            const text = document.createElement('span');
            text.className = 'tooltip__text';
            const countSpan = document.createElement('span');
            countSpan.className = 'tooltip__count';
            countSpan.textContent = city.count;
            text.innerHTML = `${city.name}: `;
            text.appendChild(countSpan);
            item.appendChild(text);
            list.appendChild(item);
        });

        tooltipContent.append(tipText, list);
        tooltip.append(tooltipBtn, tooltipContent);

        info.append(title, oldPrice, price, tooltip);
        card.append(visual, info);
        li.appendChild(card);

        tippy(tooltipBtn, {
            content: tooltipContent.innerHTML,
            allowHTML: true,
        });

        ul.append(li);
    }

    goodsOfDay.forEach(data => {
        SlideCard(data)
    });
}