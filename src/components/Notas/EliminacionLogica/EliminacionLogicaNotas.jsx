import { useState, useEffect } from 'react';
import queryString from "query-string";
import "./EliminacionLogicaNotas.scss";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { actualizaEstadoNotas } from "../../../api/notas";
import { obtenerDatosFactura } from "../../../api/facturas";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import { LogCuentaActualizacion } from "../../CuentasClientes/Gestion/GestionCuentasClientes";

function EliminacionLogicaNotas(props) {
    const { datos, setShowModal, history } = props;
    const { id, folio, factura, tipo, total, estado } = datos;

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    // Para cancelar el registro
    const cancelar = () => {
        setShowModal(false)
    }

    const [cliente, setCliente] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");

    const cargarDatosFactura = () => {
        //
        obtenerDatosFactura(factura).then(response => {
            const { data } = response;
            //console.log(data)
            setCliente(data.cliente);
            setNombreCliente(data.nombreCliente);
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        cargarDatosFactura();
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const dataTemp = {
            estado: estado === "false" ? "true" : "false"
        }
        //console.log(dataTemp)

        try {
            actualizaEstadoNotas(id, dataTemp).then(response => {
                const { data } = response;
                //console.log(data)
                toast.success(data.mensaje);
                LogsInformativos("Se ha cancelado la nota de " + tipo + " con folio " + folio, datos);
                LogCuentaActualizacion(cliente, nombreCliente, tipo == "Cargo" ? parseFloat(total) * -1 : tipo == "Credito" ? parseFloat(total) : tipo == "Devolución" ? parseFloat(total) : "");
                setShowModal(false);
                history({
                    search: queryString.stringify(""),
                });
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Form onSubmit={onSubmit}>

                <Alert variant="danger">
                    <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                    <p className="mensaje">
                        Esta acción cancelara la orden de venta de {tipo}.
                    </p>
                </Alert>

                <Row>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Folio
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={folio}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Cuenta por cobrar
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={factura}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <br />

                <Row>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Tipo
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={tipo}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Total
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={total}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <Form.Group as={Row} className="botones">
                    <Col>
                        <Button
                            variant="success"
                            title={estado === "true" ? "Deshabilitar" : "Habilitar"}
                            type="submit"
                            className="registrar">
                            {!loading ? "Aceptar" : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            title="Cerrar el formulario"
                            className="cancelar"
                            onClick={() => {
                                cancelar()
                            }}
                        >
                            Cerrar
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default EliminacionLogicaNotas;
