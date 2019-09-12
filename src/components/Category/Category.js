import React from "react";
import "./Category.css";
import SingleMealLink from "../SingleMealLink/SingleMealLink";
import axios from "axios";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categoryName: props.match.params.name,
      searchValue: "",
    };
    this.search = e => {
      this.setState({ searchValue: e.target.value.toLowerCase() });
    };
  }
  componentDidMount = () => {
    const { categoryName } = this.state;
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      )
      .then(res => {
        this.setState({ categoryData: res.data.meals,loading:false,random:Math.floor(Math.random()*res.data.meals.length) });
      });
  };
  render() {
    const { categoryData, categoryName, searchValue,loading,random } = this.state;
    let filtered;
    if (categoryData) {
      filtered = categoryData.filter(meal => {
        return meal.strMeal.toLowerCase().indexOf(searchValue) !== -1;
      });
    }
    return  (!loading &&
      <div className="category">
        <div className="category-name">{categoryName}</div>
        <div className="recomendation-wrapper">
          <p>Our recomendation</p>
          <div>
            <SingleMealLink link={categoryData[random].idMeal} mealName={categoryData[random].strMeal} mealImage={categoryData[random].strMealThumb}/>
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            value={searchValue}
            onChange={this.search}
            placeholder="Search meals"
          />
        </div>
        <div className="meals">
          {filtered.length !== 0 ? (
            filtered.map(item => {
              return (
                <SingleMealLink
                  key={item.idMeal}
                  link={item.idMeal}
                  mealImage={item.strMealThumb}
                  mealName={item.strMeal}
                />
              );
            })
          ) : (
            <div className='category-nothing-found'>NO MEALS FOUND</div>
          )}
        </div>
      </div>
    ) 
  }
}

export default Category;
