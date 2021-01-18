import React, { Component } from "react";
import "./shoppies.css"
import request from "superagent"
import Button from 'react-bootstrap/Button';
import ls from 'local-storage'
import Banner from './banner'
import Search from "./search"
import SearchResults from "./searchResults"
import NominatedDisplay from "./nominatedDisplay"
import CompletedBanner from "./completedBanner";


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
            document.getElementById('mainbg').classList.add("lighten");
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
        document.getElementById('mainbg').classList.remove("lighten");
        this.setState(() => ({
            nominatedList: [],
            searchResult: {}
        }));
        ls.set('nominatedList', []) 
    }

    render() {
        let imageUrl = this.state.searchResult.Poster
        let buttonCheck = () => {
            if (this.state.nominatedList.filter(e => e.imdbID === this.state.searchResult.imdbID).length > 0) {
                return <Button variant="dark" className="stretch" onClick={() => this.unselectMovie(this.state.searchResult.imdbID)}>Remove Nomination</Button>
            } else {
                return <Button variant="dark" className="stretch" onClick={this.selectMovie}>Nominate</Button>
            }
        }
        return (
            <div>
                <div id="mainbg">
                    <div className="banner">
                        <Banner />
                        <br/><br/>
                    </div>
                    <div className="main">
                        <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} searchTerm={this.state.searchTerm} />
                        <div className="content">
                            <SearchResults searchResult={this.state.searchResult} buttonCheck={buttonCheck} imageUrl={imageUrl}/>
                            <NominatedDisplay nominatedList={this.state.nominatedList} selectMovie={this.selectMovie} unselectMovie={this.unselectMovie}/>
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <div className="footer">
                    </div>
                </div>
                <CompletedBanner resetView={this.resetView}/>
            </div>
        )
    }
}

export default Shoppies