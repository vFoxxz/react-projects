import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export default function Home() {


    return (
        <div className="home">
            <h1>React Projects</h1>
            <div>
                <Link to='/calculadora'>Calculadora</Link>
                <Link to='/financeiro'>Controle Financeiro</Link>
            </div>
        </div>
    );
}