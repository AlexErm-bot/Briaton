import { state } from "../main.js";
import pagination from "./pagination.js";

export default function sort() {
    const list = document.querySelector('.catalog__list');
    const select = document.querySelector('.catalog__sort-select');
    select.addEventListener('change', function () {
        list.innerHTML = '';
        sort()
    });

    if (select.value == 'price-min') {
        for (let j = 0; j < state.filteredData.length - 1; j++) {
            for (let i = 0; i < state.filteredData.length - 1; i++) {
                if (state.filteredData[i].price.new > state.filteredData[i + 1].price.new) {
                    let temp = state.filteredData[i]
                    state.filteredData[i] = state.filteredData[i + 1]
                    state.filteredData[i + 1] = temp
                }
            }
        }
    } else if (select.value == 'price-max') {
        for (let j = 0; j < state.filteredData.length - 1; j++) {
            for (let i = 0; i < state.filteredData.length - 1; i++) {
                if (state.filteredData[i].price.new < state.filteredData[i + 1].price.new) {
                    let temp = state.filteredData[i]
                    state.filteredData[i] = state.filteredData[i + 1]
                    state.filteredData[i + 1] = temp
                }
            }
        }
    } else if (select.value == 'rating-max') {
        for (let j = 0; j < state.filteredData.length - 1; j++) {
            for (let i = 0; i < state.filteredData.length - 1; i++) {
                if (state.filteredData[i].rating < state.filteredData[i + 1].rating) {
                    let temp = state.filteredData[i]
                    state.filteredData[i] = state.filteredData[i + 1]
                    state.filteredData[i + 1] = temp
                }
            }
        }
    }
    pagination(state.filteredData)
}