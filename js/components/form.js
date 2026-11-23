export function formCounts(data) {
    const formList = document.querySelector('.catalog-form__list-col');
    const items = formList.querySelectorAll('.custom-checkbox__field');
    const countsEL = formList.querySelectorAll('.custom-checkbox__count');

    countsEL.forEach((el, i) => {
        if (items[i]) {
            const catId = items[i].id;
            const count = data.filter(item => item.type?.includes(catId)).length;
            el.textContent = count;
        }
    });
}