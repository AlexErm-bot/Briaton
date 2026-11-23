import { formCounts } from "./components/form.js";
import { menuActive, city } from "./components/header.js";
import filter from './components/filters.js';
import sort from "./components/sort.js";
import { basket } from "./components/bascet.js";
import accordeon from "./components/accordeon.js";
import Slide from "./components/slider.js";
import setupFormHandler from './components/form-handler.js';

export const state = {
    productsData: [],
    filteredData: [],
};

async function getData() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        return [];
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    state.productsData = await getData()
    state.filteredData = state.productsData
    formCounts(state.productsData)
    menuActive()
    city()
    basket()
    accordeon()
    filter()
    sort()
    Slide()
    setupFormHandler()
});
