import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Col, Row, Form, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import { toast } from "react-toastify";
import { LogsInformativos, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";

function RegistroEmbarque(props) {
    const { setRefreshCheckLogin } = props;

    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento("/Embarque")
    }

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const cierreAutomatico = () => {
        if (getTokenApi()) {
            if (isExpiredToken(getTokenApi())) {
                LogsInformativosLogout("Sesión finalizada", setRefreshCheckLogin)
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
                logoutApi();
                setRefreshCheckLogin(true);
            }
        }
    }

    // Cerrado de sesión automatico
    useEffect(() => {
        cierreAutomatico();
    }, []);
    // Termina cerrado de sesión automatico

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Embarque
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <h1>
                            Folio-{"1"}
                        </h1>
                    </Col>
                </Row>
            </Alert>

            <br />

            <Container fluid>
                <div className="formularioDatos">
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Unidad almacén
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Unidad almacén"
                                    name="unidadAlmacen"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Unidad transporte
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Unidad transporte"
                                    name="unidadTransporte"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Fecha de carga
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Fecha de carga"
                                    name="fechaCarga"
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

                        <br />

                    </Form>
                </div>
            </Container>
        </>
    );
}

export default RegistroEmbarque;
