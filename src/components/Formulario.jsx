import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import Error from './Error';


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;

    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, SetCriptos] = useState([])
    const [error, SetError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const response = await fetch(url);
            const result = await response.json();

            const arrayCriptos = result.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto
            });

            SetCriptos(arrayCriptos);
        }
        consultarAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes('')) {
            SetError(true)
            return
        }
            SetError(false)
            setMonedas({
                moneda,
                criptomoneda
            })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>

                <SelectMonedas />
                <SelectCriptomoneda />

                <InputSubmit
                    type="submit"
                    value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
