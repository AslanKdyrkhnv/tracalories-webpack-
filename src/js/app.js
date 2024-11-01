import Workout from "./workout";
import Meal from "./meal";
import CalorieTracker from "./calorieTracker";
import Storage from "./stotage";
import '@fortawesome/fontawesome-free/css/all.min.css';


import { Alert, Button,  Collapse, Modal,  } from 'bootstrap';

import "../style/bootstrap.css"
import "../style/style.css"



class App {
    constructor() {
        this._tracker = new CalorieTracker();
        this._tracker.loadMeal();
        this._tracker.loadWorkout();
        this._eventListenerMethod();
        
    }

    _eventListenerMethod() {
        document.getElementById('meal-form').addEventListener('submit',
            this._newItem.bind(this, 'meal'));

        document.getElementById('workout-form').addEventListener('submit',
            this._newItem.bind(this, 'workout'));
        
        document.getElementById('meal-items').addEventListener('click',
            this._removeItem.bind(this, 'meal')
        )
        document.getElementById('workout-items').addEventListener('click',
            this._removeItem.bind(this, 'workout')
        )

        document.getElementById('filter-meals').addEventListener('keyup', 
            this._filterItems.bind(this, 'meal')
        )

        document.getElementById('filter-workouts').addEventListener('keyup', 
            this._filterItems.bind(this, 'workout')
        )

        document.getElementById('reset').addEventListener('click', 
            this._reset.bind(this)
        )

        document.getElementById('limit-form').addEventListener('submit',
            this._setLimit.bind(this)
        )
    }

    _newItem(type, e) {
        e.preventDefault();
    
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
    
        if(name.value === '' || calories.value === '') {
            alert('Enter meal and calories')
            return;
        }
        if('meal' === type) {
            const meal = new Meal(name.value, +calories.value)
            this._tracker.addMeal(meal);
        } else if('workout' === type) {
            const workout = new Workout(name.value, +calories.value)
            this._tracker.addWorkout(workout);
        }
        name.value = ''
        calories.value = ''
        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new Collapse(collapseItem, 
            {
                toggle:true
            }
        )

    }

    _removeItem(type, e) {
        if(e.target.classList.contains('fa-xmark') ||
            e.target.classList.contains('delete')) {
                if(confirm('Are you sure?')) {
                    const id = e.target.closest('.card').getAttribute('data-id');

                    type === 'meal' ? 
                    this._tracker.removeMeal(id) :
                    this._tracker.removeWorkout(id);

                    e.target.closest('.card').remove();
                }
            }
    }

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(item => {
            const name = item.firstElementChild.firstElementChild.textContent;

            if(name.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        });
    }

    _reset(e) {
        e.preventDefault();
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = ''
        document.getElementById('workout-items').innerHTML = ''
        document.getElementById('filter-meals').value = ''
        document.getElementById('filter-workouts').value = ''
    }

    _setLimit(e) {
        e.preventDefault();
        const limit = document.getElementById('limit'); 
        if(limit.value === '') {
            alert('enter the limit');
            return;
        }
        
        this._tracker.setLimit(+limit.value)
        limit.value = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();

    }

    
}

const app = new App()



 