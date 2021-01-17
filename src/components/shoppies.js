import React, { Component } from "react";
import "./shoppies.css"
import request from "superagent"
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'
import bg1 from "../images/bg1.jpg"
import bg2 from "../images/bg2.jpg"
import ls from 'local-storage'


class Shoppies extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchResult: {},
          nominatedList: [],
          searchTerm: ""
        };
    }

    componentDidMount = () => {
        this.setState(() => ({
            nominatedList: ls.get('nominatedList') || []
          }));
    }


    //http://www.omdbapi.com/?t=rocky&apikey=40431a19
    getMovies = () => {
        let searchTerm = this.state.searchTerm
        request
          .get("https://www.omdbapi.com/?t=" + searchTerm + "&apikey=40431a19")
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
        if (this.state.nominatedList.length < 4) {
            let newNominatedList = [...this.state.nominatedList];
            newNominatedList.push(this.state.searchResult)
            this.setState(() => ({
                nominatedList: newNominatedList
            }));
            let nominatedListSaved = newNominatedList
            ls.set('nominatedList', nominatedListSaved) 

        } else {
            let newNominatedList = [...this.state.nominatedList];
            newNominatedList.push(this.state.searchResult)
            this.setState(() => ({
                nominatedList: newNominatedList
            }));
            let nominatedListSaved = newNominatedList
            ls.set('nominatedList', nominatedListSaved) 
            document.getElementById('completedBannerBg').classList.remove("hide");
        }
    }

    unselectMovie = (id) => {
        let newNominatedList = [...this.state.nominatedList];
        let filteredNewNominatedList = newNominatedList.filter(movie => { 
            return movie.imdbID !== id;
        })
        this.setState(() => ({
            nominatedList: filteredNewNominatedList
          }));
        let nominatedListSaved = filteredNewNominatedList
        ls.set('nominatedList', nominatedListSaved) 
    }
    resetView = () => {
        document.getElementById('completedBannerBg').classList.add("hide");
        this.setState(() => ({
            nominatedList: [],
            searchResult: {}
        }));
        ls.set('nominatedList', []) 
    }

    render() {
        let imageUrl = this.state.searchResult.Poster
        let selectMovie = this.selectMovie
        let nominatedDisplayCopy =  [...this.state.nominatedList]
        let nominatedList = nominatedDisplayCopy.map((movie)=>{
            return (
                <div className="nominatedMovie" key={movie.imdbID}>
                    <h3 className="movieTitle">{movie.Title}</h3>
                    <img src={movie.Poster} width="100%" alt={movie.Title}/><br /><br/>
                    <Button variant="dark" className="stretch" onClick={() => this.unselectMovie(movie.imdbID)}>Remove Nomination</Button>
                </div>
            )
        })
        let buttonCheck = () => {
            if (this.state.nominatedList.filter(e => e.imdbID === this.state.searchResult.imdbID).length > 0) {
                return <Button variant="dark" className="stretch" onClick={() => this.unselectMovie(this.state.searchResult.imdbID)}>Remove Nomination</Button>
            } else {
                return <Button variant="dark" className="stretch" onClick={selectMovie}>Nominate</Button>
            }
        }
        return (
            <div className="mainbg">

            <div className="banner">
                {/* <div className="topdiv"></div> */}
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={bg1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={bg2}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br/><br/>
            </div>
            <div className="main">
                <div className="searchInput">
                    <h1 className="white animate__animated animate__fadeInUpBig animate__delay-.5s">Welcome to The Shoppies: Movie awards for entrepreneurs</h1><br />
                    <h2 className="white animate__animated animate__flipInX animate__delay-1s">Search for 5 movies to nominate below.</h2><br />
                    <form onSubmit= {this.handleSubmit} className=" animate__animated animate__fadeIn animate__delay-2s">
                        <input
                            type="text"
                            name="search"
                            className="searchFormInput"
                            placeholder="Enter A Movie Name to Search For........"
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                        />
                        &nbsp;&nbsp;<Button variant="dark">SUBMIT</Button>
                    </form>
                </div>
                <div className="content">
                    <div className="searchResults animate__animated animate__backInLeft animate__delay-2s">
                        <h2>Search Results</h2>
                        {this.state.searchResult.Title && <h2 className="movieTitle">{this.state.searchResult.Title}</h2>}
                        
                        <img src={imageUrl} width="300" alt={this.state.searchResult.Title}/><br /><br/>
                        {this.state.searchResult.Year && <h3 className="stretch">({this.state.searchResult.Year})</h3>}
                        <h3>{this.state.searchResult.Plot}</h3>
                        <br/>
                        {this.state.searchResult.Title && buttonCheck()}
                        
                    </div>
                    <div className="nominatedDisplay animate__animated animate__backInRight animate__delay-3s">
                        <h2>My 5 Shoppies Nominations</h2>
                        <div className="nominatedListContainer">
                            {nominatedList}
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div id="completedBannerBg" className="hide">
                    <div id="completedBanner" >
                        <h1>YOU HAVE NOMINATED YOUR 5 MOVIES</h1>
                        <h3>Thank you for your nominations.</h3>
                        <Button variant="dark"  onClick={this.resetView} >Reset</Button>&nbsp;&nbsp;<Button variant="dark"  onClick={this.resetView} >Submit</Button>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
            </div>
        )
    }
}

export default Shoppies