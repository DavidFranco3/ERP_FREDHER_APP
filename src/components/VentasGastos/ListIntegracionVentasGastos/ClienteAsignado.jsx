import { useState, useEffect } from 'react';
import { obtenerCliente } from "../../../api/clientes";
import { toast } from "react-toastify";

function ProductoAsignado(props) {
    const { id } = props;

    // Para almacenar el nombre del cliente
    const [nombreCliente, setNombreCliente] = useState("");

    const cargarNombreCliente = () => {
        //
        try {
            obtenerCliente(id).then(response => {
                const { data } = response;
                // console.log(data)
                const { nombre, apellidos } = data;
                setNombreCliente(nombre + " " + apellidos)
            }).catch(e => {
                //console.log(e)
                if (e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarNombreCliente();
    }, []);

    return (
        <>
            {nombreCliente}
        </>
    );
}

export default ProductoAsignado;
