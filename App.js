
class Track {                   // tracker where to count calories and other stuff
    constructor() {
            //this value is updating based on adding and removing workout and meals
    this._workouts = JSON.parse(localStorage.getItem('WorkoutsArr')) || [];
    this._meals = JSON.parse(localStorage.getItem('MealsArr')) || [];
    this._totalCalorie = parseInt(localStorage.getItem('totalCals')) || 0;
    this._saveToLS ();
    }
    
    //set calorie limit 
    setCalorieLimit(limit) {
        this._calorieLimit = limit;
        localStorage.setItem('limitInput', limit);
    }
    
    
    //Public functions
    addMeal (meal) {           //function
    this._meals.push(meal); 
    this._totalCalorie += meal.calories;
    this._render();
    this._saveToLS ();
    localStorage.setItem('totalCals', this._totalCalorie);
        }
    
        removeMeal(cardID) {
            // Find the meal with the given cardID
            const mealToRemove = this._meals.find(item => item.id === +cardID);
        
            if (mealToRemove) {
                // Subtract the calories of the meal to be removed from _totalCalorie
                this._totalCalorie -= mealToRemove.calories;
        
                // Remove the meal from _meals array
                this._meals = this._meals.filter(item => item.id !== +cardID);
        
                // Render and save changes
                this._render();
                this._saveToLS();
                localStorage.setItem('totalCals', this._totalCalorie);
            }
        }
        
        removeWorkout(cardID) {
            // Find the workout with the given cardID
            const workoutToRemove = this._workouts.find(item => item.id === +cardID);
        
            if (workoutToRemove) {
                // Add the calories of the workout to be removed to _totalCalorie
                this._totalCalorie += workoutToRemove.calories;
        
                // Remove the workout from _workouts array
                this._workouts = this._workouts.filter(item => item.id !== +cardID);
        
                // Render and save changes
                this._render();
                this._saveToLS();
                localStorage.setItem('totalCals', this._totalCalorie);
            }
        }
        
    
     addWorkout (workout) {         //function
            this._workouts.push(workout);
    this._totalCalorie -= workout.calories;
    this._render();
    
    localStorage.setItem('totalCals', this._totalCalorie);
        }
    
    
    
    //Privet functions
    _addConsumedCals() {
        let consumedCaloriesDom = document.querySelector('#consumed-cals');
            const consumedCalories = this._meals.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);  
            return consumedCaloriesDom.innerHTML = `<h1>${consumedCalories} <h1>`;
        }
    
    _removeConsumedCals(cardID) {
            let consumedCaloriesDom = document.querySelector('#consumed-cals');
        
            // Find index of the object with the given cardID
            const indexToRemove = this._meals.findIndex(item => item.id === +cardID);
        
            if (indexToRemove !== -1) { // Check if object with the given cardID exists
                // Remove object from _meals array
                this._meals.splice(indexToRemove, 1);
            }
        
            // Recalculate consumed calories
            const consumedCalories = this._meals.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);
            //save to LS
            localStorage.setItem('consumedCals', consumedCalories);
            // Update consumed calories display
      
           return consumedCaloriesDom.innerHTML = `<h1>${consumedCalories}</h1>`;
    
        }
        
    
    
    _addBurnedCals() {
        let burnedCaloriesDom = document.querySelector('#burned-cals');
        const burnedCalories = this._workouts.reduce((acc, item) => {
            return acc + item.calories;
        }, 0);
        //add to LS
        localStorage.setItem('burnedCals', burnedCalories);
        return burnedCaloriesDom.innerHTML = `<h1>${burnedCalories} <h1>`;
    }  
    
    _removeBurnedCals(cardID) {
        let consumedCaloriesDom = document.querySelector('#burned-cals');
        
            // Find index of the object with the given cardID
            const indexToRemove = this._workouts.findIndex(item => item.id === +cardID);
        
            if (indexToRemove !== -1) { // Check if object with the given cardID exists
                // Remove object from _meals array
                this._workouts.splice(indexToRemove, 1);
            }
        
            // Recalculate consumed calories
            const consumedCalories = this._workouts.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);
    
            // Update consumed calories display
           return consumedCaloriesDom.innerHTML = `<h1>${consumedCalories}</h1>`;   
    }
    
    _addRemainingCals() {
        let addRemainingCalsDom = document.querySelector('#rem');
        let remainingDomBG = document.querySelector('#bg-remaining');
        let gainDomBG = document.querySelector('#bg-gain-loss');
    
        const final = this._calorieLimit - this._totalCalorie;
    
        if (this._calorieLimit >= this._totalCalorie) {
          
           remainingDomBG.classList.remove('bg-danger');
           gainDomBG.classList.remove('bg-warning');
            remainingDomBG.classList.add('bg-success');
            gainDomBG.classList.add('bg-success');
            localStorage.setItem('RemainingCals', final );
           return  addRemainingCalsDom.innerHTML = final;
          
        }
    
        else if (this._calorieLimit < this._totalCalorie) {
            remainingDomBG.classList.remove('bg-success');
            gainDomBG.classList.remove('bg-success');
            remainingDomBG.classList.add('bg-danger');
            gainDomBG.classList.add('bg-warning');
            localStorage.setItem('RemainingCals', final);
           return addRemainingCalsDom.innerHTML = final;
        }
    }
    
    
    _gainCalories() {
        const gainLossDom = document.querySelector('#gain-loss');
    
        const final =  this._totalCalorie - this._calorieLimit ;
        localStorage.setItem('gainCals', final);
        this._saveToLS();
       return  gainLossDom.innerHTML = `<h1>${final}</h1>`;
    }
    
    _setRange () {
    let range = document.querySelector('#progress-bar');
    
    if (this._totalCalorie < 0)  
          {
                range.innerHTML =  `<div class="progress-bar progress-bar-striped bg-success" 
        style="width: ${0}%" aria-valuenow="${0}" aria-valuemin="0" 
        aria-valuemax="100">${0}% </div>`; 
        localStorage.setItem('range',   range.innerHTML );
            }
    
    
    else if (this._totalCalorie >= 0) { 
    const final = (this._totalCalorie/this._calorieLimit)*100;
     
        if (final < 0) {
            range.innerHTML =  `<div class="progress-bar progress-bar-striped bg-success" 
    style="width: ${0}%" aria-valuenow="${0}" aria-valuemin="0" 
    aria-valuemax="100">${0}% </div>`; 
    localStorage.setItem('range',   range.innerHTML );
        }
        else if (this._totalCalorie === 0) {
            range.innerHTML =  `<div class="progress-bar progress-bar-striped bg-success" 
    style="width: ${0}%" aria-valuenow="${0}" aria-valuemin="0" 
    aria-valuemax="100">${0}% </div>`; 
    localStorage.setItem('range',   range.innerHTML );
        }
        else if (this._totalCalorie <= this._calorieLimit) {
    range.innerHTML =  `<div class="progress-bar progress-bar-striped bg-success" 
    style="width: ${Math.round(final)}%" aria-valuenow="${Math.round(final)}" aria-valuemin="0" 
    aria-valuemax="100">${Math.round(final)}% </div>`;
    localStorage.setItem('range',   range.innerHTML );
      }
    else if (this._totalCalorie > this._calorieLimit ) {
        range.innerHTML =  `<div class="progress-bar progress-bar-striped bg-danger" 
    style="width: ${100}%" aria-valuenow="${100}" aria-valuemin="0" 
    aria-valuemax="100">${100}% </div>`; 
    localStorage.setItem('range',   range.innerHTML );
     }
    }}
    
    
    _addMealCard (name, cal, id) {
    const mealWrapper = document.querySelector('#meal-wrapper');
    let div = document.createElement('div');
    div.classList.add('box','border', 'd-flex','justify-content-between','align-items-center', 'border-1', 'p-3', 'm-4', 'rounded-2');  //d-flex justify-content-between align-items-center
    div.setAttribute('id', id);
    div.innerHTML = `<div  class="btn btn-success d-inline me-2" id="btn-meal-cal ms-auto">${cal}</div> <p>${name}</p>
    <button class="btn btn-close" id="item-close-button"></button>`;
    mealWrapper.appendChild(div);
    }
    
    _addWorkoutCard (name, cal, id) {
        const workoutWrapper = document.querySelector('#workout-wrapper');
        let div = document.createElement('div');
        div.classList.add('box','border', 'd-flex','justify-content-between','align-items-center', 'border-1', 'p-3', 'm-4', 'rounded-2');  //d-flex justify-content-between align-items-center
        div.setAttribute('id', id);
        div.innerHTML = `<div class="btn btn-warning d-inline me-2" id="btn-meal-cal ms-auto">${cal}</div> <p>${name}</p>
        <button class="btn btn-close" id="item-close-button"></button>`;
        workoutWrapper.appendChild(div);
        }
    
    _saveToLS () {
    
        let consumed = this._meals.reduce((acc, item) => {
            return acc + item.calories;
        }, 0);
        localStorage.setItem('consumedCals', consumed);
        let burned = this._workouts.reduce((acc, item) => {
            return acc + item.calories;
        }, 0);
        localStorage.getItem('burnedCals', burned);
    }
    
    
    
    _render() {                             //to load when adding meal or workout or anything else // in vanilla JS we have to render after adding/removing it is not automatic like in React!
        this._addConsumedCals();
        this._addBurnedCals();
        this._addRemainingCals();
        this._gainCalories();
        this._setRange();
        this._saveToLS ();
    }
    }

    class Meal {                            //create meal object
        constructor(name, calories) {
            this.id =  new Date().getTime();
            this.name = name;
            this.calories = calories;
             }
        }
        
    class Workout {                         //create workout object
        constructor(name, calories) {
            
                this.id =  new Date().getTime();
                this.name = name;
                this.calories = calories;
            }
        }
            

class App {
constructor () {
this._tracker = new Track();
this.showSavedItems();


let submit = document.querySelector('#inputs-form-meal');
submit.addEventListener('submit', this._addNewMeal.bind(this) );
let submitWorkout = document.querySelector('#form-workout');
submitWorkout.addEventListener('submit', this._addNewWorkouts.bind(this));

//To close modals
this.workoutModal = new bootstrap.Modal(document.getElementById('modal02'));
this.mealModal = new bootstrap.Modal(document.getElementById('modal01'));
this.limitModal = new bootstrap.Modal(document.getElementById('modal03'));
this.resetModal = new bootstrap.Modal(document.getElementById('modal04'));

//to show  cards 



let setButton = document.querySelector('#set-button');
setButton.addEventListener('click', this.setLimit.bind(this));

document.addEventListener('DOMContentLoaded', this._showMeals.bind(this) );

document.addEventListener('DOMContentLoaded', this._showWorkouts.bind(this));

document.addEventListener('click', this._deleteMeals.bind(this));

document.addEventListener('click', this._deleteWorkouts.bind(this));

document.addEventListener('DOMContentLoaded', this.showLimit.bind(this));

document.addEventListener('DOMContentLoaded', this.showSavedItems.bind(this));

document.addEventListener('keyup', this.filterMeals.bind(this));

document.addEventListener('keyup', this.filterWoukouts.bind(this));

let resetButton = document.querySelector('#reset-button');

resetButton.addEventListener('click', this.resetAll.bind(this));
}


_addNewMeal(e) {
    e.preventDefault();
    if (!localStorage.getItem('MealsArr')) {
        localStorage.setItem('MealsArr', '[]');
    } else { 
        const arr = localStorage.getItem('MealsArr');
        const arr2 = JSON.parse(arr);
        let mealInput = document.querySelector('#meal-name');
        let calorieInput = document.querySelector('#calorie-number');
        if (mealInput.value === '' && calorieInput.value === '') {
            alert('Fill the input windows!');
        } else {
            const meal = new Meal(mealInput.value, Number.parseInt(calorieInput.value));
            this._tracker.addMeal(meal);
            this._tracker._addMealCard(mealInput.value, calorieInput.value, meal.id);
            arr2.push(meal);
            localStorage.setItem('MealsArr', JSON.stringify(arr2));
            mealInput.value = '';
            calorieInput.value = '';
            this.mealModal.hide();
        }
    }
    this.showLimit ();
    this.showSavedItems();
    this._tracker._render();
}


_addNewWorkouts(e) {
    e.preventDefault();
    let workoutInput = document.querySelector('#workout-input');
    let calorieWorkoutINput = document.querySelector('#burned-cals-input');

    if (!localStorage.getItem('WorkoutsArr')) {
        localStorage.setItem('WorkoutsArr', '[]');
    }
    else {
        const arr = localStorage.getItem('WorkoutsArr');
        const arr2 = JSON.parse(arr);
    const workout = new Workout(workoutInput.value, Number.parseInt((calorieWorkoutINput.value)));
    this._tracker.addWorkout(workout);
    this._tracker._addWorkoutCard(workoutInput.value, calorieWorkoutINput.value, workout.id );
    arr2.push(workout);
    localStorage.setItem('WorkoutsArr', JSON.stringify(arr2));
    workoutInput.value = '';
    calorieWorkoutINput.value = '';
    this.workoutModal.hide();
    this._tracker._render();
    }}

_showMeals () {
    const meals = localStorage.getItem('MealsArr');
    const arr = JSON.parse(meals);
   
    arr.forEach(card => { 
        this._tracker._addMealCard(card.name, card.calories, card.id)
    })
   this.showLimit ();
   this.showSavedItems();
   this._tracker._render();
}

_showWorkouts () {

    const workouts = localStorage.getItem('WorkoutsArr');
    const arr = JSON.parse(workouts);
    arr.forEach(card => { 
        this._tracker._addWorkoutCard(card.name, card.calories, card.id)
    })
    this._tracker._render();
   
}

_deleteMealsFromLS(cardId) {
    const mealsFromLS = localStorage.getItem('MealsArr');
    const mealArr = JSON.parse(mealsFromLS);
    const updatedArrLS = mealArr.filter(item => item.id !== cardId);
    localStorage.setItem('MealsArr', JSON.stringify(updatedArrLS));
    this.showLimit ();
    this._tracker._render();

}

_deleteWorkoutsFromLS(cardId) {
    const workoutsFromLS = localStorage.getItem('WorkoutsArr');
    const workoutArr = JSON.parse(workoutsFromLS);
    const updatedArrLS = workoutArr.filter(item => item.id !== cardId);
    localStorage.setItem('WorkoutsArr', JSON.stringify(updatedArrLS));
}

_deleteMeals(e) {
 
    if (e.target.classList.contains('btn-close')) {
        const card = e.target.closest('div');
        const cardId = parseInt(card.getAttribute('id'));
        
        if (card.closest('#meal-wrapper')) {
            card.remove();
            this._deleteMealsFromLS(cardId);
            this._tracker.removeMeal(cardId);
            this._tracker._removeConsumedCals(cardId);
            this._tracker._gainCalories();
            this._tracker._setRange ();

             // Update total consumed calories in localStorage
             const totalConsumedCalories = this._tracker._meals.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);
            localStorage.setItem('consumedCals', totalConsumedCalories);
        }
    }
    this._tracker._render();
    this.showLimit ();
    this.showSavedItems();
    this._tracker._render();
}


_deleteWorkouts(e) {
  
    if (e.target.classList.contains('btn-close')) {
        const card = e.target.closest('div');
        const cardId = parseInt(card.getAttribute('id'));
        
        if (card.closest('#workout-wrapper')) {
            card.remove();
            this._deleteWorkoutsFromLS(cardId);
            this._tracker.removeWorkout(cardId);
            this._tracker._removeBurnedCals(cardId);
            this._tracker._gainCalories();
            this._tracker._setRange ();
        }
    }
    this._tracker._render();
}

setLimit () {
    let limitDom = document.querySelector('#limit');
    let limitInput = document.querySelector('#limit-input');
    let limitLS = localStorage.getItem('limitInput');

     this._tracker.setCalorieLimit(limitInput.value);

    if(!limitLS) {
        this._tracker.setCalorieLimit(limitInput.value);
        this._tracker._calorieLimit = limitInput.value;
    }
 else if (limitLS) { 
    this._tracker.setCalorieLimit(limitInput.value);
    this._tracker._calorieLimit = limitInput.value;

  
 }
 limitDom.innerHTML = localStorage.getItem('limitInput');
 this.limitModal.hide();
    limitInput.value = '';
    this.showLimit ();
}

showLimit () {

    let limitLS = localStorage.getItem('limitInput');
    let limitDom = document.querySelector('#limit');


    this._tracker._calorieLimit = limitLS;
    limitDom.innerHTML = limitLS;
    this._tracker._render();
}

showSavedItems() {
    let mealsFromLS = localStorage.getItem('MealsArr');
    let consumedCals = localStorage.getItem('consumedCals');

    let burnedCaloriesLS = localStorage.getItem('burnedCals');
    let workoutsLS = localStorage.getItem('WorkoutsArr');
    

    if (!consumedCals) {
        if (this._tracker._meals.length > 0) {
            const mealArr = JSON.parse(mealsFromLS);
            consumedCals = mealArr.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);
        } else {
            consumedCals = 0;
        }
        localStorage.setItem('consumedCals', consumedCals);
    }

    else if (!burnedCaloriesLS) {
        if (this._tracker._workouts.length > 0) {
            burnedCaloriesLS = workoutsLS.reduce((acc, item) => {
                return acc + item.calories;
            }, 0);
        } else {
            burnedCaloriesLS = 0;
        }
        localStorage.setItem('burnedCals', burnedCaloriesLS)
    }
    let consumedCalsDom = document.querySelector('#consumed-cals');
    consumedCalsDom.innerHTML = consumedCals;
    let burnedCalsDOM = document.querySelector('#burned-cals');
    burnedCalsDOM.innerHTML = burnedCaloriesLS;

 }

  filterMeals(e) {
    // Prevent the default form submission behavior (if this function is used as an event listener for a form)
   e.preventDefault();

    let filterInput = document.querySelector('#filter-input').value.trim().toLowerCase();

    // Get the meal container and convert its children into an array
    let mealContainer = document.querySelector('#meal-wrapper');
    const mealsSArrDOM = [...mealContainer.children];
    console.log(mealsSArrDOM);
    mealsSArrDOM.forEach(meal=>{
        let mealP = meal.querySelector('p');
        let mealText = mealP.innerHTML.trim().toLowerCase()
        console.log(mealP.innerHTML);
        if((mealText.includes(filterInput))) {
    meal.style.display = 'block';
    meal.classList.remove('d-none');
    meal.classList.add('d-flex');
   
        } else {
             console.log(mealP.innerHTML);
            meal.style.display = 'none';
            meal.classList.remove('d-flex');
            meal.classList.add('d-none');
        }
    }) 
}

filterMeals(e) {
    // Prevent the default form submission behavior (if this function is used as an event listener for a form)
   e.preventDefault();

    let filterInput = document.querySelector('#filter-input').value.trim().toLowerCase();

    // Get the meal container and convert its children into an array
    let mealContainer = document.querySelector('#meal-wrapper');
    const mealsSArrDOM = [...mealContainer.children];

    mealsSArrDOM.forEach(meal=>{
        let mealP = meal.querySelector('p');
        let mealText = mealP.innerHTML.trim().toLowerCase()
 
        if((mealText.includes(filterInput))) {
    meal.style.display = 'block';
    meal.classList.remove('d-none');
    meal.classList.add('d-flex');
   
        } else {
       
            meal.style.display = 'none';
            meal.classList.remove('d-flex');
            meal.classList.add('d-none');
        }
    }) 
}

filterWoukouts(e) {
    // Prevent the default form submission behavior (if this function is used as an event listener for a form)
   e.preventDefault();

    let filterInput = document.querySelector('#filter-workout-input').value.trim().toLowerCase();

    // Get the meal container and convert its children into an array
    let workoutContainer = document.querySelector('#workout-wrapper');
    const workoutsArrDOM = [...workoutContainer.children];

    workoutsArrDOM.forEach(workout=>{
        let workoutP = workout.querySelector('p');
        let workoutText = workoutP.innerHTML.trim().toLowerCase()

        if((workoutText.includes(filterInput))) {
    workout.style.display = 'block';
    workout.classList.remove('d-none');
    workout.classList.add('d-flex');
   
        } else {
     
            workout.style.display = 'none';
            workout.classList.remove('d-flex');
            workout.classList.add('d-none');
        }
    }) 
}

resetAll (e) {
    e.preventDefault();
  
const workoutWrapper = document.querySelector('#workout-wrapper');
const workoutArrDom = [...workoutWrapper.children];
workoutArrDom.forEach(workout =>{
workout.remove()
})

const mealWrapper = document.querySelector('#meal-wrapper');
const mealsArrDOM = [...mealWrapper.children]
mealsArrDOM.forEach(meal => {
meal.remove();
})

this._tracker._totalCalorie = 0;
this._tracker._calorieLimit = 2000;
this._tracker._meals = [];
this._tracker._workouts = [];
localStorage.setItem('MealsArr', JSON.stringify([]));
localStorage.setItem('WorkoutsArr', JSON.stringify([]));
localStorage.setItem('limitInput', JSON.stringify(2000));
localStorage.setItem('burnedCals', JSON.stringify(0));
localStorage.setItem('consumedCals', JSON.stringify(0));
localStorage.setItem('totalCals', JSON.stringify(0));
this._tracker._addBurnedCals();
this._tracker._addConsumedCals();
this.resetModal.hide();
}

 }

const app = new App();
