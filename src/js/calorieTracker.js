import Storage  from "./stotage";

class CalorieTracker {
    constructor() {
        this._calorieLimits = Storage.getCalorieLimit()
        this._totalCalories = Storage.getTotalCalorie(); 
        this._meals = Storage.getMeals(); 
        this._workouts = Storage.getWorkout(); 

        this._displayCalorieLimit();
        this._displayCalorieTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.updateTotalCalories(this._totalCalories)
        Storage.saveMeal(meal);
        this._dispalyNewMeal(meal)
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories)
        Storage.saveWorkout(workout)
        this._dispalyNewWorkout(workout);
        this._render();
    }

    removeMeal(id) {
        const index = this._meals.findIndex((meal)=> meal.id === id);
        if(index !== -1) {
            this._totalCalories -= this._meals[index].calories;
            Storage.updateTotalCalories(this._totalCalories);
            Storage.removeMeal(id);
            this._meals.splice(index, 1);
            
            this._render();
            
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex((meal)=> meal.id === id);
        if(index !== -1) {
            this._totalCalories += this._workouts[index].calories;
            Storage.updateTotalCalories(this._totalCalories)
            Storage.removeWorkout(id);
            this._workouts.splice(index, 1); 
            this._render()
            
        }
    }

    reset() {
        this._totalCalories = 0; 
        this._meals =[]; 
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    setLimit(limit) {
        this._calorieLimits = limit;
        Storage.setCalorieLimit(limit);
        this._displayCalorieLimit();
        this._render();
    }

    loadMeal() {
        this._meals.forEach((meal)=> {this._dispalyNewMeal(meal)});
    }

    loadWorkout() {
        this._workouts.forEach((workout) => this._dispalyNewWorkout(workout))
    }

    _displayCalorieLimit() {
        const limit = document.getElementById('calories-limit'); 
        limit.innerHTML = this._calorieLimits;
    }

    _displayCalorieTotal() {
        const total = document.getElementById('calories-total');
        total.innerHTML = this._totalCalories;
    }

    _displayCaloriesConsumed() {
        const cunsumedEl = document.getElementById('calories-consumed');
        let consumed = this._meals.reduce((total, meals)=> total+ meals.calories, 0);
        cunsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const burnedEl = document.getElementById('calories-burned');
        let burned = this._workouts.reduce((total, workout)=> total+workout.calories, 0);
        burnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const remainingEl = document.getElementById('calories-remaining'); 
        const progressBar = document.getElementById('calorie-progress');
        const remaining = this._calorieLimits - this._totalCalories;
        remainingEl.innerHTML = remaining

        if(remaining <0) {
            remainingEl.parentElement.parentElement.classList.remove('bg-light')
            remainingEl.parentElement.parentElement.classList.add('bg-danger')
            progressBar.classList.remove('bg-success')
            progressBar.classList.add('bg-danger')
        } else {
            remainingEl.parentElement.parentElement.classList.remove('bg-danger')
            remainingEl.parentElement.parentElement.classList.add('bg-light')
            progressBar.classList.remove('bg-danger')
            progressBar.classList.add('bg-success')
        } 
    }

    _displayCaloriesProgress() {
        const progress = document.getElementById('calorie-progress');
        const persent =  (this._totalCalories / this._calorieLimits) * 100;
        const width = persent<=0 ? Math.max(persent, 0) : Math.min(persent, 100); 
        progress.style.width = `${width}%`;
    }

    _dispalyNewMeal(meal){
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add("card", "my-2");
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>
        `;
        mealsEl.appendChild(mealEl);
    }

    _dispalyNewWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div'); 
        workoutEl.classList.add("card", "my-2"); 
        workoutEl.setAttribute('data-id', workout.id); 
        workoutEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>
        `
        workoutsEl.appendChild(workoutEl); 
    }

    _render() {
        this._displayCalorieTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}


export default CalorieTracker;