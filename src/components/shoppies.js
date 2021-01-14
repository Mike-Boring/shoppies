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
        this.getMovies()
        this.setState(() => ({
            searchTerm: ""
          }));
    };

    selectMovie = () => {
        let newNominatedList = [...this.state.nominatedList];
        newNominatedList.push(this.state.searchResult)
        this.setState(() => ({
            nominatedList: newNominatedList
          }));
    }

    unselectMovie = (id) => {
        console.log("unselect movie ran-id", id)
        let newNominatedList = [...this.state.nominatedList];
        let filteredNewNominatedList = newNominatedList.filter(movie => { 
            return movie.imdbID !== id;
        })
        console.log("new list", filteredNewNominatedList)
        this.setState(() => ({
            nominatedList: filteredNewNominatedList
          }));
    }

    render() {
        let imageUrl = this.state.searchResult.Poster
        let selectMovie = this.selectMovie
        let nominatedDisplayCopy =  [...this.state.nominatedList]
        let nominatedList = nominatedDisplayCopy.map((movie)=>{
            return (
                <div className="nominatedMovie" key={movie.imdbID}>
                    <h1>{movie.Title}</h1>
                    <img src={movie.Poster} width="200" alt={movie.Title}/><br />
                    <h2>{movie.Released}</h2>
                    <button onClick={() => this.unselectMovie(movie.imdbID)}>Remove Nomination</button>
                </div>
            )
        })
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
                    <h1>{this.state.searchResult.Title}</h1>
                    <img src={imageUrl} width="300" alt={this.state.searchResult.Title}/><br />
                    <h2>{this.state.searchResult.Released}</h2>
                    <button onClick={selectMovie}>Nominate</button>
                </div>
                <div className="nominatedDisplay">
                    <h2>My Shoppies Nominations</h2>
                    <div className="nominatedListContainer">
                        {nominatedList}
                    </div>
                </div>
                {/* <div className="completedBanner">
                    <h1>YOU HAVE NOMINATED YOUR 5 MOVIES</h1>
                </div> */}
            </div>
        )
    }
}

export default Shoppies