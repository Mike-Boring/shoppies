import "./nominatedDisplay.css"
import Button from 'react-bootstrap/Button';

function NominatedDisplay(props) {
    let nominatedDisplayCopy =  props.nominatedList
    
    let nominatedList = nominatedDisplayCopy.map((movie)=>{
        return (
            <div className="nominatedMovie" key={movie.imdbID}>
                <h3 className="movieTitle">{movie.Title}</h3>
                <img src={movie.Poster} width="100%" alt={movie.Title}/><br /><br/>
                <Button variant="dark" className="stretch" onClick={() => props.unselectMovie(movie.imdbID)}>Remove Nomination</Button>
            </div>
        )
    })
    
    return (
        <div className="nominatedDisplay animate__animated animate__backInRight animate__delay-3s">
            <h2>My 5 Shoppies Nominations</h2>
            <div className="nominatedListContainer">
                {nominatedList}
            </div>
        </div>
    )
}

export default NominatedDisplay;