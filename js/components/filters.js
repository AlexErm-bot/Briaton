import { state } from "../main.js";
import pagination from "./pagination.js";

export default function filter() {

    let filtered = state.productsData
    const formList = document.querySelector('.catalog-form');
    const checkBoxes = formList.querySelectorAll('.custom-checkbox');
    const radioButtons = formList.querySelectorAll('.custom-radio');

    function getActiveFilters() {
        const checkedItems = document.querySelectorAll('.custom-checkbox__field:checked');
        const activeCategories = Array.from(checkedItems).map(item => item.id);

        const inStock = document.querySelector('#instock:checked');

        const cityElement = document.querySelector('.location__city-name');
        const cityRu = cityElement.textContent;
        let cityKey;
        if (cityRu === 'Оренбург') {
            cityKey = "orenburg";
        } else if (cityRu === 'Москва') {
            cityKey = "moscow";
        } else {
            cityKey = "saintPetersburg";
        }
        return { activeCategories, inStock, cityKey };

    }

    function filterProducts() {
        const { activeCategories, inStock, cityKey } = getActiveFilters();

        if (activeCategories.length > 0) {
            filtered = filtered.filter(item => {
                return activeCategories.some(category =>
                    item.type?.includes(category)
                );
            });
        }

        if (inStock) {
            filtered = filtered.filter(item =>
                item.availability && item.availability[cityKey] > 0
            );
        }

        state.filteredData = filtered
        pagination(state.filteredData)
    }
    document.querySelector('.catalog-form__reset').addEventListener('click', function () {
        pagination(state.productsData)
    });

    checkBoxes.forEach(checkbox => {
        const input = checkbox.querySelector('.custom-checkbox__field');
        if (input) {
            input.addEventListener('change', filter);
        }
    });

    radioButtons.forEach(radio => {
        const input = radio.querySelector('.custom-radio__field');
        if (input) {
            input.addEventListener('change', filter);
        }
    });
    getActiveFilters()
    filterProducts()
}
