import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    actualizaPedidoVenta,
    obtenerDatosPedidoVenta
} from "../../../api/pedidoVenta";
import { Alert, Button, Table, Col, Container, Form, Row, Spinner, Badge } from "react-bootstrap";
import "./ModificacionVentas.scss";
import { map } from "lodash";
import { listarClientes, obtenerCliente } from "../../../api/clientes";
import { toast } from "react-toastify";
import { listarMatrizProductosActivos } from "../../../api/matrizProductos";
import { LogsInformativos, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";
import { LogTrackingRegistro } from "../../Tracking/Gestion/GestionTracking";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong, faCircleInfo, faPenToSquare, faTrashCan, faEye, faSearch, faArrowCircleLeft, faX, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";
import BuscarCliente from '../../../page/BuscarCliente/BuscarCliente';
import BuscarProducto from '../../../page/BuscarProducto/BuscarProducto';
import Dropzone from "../../Dropzone";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import ModificacionProductos from '../ModificacionProductos';

function ModificacionVentas(props) {
    const { history, setRefreshCheckLogin } = props;

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

    const enrutamiento = useNavigate();

    const params = useParams();
    const { folio } = params

    // Para la eliminacion fisica de usuarios
    const eliminaProducto = (content) => {
        setTitulosModal("Eliminando el producto");
        setContentModal(content);
        setShowModal(true);
    }

    // Para la eliminacion fisica de usuarios
    const modificaProducto = (content) => {
        setTitulosModal("Modificando el producto");
        setContentModal(content);
        setShowModal(true);
    }

    // Para guardar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para determinar el uso de la animacion de carga mientras se guarda el pedido
    const [loading, setLoading] = useState(false);

    // Para almacenar la lista completa de clientes
    const [listClientes, setListClientes] = useState(null);

    const [pdfCotizacion, setPdfCotizacion] = useState(null);

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para la eliminacion fisica de usuarios
    const buscarOV = (content) => {
        setTitulosModal("Buscar cliente");
        setContentModal(content);
        setShowModal(true);
    }

    // Para la eliminacion fisica de usuarios
    const buscarProducto = (content) => {
        setTitulosModal("Buscar producto");
        setContentModal(content);
        setShowModal(true);
    }

    // Para determinar si hay conexion con el servidor o a internet
    const [conexionInternet, setConexionInternet] = useState(true);

    // Para determinar el regreso a la ruta de pedidos
    const regresaListadoVentas = () => {
        enrutamiento("/Ventas");
    }

    // Inicia almacenaje de información registrada para su modificación

    // Almacenar informacion
    const [informacionPedido, setInformacionPedido] = useState(initialValues);

    const [lugarEntregaInicial, setlugarEntregaInicial] = useState(initialValues);

    const cargarDatosPedido = () => {
        //
        obtenerDatosPedidoVenta(folio).then(response => {
            const { data } = response;
            //console.log(data)
            const { folio, fechaElaboracion, fechaEntrega, cliente, nombreCliente, incoterms, especificaciones, condicionesPago, ordenCompra, cotizacion, numeroPedido, lugarEntrega, productos } = data;
            const dataTemp = {
                folio: folio,
                fechaPedido: fechaElaboracion,
                fechaEntrega: fechaEntrega,
                cliente: cliente,
                nombreCliente: nombreCliente,
                incoterms: incoterms,
                especificaciones: especificaciones,
                lugarEntrega: lugarEntrega,
                condicionesPago: condicionesPago,
                cotizacion: cotizacion,
                numeroPedido: numeroPedido,
                ordenCompra: ordenCompra,
                lugarEntrega: lugarEntrega,
            }
            setInformacionPedido(valoresAlmacenados(dataTemp))
            setlugarEntregaInicial(valoresAlmacenados(lugarEntrega))
            // setFechaCreacion(fechaElaboracion)
            setListProductosCargados(productos)
            setPdfCotizacion(cotizacion)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        cargarDatosPedido();
    }, []);

    const [direcciones, setDirecciones] = useState([]);

    const cargarDirecciones = () => {
        //
        obtenerCliente(informacionPedido.cliente).then(response => {
            const { data } = response;
            setDirecciones(data.domiciliosEntrega);
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        cargarDirecciones();
    }, [informacionPedido.cliente]);

    const [totalUnitario, setTotalUnitario] = useState(0);

    const calcularTotalUnitario = () => {
        const cantidad = document.getElementById("cantidad").value;
        const precioUnitario = document.getElementById("precioUnitario").value;
        const total = parseFloat(cantidad) * parseFloat(precioUnitario);
        setTotalUnitario(total);
    }

    // Para almacenar el folio actual
    const [linkCotizacion, setlinkCotizacion] = useState("");

    const cargarLink = () => {
        try {
            if (pdfCotizacion) {
                subeArchivosCloudinary(pdfCotizacion, "ventas").then(response => {
                    const { data } = response;
                    // console.log(data)
                    const { secure_url } = data;
                    setlinkCotizacion(secure_url)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarLink();
    }, [pdfCotizacion]);

    const onSubmit = e => {
        e.preventDefault();

        if (!informacionPedido.cliente || !informacionPedido.numeroPedido || !informacionPedido.fechaPedido || !informacionPedido.fechaEntrega || !informacionPedido.condicionesPago || !informacionPedido.especificaciones) {
            toast.warning("Completa el formulario");
        } else {
            setLoading(true);

            const dataTempPrincipalOV = {
                fechaElaboracion: informacionPedido.fechaPedido,
                fechaEntrega: informacionPedido.fechaEntrega,
                cliente: formData.cliente == "" ? informacionPedido.cliente : formData.cliente,
                nombreCliente: formData.nombreCliente == "" ? informacionPedido.nombreCliente : formData.nombreCliente,
                condicionesPago: informacionPedido.condicionesPago,
                incoterms: informacionPedido.incoterms,
                moneda: "M.N.",
                numeroPedido: informacionPedido.numeroPedido,
                lugarEntrega: informacionPedido.lugarEntrega,
                cotizacion: linkCotizacion,
                total: totalSinIVA,
                especificaciones: informacionPedido.especificaciones,
                productos: listProductosCargados,
                status: "true"
            }
            //console.log(dataTemp)

            // Inicia el proceso de modificacion de orden de venta
            // Obtener el id del pedido de venta para registrar los demas datos del pedido y el tracking
            obtenerDatosPedidoVenta(folio).then(response => {
                const { data: { _id, folio } } = response;
                // console.log(response.data)
                // Modificar el pedido creado recientemente
                actualizaPedidoVenta(_id, dataTempPrincipalOV).then(response => {
                    const { data: { mensaje, datos } } = response;
                    // console.log(response)
                    toast.success(mensaje)
                    // Registro de log para la actualizacion de orden de venta
                    LogsInformativos("Se han actualizado los datos de la orden de venta con folio " + folio, datos)
                    // Registro del tracking para orden de venta
                    // LogTrackingRegistro(_id, folio, formData.cliente, formData.fechaElaboracion)
                    setLoading(false)
                    regresaListadoVentas()
                }).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            })
        }

    }

    const onChange = e => {
        setInformacionPedido({ ...informacionPedido, [e.target.name]: e.target.value })
    }

    // Para la carga y el listado de productos
    const [cargaProductos, setCargaProductos] = useState(initialFormDataProductos());
    const [listProductosCargados, setListProductosCargados] = useState([]);

    const handleProducto = (producto) => {
        const dataTempProductos = producto.split("/")
        // console.log(dataTempProductos)
        const dataTemp = {
            idProducto: dataTempProductos[0],
            ID: dataTempProductos[1],
            item: dataTempProductos[2],
            precioUnitario: dataTempProductos[3]
        }
        setCargaProductos(cargaFormDataProductos(dataTemp))
    }

    const addItems = () => {
        const material = document.getElementById("descripcion").value
        const cantidad = document.getElementById("cantidad").value
        const um = document.getElementById("um").value
        const precioUnitario = document.getElementById("precioUnitario").value
        const total = document.getElementById("total").value

        if (!material || !cantidad || !um || !precioUnitario) {
            toast.warning("Completa la información del producto");
        } else {
            const dataTemp = {
                idProducto: cargaProductos.idProducto,
                ID: cargaProductos.ID,
                item: cargaProductos.item,
                material: material,
                cantidad: cantidad,
                um: um,
                precioUnitario: cargaProductos.precioUnitario,
                total: totalUnitario
            }
            // console.log(dataTemp)

            setListProductosCargados(
                [...listProductosCargados, dataTemp]
            );

            setCargaProductos(initialFormDataProductos)
            document.getElementById("cantidad").value = ""
            document.getElementById("um").value = "Elige"
            setTotalUnitario(0)
        }
    }

    // Para limpiar el formulario de detalles de producto
    const cancelarCargaProducto = () => {
        setCargaProductos(initialFormDataProductos)
        document.getElementById("cantidad").value = ""
        document.getElementById("um").value = "Elige"
        setTotalUnitario(0)
    }

    // Para eliminar productos del listado
    const removeItem = (producto) => {
        let newArray = listProductosCargados;
        newArray.splice(newArray.findIndex(a => a.ID === producto.ID), 1);
        setListProductosCargados([...newArray]);
    }

    // Para almacenar la materia prima seleccionada
    const [clienteSeleccionado, setClienteSeleccionado] = useState([]);

    const handleCliente = (cliente) => {
        // console.log(articulo)
        // {materiaprima?.folioMP + "/" + materiaprima?.nombre + "/" + materiaprima?.um + "/" + materiaprima?.existenciasOV + "/" + materiaprima?.existenciasStock + "/" + materiaprima?.existenciasTotales}
        const temp = cliente.split("/")
        // console.log(temp)

        // console.log(dataTemp)
        setClienteSeleccionado({
            id: temp[0],
            calle: temp[1],
            numeroExterior: temp[2],
            colonia: temp[3],
            municipio: temp[4],
            estado: temp[5],
            nombreCliente: temp[6]
        })
    }

    const totalSinIVA = listProductosCargados.reduce((amount, item) => (amount + parseInt(item.total)), 0);

    // Para almacenar la lista completa de clientes
    const [listProductosOV, setListProductosOV] = useState([]);

    const renglon = listProductosCargados.length + 1;

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Modificación de orden de venta
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar a la pagina anterior"
                            onClick={() => {
                                regresaListadoVentas()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                        </Button>
                    </Col>
                </Row>
            </Alert>

            <Container fluid>
                <div className="formularioRegistroOrdenVenta">
                    <Form onChange={onChange} onSubmit={onSubmit}>

                        {/* Datos de encabezado de la orden de venta*/}
                        <div className="encabezadoOrdenVenta">
                            {/* Folio, fecha elaboracion */}

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Nombre del cliente
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <div className="flex items-center mb-1">
                                            <Form.Control
                                                type="text"
                                                defaultValue={formData.nombreCliente == "" ? informacionPedido.nombreCliente : formData.nombreCliente}
                                                placeholder="Buscar cliente"
                                                name="cliente"
                                            />
                                            <FontAwesomeIcon
                                                className="cursor-pointer py-2 -ml-6"
                                                title="Buscar entre los clientes"
                                                icon={faSearch}
                                                onClick={() => {
                                                    buscarOV(
                                                        <BuscarCliente
                                                            formData={formData}
                                                            setFormData={setFormData}
                                                            setShowModal={setShowModal}
                                                            setDirecciones={setDirecciones}
                                                        />)
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Numero de pedido
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Numero de pedido"
                                            name="numeroPedido"
                                            defaultValue={informacionPedido.numeroPedido}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Fecha de pedido
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            type="date"
                                            placeholder="Fecha de pedido"
                                            name="fechaPedido"
                                            defaultValue={informacionPedido.fechaPedido}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Fecha de entrega
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            type="date"
                                            placeholder="Fecha de entrega"
                                            name="fechaEntrega"
                                            defaultValue={informacionPedido.fechaEntrega}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Condiciones de pago
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            as="textarea" rows={3}
                                            type="text"
                                            style={{ height: '100px' }}
                                            placeholder="Condiciones de pago"
                                            name="condicionesPago"
                                            defaultValue={informacionPedido.condicionesPago}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Moneda
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Numero de pedido"
                                            name="moneda"
                                            value="M.N."
                                            disabled
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Lugar de entrega
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            as="select"
                                            defaultValue={informacionPedido.lugarEntrega}
                                            name="lugarEntrega"
                                        >
                                            <option>Elige una opción</option>
                                            {map(direcciones, (direccion, index) => (
                                                <option key={index} value={direccion.direccion} selected={direccion.direccion == informacionPedido.lugarEntrega}>{direccion.direccion}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <Row>
                                <Form.Group as={Row} controlId="formGridCliente">
                                    <Col sm="2">
                                        <Form.Label>
                                            Especificaciones del empaque
                                        </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Especificaciones del empaque"
                                            name="especificaciones"
                                            defaultValue={informacionPedido.especificaciones}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <br />

                            <div className="subeFotoPerfil">
                                <h4>Adjuntar orden de venta</h4>
                                <div className="fotoPerfil">
                                    <Dropzone
                                        setImagen={setPdfCotizacion} imagenBD={informacionPedido.cotizacion}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Seleccion de productos */}

                        <hr />
                        <Badge bg="secondary" className="tituloFormularioDetalles">
                            <h4>A continuación, especifica los detalles del artículo y agregalo</h4>
                        </Badge>
                        <br />
                        <hr />

                        <Row>

                            <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                                <Form.Label>
                                    ITEM
                                </Form.Label>
                                <Form.Control type="number"
                                    id="index"
                                    value={renglon}
                                    name="index"
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                                <Form.Label>
                                    Descripción
                                </Form.Label>
                                <div className="flex items-center mb-1">
                                    <Form.Control
                                        type="text"
                                        id="descripcion"
                                        defaultValue={cargaProductos.item}
                                        name="descripcion"
                                    />
                                    <FontAwesomeIcon
                                        className="cursor-pointer py-2 -ml-6"
                                        title="Buscar entre los productos"
                                        icon={faSearch}
                                        onClick={() => {
                                            buscarProducto(
                                                <BuscarProducto
                                                    formData={cargaProductos}
                                                    setFormData={setCargaProductos}
                                                    setShowModal={setShowModal}
                                                />)
                                        }}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Numero de parte
                                </Form.Label>
                                <Form.Control
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripcion"
                                    name="item"
                                    value={cargaProductos.ID}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Cantidad
                                </Form.Label>
                                <Form.Control
                                    id="cantidad"
                                    type="number"
                                    placeholder="Cantidad"
                                    name="cantidad"
                                    onChange={(e) => { calcularTotalUnitario(e.target.value) }}
                                    defaultValue={cargaProductos.cantidad}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    UM
                                </Form.Label>
                                <Form.Control
                                    id="um"
                                    type="text"
                                    name="um"
                                    value="Piezas"
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Precio unitario
                                </Form.Label>
                                <Form.Control
                                    id="precioUnitario"
                                    type="number"
                                    placeholder="Precio unitario"
                                    name="precioUnitario"
                                    onChange={(e) => { calcularTotalUnitario(e.target.value) }}
                                    defaultValue={cargaProductos.precioUnitario}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Total
                                </Form.Label>
                                <Form.Control
                                    id="total"
                                    type="text"
                                    placeholder="Total"
                                    name="total"
                                    onChange={(e) => { calcularTotalUnitario(e.target.value) }}
                                    value={totalUnitario}
                                    disabled
                                />
                            </Form.Group>

                            <Col sm="1">
                                <Form.Group as={Row} className="formGridCliente">
                                    <Form.Label>
                                        &nbsp;
                                    </Form.Label>

                                    <Col>
                                        <Button
                                            variant="success"
                                            title="Agregar el producto"
                                            className="editar"
                                            onClick={() => {
                                                addItems()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCirclePlus} className="text-lg" />
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="danger"
                                            title="Cancelar el producto"
                                            className="editar"
                                            onClick={() => {
                                                cancelarCargaProducto()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faX} className="text-lg" />
                                        </Button>
                                    </Col>

                                </Form.Group>
                            </Col>

                        </Row>

                        <hr />

                        {/* Listado de productos  */}
                        <div className="tablaProductos">

                            {/* ID, item, cantidad, um, descripcion, orden de compra, observaciones */}
                            {/* Inicia tabla informativa  */}
                            <Badge bg="secondary" className="tituloListadoProductosSeleccionados">
                                <h4>Listado de productos seleccionados</h4>
                            </Badge>
                            <br />
                            <hr />
                            <Table className="responsive-tableRegistroVentas"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">ITEM</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Numero de parte</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">UM</th>
                                        <th scope="col">Precio unitario</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                </tfoot>
                                <tbody>
                                    {map(listProductosCargados, (producto, index) => (
                                        <tr key={index}>
                                            <td scope="row">
                                                {index + 1}
                                            </td>
                                            <td data-title="Descripcion">
                                                {producto.item}
                                            </td>
                                            <td data-title="Material">
                                                {producto.ID}
                                            </td>
                                            <td data-title="UM">
                                                {producto.cantidad}
                                            </td>
                                            <td data-title="Descripción">
                                                {producto.um}
                                            </td>
                                            <td data-title="Orden de compra">
                                                {new Intl.NumberFormat('es-MX', {
                                                    style: "currency",
                                                    currency: "MXN"
                                                }).format(producto.precioUnitario)} MXN
                                            </td>
                                            <td data-title="Observaciones">
                                                {new Intl.NumberFormat('es-MX', {
                                                    style: "currency",
                                                    currency: "MXN"
                                                }).format(producto.total)} MXN
                                            </td>
                                            <td data-title="Eliminar">
                                                <Badge
                                                    bg="success"
                                                    title="Modificar"
                                                    className="editar"
                                                    onClick={() => {
                                                        modificaProducto(
                                                            <ModificacionProductos
                                                                datos={producto}
                                                                setShowModal={setShowModal}
                                                                listProductosCargados={listProductosCargados}
                                                                setListProductosCargados={setListProductosCargados}
                                                            />)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                                                </Badge>
                                                <Badge
                                                    bg="danger"
                                                    title="Eliminar"
                                                    className="eliminar"
                                                    onClick={() => {
                                                        removeItem(producto)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* Inicia tabla definida con totales */}
                            <Row>
                                <Col xs={12} md={8}>
                                </Col>
                                <Col xs={6} md={4}>
                                    {/* Subtotal */}
                                    <Row>
                                        <Col>Valor total sin IVA</Col>
                                        <Col>
                                            {new Intl.NumberFormat('es-MX', {
                                                style: "currency",
                                                currency: "MXN"
                                            }).format(totalSinIVA)} MXN
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* Termina tabla definida con totales */}
                        </div>

                        <Form.Group as={Row} className="botones">
                            <Row>
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
                                        className="registrar"
                                        onClick={() => {
                                            regresaListadoVentas()
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

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function initialFormData(folio, fecha) {
    return {
        cliente: "",
        nombreCliente: "",
        lugarEntrega: ""
    }
}

// Valores iniciales para pedido
function initialValues() {
    return {
        fechaPedido: "",
        fechaEntrega: "",
        incoterms: "",
        especificaciones: "",
        condicionesPago: "",
        ordenCompra: "",
        cotizacion: "",
        numeroPedido: "",
        lugarEntrega: ""
    }
}

// Valores almacenados
function valoresAlmacenados(data) {
    const { folio, fechaPedido, fechaEntrega, cliente, nombreCliente, incoterms, especificaciones, condicionesPago, ordenCompra, cotizacion, numeroPedido, lugarEntrega } = data;

    return {
        folio: folio,
        fechaPedido: fechaPedido,
        fechaEntrega: fechaEntrega,
        cliente: cliente,
        nombreCliente: nombreCliente,
        incoterms: incoterms,
        especificaciones: especificaciones,
        condicionesPago: condicionesPago,
        ordenCompra: ordenCompra,
        cotizacion: cotizacion,
        numeroPedido: numeroPedido,
        lugarEntrega: lugarEntrega
    }
}

function initialFormDataProductos() {
    return {
        idProducto: "",
        ID: "",
        item: "",
        cantidad: "",
        um: "",
        precioUnitario: "",
        total: ""
    }
}

function cargaFormDataProductos(data) {
    const { idProducto, ID, item, precioUnitario } = data;

    return {
        idProducto: idProducto,
        ID: ID,
        item: item,
        cantidad: "",
        um: "",
        precioUnitario: precioUnitario,
        total: ""
    }
}

function formatModelClientes(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        const { direccion: { calle, numeroExterior, numeroInterior, colonia, municipio, estado, pais } } = data;
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            apellidos: data.apellidos,
            rfc: data.rfc,
            telefonoCelular: data.telefonoCelular,
            calle: calle,
            numeroExterior: numeroExterior,
            numeroInterior: numeroInterior,
            colonia: colonia,
            municipio: municipio,
            estado: estado,
            pais: pais,
            correo: data.correo,
            foto: data.foto,
            estadoCliente: data.estadoCliente,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelMatrizProductos(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            noInterno: data.noInterno,
            cliente: data.cliente,
            datosMolde: data.datosMolde,
            noParte: data.noParte,
            descripcion: data.descripcion,
            precioVenta: data.precioVenta,
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

export default ModificacionVentas;
