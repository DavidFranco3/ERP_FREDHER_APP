import { useState } from 'react';
import "./ModificacionClasificacionMateriales.scss";
import { Button, Col, Form, Row, Spinner, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { actualizaClasificacionMaterial } from "../../../api/clasificacionMateriales";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import queryString from "query-string";

function ModificacionClasificacionMateriales(props) {
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

            const dataTemp = {
                nombre: formData.nombre,
                descripcion: formData.descripcion
            }

            setLoading(true);

            try {
                actualizaClasificacionMaterial(id, dataTemp).then(response => {
                    const { data } = response;
                    LogsInformativos("Se ha modificado el material " + dataTemp.nombre, dataTemp);
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
                                        {!loading ? "Modificar" : <Spinner animation="border" />}
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

export default ModificacionClasificacionMateriales;
