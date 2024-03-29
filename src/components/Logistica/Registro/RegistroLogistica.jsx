import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Col, Row, Form, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import { toast } from "react-toastify";

function RegistroLogistica(props) {
    const { setRefreshCheckLogin } = props;

    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento("/Logistica")
    }

    // Cerrado de sesión automatico
    useEffect(() => {
        if (getTokenApi()) {
            if (isExpiredToken(getTokenApi())) {
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
                logoutApi();
                setRefreshCheckLogin(true);
            }
        }
    }, []);
    // Termina cerrado de sesión automatico

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Registro logística
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <h1>
                            Folio-{"1"}
                        </h1>
                    </Col>
                </Row>
            </Alert>

            <Container fluid>
                <div className="formularioDatos">
                    <Form>
                        <br />
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Embarque enviado
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Embarque enviado"
                                    name="embarqueEnviado"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Fecha de partida
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Fecha de partida"
                                    name="fechaPartida"
                                />
                            </Form.Group>
                        </Row>

                        <br />

                        <Row className="mb-3">
                            <Form.Label align="center">
                                Costos
                            </Form.Label>
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Costo ida
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Costo ida"
                                    name="costoIda"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Costo vuelta
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Costo vuelta"
                                    name="costoVuelta"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Ubicacion del vehiculo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ubicacion del vehiculo"
                                    name="ubicacionVehiculo"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Guardar la información del formulario"
                                    variant="success"
                                    className="registrar"
                                >
                                    {"Registrar"}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    title="Cerrar el formulario"
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
        </>
    );
}

export default RegistroLogistica;
