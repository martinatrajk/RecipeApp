import React from "react";
import "./SingleMeal.css";
import axios from "axios";
import SingleMealLink from "../SingleMealLink/SingleMealLink";
import { withRouter } from "react-router";

class SingleMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      meal: props.match.params.id,
      fullMenu:[],
      random:[],
      mealData:[]

    };
    this.similarMeals = () => {
      const { meal, mealData } = this.state;
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealData.strCategory}`
        )
        .then(res => {
          let randomMealsFull = res.data.meals.filter(x => x.idMeal !== meal);
          let randomNumbers = [];
          while (randomNumbers.length < 3) {
            const x = Math.floor(Math.random() * randomMealsFull.length);
            if (randomNumbers.indexOf(x) === -1) {
              randomNumbers.push(x);
            }
          }
          this.setState({
            random: randomNumbers,
            fullMenu: randomMealsFull,
            loading: false
          });
        });
    };
    this.getMeal = () => {
      const { meal } = this.state;
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
        .then(res => {
          this.setState({ mealData: res.data.meals[0] });
          this.similarMeals();
        });
    }
    this.tableData = () => {
      const { mealData } = this.state;
      const data = [];
      for (let i = 1; i <= 20; i++) {
        if (mealData[`strMeasure${i}`] !== "") {
          data.push({
            measure: mealData[`strMeasure${i}`],
            ingredients: mealData[`strIngredient${i}`]
          });
        }
      }
      return data;
    };
  }
  componentDidMount = () => {
    this.getMeal()

  };
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ meal: this.props.location.pathname.split('/')[2] })
      this.getMeal()
    }
  }

  render() {
    const { mealData, loading, random, fullMenu } = this.state;
    return (
      !loading && (
        <div className="single-meal">
          <div className="single-meal-title" id='title'>{mealData.strMeal}</div>
          <div className="recipe">
            <div className="single-meal-image">
              <img src={mealData.strMealThumb} alt={mealData.strMeal} />
            </div>
            <div>
              <p className="single-meal-category">
                <b>Category:</b>
                <span>{mealData.strCategory}</span>
              </p>
              <p className="single-meal-country">
                <b>Country:</b>
                <span>{mealData.strArea}</span>
              </p>
              <p className="single-meal-video">
                <b>Video:</b>
                <a href={mealData.strYoutube}>{mealData.strYoutube}</a>
              </p>
              <p className="single-meal-recipe">{mealData.strInstructions}</p>
            </div>
          </div>
          <div className="measures">
            <table>
              <thead>
                <tr>
                  <th>Ingredients</th>
                  <th>Measure</th>
                </tr>
              </thead>
              <tbody>
                {this.tableData().map((rowInfo, i) => {
                  return (
                    <tr key={i}>
                      <td>{rowInfo.ingredients}</td>
                      <td>{rowInfo.measure}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="similar-meals">
            <p className="single-meal-title">SIMILAR MEALS</p>
            <div className="similar-meals-wrapper">
              {random.map(number => {
                return (
                  <SingleMealLink
                    link={fullMenu[number].idMeal}
                    mealName={fullMenu[number].strMeal}
                    mealImage={fullMenu[number].strMealThumb}
                    key={fullMenu[number].idMeal}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )
    );
  }
}
export default withRouter(SingleMeal);
