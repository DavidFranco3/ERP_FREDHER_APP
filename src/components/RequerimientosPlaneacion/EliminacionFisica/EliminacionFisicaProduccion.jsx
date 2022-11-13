import { useState, useEffect } from 'react';
import {eliminaUsuario} from "../../../api/usuarios";
import {toast} from "react-toastify";
import queryString from "query-string";
import {Button, Col, Form, Row, Spinner, Alert} from "react-bootstrap";
import {eliminaRequerimiento} from "../../../api/requerimientosPlaneacion";
import {LogsInformativos} from "../../Logs/LogsSistema/LogsSistema";

function EliminacionFisicaProduccion(props) {
    const { datosPedido, datos, setShowModal, history } = props;
    const { id, folio, fechaElaboracion,  } = datosPedido;

    //console.log(datosPedido)
    
    // Para cancelar la actualizacion
    const cancelarEliminacion = () => {
        setShowModal(false)
    }


    // Para almacenar datos del formulario
    const [formData, setFormData] = useState(initialFormData(datosPedido));

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);
        //console.log(dataTemp)

        try {
            eliminaRequerimiento(id).then(response => {
                const { data } = response;
                // console.log(data)
                toast.success(data.mensaje)
                LogsInformativos(`Se ha eliminado el requerimiento y planeacion con el folio ${folio}`, datos)
                setShowModal(false);
                setLoading(false);
                history.push({
                    search: queryString.stringify(""),
                });
            })
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>
            
            <Alert variant="danger">
                <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                <p className="mensaje">
                    Esta acción eliminara del sistema el requerimiento.
                </p>
            </Alert>
            
                <Form.Group as={Row} className="botones">
                        <Col>
                            <Button
                                type="submit"
                                variant="success"
                                className="registrar"
                            >
                                {!loading ? "Eliminar" : <Spinner animation="border" />}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                className="cancelar"
                                onClick={() => {
                                    cancelarEliminacion()
                                }}
                            >
                                Cancelar
                            </Button>
                        </Col>
                    </Form.Group>
            </Form>
        </>
    );
}

function initialFormData(data) {
    const { nombre, apellidos  } = data;

    return {
        nombre: nombre,
        apellidos: apellidos
    }
}

export default EliminacionFisicaProduccion;
