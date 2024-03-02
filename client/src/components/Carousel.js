import Carousel from 'react-bootstrap/Carousel';
// import '../images/'

function Car() {
    const img1 = require('../images/cover.png')
    const img2 = require('../images/iutennis.png')
    const img3 = require('../images/iuswimming.jpg')
    const img4 = require('../images/iubasketball.webp')

  return (
    <Carousel style={{margin: '5px'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
          height={'250px'}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
          height={'250px'}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img4}
          alt="Third slide"
          height={'250px'}
        />

        <Carousel.Caption>
          <h3>Basketball COurt</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Fourth slide"
          height={'250px'}
        />

        <Carousel.Caption>
          <h3>Swimming Pool</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Car;