import React from 'react'
import './MyMeals.css'
import axios from "axios";
import SingleMealLink from '../SingleMealLink/SingleMealLink'

class MyMeals extends React.Component {
    constructor() {
        super()
        this.state = {
            randomMeals: [],
            loading: true
        }
    }
    componentDidMount() {
        let random = []
        for (let i = 0; i < 12; i++) {
            axios
                .get(
                    `https://www.themealdb.com/api/json/v1/1/random.php`
                )
                .then(res => {
                    random.push(...res.data.meals)
                    this.setState({ randomMeals: random })
                    if (random.length === 12) {
                        this.setState({ loading: false })
                    }
                })
        }
    }
    render() {
        const {loading,randomMeals} = this.state
        return (
            (!loading ?
                <div className='my-meals'>
                    <div className='title'>
                        MY MEALS
                </div>
                    <div className='meals-wrapper'>
                        {randomMeals.map(meal => {
                            return (
                                <SingleMealLink key={meal.idMeal} link={meal.idMeal} mealImage={meal.strMealThumb} mealName={meal.strMeal} />
                            )
                        })}

                    </div>
                </div>
                : null
            )
        )
    }
}
export default MyMeals