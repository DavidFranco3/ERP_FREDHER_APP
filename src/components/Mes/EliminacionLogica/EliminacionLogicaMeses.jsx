import { useState, useEffect } from 'react';
import queryString from "query-string";
import "./EliminacionLogicaMeses.scss";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { eliminaDepartamento } from "../../../api/departamentos";
import { toast } from "react-toastify";
import { actualizaEstadoMes } from "../../../api/mes";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function EliminacionLogicaMeses(props) {
    const { data, setShowModal, history } = props;
    const { id, folio, mes, dias, noMaquinas, estado } = data;

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    // Para cancelar el registro
    const cancelar = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const dataTemp = {
            estado: estado === "false" ? "true" : "false"
        }
        //console.log(dataTemp)

        try {
            actualizaEstadoMes(id, dataTemp).then(response => {
                const { data } = response;
                //console.log(data)
                toast.success(data.mensaje);
                LogsInformativos("Se ha actualizado el estado de mes " + folio, data);
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


    return (
        <>
            <Form onSubmit={onSubmit}>

                {estado == "true" ?
                    (
                        <>
                            <Alert variant="danger">
                                <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción deshabilitara en el sistema el mes.
                                </p>
                            </Alert>
                        </>
                    ) : (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Atención! Acción contructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción habilitara en el sistema el mes.
                                </p>
                            </Alert>
                        </>
                    )
                }

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
                            Mes
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={mes}
                            disabled
                        />
                    </Form.Group>
                </Row>

                <br />

                <Row>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Dias del mes
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={dias}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Numero de maquinas
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={noMaquinas}
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
                            {!loading ? (estado === "true" ? "Deshabilitar" : "Habilitar") : <Spinner animation="border" />}
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
                            Cancelar
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default EliminacionLogicaMeses;