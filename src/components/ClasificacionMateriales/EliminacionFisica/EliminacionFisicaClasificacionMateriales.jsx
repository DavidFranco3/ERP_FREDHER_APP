import { useState } from 'react';
import "./EliminacionFisicaClasificacionMateriales.scss";
import { Button, Col, Form, Row, Spinner, Container, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { eliminaClasificacionMaterial } from "../../../api/clasificacionMateriales";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import queryString from "query-string";

function EliminacionFisicaClasificacionMateriales(props) {
    const { data, history, setShowModal, setRefreshCheckLogin } = props;

    const { id } = data;

    // Ruta para enlazar a pagina de usuarios
    const regresaPagina = () => {
        setShowModal(false);
    }

    // Para almacenar los datos del formulario
    const [formData, setFormData] = useState(initialFormData(data));

    // Para el icono de cargando del boton
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        //console.log(formData);
        //console.log(fotoUsuario)

        try {

            // console.log(data.secure_url)

            setLoading(true);

            try {
                eliminaClasificacionMaterial(id).then(response => {
                    const { data } = response;
                    LogsInformativos("Se ha eliminado el material " + formData.nombre, formData);
                    history({
                        search: queryString.stringify(""),
                    });
                    toast.success(data.mensaje);
                    setShowModal(false);
                }).catch(e => {
                    console.log(e)
                    if (e.message === 'Network Error') {
                        //console.log("No hay internet")
                        toast.error("Conexión al servidor no disponible");
                        setLoading(false);
                    } else {
                        if (e.response && e.response.status === 401) {
                            const { mensaje } = e.response.data;
                            toast.error(mensaje);
                            setLoading(false);
                        }
                    }
                })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Container>
                <div className="formularioDatos">
                    <Alert variant="danger">
                        <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                        <p className="mensaje">
                            Esta acción eliminara en el sistema el material.
                        </p>
                    </Alert>

                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNombre">
                                <Form.Label>
                                    Nombre
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escribe el nombre"
                                    name="nombre"
                                    defaultValue={formData.nombre}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>
                                    Descripción
                                </Form.Label>

                                <Form.Control
                                    as="textarea"
                                    placeholder='Descripcion'
                                    defaultValue={formData.descripcion}
                                    name="descripcion"
                                    style={{ height: '100px' }}
                                    disabled
                                />
                            </Form.Group>
                        </Row>

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
                                        regresaPagina()
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    );
}

function initialFormData(data) {
    return {
        nombre: data.nombre,
        descripcion: data.descripcion
    }
}

export default EliminacionFisicaClasificacionMateriales;
