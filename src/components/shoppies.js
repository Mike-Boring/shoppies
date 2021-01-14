import React, { Component } from "react";
import "./shoppies.css"
import request from "superagent"



class Shoppies extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchResult: {},
          nominatedList: [],
          searchTerm: ""
        };
    }

    getMovies = () => {
        console.log("getMovies called")
        let searchTerm = this.state.searchTerm
        request
          .get("http://www.omdbapi.com/?t=" + searchTerm + "&apikey=40431a19")
          .then(res => {
            this.setState((state) => ({
                searchResult: res.body
              }));
          })
          .catch(err => {
            console.log("fetch error");
          });
    };

    handleChange = event => {
        this.setState(() => ({
            searchTerm: event.target.value
          }));
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("handlesubmit")
        this.getMovies()
        event.target.value = ''
    };

    render() {
        return (
            <div className="main">
                <div className="banner">
                    <p>Image Banner Here</p>
                </div>
                <div className="searchInput">
                    <h1>Welcome to Shoppies!</h1>
                    <h2>Search for 5 movies to nominate below.</h2>
                    <form onSubmit= {this.handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            className="searchFormInput"
                            placeholder="Movie Name...."
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                        />
                        <button>SUBMIT</button>
                    </form>
                </div>
                <div className="searchResults">
                    <h2>Search Results</h2>
                    {/* {searchResult} */}
                </div>
                <div className="nominatedDisplay">
                    <h2>My Shoppies Nominations</h2>
                    {/* {nominatedList} */}
                </div>
                <div className="completedBanner">
                    <h1>YOU HAVE NOMINATED YOUR 5 MOVIES</h1>
                </div>
            </div>
        )
    }
}

export default Shoppies