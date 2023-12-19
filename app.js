// Getting references to HTML elements
const input = document.getElementById('placeholder-text');
const randomMeal = document.getElementById('random-box'); 
const Meal = document.getElementById('meal');
const searchbtn = document.getElementById('search');
const categories = document.getElementsByClassName('category');

// Function to fetch and display a random meal
async function getRandomMeal() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await response.json();
        const meal = data.meals[0];

        // Displaying random meal details 
        randomMeal.innerHTML = `
           
            <img src="${meal.strMealThumb}" id="image" width="150vw" />
            <h3 class="name">${meal.strMeal}</h3>   
        `;
    } catch (error) {
        console.error("Error in fetching random meal data:", error);
    }
}

// Function to fetch and display meals based on user input
function getMeals() {
    const name = input.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((data) => data.json())
        .then((data) => displayMeals(data));
}

// Function to display meals
function displayMeals(data) {
    const meals = data.meals;

    // Clearing previous search results
    Meal.innerHTML = '';

    meals.forEach((el) => {
        // Creating a new tile for each meal
        let newTile = document.createElement('div');
        newTile.setAttribute('class', 'tile');

        // Creating an image element for the meal 
        let img = document.createElement('img');
        img.setAttribute('src', el.strMealThumb);
        img.setAttribute('width', '150vw');
        img.setAttribute('id', 'image1');

        // Creating a name element for the meal
        let name = document.createElement('h3');
        name.textContent = el.strMeal;

        // Appending image and name elements to the tile
        newTile.append(img, name);

        // Appending the tile to the designated HTML element
        Meal.append(newTile);
    });

    // Displaying category information for the first meal
    if (meals.length > 0) {
        categories[0].textContent = meals[0].strCategory;
    }

    console.log(data);
}

// Event listener for the Enter key to perform search function
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getMeals();
    }
});

// Initializing the page by fetching and displaying a random meal on reloading the webpage
window.onload = async function () {
    await getRandomMeal();
};
