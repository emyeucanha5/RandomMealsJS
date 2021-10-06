const btn = document.querySelector('.button-primary');
const meals = document.querySelector('#meal');
btn.addEventListener('click', show);

window.addEventListener("DOMContentLoaded", ()=>{
	setupLS();
});

function show(e){
	localStorage.clear();
	async function getAPI(){
		let x = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
		let y = await x.json();
		await display(y.meals[0]);
		}
	getAPI();
}

function display(meal){
		localStorage.setItem("item", JSON.stringify(meal));
		let ingreds = [];
		for(let i = 1;i <= 20;i++){
			if(meal[`strIngredient${i}`]){
				ingreds.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
			}else{
				break;
			}
		}
		ingreds = ingreds.map((ingred) => {
			return `<li>${ingred}</li>`
		}).join('');
		const newInnerHTML = ` 
			<div class="row">
				<div class="columns five">
					<img src="${meal.strMealThumb}" alt="Meal Image">
					${meal.strCategory?`<p><strong>Category:</strong> ${meal.strCategory}</p>`:``}
					${meal.strArea?`<p><strong>Area:</strong> ${meal.strArea}</p>`:``}
					${meal.strTags?`<p><strong>Tags:</strong> ${meal.strTags}</p>`:``}
					<h5>Ingredients:</h5>
					<ul>
						${ingreds}
					</ul>	
				</div>
				<div class="columns seven">
					<h4>${meal.strMeal}</h4>
					<p>${meal.strInstructions}</p>
				</div>
			</div>
			${meal.strYoutube ? `<div class="row">
				<h5>Video Recipe</h5>
				<div class="videoWrapper">
					<iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
				</div>
			</div>`: ``}
			
		`;
		meals.innerHTML = newInnerHTML;
}

function getLS(){
	return localStorage.getItem("item") ? JSON.parse(localStorage.getItem("item")) : ``;
}
function setupLS(){
	const meal = getLS();
	if(meal){
		//do not thing
	}else{
		display(meal);	
	}
	
}
