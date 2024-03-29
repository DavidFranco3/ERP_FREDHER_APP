import { useState } from 'react';
import { Alert, Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import LayoutPrincipal from "../../../layout/layoutPrincipal";
import { useNavigate } from "react-router-dom";

function CancelacionInspeccion(props) {
    const { setShowModal, setMotivoCancelacion, setRevision, revision } = props;
    const [formData, setFormData] = useState(initialFormValue());
    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    const cancelarCancelacion = () => {
        setShowModal(false);
        setRevision(revision - 1);
    }

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setMotivoCancelacion(formData.motivoCancelacion)
        setShowModal(false);
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Container>
                <div className="formularioDatos">
                    <Alert variant="danger">
                        <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                        <p className="mensaje">
                            Esta acción cancelara la revision.
                        </p>
                    </Alert>

                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row ClassName="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                <Form.Label align="center">
                                    Motivos de la cancelación
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Motivos de la cancelación"
                                    name="motivoCancelacion"
                                    defaultValue={formData.motivoCancelacion}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Cancelar la inspección"
                                    variant="success"
                                    className="registrar"
                                >
                                    {!loading ? "Guardar" : <Spinner animation="border" />}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    title="Cerrar el formulario"
                                    className="cancelar"
                                    onClick={() => {
                                        cancelarCancelacion()
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

function initialFormValue() {
    return {
        motivoCancelacion: "",
    }
}

export default CancelacionInspeccion;
