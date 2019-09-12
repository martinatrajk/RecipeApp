import React from 'react'
import { Link } from 'react-router-dom'
import './SingleMealLink.css'
import {withRouter} from 'react-router';

class SingleMealLink extends React.Component {
    render() {
        const { link, mealName, mealImage } = this.props
        return (
            <Link to={`/recipe/${link}`} className='single-meal-wrapper'>
                <img src={mealImage} alt={mealName} />
                <p>{mealName}</p>
            </Link>
        )
    }
}
export default withRouter(SingleMealLink)