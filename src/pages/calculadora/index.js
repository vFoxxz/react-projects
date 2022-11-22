import React, { useState } from "react";
import "./index.scss";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";

export default function Calculadora() {
  const [num, setNum] = useState("0")
  const [oldnum, setOldNum] = useState(0);
  const [operator, setOperator] = useState();

  function selecionarNumero(e) {
    const valor = e.target.value

    if(num === '0') {
        setNum(valor)
    }
    else{
        setNum(num + valor)
    }
  }

  function Clear() {
    setNum('0')
  }

  function apagarUltimo() {
    setNum(num.slice(0, -1))
  }

  function trocarSinal(e) {
    var operatorInput = e.target.value;
    setOperator(operatorInput);
    setOldNum(num);
    setNum(0);
  }

  function calcular() {
    if (operator === "/") {
      setNum(parseFloat(oldnum) / parseFloat(num));
    } else if (operator === "X") {
      setNum(parseFloat(oldnum) * parseFloat(num));
    } else if (operator === "-") {
        console.log(oldnum)
        console.log(num)
        console.log(oldnum-num)
      setNum(parseFloat(oldnum) - parseFloat(num));
    } else if (operator === "+") {
      setNum(parseFloat(oldnum) + parseFloat(num));
    }
  }

  function porcentagem() {
    setNum(num / 100);
  }

  function mudarSinal() {
    if (num > 0) {
      setNum(-num);
    } else {
      setNum(Math.abs(num));
    }
  }

  return (
    <div className="calc">
      <Box m={5} />
      <Container maxWidth="xs">
        <div className="wrapper">
          <Box m={12} />
          <h1 className="result">{num}</h1>
          <button onClick={Clear}>AC</button>
          <button onClick={mudarSinal}>+/-</button>
          <button onClick={porcentagem}>%</button>
          <button className="orange" onClick={trocarSinal} value="/">
            /
          </button>
          <button className="gray" onClick={selecionarNumero}  value={7}>
            7
          </button>
          <button className="gray" onClick={selecionarNumero} value={8}>
            8
          </button>
          <button className="gray" onClick={selecionarNumero} value={9}>
            9
          </button>
          <button className="orange" onClick={trocarSinal}  value="X">
            X
          </button>
          <button className="gray" onClick={selecionarNumero}  value={4}>
            4
          </button>
          <button className="gray" onClick={selecionarNumero} value={5}>
            5
          </button>
          <button className="gray" onClick={selecionarNumero} value={6}>
            6
          </button>
          <button className="orange" onClick={trocarSinal}  value="-">
            -
          </button>
          <button className="gray" onClick={selecionarNumero} value={1}>
            1
          </button>
          <button className="gray" onClick={selecionarNumero} value={2}>
            2
          </button>
          <button className="gray" onClick={selecionarNumero} value={3}>
            3
          </button>
          <button className="orange" onClick={trocarSinal}  value="+">
            +
          </button>
          <button className="gray" onClick={selecionarNumero} value={0}>
            0
          </button>
          <button className="gray" value={"."}>
            ,
          </button>
          
          <button className="gray" onClick={apagarUltimo}>
          ⌫
          </button>
         
          <button className="orange" onClick={calcular}>
            =
          </button>
        </div>
      </Container>
    </div>
  );
}