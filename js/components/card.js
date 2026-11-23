import { bascetCountPl, bascetCountMin } from "./bascet.js";
export default function createProductCard(data) {
    const li = document.createElement('li');
    li.className = 'catalog__item';

    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const visual = document.createElement('div');
    visual.className = 'product-card__visual';

    const img = document.createElement('img');
    img.className = 'product-card__img';
    img.src = data.image;
    img.alt = data.name;
    img.height = 436;
    img.width = 290;

    const more = document.createElement('div');
    more.className = 'product-card__more';

    const linkBasket = document.createElement('a');
    linkBasket.href = '#';
    linkBasket.className = 'product-card__link btn btn--icon';
    const spanBasket = document.createElement('span');
    spanBasket.className = 'btn__text';
    spanBasket.textContent = 'В корзину';
    const svgBasket = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgBasket.setAttribute('width', '24');
    svgBasket.setAttribute('height', '24');
    svgBasket.setAttribute('aria-hidden', 'true');
    const useBasket = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useBasket.setAttribute('href', 'images/sprite.svg#icon-basket');
    useBasket.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-basket');
    svgBasket.appendChild(useBasket);
    linkBasket.appendChild(spanBasket);
    linkBasket.appendChild(svgBasket);

    const linkDetail = document.createElement('a');
    linkDetail.href = '#';
    linkDetail.className = 'product-card__link btn btn--secondary';
    const spanDetail = document.createElement('span');
    spanDetail.className = 'btn__text';
    spanDetail.textContent = 'Подробнее';
    linkDetail.appendChild(spanDetail);

    more.appendChild(linkBasket);
    more.appendChild(linkDetail);

    visual.appendChild(img);
    visual.appendChild(more);

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
    oldPrice.appendChild(oldNumber);
    oldPrice.appendChild(oldAdd);
    info.appendChild(oldPrice);

    const newPrice = document.createElement('span');
    newPrice.className = 'product-card__price';
    const priceNumber = document.createElement('span');
    priceNumber.className = 'product-card__price-number';
    priceNumber.textContent = data.price.new.toLocaleString('ru-RU');
    const priceAdd = document.createElement('span');
    priceAdd.className = 'product-card__price-add';
    priceAdd.textContent = '₽';
    newPrice.appendChild(priceNumber);
    newPrice.appendChild(priceAdd);
    info.appendChild(newPrice);

    const tooltip = document.createElement('div');
    tooltip.className = 'product-card__tooltip tooltip';

    const tooltipBtn = document.createElement('button');
    tooltipBtn.className = 'tooltip__btn';
    tooltipBtn.setAttribute('aria-label', 'Показать подсказку');
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('class', 'tooltip__icon');
    svgIcon.setAttribute('width', '5');
    svgIcon.setAttribute('height', '10');
    svgIcon.setAttribute('aria-hidden', 'true');
    const useIcon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useIcon.setAttribute('href', 'images/sprite.svg#icon-i');
    useIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-i');
    svgIcon.appendChild(useIcon);
    tooltipBtn.appendChild(svgIcon);

    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip__content';

    const tipText = document.createElement('span');
    tipText.className = 'tooltip__text';
    tipText.textContent = 'Наличие товара по городам:';

    const tipList = document.createElement('ul');
    tipList.className = 'tooltip__list';

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
        tipList.appendChild(item);
    });

    tooltipContent.appendChild(tipText, tipList);

    tooltip.appendChild(tooltipBtn, tooltipContent);

    info.appendChild(title, oldPrice, newPrice, tooltip);

    productCard.append(visual, info);


    li.appendChild(productCard);
    document.querySelector('.catalog__list').appendChild(li);

    tippy(tooltipBtn, {
        content: tooltipContent.innerHTML,
        allowHTML: true,
    });


    linkBasket.addEventListener('click', function () {
        const li = document.createElement('li');
        li.className = 'basket__item';

        const divImg = document.createElement('div');
        divImg.className = 'basket__img';

        const img = document.createElement('img');
        img.src = data.image;
        img.alt = 'Фотография товара';
        img.height = 60;
        img.width = 60;

        divImg.appendChild(img);

        const spanName = document.createElement('span');
        spanName.className = 'basket__name';
        spanName.textContent = data.name;

        const spanPrice = document.createElement('span');
        spanPrice.className = 'basket__price';
        spanPrice.textContent = data.price.new + ' руб';

        const button = document.createElement('button');
        button.className = 'basket__close';
        button.type = 'button';
        button.addEventListener('click', function () {
            li.remove()
            bascetCountMin()
        });

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'main-menu__icon');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('aria-hidden', 'true');

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-close');

        svg.appendChild(use);
        button.appendChild(svg);

        li.appendChild(divImg);
        li.appendChild(spanName);
        li.appendChild(spanPrice);
        li.appendChild(button);
        document.querySelector('.basket__list').append(li)
        bascetCountPl()
    });
}