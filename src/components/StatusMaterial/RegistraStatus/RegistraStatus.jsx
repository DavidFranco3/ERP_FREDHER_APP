import { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import BuscarInspeccionCalidad from "../BuscarInspeccionCalidad";
import BasicModal from "../../Modal/BasicModal";
import { registraStatusMaterial, obtenerNumeroStatusMaterial, obtenerItemStatusMaterial } from "../../../api/statusMaterial";
import { toast } from "react-toastify";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import { LogsInformativos } from '../../Logs/LogsSistema/LogsSistema';

function RegistraStatus(props) {
    const { setRefreshCheckLogin } = props;

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

    // Para definir el enrutamiento
    const enrutamiento = useHistory()

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento.push("/StatusMaterial")
    }

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    const buscarInspeccionCalidad = (content) => {
        setTitulosModal("Buscar Inspeccion de calidad");
        setContentModal(content);
        setShowModal(true);
    }

    // Para almacenar el folio
    const [folio, setFolio] = useState("");

    // Para almacenar la fecha
    const [fecha, setFecha] = useState("");

    // Para almacenar el lote
    const [lote, setLote] = useState("");

    // Para almacenar la propiedad
    const [propiedad, setPropiedad] = useState("");

    // Para almacenar el tipo de material
    const [tipoMaterial, setTipoMaterial] = useState("");

    // Para el nombre
    const [nombre, setNombre] = useState("");

    // para alamcenar la cantidad
    const [cantidad, setCantidad] = useState("");

    // Para alamcenar el nombre de quien recibe
    const [recibio, setRecibio] = useState("");

    // Para almacenar el resultado final de la inspeccion
    const [resultadoFinal, setResultadoFinal] = useState("");

    // Para almacenar la informacion del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    // Para almacenar el folio actual
    const [itemActual, setItemActual] = useState("");

    useEffect(() => {
        try {
            obtenerItemStatusMaterial().then(response => {
                const { data } = response;
                // console.log(data)
                const { item } = data;
                setItemActual(item)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();


        if (formData.etiqueta === "Aceptado") {


            if (!folio || !formData.etiqueta || !formData.fecha || !formData.clienteProveedor || !formData.lote || !formData.recibio || !formData.turno || !formData.propiedad || !formData.liberacion || !formData.descripcion || !formData.comentarios) {
                toast.warning("Completa el formulario");
            } else {
                //console.log("Continuar")
                setLoading(true)

                // Obtener el id del pedido de venta para registrar los demas datos del pedido y el tracking
                obtenerNumeroStatusMaterial().then(response => {
                    const { data } = response;

                    const dataTemp = {
                        item: itemActual,
                        folio: data.noStatus,
                        folioInspeccion: folio,
                        propiedadInspeccion: propiedad,
                        cantidadInspeccion: cantidad,
                        fechaInspeccion: fecha,
                        tipoMaterialInspeccion: tipoMaterial,
                        recibioInspeccion: recibio,
                        loteInspeccion: lote,
                        nombreInspeccion: nombre,
                        resultadoInspeccion: resultadoFinal,
                        etiqueta: formData.etiqueta,
                        sucursal: getSucursal(),
                        fecha: formData.fecha,
                        clienteProveedor: formData.clienteProveedor,
                        lote: formData.lote,
                        recibio: formData.recibio,
                        turno: formData.turno,
                        propiedad: formData.propiedad,
                        liberacion: formData.liberacion,
                        descripcion: formData.descripcion,
                        comentarios: formData.comentarios
                    }

                    // Modificar el pedido creado recientemente
                    registraStatusMaterial(dataTemp).then(response => {
                        const { data: { mensaje, datos } } = response;
                        // console.log(response)
                        toast.success(mensaje);
                        LogsInformativos("Nuevo registro de status de material " + dataTemp.folio, dataTemp);
                        // Log acerca del registro inicial del tracking
                        //LogsInformativos(`Se han registrado la orden de venta con folio ${data.noVenta}`, datos)
                        // Registro inicial del tracking
                        //LogTrackingRegistro(data.noVenta, clienteSeleccionado.id, formData.fechaElaboracion)
                        setLoading(false)
                        rutaRegreso()
                    }).catch(e => {
                        console.log(e)
                    })
                }).catch(e => {
                    console.log(e)
                })
            }
        } else if (formData.etiqueta === "No Conforme") {
            if (!folio || !formData.etiqueta || !formData.fecha || !formData.descripcionMaterial || !formData.rechazo || !formData.nombre || !formData.clienteProveedor || !formData.turno || !formData.auditor || !formData.supervisor || !formData.descripcionDefecto || !formData.cantidad || !formData.tipoRechazo || !formData.correccion || !formData.comentarios) {
                toast.warning("Completa el formulario");
            } else {
                //console.log("Continuar")
                setLoading(true)

                // Obtener el id del pedido de venta para registrar los demas datos del pedido y el tracking
                obtenerNumeroStatusMaterial().then(response => {
                    const { data } = response;

                    const dataTemp = {
                        item: itemActual,
                        folio: data.noStatus,
                        folioInspeccion: folio,
                        propiedadInspeccion: propiedad,
                        cantidadInspeccion: cantidad,
                        fechaInspeccion: fecha,
                        tipoMaterialInspeccion: tipoMaterial,
                        recibioInspeccion: recibio,
                        loteInspeccion: lote,
                        nombreInspeccion: nombre,
                        resultadoInspeccion: resultadoFinal,
                        etiqueta: formData.etiqueta,
                        fecha: formData.fecha,
                        descripcionMaterial: formData.descripcionMaterial,
                        rechazo: formData.rechazo,
                        nombre: formData.nombre,
                        clienteProveedor: formData.clienteProveedor,
                        turno: formData.turno,
                        auditor: formData.auditor,
                        supervisor: formData.supervisor,
                        descripcionDefecto: formData.descripcionDefecto,
                        cantidad: formData.cantidad,
                        tipoRechazo: formData.tipoRechazo,
                        correccion: formData.correccion,
                        comentarios: formData.comentarios
                    }

                    // Modificar el pedido creado recientemente
                    registraStatusMaterial(dataTemp).then(response => {
                        const { data: { mensaje, datos } } = response;
                        // console.log(response)
                        toast.success(mensaje)
                        // Log acerca del registro inicial del tracking
                        //LogsInformativos(`Se han registrado la orden de venta con folio ${data.noVenta}`, datos)
                        // Registro inicial del tracking
                        //LogTrackingRegistro(data.noVenta, clienteSeleccionado.id, formData.fechaElaboracion)
                        setLoading(false)
                        rutaRegreso()
                    }).catch(e => {
                        console.log(e)
                    })
                }).catch(e => {
                    console.log(e)
                })
            }

        } else if (formData.etiqueta === "Material Sospechoso") {
            if (!folio || !formData.etiqueta || !formData.fecha || !formData.turno || !formData.descripcionMaterial || !formData.auditor || !formData.condicion || !formData.observaciones) {
                toast.warning("Completa el formulario");
            } else {
                //console.log("Continuar")
                setLoading(true)
                // Obtener el id del pedido de venta para registrar los demas datos del pedido y el tracking
                obtenerNumeroStatusMaterial().then(response => {
                    const { data } = response;

                    const dataTemp = {
                        item: itemActual,
                        folio: data.noStatus,
                        folioInspeccion: folio,
                        propiedadInspeccion: propiedad,
                        cantidadInspeccion: cantidad,
                        fechaInspeccion: fecha,
                        tipoMaterialInspeccion: tipoMaterial,
                        recibioInspeccion: recibio,
                        loteInspeccion: lote,
                        nombreInspeccion: nombre,
                        resultadoInspeccion: resultadoFinal,
                        etiqueta: formData.etiqueta,
                        fecha: formData.fecha,
                        turno: formData.turno,
                        descripcionMaterial: formData.descripcionMaterial,
                        auditor: formData.auditor,
                        condicion: formData.condicion,
                        observaciones: formData.observaciones
                    }

                    // Modificar el pedido creado recientemente
                    registraStatusMaterial(dataTemp).then(response => {
                        const { data: { mensaje, datos } } = response;
                        // console.log(response)
                        toast.success(mensaje)
                        // Log acerca del registro inicial del tracking
                        //LogsInformativos(`Se han registrado la orden de venta con folio ${data.noVenta}`, datos)
                        // Registro inicial del tracking
                        //LogTrackingRegistro(data.noVenta, clienteSeleccionado.id, formData.fechaElaboracion)
                        setLoading(false)
                        rutaRegreso()
                    }).catch(e => {
                        console.log(e)
                    })
                }).catch(e => {
                    console.log(e)
                })
            }
        }

    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Identificación de status del material

                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar a la pagina anterior"
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
            <br />

            <Container fluid>
                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Col align="right">
                                <Button
                                    variant="success"
                                    title="Buscar entre las inspecciones de calidad"
                                    className="agregar"
                                    onClick={() => {
                                        buscarInspeccionCalidad(
                                            <BuscarInspeccionCalidad
                                                setFolio={setFolio}
                                                setFecha={setFecha}
                                                setLote={setLote}
                                                setPropiedad={setPropiedad}
                                                setTipoMaterial={setTipoMaterial}
                                                setNombre={setNombre}
                                                setCantidad={setCantidad}
                                                setRecibio={setRecibio}
                                                setResultadoFinal={setResultadoFinal}
                                                setShowModal={setShowModal}
                                            />)
                                    }}
                                >
                                    Buscar inspeccion de calidad
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="1">
                                    <Form.Label>
                                        Folio:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Folio"
                                        name="folio"
                                        value={folio}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Propiedad:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Propiedad"
                                        name="propiedadEncontrada"
                                        value={propiedad}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Cantidad:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cantidad"
                                        name="cantidad"
                                        value={cantidad}
                                        disabled
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>
                                        Kg
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="1">
                                    <Form.Label>
                                        Fecha:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="date"
                                        placeholder="Fecha"
                                        name="fechaEncontrada"
                                        value={fecha}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Tipo de material:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tipo de material"
                                        name="tipoMaterial"
                                        value={tipoMaterial}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Recibio:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Recibio"
                                        name="recibio"
                                        value={recibio}
                                        disabled
                                    />
                                </Col>
                                <Col>
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="1">
                                    <Form.Label>
                                        Lote:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="Text"
                                        placeholder="Lote"
                                        name="loteEncontrado"
                                        value={lote}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Nombre/Descripcion:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre/Descripción"
                                        name="nombreDescripcion"
                                        value={nombre}
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Resultado de inspección final:
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Resultado de inspección final"
                                        name="resultado"
                                        value={resultadoFinal}
                                        disabled
                                    />
                                </Col>
                                <Col>
                                </Col>
                            </Form.Group>
                        </Row>

                        <br />

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label>
                                        Selección de etiqueta:
                                    </Form.Label>
                                </Col>
                                <Col sm="5">
                                    <Form.Control as="select"
                                        name="etiqueta"
                                        id="etiqueta"
                                        defaultValue={formData.etiqueta}
                                        required
                                    >
                                        <option>Elige una opción</option>
                                        <option value="Aceptado">Aceptado</option>
                                        <option value="No Conforme">No conforme</option>
                                        <option value="Material Sospechoso">Material sospechoso</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Row>

                        {
                            formData.etiqueta === "Aceptado" &&
                            (
                                <>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Fecha
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="date"
                                                    placeholder="Escribe la fecha"
                                                    name="fecha"
                                                    defaultValue={formData.fecha}
                                                />
                                            </Col>

                                            <Col sm="1">
                                                <Form.Label>
                                                    Cliente/Proveedor
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el cliente o proveedor"
                                                    name="clienteProveedor"
                                                    defaultValue={formData.clienteProveedor}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Lote
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el lote"
                                                    name="lote"
                                                    defaultValue={formData.lote}
                                                />
                                            </Col>

                                            <Col sm="1">
                                                <Form.Label>
                                                    Recibio
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe del que recibio"
                                                    name="recibio"
                                                    defaultValue={formData.recibio}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Turno
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Escribe el turno"
                                                    name="turno"
                                                    defaultValue={formData.turno}
                                                />
                                            </Col>

                                            <Col sm="1">
                                                <Form.Label>
                                                    Propiedad
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    as="select"
                                                    name="propiedad"
                                                    defaultValue={formData.propiedad}
                                                >
                                                    <option>Elige una opción</option>
                                                    <option value="Cliente">Cliente</option>
                                                    <option value="Proveedor">Proveedor</option>
                                                    <option value="Fredher">Fredher</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Liberación de
                                                </Form.Label>
                                            </Col>
                                            <Col sm="3">
                                                <Form.Control
                                                    as="select"
                                                    name="liberacion"
                                                    defaultValue={formData.liberacion}
                                                >
                                                    <option>Elige una opción</option>
                                                    <option value="Miscelaneos">Miscelaneos</option>
                                                    <option value="Materia prima">Materia prima</option>
                                                    <option value="Pigmento">Pigmento</option>
                                                    <option value="Master Batch">Master Batch</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Descripción
                                                </Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe la descripción"
                                                    name="descripcion"
                                                    defaultValue={formData.descripcion}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="1">
                                                <Form.Label>
                                                    Comentarios
                                                </Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe los comentarios"
                                                    name="comentarios"
                                                    defaultValue={formData.comentarios}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                </>
                            )
                        }

                        {
                            formData.etiqueta === "No Conforme" &&
                            (
                                <>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Fecha
                                                </Form.Label>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control
                                                    type="date"
                                                    placeholder="Escribe la fecha"
                                                    defaultValue={formData.fecha}
                                                    name="fecha"
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Descripción del material
                                                </Form.Label>
                                            </Col>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe la descripción del material"
                                                    defaultValue={formData.descripcionMaterial}
                                                    name="descripcionMaterial"
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                            <Col sm={2}>
                                                <Form.Label>
                                                    Rechazo
                                                </Form.Label>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="interno"
                                                    type="radio"
                                                    label="Interno"
                                                    name="rechazo"
                                                    id="interno"
                                                    defaultValue={formData.rechazo}
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="externo"
                                                    type="radio"
                                                    label="Externo"
                                                    name="rechazo"
                                                    id="externo"
                                                    defaultValue={formData.rechazo}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                            <Col sm={2}>
                                                <Form.Label>
                                                    Nombre
                                                </Form.Label>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="proveedor"
                                                    type="radio"
                                                    label="Proveedor"
                                                    name="nombre"
                                                    defaultValue={formData.nombre}
                                                    id="Proveedor"
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="cliente"
                                                    type="radio"
                                                    label="Cliente"
                                                    name="nombre"
                                                    defaultValue={formData.nombre}
                                                    id="Cliente"
                                                />
                                            </Col>
                                            <Col sm="2">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el nombre"
                                                    name="clienteProveedor"
                                                    defaultValue={formData.clienteProveedor}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Turno
                                                </Form.Label>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Escribe el turno"
                                                    name="turno"
                                                    defaultValue={formData.turno}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Auditor
                                                </Form.Label>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el nombre del auditor"
                                                    name="auditor"
                                                    defaultValue={formData.auditor}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Supervisor
                                                </Form.Label>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el nombre del supervisor"
                                                    name="supervisor"
                                                    defaultValue={formData.supervisor}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Descripción del defecto
                                                </Form.Label>
                                            </Col>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe la descripción del defecto"
                                                    name="descripcionDefecto"
                                                    defaultValue={formData.descripcionDefecto}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Cantidad
                                                </Form.Label>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe la cantidad"
                                                    name="cantidad"
                                                    defaultValue={formData.cantidad}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                            <Col sm={2}>
                                                <Form.Label>
                                                    Rechazo
                                                </Form.Label>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="moler"
                                                    type="radio"
                                                    label="Moler"
                                                    name="tipoRechazo"
                                                    id="moler"
                                                    defaultValue={formData.tipoRechazo}
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="retrabajar"
                                                    type="radio"
                                                    label="Retrabajar"
                                                    name="tipoRechazo"
                                                    id="retrabajar"
                                                    defaultValue={formData.tipoRechazo}
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="consecion"
                                                    type="radio"
                                                    label="Conseción"
                                                    name="tipoRechazo"
                                                    id="consecion"
                                                    defaultValue={formData.tipoRechazo}
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="otro"
                                                    type="radio"
                                                    label="Otro"
                                                    name="tipoRechazo"
                                                    id="otro"
                                                    defaultValue={formData.tipoRechazo}
                                                />
                                            </Col>
                                            <Col sm={1}>
                                            </Col>
                                            <Col sm={1}>
                                                <Form.Check
                                                    value="re-inspeccion"
                                                    type="radio"
                                                    label="Reinspección"
                                                    name="tipoRechazo"
                                                    id="reinspeccion"
                                                    defaultValue={formData.tipoRechazo}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Corrección
                                                </Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe la correccion"
                                                    name="correccion"
                                                    defaultValue={formData.correccion}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Comentarios
                                                </Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe los comentarios"
                                                    name="comentarios"
                                                    defaultValue={formData.comentarios}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                </>
                            )
                        }

                        {
                            formData.etiqueta === "Material Sospechoso" &&
                            (
                                <>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Fecha
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
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
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Turno
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Escribe el turno"
                                                    name="turno"
                                                    defaultValue={formData.turno}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Descripción del material
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Descripción del material"
                                                    name="descripcionMaterial"
                                                    defaultValue={formData.descripcionMaterial}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Nombre del auditor
                                                </Form.Label>
                                            </Col>
                                            <Col sm="5">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe el nombre del auditor"
                                                    name="auditor"
                                                    defaultValue={formData.auditor}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Condición
                                                </Form.Label>
                                            </Col>
                                            <Col sm="7">
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="Condición"
                                                    name="condicion"
                                                    defaultValue={formData.condicion}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                            <Col sm="2">
                                                <Form.Label>
                                                    Observaciones
                                                </Form.Label>
                                            </Col>
                                            <Col sm="7">
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="observaciones"
                                                    name="observaciones"
                                                    defaultValue={formData.observaciones}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                </>
                            )
                        }

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Guardar la información del formulario"
                                    variant="success"
                                    className="registrar"
                                >
                                    {!loading ? "Registrar" : <Spinner animation="border" />}
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

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function initialFormData() {
    return {
        etiqueta: "",
        fecha: "",
        clienteProveedor: "",
        lote: "",
        recibio: "",
        turno: "",
        propiedad: "",
        liberacion: "",
        descripcion: "",
        comentarios: "",
        descripcionMaterial: "",
        rechazo: "",
        nombre: "",
        auditor: "",
        supervisor: "",
        descripcionDefecto: "",
        cantidad: "",
        tipoRechazo: "",
        correccion: "",
        condicion: ""
    }
}

export default RegistraStatus;
