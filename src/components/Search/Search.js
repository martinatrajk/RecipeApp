import React from "react";
import "./Search.css";
import SingleMealLink from "../SingleMealLink/SingleMealLink";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      dropdownVisible: false,
      dropdownData: [],
      category: "",
      loading:true
    };
    this.getData = () => {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${
            this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/')+1)
          }`
        )
        .then(res => {
          const x = new Set();
          if (res.data.meals) {
            this.setState({ searchData: res.data.meals,random:Math.floor(Math.random() * res.data.meals.length)});
            res.data.meals.forEach(meal => {
              x.add(meal.strCategory);
              this.setState({ dropdownData: [...x],loading:false });
            });
          }
        });
    };
    this.toggleDropdown = () => {
      this.setState({ dropdownVisible: !this.state.dropdownVisible });
    };
    this.setValue = e => {
      this.setState({ category: e.target.innerText });
    };
  }
  componentDidMount = () => {
    this.getData();
  };
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getData();
      this.setState({ category: "" });
    }
  }
  render() {
      const{searchData,category,dropdownVisible,dropdownData,loading,random}= this.state
    let filtered = searchData;
    if (searchData && category !== "") {
      filtered = searchData.filter(x => {
        return x.strCategory.indexOf(category) !== -1;
      });
    }
    return !loading && searchData ? (
      <div className="search">
        <div className="title">SEARCH DATA</div>
        <div className="recomendation">
          <p>Our recomendation</p>
          <div>
          <SingleMealLink link={searchData[random].idMeal} mealName={searchData[random].strMeal} mealImage={searchData[random].strMealThumb}/>
          </div>
        </div>
        <div className="choose-category">
          <div className="dropdown-wrapper" onClick={this.toggleDropdown}>
            {!category?'Choose category':category}
            {dropdownVisible && (
              <div className="dropdown">
                {dropdownData.map((data, i) => {
                  return (
                    <div
                      key={i}
                      onClick={this.setValue}
                      className="dropdown-item"
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="results">
          {filtered.map(data => {
            return (
              <SingleMealLink
                key={data.idMeal}
                link={data.idMeal}
                mealImage={data.strMealThumb}
                mealName={data.strMeal}
              />
            );
          })}
        </div>
      </div>
    ) : <div className='nothing-found'>NO MEALS FOUND</div>;
  }
}
export default Search;
