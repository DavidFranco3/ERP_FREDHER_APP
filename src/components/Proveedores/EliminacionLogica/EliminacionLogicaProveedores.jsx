import { useState, useEffect } from 'react';
import { deshabilitaUsuario } from "../../../api/usuarios";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { deshabilitaProveedores } from "../../../api/proveedores";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function EliminacionLogicaProveedores(props) {
    const { history, dataProveedor, setShowModal } = props;
    const { id, nombre, apellidos, estadoProveedor } = dataProveedor;

    //console.log(dataUsuario)

    // Para cancelar el registro
    const cancelar = () => {
        setShowModal(false)
    }

    // Para almacenar datos del formulario
    const [formData, setFormData] = useState(initialFormData(dataProveedor));

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const dataTemp = {
            estadoProveedor: estadoProveedor === "false" ? "true" : "false"
        }
        //console.log(dataTemp)

        try {
            deshabilitaProveedores(id, dataTemp).then(response => {
                const { data } = response;
                //console.log(data)
                if (dataTemp.estadoProveedor === "true") {
                    LogsInformativos("El proveedor " + formData.nombre + " se habilito", dataProveedor)
                    toast.success("Proveedor habilitado");
                }
                if (dataTemp.estadoProveedor === "false") {
                    LogsInformativos("El proveedor " + formData.nombre + " se inhabilito", dataProveedor)
                    toast.success("Proveedor deshabilitado");
                }
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
                {estadoProveedor == "true" ?
                    (
                        <>
                            <Alert variant="danger">
                                <Alert.Heading>Atenci??n! Acci??n destructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acci??n deshabilitara en el sistema al proveedor.
                                </p>
                            </Alert>
                        </>
                    ) : (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Atenci??n! Acci??n constructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acci??n habilitara en el sistema al proveedor.
                                </p>
                            </Alert>
                        </>)
                }
                <Row>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.nombre}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Telefono celular
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.telefonoCelular}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <br />

                <Row>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            RFC
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.rfc}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Correo
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.correo}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <Form.Group as={Row} className="botones">
                    <Col>
                        <Button
                            variant="success"
                            title={estadoProveedor === "true" ? "Deshabilitar" : "Habilitar"}
                            type="submit"
                            className='registrar'
                        >
                            {!loading ? (estadoProveedor === "true" ? "Deshabilitar" : "Habilitar") : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            className="cancelar"
                            title="Cerrar el formulario"
                            onClick={() => {
                                cancelar()
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
    const { nombre, apellidos, telefonoCelular, rfc, correo } = data;

    return {
        nombre: nombre,
        apellidos: apellidos,
        telefonoCelular: telefonoCelular,
        rfc: rfc,
        correo: correo
    }
}

export default EliminacionLogicaProveedores;
