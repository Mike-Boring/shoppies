import Carousel from 'react-bootstrap/Carousel'
import bg1 from "../images/bg1.jpg"
import bg2 from "../images/bg2.jpg"

function Banner() {
    return (
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
    )
}

export default Banner;