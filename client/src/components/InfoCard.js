import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InfoCard(props) {
    const activity = props.activity;
    const columnsPerRow = 3

  return (
    <Row xs={1} md={columnsPerRow}>
      {activity.map((act, index) => {
        const img = require(`../images/${act.img}`)
        console.log(img)
        return(
            <Col sm={4}>
            <Card style={{padding: '2px', margin: '5px'}} key={index}>
              <Card.Header as="h5" style={{backgroundColor: '#ffbd59', color: 'black'}}>{act.name}</Card.Header>
                <Card.Body>
                    <Card.Img src={img} height={'150px'} alt='Event'/>
                    <Card.Text>
                    <p>{act.venue}</p>
                    </Card.Text>
                    <Button style={{backgroundColor: '#ffbd59', color:'black'}}>Register</Button>
                </Card.Body>
              <Card.Footer as="h5" style={{ color: 'black'}}>{act.date}</Card.Footer>
            </Card>
            </Col>
            
        )
      })}  
    
    </Row>
  );
}

export default InfoCard;