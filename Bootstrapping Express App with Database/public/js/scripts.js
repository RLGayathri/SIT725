$(document).ready(function(){
    $('.modal').modal();

    // Hardcoded recipes
    const hardcodedRecipes = [
        { 
            name: "Spicy Chicken Biryani", 
            image: "images/biryani.jpg", 
            description: "Aromatic basmati rice cooked with tender chicken and flavorful spices.", 
            fullRecipe: "https://youtu.be/-KbvRRrTSbo?si=g6F0_SmmUhVKJGOt"
        },
        { 
            name: "Chilli Garlic Noodles", 
            image: "images/noodles.jpeg", 
            description: "Delicious stir-fried noodles with garlic, butter, and soy sauce.", 
            fullRecipe: "https://youtu.be/aQHr9Zsnzbw?si=11D0Ly79DXLi88nA"
        },
        { 
            name: "Cheesy Pasta", 
            image: "images/pasta.jpg", 
            description: "Creamy, cheesy pasta baked to perfection with a crispy golden top.", 
            fullRecipe: "https://youtu.be/AK0dcuydkiM?si=SkLAc_6fyZCFg-po"
        }
    ];

    const displayRecipes = (recipes) => {
        recipes.forEach(recipe => {
            let card = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${recipe.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${recipe.name}</span>
                            <p>${recipe.description}</p>
                        </div>
                        <div class="card-action">
                            <a href="${recipe.fullRecipe}" target="_blank">Click here for Recipe Link</a>
                        </div>
                    </div>
                </div>`;
            $("#card-section").append(card);
        });
    };

    // Show hardcoded recipes first
    displayRecipes(hardcodedRecipes);

    // Fetch user-added recipes from MongoDB
    const fetchUserRecipes = () => {
        $.get("/recipes", (data) => {
            displayRecipes(data);
        });
    };

    // Fetch user recipes when the page loads
    fetchUserRecipes();

    // Handle form submission
    $("#recipeForm").submit(function(event) {
        event.preventDefault();  // Prevent the form from submitting normally

        // Get the form data
        const newRecipe = {
            name: $("#recipe-name").val(),
            image: $("#image-url").val(),
            description: $("#description").val(),
            fullRecipe: $("#full-recipe").val()
        };

        // Send the new recipe to the server
        fetch("/addRecipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        })
        .then(response => response.json())
        .then(data => {
            // Add the new recipe card to the page
            const card = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${data.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${data.name}</span>
                            <p>${data.description}</p>
                        </div>
                        <div class="card-action">
                            <a href="${data.fullRecipe}" target="_blank">Click here for Recipe Link</a>
                        </div>
                    </div>
                </div>`;
            $("#card-section").append(card);

            // Reset the form
            $("#recipeForm")[0].reset();

            // Close the modal
            $('.modal').modal('close');
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
