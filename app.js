// Getting references to HTML elements
const input = document.getElementById('placeholder-text');
const randomMeal = document.getElementsByClassName('random-box');
const Meal = document.getElementById('meal');
const searchbtn = document.getElementById('search');
const category = document.getElementsByClassName('category');

// Function to fetch and display a random meal
async function getRandomMeal() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await response.json();
        const meal = data.meals[0];
        console.log(meal);

        // Displaying random meal details in the designated HTML element
        const mealdetails = document.getElementById("random-box");
        mealdetails.innerHTML = `
        <h4 class="category">${meal.strCategory}</h4>
        <img src="${meal.strMealThumb}" id="image"  width=150vw />
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

// Function to display meals in the designated HTML element
function displayMeals(data) {
    const meals = data.meals;

    // Clearing previous search results
    Meal.innerHTML = '';

    meals.forEach((el) => {
        // Displaying category information for each meal
        category.textContent = el.strCategory;
        
        // Creating a new tile for each meal
        let newTile = document.createElement('div');
        newTile.setAttribute('class', 'tile');
        
        // Creating an image element for the meal 
        let img = document.createElement('img');
        img.setAttribute('src', el.strMealThumb);
        img.setAttribute('width', '150vw');
        img.setAttribute('id','image1');

        // Creating a name element for the meal
        let name = document.createElement('h3');
        name.textContent = el.strMeal;

        // Appending image and name elements to the tile
        newTile.append(img, name);

        // Appending the tile to the designated HTML element
        Meal.append(newTile);
    });
    console.log(data);
}

// Event listener for the Enter key to trigger the search
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
