import { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../Modal/BasicModal";
import { obtenerNumeroInspeccion, registraInspeccion, obtenerItemInspeccion } from "../../../api/inspeccionMaterial";
import { toast } from "react-toastify";
import { LogTrackingActualizacion } from "../../Tracking/Gestion/GestionTracking";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import { LogsInformativos, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";
import BuscarRecepcion from "../../../page/BuscarRecepcion";
import { map } from "lodash";
import { listarUM } from "../../../api/unidadesMedida";
import { obtenerMateriaPrimaPorFolio } from "../../../api/materiaPrima";

function RegistraReporte(props) {
    const { setRefreshCheckLogin } = props;

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

    // Para almacenar la informacion del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para guardar los datos del formulario
    const [formDataRecepcion, setFormDataRecepcion] = useState(initialFormDataRecepcion());

    const [productosRecepcion, setProductosRecepcion] = useState();

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    // Para almacenar el folio actual
    const [folioActual, setFolioActual] = useState("");

    const obtenerFolio = () => {
        try {
            obtenerNumeroInspeccion().then(response => {
                const { data } = response;
                // console.log(data)
                const { noInspeccion } = data;
                setFolioActual(noInspeccion)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerFolio();
    }, []);

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento("/Calidad")
    }

    const [cantidadRequeridaOV, setCantidadRequeridaOV] = useState("");

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const [ordenVenta, setOrdenVenta] = useState("");

    const buscarRecepcion = (content) => {
        setTitulosModal("Buscar recepcion de material/insumo");
        setContentModal(content);
        setShowModal(true);
    }

    const onSubmit = e => {
        e.preventDefault();

        //console.log("Continuar")
        setLoading(true)
        const temp = formData.nombreDescripcion.split("/")
        // Obtener el id del pedido de venta para registrar los demas datos del pedido y el tracking
        obtenerItemInspeccion().then(response => {
            const { data } = response;
            const dataTemp = {
                item: data.item,
                folio: folioActual,
                ordenVenta: formDataRecepcion.folioRecepcion,
                fecha: fechaActual,
                lote: formData.lote,
                sucursal: getSucursal(),
                propiedad: formData.propiedad,
                tipoMaterial: tipoMaterial,
                nombre: temp[1],
                cantidad: cantidad,
                unidadMedida: unidadMedida,
                nombreRecibio: formData.nombreRecibio,
                estadoMateriaPrima: formData.estadoMateriaPrima,
                contaminacion: formData.contaminacion,
                presentaHumedad: formData.presentaHumedad,
                certificadoCalidad: formData.certificadoCalidad,
                empaqueDañado: formData.empaqueDañado,
                rechazo: formData.rechazo,
                nombreExterno: formData.nombreExterno,
                turno: formData.turno,
                auditor: formData.auditor,
                supervisor: formData.supervisor,
                descripcionDefecto: formData.descripcionDefecto,
                cantidadNoConforme: formData.cantidadNoConforme,
                tipoRechazo: formData.tipoRechazo,
                correccion: formData.correccion,
                condicion: formData.condicion,
                etiqueta: formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no" ? "Aceptado" : formData.etiqueta,
                resultadoFinalInspeccion: formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no" ? "Ok" : "no Ok",
                observaciones: formData.observaciones,
                estado: "true"
            }
            // console.log(dataTemp)
            // Registro de la gestión de la planeación -- LogRegistroPlaneacion(ordenVenta, productos
            // 
            // Modificar el pedido creado recientemente
            registraInspeccion(dataTemp).then(response => {
                const { data: { mensaje, datos } } = response;

                LogsInformativos("Se ha registrado el reporte de calidad " + folioActual, dataTemp);

                // Actualizacion del tracking
                LogTrackingActualizacion(ordenVenta, "En inspeccion de calidad", "4")
                // console.log(response)
                toast.success(mensaje)
                setLoading(false)
                rutaRegreso()
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [folioMaterial, setFolioMaterial] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [unidadMedida, setUnidadMedida] = useState("");
    const [tipoMaterial, setTipoMaterial] = useState("");

    const obtenerDatos = () => {
        const temp = formData.nombreDescripcion.split("/");
        setFolioMaterial(temp[0]);
        setNombreProducto(temp[1]);
        setCantidad(temp[2]);
        setUnidadMedida(temp[3]);

        try {
            obtenerMateriaPrimaPorFolio(temp[0]).then(response => {
                const { data } = response;
                // console.log(data)
                const { tipoMaterial } = data;
                console.log(data);
                setTipoMaterial(tipoMaterial);
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerDatos();
    }, [formData.nombreDescripcion]);

    // Para almacenar el listado de proveedores
    const [listUM, setListUM] = useState(null);

    const obtenerListaUM = () => {
        try {
            listarUM(getSucursal()).then(response => {
                const { data } = response;
                // console.log(data)
                if (!listarUM() && data) {
                    setListUM(formatModelUM(data));
                } else {
                    const datosUM = formatModelUM(data);
                    setListUM(datosUM);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerListaUM();
    }, []);

    const hoy = new Date();
    // const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + " " + hora;
    const fecha = (hoy.getMonth() + 1) > 9 && hoy.getDate() < 10 ? hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + "0" + hoy.getDate()
        : (hoy.getMonth() + 1) < 10 && hoy.getDate() > 9 ? hoy.getFullYear() + '-' + "0" + (hoy.getMonth() + 1) + '-' + hoy.getDate()
            : (hoy.getMonth() + 1) < 10 && hoy.getDate() < 10 ? hoy.getFullYear() + '-' + "0" + (hoy.getMonth() + 1) + '-' + "0" + hoy.getDate()
                : hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();

    const [fechaActual, setFechaActual] = useState(fecha);

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Nueva inspeccion de material
                        </h1>
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

            <Container fluid>
                <br />
                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <div className="encabezado">
                            <Container fluid>
                                <br />

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Folio
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Orden de venta"
                                            name="ordenVenta"
                                            value={folioActual}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Recepcion
                                        </Form.Label>
                                        <div className="flex items-center mb-1">
                                            <Form.Control
                                                type="text"
                                                placeholder="Recepcion"
                                                name="recpecion"
                                                value={formDataRecepcion.folioRecepcion}
                                                disabled
                                            />
                                            <FontAwesomeIcon
                                                className="cursor-pointer py-2 -ml-6"
                                                title="Buscar entre los productos"
                                                icon={faSearch}
                                                onClick={() => {
                                                    buscarRecepcion(
                                                        <BuscarRecepcion
                                                            formData={formDataRecepcion}
                                                            setFormData={setFormDataRecepcion}
                                                            productosRecepcion={productosRecepcion}
                                                            setProductosRecepcion={setProductosRecepcion}
                                                            setShowModal={setShowModal}
                                                        />)
                                                }}
                                            />
                                        </div>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Fecha
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Fecha"
                                            name="fecha"
                                            value={fechaActual}
                                            onChange={e => setFechaActual(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Nombre/Descripcion
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            placeholder="Nombre/Descripcion"
                                            name="nombreDescripcion"
                                            defaultValue={formData.nombreDescripcion}
                                        >
                                            <option>Elige una opción</option>
                                            {map(productosRecepcion, (productos, index) => (
                                                <option
                                                    key={index}
                                                    value={productos?.folio + "/" + productos?.producto + "/" + productos?.cantidad + "/" + productos?.um}
                                                >
                                                    {productos?.producto}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Lote
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Lote"
                                            name="lote"
                                            defaultValue={formData.lote}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Cantidad
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Cantidad"
                                            name="cantidad"
                                            onChange={e => setCantidad(e.target.value)}
                                            value={cantidad}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Propiedad
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="propiedad"
                                            defaultValue={formData.propiedad}
                                        >
                                            <option >Elige....</option>
                                            <option value="Cliente">Cliente</option>
                                            <option value="Proveedor">Proveedor</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            UM
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="unidadMedida"
                                            defaultValue={formData.unidadMedida}
                                        >
                                            <option>Elige una opción</option>
                                            {map(listUM, (um, index) => (
                                                <option key={index} value={um?.nombre} selected={unidadMedida == um?.nombre}>{um?.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Tipo de material
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Tipo de material"
                                            name="tipoMaterial"
                                            value={tipoMaterial}
                                            onChange={e => setTipoMaterial(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Nombre de quien recibio
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre de quien recibio"
                                            name="nombreRecibio"
                                            defaultValue={formData.nombreRecibio}
                                        />
                                    </Form.Group>
                                </Row>
                            </Container>

                        </div>

                        <br />

                        <div className="datosHerramientas">
                            <Container fluid>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                Estado de materia prima:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="virgen"
                                                type="radio"
                                                label="Virgen"
                                                name="estadoMateriaPrima"
                                                id="virgen"
                                                defaultValue={formData.estadoMateriaPrima}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="paletizado"
                                                type="radio"
                                                label="Paletizado"
                                                name="estadoMateriaPrima"
                                                id="paletizado"
                                                defaultValue={formData.estadoMateriaPrima}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="molido"
                                                type="radio"
                                                label="Molido"
                                                name="estadoMateriaPrima"
                                                id="molido"
                                                defaultValue={formData.estadoMateriaPrima}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                Contaminación:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="si"
                                                type="radio"
                                                label="Si"
                                                name="contaminacion"
                                                id="si"
                                                defaultValue={formData.contaminacion}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="no"
                                                type="radio"
                                                label="No"
                                                name="contaminacion"
                                                id="no"
                                                defaultValue={formData.contaminacion}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                Presenta humedad:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="si"
                                                type="radio"
                                                label="Si"
                                                name="presentaHumedad"
                                                id="si"
                                                defaultValue={formData.presentaHumedad}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="no"
                                                type="radio"
                                                label="No"
                                                name="presentaHumedad"
                                                id="no"
                                                defaultValue={formData.presentaHumedad}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                Sin certificado de calidad:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="si"
                                                type="radio"
                                                label="Si"
                                                name="certificadoCalidad"
                                                id="si"
                                                defaultValue={formData.certificadoCalidad}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="no"
                                                type="radio"
                                                label="No"
                                                name="certificadoCalidad"
                                                id="no"
                                                defaultValue={formData.certificadoCalidad}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                El empaque esta dañado:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="si"
                                                type="radio"
                                                label="Si"
                                                name="empaqueDañado"
                                                id="si"
                                                defaultValue={formData.empaqueDañado}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="no"
                                                type="radio"
                                                label="No"
                                                name="empaqueDañado"
                                                id="no"
                                                defaultValue={formData.empaqueDañado}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col align="left" sm={3}>
                                            <Form.Label>
                                                Resultado de la inspección:
                                            </Form.Label>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="ok"
                                                type="radio"
                                                label="OK"
                                                name="resultadoInspeccion"
                                                id="si"
                                                defaultValue={formData.resultadoInspeccion}
                                                checked={formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no"}
                                                disabled
                                            />
                                        </Col>
                                        <Col sm={1}>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Check
                                                value="no Ok"
                                                type="radio"
                                                label="NO OK"
                                                name="resultadoInspeccion"
                                                id="no"
                                                defaultValue={formData.resultadoInspeccion}
                                                checked={formData.contaminacion == "si" || formData.presentaHumedad == "si" || formData.certificadoCalidad == "si" || formData.empaqueDañado == "si"}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                {
                                    formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no" ?
                                        (
                                            <>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                                        <Form.Label>
                                                            Selección de etiqueta
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="etiqueta"
                                                            id="etiqueta"
                                                            defaultValue={formData.etiqueta}
                                                            disabled
                                                        >
                                                            <option>Elige una opción</option>
                                                            <option value="Aceptado" selected={formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no"}>Aceptado</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                                        <Form.Label>
                                                            Selección de etiqueta
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="etiqueta"
                                                            id="etiqueta"
                                                            defaultValue={formData.etiqueta}
                                                        >
                                                            <option>Elige una opción</option>
                                                            <option value="No Conforme">No conforme</option>
                                                            <option value="Material Sospechoso">Material sospechoso</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Row>
                                            </>
                                        )
                                }

                                {
                                    formData.contaminacion == "no" && formData.presentaHumedad == "no" && formData.certificadoCalidad == "no" && formData.empaqueDañado == "no" &&
                                    (
                                        <>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Nombre del {formData.propiedad}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe el cliente o proveedor"
                                                        name="nombreExterno"
                                                        defaultValue={formData.nombreExterno}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Turno
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        placeholder="Escribe el turno"
                                                        name="turno"
                                                        defaultValue={formData.turno}
                                                    >
                                                        <option>Elige una opción</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </Form.Control>
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
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Turno
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        placeholder="Escribe el turno"
                                                        name="turno"
                                                        defaultValue={formData.turno}
                                                    >
                                                        <option>Elige una opción</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Nombre del auditor
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe el nombre del auditor"
                                                        name="auditor"
                                                        defaultValue={formData.auditor}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Condición
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="Condición"
                                                        name="condicion"
                                                        defaultValue={formData.condicion}
                                                    />
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
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Nombre del {formData.propiedad}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe el cliente o proveedor"
                                                        name="nombreExterno"
                                                        defaultValue={formData.nombreExterno}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Turno
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        placeholder="Escribe el turno"
                                                        name="turno"
                                                        defaultValue={formData.turno}
                                                    >
                                                        <option>Elige una opción</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Auditor
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe el nombre del auditor"
                                                        name="auditor"
                                                        defaultValue={formData.auditor}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Supervisor
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe el nombre del supervisor"
                                                        name="supervisor"
                                                        defaultValue={formData.supervisor}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Descripción del defecto
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe la descripción del defecto"
                                                        name="descripcionDefecto"
                                                        defaultValue={formData.descripcionDefecto}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCantidad" className="cantidad">
                                                    <Form.Label>
                                                        Cantidad no conforme
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Escribe la cantidad"
                                                        name="cantidadNoConforme"
                                                        defaultValue={formData.cantidadNoConforme}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <div className="datosGenerales">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Disposicion del material
                                                        </h4>
                                                    </div>

                                                    <br />

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
                                                </Container>
                                            </div>
                                        </>
                                    )
                                }

                                <br />

                                <Row ClassName="mb-3">
                                    <Form.Group as={Col} controlId="formHorizontalNoInterno">
                                        <Form.Label align="center">
                                            Observaciones
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Observaciones"
                                            name="observaciones"
                                            defaultValue={formData.observaciones}
                                        />
                                    </Form.Group>
                                </Row>
                            </Container>

                            <br />
                        </div>

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
                        <br />
                    </Form>
                </div>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function initialFormDataRecepcion() {
    return {
        folioRecepcion: "",
    }
}

function formatModelUM(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            sucursal: data.sucursal,
            estadoUM: data.estadoUM,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function initialFormData() {
    return {
        fecha: "",
        nombreDescripcion: "",
        lote: "",
        cantidad: "",
        propiedad: "",
        unidadMedida: "",
        tipoMaterial: "",
        nombreRecibio: "",
        estadoMateriaPrima: "",
        contaminacion: "",
        presentaHumedad: "",
        certificadoCalidad: "",
        empaqueDañado: "",
        etiqueta: "",
        rechazo: "",
        nombreExterno: "",
        turno: "",
        auditor: "",
        supervisor: "",
        descripcionDefecto: "",
        cantidadNoConforme: "",
        tipoRechazo: "",
        correccion: "",
        condicion: "",
        resultadoInspeccion: "",
        observaciones: "",
    }
}

export default RegistraReporte;
