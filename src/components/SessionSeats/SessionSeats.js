
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import axios from 'axios';

import { Container, Labels, Buttom, Forms } from "./Style.js"
import Footer from "../Footer/Footer";

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function SessionSeats() {

    const params = useParams();
    const { idSession } = params;

    const [session, setSession] = useState({});

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);
    
    return (
        <Container>
            <h2>Selecione o(s) assento(s)</h2>
            <div>
               {session.seats ? session.seats.map((seat, index)=>(
                   <Seat 
                        key = {seat.id}
                        seat = {seat} 
                        index = {index}
                   />
               )) : "Carregando assentos..."}
            </div>

            <Labels>
                <li>
                    <div className="circle selected"></div>
                    <p>Selecionado</p>
                </li>
                <li>
                    <div className="circle available"></div>
                    <p>Disponível</p>
                </li>
                <li>
                    <div className="circle unavailable"></div>
                    <p>Indisponível</p>
                </li>
            </Labels>

            <Forms>
                <h3>Nome do comprador:</h3>
                <input type="text" placeholder="Digite seu nome..." ></input>
                <h3>CPF do comprador:</h3>
                <input type="number" placeholder="Digite seu CPF..." ></input>
            </Forms>

            <Link to="/filme/sessao/:idSessao/sucesso">
                <button className="submit">
                    Reservar assento(s)
                </button>
            </Link>

            <Footer 
                movie = {session.movie}
                day = {session.day}
                time = {session.name}
            />
        </Container>
    );
}

function Seat(props){
    const {
        seat,
        index
    } = props;

    const [isSelected, setIsSelected] = useState(false);

    function select(){
        if(seat.isAvailable) setIsSelected(true);
        else alert("Esse assento não está disponível");
        if(isSelected) setIsSelected(false);
    }

    return(
        <Buttom
        isAvailable = {seat.isAvailable}
        onClick={select} 
        isSelected = {isSelected}
        >
            {index + 1}
        </Buttom>
    );
}