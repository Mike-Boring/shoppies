import "./searchResults.css"

function SearchResults(props) {
    return (
        <div className="searchResults animate__animated animate__backInLeft animate__delay-2s">
            <h2>Search Results</h2>
            {props.searchResult.Title && <h2 className="movieTitle">{props.searchResult.Title}</h2>}
            
            <img src={props.imageUrl} width="300" alt={props.searchResult.Title}/><br /><br/>
            {props.searchResult.Year && <h3 className="stretch">({props.searchResult.Year})</h3>}
            <h3>{props.searchResult.Plot}</h3>
            <br/>
            {props.searchResult.Title && props.buttonCheck()}           
        </div>
    )
}

export default SearchResults;



