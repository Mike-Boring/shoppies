import Button from 'react-bootstrap/Button';
import "./completedBanner.css"

function CompletedBanner(props) {
    return (
        <div id="completedBannerBg" className="hide">
            <div id="completedBanner" >
                <h1>YOU HAVE NOMINATED YOUR 5 MOVIES</h1>
                <h3>Thank you for your nominations.</h3>
                <Button variant="dark"  onClick={props.resetView} >Reset</Button>&nbsp;&nbsp;<Button variant="dark"  onClick={props.resetView} >Submit</Button>
            </div>
        </div>
    )
}

export default CompletedBanner;