$(document).ready(function(){
    $('.modal').modal();

    // Updated recipe list
    const recipes = [
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
                            <a href="#" class="read-more" data-recipe="${recipe.fullRecipe}">Click here for Recipe Link</a>
                        </div>
                    </div>
                </div>`;
            $("#card-section").append(card);
        });

        $(".read-more").click(function() {
            alert($(this).data("recipe"));
        });
    };

    $("#submitForm").click(() => {
        let newRecipe = {
            name: $("#recipe-name").val(),
            image: $("#image-url").val(),
            description: $("#description").val(),
            fullRecipe: $("#full-recipe").val()
        };
        recipes.push(newRecipe);
        addCards(recipes);
        $("#recipe-name, #image-url, #description, #full-recipe").val("");
        $('.modal').modal('close');
    });

    addCards(recipes);
});
