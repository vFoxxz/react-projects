
import React, { PureComponent, useEffect, useState } from "react";
import "./index.scss";
import storage, { remove } from 'local-storage'
import { adicionarDado } from "../../services";
import { toast, Toaster } from 'react-hot-toast'
import { ThemeContext } from "@emotion/react";
export default function ControleFinanceiro() {
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState(0)

    const [resultado, setResultado] = useState([])

    const [soma, setSoma] = useState(0)
    const [sub, setSub] = useState(0)
    const [total, setTotal] = useState(0)

    const [checked, setChecked] = useState("entrada");

    function salvarDado() {
        let dado
        if (checked === 'entrada') {
            dado = ({
                "descricao": descricao,
                "tipo": "Entrada",
                "valor": valor
            })

        }

        if (checked === 'saida') {
            dado = ({
                "descricao": descricao,
                "tipo": "Saída",
                "valor": valor
            })
        }


        const resposta = adicionarDado(dado)

        if (storage('dados')) {
            let antiga = storage('dados')

            let array = antiga.concat(resposta)
            //Tirar itens repetidos de array de objetos
            array = array.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))

            storage('dados', array)

            setResultado(array)
        }
        else {
            storage('dados', resposta)
            setResultado(resposta)
        }

    }

    function CalcularEntradaeSaida() {
        if (storage('dados')) {
            let array = []
            let array2 = []

            let preco = storage('dados')

            //Calcular Soma da entrada

            array = preco.filter((item) => item.tipo !== 'Saída')
            let juntar = array.map(item =>
                Number(item.valor)
            );
            //Calcular Soma da saída
            array2 = preco.filter((item) => item.tipo !== 'Entrada')
            let subtrair = array2.map(item =>
                Number(item.valor)
            );

            //Repetição para Somar todos itens do array
            let sum = 0

            for (var i = 0; i < juntar.length; i++) {
                sum += juntar[i];
            }
            setSoma(sum)

            let sub = 0

            for (var i = 0; i < subtrair.length; i++) {
                sub += subtrair[i];
            }
            setSub(sub)

            //Calcular Total

            let total = sum - sub

            setTotal(total)
        }

    }



    useEffect(() => {
        CalcularEntradaeSaida()
    }, [salvarDado])

    useEffect(() => {
        if (storage('dados')) {
            setResultado(storage('dados'))
        }
    }, [])

    function ApagarDado(posicao) {
        let filter = storage('dados').filter((item, pos) =>
            pos !== posicao)

            const style = {
                color: "white",
                backgroundColor: "DodgerBlue",
                padding: "5px",
                borderRadius: "10px",
                border:"none",
                fontFamily: "poppins",
                marginRight: "1.5em"
              };

        toast((t) => (
            <span>
                <p style={{fontFamily: "poppins"}}>Deseja apagar?</p>
            
                <button style={style} onClick={() => {
                    storage('dados', filter);
                    setResultado(filter);
                    toast.dismiss(t.id)
                }}>
                    Sim
                </button>
                <button className="botao-apagar" style={style} onClick={() => toast.dismiss(t.id)}>
                    Não
                </button>
                
            </span>
        ));
    }

    return (
        <div className="financas">
            <Toaster />
            <h1>Controle de finanças</h1>
            <div className="cards">
                <div className="valores">
                    <h3>Entradas</h3>
                    <h1>R${soma}</h1>
                </div>
                <div className="valores">
                    <h3>Saídas</h3>
                    <h1>R${sub}</h1>
                </div>
                <div className="valores">
                    <h3>Total</h3>
                    <h1>R${total}</h1>
                </div>
            </div>
            <section className="resultados">
                <div className="alinhar">
                    <div className="input-valor">

                        <h3>Descrição</h3>
                        <input type='text' value={descricao} onChange={e => setDescricao(e.target.value)} />
                        <h3>Valor</h3>
                        <input type='number' min={0} value={valor} onChange={e => setValor(e.target.value)} />
                        {checked === 'entrada' &&
                            <button onClick={salvarDado}>Salvar</button>

                        }
                        {checked === 'saida' &&
                            <button onClick={salvarDado}>Salvar</button>

                        }
                    </div>
                    <div className="selecao">
                        <h3>Selecione</h3>
                        <div className="alinhar-selecao">
                            <input type="radio" name="payment" id="entrada" checked={checked === "entrada"} value='entrada' onChange={(e) => { setChecked(e.target.value) }} />
                            <label for="entrada">
                                <span>Entrada</span>
                            </label>
                            <input type="radio" name="payment" id="saida" checked={checked === "saida"} value='saida' onChange={(e) => { setChecked(e.target.value) }} />
                            <label for="saida">

                                <span>Saída</span>
                            </label>
                        </div>

                    </div>

                    <table>
                        <thead>

                            <tr>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Apagar</th>
                            </tr>

                        </thead>
                        <tbody>

                            {resultado.map((item, pos) =>

                                <tr>
                                    <td>{item.descricao}</td>
                                    <td>{item.tipo}</td>
                                    <td>R${item.valor}</td>
                                    <td><button onClick={() => ApagarDado(pos)}>
                                        <img src="/assets/images/apagar.png" />
                                    </button>
                                    </td>
                                </tr>
                            )}






                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}