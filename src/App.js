import {useState}  from 'react';

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

function App() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [octal, setOctal] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');
  const [nowState, setNowState] = useState(0);
  const [isInvalid, setInvalid] = useState(false);

  const stateNowTarget =
  [
    "binary",
    "octal",
    "decimal",
    "hexadecimal"
  ]

  const handleDecimalChange = (event) => {
    const getValue = event.target.value;
    setInvalid(false);

    if(nowState == 0)
    {
      setBinary(getValue);

      if (/^[01]+$/.test(getValue)) {
        const octalValue = parseInt(getValue, 2).toString(8);
        const DecimalValue = parseInt(getValue, 2).toString(10);
        const hexadecimalValue = parseInt(getValue, 2).toString(16).toUpperCase();
        setOctal(octalValue);
        setDecimal(DecimalValue);
        setHexadecimal(hexadecimalValue);
      } else {
        setOctal('Invalid input');
        setDecimal('Invalid input');
        setHexadecimal('Invalid input');
        setInvalid(true);
      }
    }
    else if(nowState == 1)
    {
      setOctal(getValue);

      if (/^[0-7]+$/.test(getValue)) {
        const binaryValue = parseInt(getValue, 8).toString(2);
        const DecimalValue = parseInt(getValue, 8).toString(10);
        const hexadecimalValue = parseInt(getValue, 8).toString(16).toUpperCase();
        setBinary(binaryValue);
        setDecimal(DecimalValue);
        setHexadecimal(hexadecimalValue);
      } else {
        setBinary('Invalid input');
        setDecimal('Invalid input');
        setHexadecimal('Invalid input');
        setInvalid(true);
      }
    }
    else if(nowState == 2)
    {
      setDecimal(getValue);

      if (/^[0-9]*$/.test(getValue)) {
        const binaryValue = parseInt(getValue, 10).toString(2);
        const octalValue = parseInt(getValue, 10).toString(8);
        const hexadecimalValue = parseInt(getValue, 10).toString(16).toUpperCase();
        setBinary(binaryValue);
        setOctal(octalValue);
        setHexadecimal(hexadecimalValue);
      } else {
        setBinary('Invalid input');
        setOctal('Invalid input');
        setHexadecimal('Invalid input');
        setInvalid(true);
      }
    }
    else if(nowState == 3)
    {
      setHexadecimal(getValue);

      if (/^[0-9A-Fa-f]+$/.test(getValue)) {
        const binaryValue = parseInt(getValue, 16).toString(2);
        const octalValue = parseInt(getValue, 16).toString(8);
        const DecimalValue = parseInt(getValue, 16).toString(10);
        setBinary(binaryValue);
        setOctal(octalValue);
        setDecimal(DecimalValue);
      } else {
        setBinary('Invalid input');
        setOctal('Invalid input');
        setDecimal('Invalid input');
        setInvalid(true);
      }
    }
  };


  function HandleDropDown ()
  {
    var StateNow = [];

    for(let i = 0;i<4;i++)
    {
      if(nowState != i){
        StateNow.push(<Dropdown.Item key={i} onClick={
          ()=>{
            Clear();
            setNowState(i);
          }
        }>{ stateNowTarget[i] }</Dropdown.Item>);
      }
    }

    return (
      <Dropdown.Menu>
        {StateNow}
      </Dropdown.Menu>
    );
  };

  function ViewResult ()
  {
    var result = [];
    let resultValue = 0;

    

    for(let i=0;i<4;i++)
    {
      if(i == 0)
        resultValue = binary
      else if(i == 1)
        resultValue = octal;
      else if(i == 2)
        resultValue = decimal;
      else if(i == 3)
        resultValue = hexadecimal;

      if(nowState != i)
        result.push(<p key={i}>{stateNowTarget[i]} Equivalent: {resultValue}</p>)
    }

    return result;
  }

  function Clear()
  {
    setBinary('');
    setDecimal('');
    setOctal('');
    setHexadecimal('');
    setInvalid(false);
  }

  function GetFrom()
  {
    if(nowState == 0)
      return binary;
    else if(nowState == 1)
      return octal;
    else if(nowState == 2)
      return decimal;
    else if(nowState == 3)
      return hexadecimal;
  }

  return (
      <Container className='root'>
        <Card className='cardroot'>
          <Row>
            <Col>
              <h2>Number Converter</h2>
            </Col>
            <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {stateNowTarget[nowState]}
              </Dropdown.Toggle>
              <HandleDropDown />
              
            </Dropdown>
            </Col>
            <Col>
              <Button onClick={Clear}> Clear</Button>
            </Col>
          </Row>
        
        
          <Form>
            <Form.Group>
              <Form.Label>Enter a {stateNowTarget[nowState]} Number:</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      value={GetFrom()}
                      onChange={handleDecimalChange}
                      //invalid 들어오면 빨간색 뜨게 작업
                      required 
                      isInvalid = {isInvalid}
                    />

                    <Form.Control.Feedback type="invalid">
                      Invalid number
                    </Form.Control.Feedback>
                  </InputGroup>
            </Form.Group>
          </Form>
          <Row>
              <ViewResult/>
          </Row>
        </Card>
      
    </Container>

  );
}

export default App;
