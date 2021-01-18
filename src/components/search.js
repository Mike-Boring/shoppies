import Button from 'react-bootstrap/Button';
import "./search.css"

function Search(props){
    return(
        <div className="searchInput">
            <h1 className="white animate__animated animate__fadeInUpBig animate__delay-.5s">Welcome to The Shoppies: Movie awards for entrepreneurs</h1><br />
            <h2 className="white animate__animated animate__flipInX animate__delay-1s">Search for 5 movies to nominate below.</h2><br />
            <form onSubmit= {props.handleSubmit} className=" animate__animated animate__fadeIn animate__delay-2s">
                <input
                    type="text"
                    name="search"
                    className="searchFormInput"
                    placeholder="Enter A Movie Name to Search For........"
                    value={props.searchTerm}
                    onChange={props.handleChange}
                />
                &nbsp;&nbsp;<Button variant="dark">SUBMIT</Button>
            </form>
        </div>

    )
}

export default Search;



