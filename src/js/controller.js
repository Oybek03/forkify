const recipeContainer = document.querySelector('.recipe');
import * as model from './model.js';
import recipeView from './views/recipeView';
import { loadRecipe, state, searchResults } from './model.js';
import searchView from './views/searchView.js';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// res == data
// data = dataJson

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.loadingSpinner();
    await model.loadRecipe(id);

    const data = state.recipe;

    console.log(data);

    recipeView.render(data);

    // 2) Rendering recipe
  } catch (err) {
    recipeView.renderError();
    throw err;
  }
};
const searchController = async function () {
  try {
    const inputValue = searchView.getQuery();
    await model.searchResults(inputValue);
    // const data = state.search.results;
    const data = model.paginationLogic(3);
    paginationView.render(model.state.search);
    resultsView.render(data);
  } catch (err) {
    throw err;
  }
};

searchView.addHandlerEvent(searchController);
recipeView.addHandlerEvent(showRecipe);

//////////////////////

const paginationConrtoller = async function () {
  try {
    const data = model.paginationLogic();
    resultsView.render(data);
  } catch (err) {
    alert(err);
  }
};

