import { useState } from 'react';
import "./RegistroGestionAlmacen.scss";
import { Button, Col, Form, Row, Spinner, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { registraAlmacenes } from "../../../api/gestionAlmacen";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import queryString from "query-string";
import { getSucursal } from "../../../api/auth";

function RegistroGestionAlmacen(props) {
    const { history, setShowModal, setRefreshCheckLogin } = props;

    // Ruta para enlazar a pagina de usuarios
    const regresaPagina = () => {
        setShowModal(false);
    }

    // Para almacenar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());

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
                descripcion: formData.descripcion,
                sucursal: getSucursal(),
                status: "true",
            }

            setLoading(true);

            try {
                registraAlmacenes(dataTemp).then(response => {
                    const { data } = response;
                    LogsInformativos("Se ha registrado un nuevo almacen " + dataTemp.nombre, dataTemp);
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

                        <Form.Group as={Col} className="botones">
                            <Row>
                                <Col>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="registrar"
                                    >
                                        {!loading ? "Registrar" : <Spinner animation="border" />}
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
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    );
}

function initialFormData() {
    return {
        nombre: "",
        descripcion: ""
    }
}

export default RegistroGestionAlmacen;
