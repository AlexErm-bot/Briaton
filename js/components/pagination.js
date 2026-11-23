import createProductCard from "./card.js";

export default function pagination(arr) {
    let count = Math.ceil(arr.length / 6);
    document.querySelector('.catalog__pagination').innerHTML = ""

    if (count > 1) {
        for (let i = 0; i < count; i++) {
            const li = document.createElement('li');
            li.className = "catalog__pagination-item";

            const btn = document.createElement('button');
            btn.className = 'catalog__pagination-link';
            btn.textContent = i + 1;
            btn.dataset.page = i;

            li.append(btn);
            document.querySelector('.catalog__pagination').append(li);
        }

        let btns = document.querySelectorAll('.catalog__pagination-link');
        btns[0].classList.add('catalog__pagination-link--active');
        btns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const page = parseInt(this.dataset.page);
                showPage(page);

                document.querySelectorAll('.catalog__pagination-link').forEach(b => {
                    b.classList.remove('catalog__pagination-link--active');
                });
                this.classList.add('catalog__pagination-link--active');
            });
        });
    }

    function showPage(pageNumber) {
        document.querySelector('.catalog__list').innerHTML = "";

        const start = pageNumber * 6;
        const end = start + 6;
        const pageItems = arr.slice(start, end);

        pageItems.forEach(item => createProductCard(item));
    }

    showPage(0);
}