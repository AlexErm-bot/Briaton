import filter from "./filters.js";
import sort from "./sort.js";

export function menuActive() {
    const btn = document.querySelector('.header__catalog-btn');
    const menu = document.querySelector('.header__catalog');
    btn.addEventListener('click', () => {
        menu.classList.remove('main-menu')
        menu.classList.add('main-menu--active')
    });
    const close = document.querySelector('.main-menu__close');
    close.addEventListener('click', function () {
        menu.classList.add('main-menu')
        menu.classList.remove('main-menu--active')
    });
};

export function city() {
    const btn = document.querySelector('.location__city');
    const wrap = document.querySelector('.header__location');
    wrap.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('location__city--active')
    });
    if ('location__city--active') {
        document.addEventListener('click', () => {
            if (btn.classList.contains('location__city--active')) {
                btn.classList.toggle('location__city--active')
            }
        });
    }

    const citys = document.querySelectorAll('.location__subitem');
    const mainCity = document.querySelector('.location__city-name');

    citys.forEach(e => {
        e.addEventListener('click', function (i) {
            i.stopPropagation();
            mainCity.textContent = e.lastElementChild.textContent;
            btn.classList.toggle('location__city--active');
            filter()
            sort()
        });
    });
}