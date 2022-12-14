import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { map } from "lodash";
import { toast } from "react-toastify";
import { listarMatrizProductosActivos } from "../../../api/matrizProductos";
import { obtenerCliente } from '../../../api/clientes';
import { actualizaEtiquetasPiezas } from '../../../api/etiquetaPrimeraPieza'
import queryString from "query-string";
import {getSucursal} from "../../../api/auth";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function RegistraReporte(props) {
    const { data, setShowModal, history } = props;

    const { id, descripcionProducto } = data;

    // Para guardar los datos del formulario
    const [formData, setFormData] = useState(initialFormData(data));

    const cancelarRegistro = () => {
        setShowModal(false)
    }

    // Para almacenar el listado de productos activos
    const [listProductosActivos, setListProductosActivos] = useState(null);

    // Para traer el listado de productos activos
    useEffect(() => {
        try {
            listarMatrizProductosActivos(getSucursal()).then(response => {
                const { data } = response;
                // console.log(data)

                if (!listProductosActivos && data) {
                    setListProductosActivos(formatModelMatrizProductos(data));
                } else {
                    const datosProductos = formatModelMatrizProductos(data);
                    setListProductosActivos(datosProductos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    // Para almacenar la materia prima seleccionada
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);

    const handleProducto = (producto) => {
        // console.log(articulo)
        // {materiaprima?.folioMP + "/" + materiaprima?.nombre + "/" + materiaprima?.um + "/" + materiaprima?.existenciasOV + "/" + materiaprima?.existenciasStock + "/" + materiaprima?.existenciasTotales}
        const temp = producto.split("/")
        // console.log(temp)

        // console.log(dataTemp)
        setProductoSeleccionado({
            id: temp[0],
            cliente: temp[1],
            peso: temp[2],
            noCavidades: temp[3]
        })
    }

    const [nombreCliente, setNombreCliente] = useState("");

    useEffect(() => {
        try {
            obtenerCliente(productoSeleccionado != "" ? productoSeleccionado?.cliente : formData.cliente).then(response => {
                const { data } = response;
                const { nombre, apellidos } = data;
                setNombreCliente(nombre + " " + apellidos)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, [formData.producto]);

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!formData.fecha || !formData.noMaquina || !formData.inspector || !formData.supervisor || !formData.turno) {
            toast.warning("Completa el formulario")
        } else {

            setLoading(true)
            // Realiza registro de la aportaci??n

            const dataTemp = {
                fecha: formData.fecha,
                noMaquina: formData.noMaquina,
                descripcionProducto: productoSeleccionado != "" ? productoSeleccionado.id : formData.producto,
                cliente: productoSeleccionado != "" ? productoSeleccionado.cliente : formData.cliente,
                peso: productoSeleccionado != "" ? productoSeleccionado.peso : formData.peso,
                noCavidades: productoSeleccionado != "" ? productoSeleccionado.noCavidades : formData.noCavidades,
                turno: formData.turno,
                inspector: formData.inspector,
                supervisor: formData.supervisor
            }

            actualizaEtiquetasPiezas(id, dataTemp).then(response => {
                const { data } = response;
                LogsInformativos("Informacion de la primera pieza actualizada " + id, dataTemp)
                toast.success(data.mensaje);
                setTimeout(() => {
                    setLoading(false)
                    history.push({
                        search: queryString.stringify(""),
                    });
                    setShowModal(false)
                }, 2000)

            }).catch(e => {
                console.log(e)
            })
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
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Fecha
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="date"
                                        placeholder="Escribe la fecha"
                                        name="fecha"
                                        defaultValue={formData.fecha}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        No. Maquina
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Escribe el numero de la maquina"
                                        name="noMaquina"
                                        defaultValue={formData.noMaquina}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Descripci??n producto
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control as="select"
                                        onChange={(e) => {
                                            handleProducto(e.target.value)
                                        }}
                                        defaultValue={formData.producto}
                                        name="producto"
                                    >
                                        <option>Elige una opci??n</option>
                                        {map(listProductosActivos, (producto, index) => (
                                            <option key={index} value={producto?.id + "/" + producto?.cliente + "/" + producto?.datosPieza.pesoPiezas + "/" + producto?.datosMolde.cavMolde} selected={descripcionProducto === producto?.id}>{producto?.descripcion}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Cliente
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Escribe el numero el nombre del cliente"
                                        name="cliente"
                                        value={nombreCliente}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Peso
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        step="0.1"
                                        placeholder="Escribe el peso del producto"
                                        name="peso"
                                        value={productoSeleccionado != "" ? productoSeleccionado.peso : formData.peso}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        No. Cavidades
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Escribe el numero de cavidades"
                                        name="numeroCavidades"
                                        value={productoSeleccionado != "" ? productoSeleccionado.noCavidades : formData.noCavidades}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Turno
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Escribe el nombre del inspector"
                                        name="turno"
                                        defaultValue={formData.turno}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Inspector
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Escribe el nombre del inspector"
                                        name="inspector"
                                        defaultValue={formData.inspector}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label>
                                        Supervisor
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Escribe el nombre del supervisor"
                                        name="supervisor"
                                        defaultValue={formData.supervisor}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Actualizar el registro"
                                    variant="success"
                                    className="registrar"
                                >
                                    {!loading ? "Modificar" : <Spinner animation="border" />}
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

function initialFormData(data) {

    const { fecha, noMaquina, producto, cliente, peso, noCavidades, turno, inspector, supervisor } = data;

    return {
        fecha: fecha,
        noMaquina: noMaquina,
        producto: producto,
        cliente: cliente,
        peso: peso,
        noCavidades: noCavidades,
        turno: turno,
        inspector: inspector,
        supervisor: supervisor,
    }
}

function formatModelMatrizProductos(data) {
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            noInterno: data.noInterno,
            cliente: data.cliente,
            datosMolde: data.datosMolde,
            noParte: data.noParte,
            descripcion: data.descripcion,
            datosPieza: data.datosPieza,
            materiaPrima: data.materiaPrima,
            pigmentoMasterBach: data.pigmentoMasterBach,
            tiempoCiclo: data.tiempoCiclo,
            noOperadores: data.noOperadores,
            piezasxHora: data.piezasxHora,
            piezasxTurno: data.piezasxTurno,
            materialEmpaque: data.materialEmpaque,
            opcionMaquinaria: data.opcionMaquinaria,
            estado: data.estado,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default RegistraReporte;
