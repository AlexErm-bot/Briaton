let basketCount = 0;
const basketCountEl = document.querySelector('.header__user-count');
const basketEl = document.querySelector('.basket');

export function bascetCountPl() {
    basketCount = ++basketCount
    basketCountEl.textContent = basketCount
    CountControle()
}
export function bascetCountMin() {
    basketCount = basketCount - 1
    basketCountEl.textContent = basketCount
    CountControle()
}
export function basket() {
    CountControle()
    const basket = document.querySelector('.header__user-btn')
    basket.addEventListener('click', function (e) {
        e.stopPropagation();
        basketEl.classList.toggle('basket--active')
    });
}

function CountControle() {
    if (basketCount === 0) {
        const a = document.querySelector('.basket__link');
        const div = document.createElement('div')
        div.classList.add('basket__empty-block')
        div.textContent = 'Корзина пока пуста'
        basketEl.append(div)
        if (a) {
            a.remove()
        }
    } else {
        const a = document.createElement('a')
        const lastA = document.querySelector('.basket__link')
        const div = document.querySelector('.basket__empty-block')

        if (div) {
            div.remove()
        } else if (lastA) {
            return
        }

        a.classList.add('basket__link')
        a.classList.add('btn')
        a.setAttribute('href', '#')
        a.textContent = 'Перейти к оформлению'
        basketEl.append(a)
    }
}