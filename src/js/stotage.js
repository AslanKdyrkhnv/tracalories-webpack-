


class Storage {
    static getCalorieLimit(defultLimit = 2000) {
        let calorieLimit; 
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalorie(defultCalorie = 0 ) {
        let totalCalorie; 
        if(localStorage.getItem('totalCalorie') === null) {
            totalCalorie = defultCalorie;
        } else {
            totalCalorie = +localStorage.getItem('totalCalorie');
        }
        return totalCalorie;
    }

    static updateTotalCalories(calorie) {
        localStorage.setItem('totalCalorie', calorie)
    }

    static getMeals() {
        let meal; 
        if(localStorage.getItem('meal') === null) {
            meal = [];
        } else {
            meal = JSON.parse(localStorage.getItem('meal'))
        }
        return meal;
    }

    static saveMeal(meal) {
        let meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meal', JSON.stringify(meals))
    }  

    static removeMeal(id) {
        let meals = Storage.getMeals();
        meals.forEach((meal, index)=> {
            if(meal.id === id) {
                meals.splice(index, 1);
            }
        })
        localStorage.setItem('meal', JSON.stringify(meals));
    }

    static getWorkout() {
        let workout; 
        if(localStorage.getItem('workout') === null) {
            workout = []
        } else {
            workout = JSON.parse(localStorage.getItem('workout'));
        }
        return workout;
    }
 
    static saveWorkout(work) {
        let workout = Storage.getWorkout();
        workout.push(work);
        localStorage.setItem('workout', JSON.stringify(workout));
    }

    static removeWorkout(id) {
        let workouts = Storage.getWorkout();
        workouts.forEach((workout, index)=> {
            if(workout.id === id) {
                workouts.splice(index, 1);
            }
        })
        localStorage.setItem('workout', JSON.stringify(workouts))
    }
    
    static clearAll() {
        localStorage.removeItem('workout')
        localStorage.removeItem('meal')
        localStorage.removeItem('totalCalorie')
    }
}


export default Storage;