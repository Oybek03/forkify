import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
    page: 1,
    perPage: RES_PER_PAGE,
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(API_URL + id);

    let recipe = data.data.recipe;

    console.log(recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (searchKey) {
  try {
    const data = await getJson(API_URL + `?search=${searchKey}`);
    const getArr = data.data.recipes;

    state.search.results = searchKey;
    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        image: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
    console.log(data);
  } catch (err) {
    throw err;
  }
};

export const paginationLogic = function (page = state.search.page) {
  page = state.search.page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;
  return state.search.results.slice(start, end);
};
