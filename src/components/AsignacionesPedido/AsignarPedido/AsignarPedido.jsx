import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { listarRegistrosGeneralesAlmacen} from "../../../api/almacenes";
import { map } from "lodash";
import { actualizaPedidoVenta } from "../../../api/asignacionPedido";
import { toast } from "react-toastify";
import queryString from "query-string";
import {LogsInformativos} from "../../Logs/LogsSistema/LogsSistema";

function AsignarPedido(props) {
    const { setShowModal, location, history, data } = props;

    // Para guardar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());
    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const { id, cliente, producto, cantidadPedida } = data;

    // Para almacenar el listado de materias primas
    const [listMateriasPrimas, setListMateriasPrimas] = useState(null);

    const obtenerListaMateriales = () => {
        try {
            listarRegistrosGeneralesAlmacen().then(response => {
                const { data } = response;
                // console.log(data)
                if (!listMateriasPrimas && data) {
                    setListMateriasPrimas(formatModelAlmacenPT(data));
                } else {
                    const datosProductos = formatModelAlmacenPT(data);
                    setListMateriasPrimas(datosProductos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerListaMateriales();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault()

        if (!formData.cantidadAsignada || !formData.plantaAsignada) {
            toast.warning("Completa el formulario")
        } else {

            setLoading(true)
            // Realiza registro de la aportación

            const dataTemp = {
                cantidadAsignada: formData.cantidadAsignada,
                plantaAsignada: formData.plantaAsignada,
            }

            actualizaPedidoVenta(id, dataTemp).then(response => {
                const { data } = response;
                toast.success(data.mensaje)
                LogsInformativos("Se asigno el pedido " + data.folio + " a la planta" + formData.plantaAsignada, dataTemp)
                setTimeout(() => {
                    setLoading(false)
                    history({
                        search: queryString.stringify(""),
                    });
                    setShowModal(false)
                }, 0)

            }).catch(e => {
                console.log(e)
            })
        }
    }

    // Cancelar y cerrar el formulario
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>

            <Container fluid>
                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row ClassName="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="4">
                                    <Form.Label>Producto</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control as="select"
                                        value={producto}
                                        name="producto"
                                        disabled
                                    >
                                        <option>Elige</option>
                                        {map(listMateriasPrimas, (productos, index) => (
                                            <option
                                                key={index}
                                                value={productos.idArticulo} selected={productos?.nombreArticulo === producto}
                                            >
                                                {producto.nombreArticulo}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Row>

                        <br />

                        <Row ClassName="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="4">
                                    <Form.Label>Cantidad Pedida</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Orden de venta"
                                        name="ordenVenta"
                                        value={cantidadPedida}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <br />

                        <Row ClassName="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="4">
                                    <Form.Label>Cantidad a asignar</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cantidad a asignar"
                                        name="cantidadAsignada"
                                        defaultValue={formData.cantidadAsignada}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <br />

                        <Row ClassName="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="4">
                                    <Form.Label>Planta Asignada</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Planta asignada"
                                        name="plantaAsignada"
                                        defaultValue={formData.plantaAsignada}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Registrar la asignación"
                                    variant="success"
                                    className="registrar"
                                >
                                    {!loading ? "Asignar" : <Spinner animation="border" />}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    title="Cerrar el formulario"
                                    className="cancelar"
                                    onClick={() => {
                                        cancelarRegistro()
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

function initialFormData(folio, fecha) {
    return {
        cantidadAsignada: "",
        plantaAsignada: "",
    }
}

function formatModelAlmacenPT(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            idArticulo: data.idArticulo,
            folioArticulo: data.folioArticulo,
            nombreArticulo: data.nombreArticulo,
            sucursal: data.sucursal,
            almacen: data.almacen,
            um: data.um,
            tipo: data.tipo,
            fecha: data.fecha,
            tipoArticulo: data.tipoArticulo,
            descripcion: data.descripcion,
            movimientos: data.movimientos,
            cantidadExistencia: data.cantidadExistencia,
            estado: data.estado,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default AsignarPedido;
