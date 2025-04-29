$(document).ready(function () {
    $('.modal').modal();

    const socket = io(); // Connect to socket.io

    // 🔥 Listen for 'new-recipe' event from server
    socket.on('new-recipe', (recipeName) => {
        console.log('New Recipe Added:', recipeName); // ✅ Just print in console
    });

    const getRecipes = () => {
        $.get('/api/recipes', (response) => {
            if (response.statusCode === 200) {
                addCards(response.data);
            }
        });
    };

    const addCards = (recipeList) => {
        $("#card-section").empty();
        recipeList.forEach(recipe => {
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
                            <a href="#" class="read-more" data-recipe="${recipe.fullRecipe}">Recipe Link</a>
                        </div>
                    </div>
                </div>`;
            $("#card-section").append(card);
        });

        $(".read-more").click(function () {
            alert($(this).data("recipe"));
        });
    };

    $("#submitForm").click(() => {
        let newRecipe = {
            name: $("#recipe-name").val(),
            image: $("#image-url").val(),
            description: $("#description").val(),
            fullRecipe: $("#full-recipe").val(),
        };

        $.post('/api/recipes', newRecipe, (response) => {
            if (response.statusCode === 201) {
                getRecipes();
                $("#recipe-name, #image-url, #description, #full-recipe").val("");
                $('.modal').modal('close');
            }
        });
    });

    getRecipes();
});
