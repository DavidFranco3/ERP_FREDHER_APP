import { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import LayoutPrincipal from "../../../layout/layoutPrincipal";
import { useHistory } from "react-router-dom";

function RegistroMaquinasMantenimientos(props) {

    // Para definir el enrutamiento
    const enrutamiento = useHistory()

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento.push("/VerificacionMantenimientos")
    }

    // Define la ruta de registro
    const rutaRegistro = () => {
        enrutamiento.push("/RegistroVerificacionMantenimientos")
    }

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    return (
        <>
            <LayoutPrincipal>
                <Alert>
                    <Row>
                        <Col xs={12} md={8}>
                            <h1>
                                Nuevo registro de maquinas y mantenimientos
                            </h1>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                className="btnRegistroVentas"
                                onClick={() => {
                                    rutaRegistro()
                                }}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} /> Nuevo mantenimiento
                            </Button>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                className="btnRegistroVentas"
                                onClick={() => {
                                    rutaRegreso()
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                            </Button>
                        </Col>
                    </Row>
                </Alert>

                <br />

                <Container fluid>
                    <div className="formularioDatos">
                        <Form>

                            <Row className="mb-3">
                                <Form.Group as={Row} controlId="formGridFolioAG">
                                    <Col sm="1">
                                        <Form.Label>
                                            Clasificación
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Clasificacion"
                                            nombre="clasificacion"
                                        />
                                    </Col>

                                    <Col sm="2">
                                        <Form.Label>
                                            Nombre/Descripcion
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre/Descripción"
                                            name="nombre"
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <table className="responsive-tableRegistroVentas"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">ITEM</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Reparaciones</th>
                                        <th scope="col">Observaciones</th>
                                        <th scope="col">Acciones</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                </tfoot>
                                <tbody>

                                </tbody>
                            </table>

                            <br />

                            <Form.Group as={Row} className="botones">
                                <Col>
                                    <Button
                                        variant="success"
                                        className="registrar"
                                    >
                                        {"Registrar"}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="danger"
                                        className="cancelar"
                                        onClick={() => {
                                            rutaRegreso()
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Container>
            </LayoutPrincipal>
        </>
    );
}

export default RegistroMaquinasMantenimientos;
