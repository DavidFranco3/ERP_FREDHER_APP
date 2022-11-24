import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import "./ModificaMatrizProductos.scss";
import { Alert, Button, Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowLeftRotate, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { map } from "lodash";
import LogoPDF from "../../../assets/png/pdf.png";
import Regreso from "../../../assets/png/back.png";
import LayoutPrincipal from "../../../layout/layoutPrincipal";
import { actualizaProductosMatriz, obtenerMatrizProducto, registraMatrizProductos } from "../../../api/matrizProductos";
import { listarMateriaPrima } from "../../../api/materiaPrima";
import { toast } from "react-toastify";
import { listarClientes } from "../../../api/clientes";
import { listarMaquina } from "../../../api/maquinas";
import { listarProveedores } from "../../../api/proveedores";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function ModificaMatrizProductos(props) {

    // Para definir el enrutamiento
    const enrutamiento = useHistory();

    // Para extraer los parametros de la ruta
    const parametros = useParams();

    const { producto } = parametros;

    console.log(producto);

    // Para la animacion del spinner
    const [loading, setLoading] = useState(false);

    // Para almacenar el listado de clientes
    const [listClientes, setListClientes] = useState(null);

    // Para almacenar el listado de maquinas
    const [listMaquinas, setListMaquinas] = useState(null);

    // Para almacenar el listado de materias primas
    const [listMateriasPrimas, setListMateriasPrimas] = useState(null);

    // para almacenar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());

    // para almacenar el listado de porveedores
    const [listProveedores, setListProveedores] = useState(null);

    // Define el regreso hacia los productos
    const rutaRegresoProductos = () => {
        enrutamiento.push("/MatrizProductos")
    }

    const descargaPDF = () => {
        console.log("descarga pdf")
    }

    // Para guardar los datos del producto
    const [informacionProducto, setInformacionProducto] = useState(null);

    useEffect(() => {
        // Para buscar el producto en la matriz de productos
        try {
            obtenerMatrizProducto(producto).then(response => {
                const { data } = response;
                // console.log(data)
                // initialData

                if (!formData && data) {
                    setFormData(valoresAlmacenados(data));
                } else {
                    const datosProductos = valoresAlmacenados(data);
                    setFormData(datosProductos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }

        // Para obtener el listado de materias primas
        try {
            listarMateriaPrima().then(response => {
                const { data } = response;
                //console.log(data)
                if (!listMateriasPrimas && data) {
                    setListMateriasPrimas(formatModelMateriasPrimas(data));
                } else {
                    const datosProductos = formatModelMateriasPrimas(data);
                    setListMateriasPrimas(datosProductos);
                }
            }).catch(e => {
                //console.log(e)
                if (e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }
        // Para obtener el listado de clientes
        try {
            listarClientes().then(response => {
                const { data } = response;
                // console.log(data)

                if (!listClientes && data) {
                    setListClientes(formatModelClientes(data));
                } else {
                    const datosProductos = formatModelClientes(data);
                    setListClientes(datosProductos);
                }
            }).catch(e => {
                //console.log(e)
                if (e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }

        try {
            listarMaquina().then(response => {
                const { data } = response;
                // console.log(data)

                if (!listMaquinas && data) {
                    setListMaquinas(formatModelMaquinas(data));
                } else {
                    const datosMaquinas = formatModelMaquinas(data);
                    setListMaquinas(datosMaquinas);
                }
            }).catch(e => {
                //console.log(e)
                if (e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }

        // Para obtener el listado de proveedores
        try {
            listarProveedores().then(response => {
                const { data } = response;
                // console.log(data)

                if (!listProveedores && data) {
                    setListProveedores(formatModelProveedores(data));
                } else {
                    const datosProductos = formatModelProveedores(data);
                    setListProveedores(datosProductos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault()

        if (!formData.noInterno || !formData.cliente || !formData.noMolde || !formData.cavMolde || !formData.noParte || !formData.descripcion || !formData.pesoPiezas || !formData.pesoColada || !formData.pesoTotalInyeccion || !formData.porcentajeScrap || !formData.porcentajeMolido || !formData.descripcionMP || !formData.descripcionPigmento || !formData.aplicacionGxKG || !formData.tiempoCiclo || !formData.noOperadores || !formData.piezasxHora || !formData.piezasxTurno || !formData.descripcionBolsa || !formData.noPiezasxEmpaque) {
            toast.warning("Completa el formulario");
        } else {
            //console.log(formData)
            setLoading(true)

            const dataTemp = {
                noInterno: formData.noInterno,
                cliente: formData.cliente,
                datosMolde: {
                    noMolde: formData.noMolde,
                    cavMolde: formData.cavMolde
                },
                noParte: formData.noParte,
                descripcion: formData.descripcion,
                precioVenta: formData.precioVenta,
                datosPieza: {
                    pesoPiezas: formData.pesoPiezas,
                    pesoColada: formData.pesoColada,
                    pesoTotalInyeccion: formData.pesoTotalInyeccion,
                    porcentajeScrap: formData.porcentajeScrap,
                    porcentajeMolido: formData.porcentajeMolido
                },
                materiaPrima: {
                    descripcion: formData.descripcionMP,
                },
                pigmentoMasterBach: {
                    descripcion: formData.descripcionPigmento,
                    aplicacionGxKG: formData.aplicacionGxKG,
                    proveedor: formData.proveedor
                },
                tiempoCiclo: formData.tiempoCiclo,
                noOperadores: formData.noOperadores,
                piezasxHora: formData.piezasxHora,
                piezasxTurno: formData.piezasxTurno,
                materialEmpaque: {
                    descripcionBolsa: formData.descripcionBolsa,
                    noPiezasxEmpaque: formData.noPiezasxEmpaque
                },
                opcionMaquinaria: {
                    1: {
                        opcion1: formData.opcion1,
                        tiempoCiclo1: formData.tiempoCiclo1
                    },
                    2: {
                        opcion2: formData.opcion2,
                        tiempoCiclo2: formData.tiempoCiclo2
                    },
                    3: {
                        opcion3: formData.opcion3,
                        tiempoCiclo3: formData.tiempoCiclo3
                    },
                    4: {
                        opcion4: formData.opcion4,
                        tiempoCiclo4: formData.tiempoCiclo4
                    },
                    5: {
                        opcion5: formData.opcion5,
                        tiempoCiclo5: formData.tiempoCiclo5
                    },
                    6: {
                        opcion6: formData.opcion6,
                        tiempoCiclo6: formData.tiempoCiclo6
                    }
                },
                estado: "true"
            }

            //console.log(dataTemp)
            try {
                actualizaProductosMatriz(producto, dataTemp).then(response => {
                    const { data } = response;
                    LogsInformativos("El producto de la matriz de productos con No. interno ", dataTemp.noInterno, " fue modificado", dataTemp)
                    setLoading(false)
                    toast.success(data.mensaje)
                    rutaRegresoProductos()
                }).catch(e => {
                    console.log(e)
                    if (e.message === 'Network Error') {
                        //console.log("No hay internet")
                        toast.error("Conexión al servidor no disponible");
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Para obtener el peso de la inyeccion
    const inyeccion = parseFloat(formData.pesoPiezas) + (parseFloat(formData.pesoColada) / parseFloat(formData.cavMolde)) * parseFloat(formData.cavMolde);

    // Para obtener el porcentaje de molido
    const molido = ((parseFloat(formData.pesoColada) / parseFloat(formData.cavMolde)) / parseFloat(formData.pesoPiezas)) * 100;

    // Para obtener el total de piezas por hora
    const piezasHora = (3600 / (parseFloat(formData.tiempoCiclo))) * formData.cavMolde;
    console.log(piezasHora)

    // Para obtener el total de piezas por turno
    const piezasTurno = (12 * parseFloat(piezasHora));

    return (
        <>
            <LayoutPrincipal>
                <Alert>
                    <Row>
                        <Col xs={12} md={8}>
                            <h1>
                                Modificando el producto
                            </h1>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                className="btnRegistroVentas"
                                onClick={() => {
                                    rutaRegresoProductos()
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                            </Button>
                        </Col>
                    </Row>
                </Alert>

                <Container fluid>
                    <Col>
                        {
                            formData &&
                            (
                                <>
                                    <div className="formularioRegistroMatrizProductos">
                                        <Form onChange={onChange} onSubmit={onSubmit}>

                                            <div className="encabezado">
                                                <Container fluid>
                                                    <br />
                                                    {/* No. interno, cliente, no. parte */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridNumeroInterno">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    No. interno
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe el no. interno"
                                                                    name="noInterno"
                                                                    defaultValue={formData.noInterno}
                                                                />
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Cliente
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control as="select"
                                                                    defaultValue={formData.cliente}
                                                                    name="cliente"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listClientes, (cliente, index) => (
                                                                        <option key={index} value={cliente?.id} selected={cliente?.id === formData.cliente}>{cliente?.nombre + " " + cliente.apellidos}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                    {/* No. molde, cav. molde */}
                                                    <Row className="mb-3">

                                                        <Form.Group as={Row} controlId="formGridNoParte">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    No. parte
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe el no.parte"
                                                                    name="noParte"
                                                                    defaultValue={formData.noParte}
                                                                />
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    No. molde
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe el no. de molde"
                                                                    name="noMolde"
                                                                    defaultValue={formData.noMolde}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>

                                                    {/* Descripción */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridCAVMolde">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    CAV molde
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe el cav del molde"
                                                                    name="cavMolde"
                                                                    defaultValue={formData.cavMolde}
                                                                />
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Descripción
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
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
                                                        <Form.Group as={Row} controlId="formGridNumeroParte">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Precio de venta
                                                                </Form.Label>
                                                            </Col>
                                                            <Col sm="4">
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.000001"
                                                                    min="0"
                                                                    placeholder="Escribe el precio de venta"
                                                                    name="precioVenta"
                                                                    defaultValue={formData.precioVenta}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                </Container>
                                            </div>

                                            {/* Datos de la pieza */}
                                            <div className="datosPieza">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Datos de la pieza
                                                        </h4>
                                                    </div>
                                                    {/* Peso piezas, peso colada, peso total inyeccion*/}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridNumeroParte">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Peso de la pieza
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.000001"
                                                                    min="0"
                                                                    placeholder="Escribe el peso"
                                                                    name="pesoPiezas"
                                                                    defaultValue={formData.pesoPiezas}
                                                                />
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Peso colada
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.000001"
                                                                    min="0"
                                                                    placeholder="Escribe el peso"
                                                                    name="pesoColada"
                                                                    defaultValue={formData.pesoColada}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                    {/* porcentaje scrap, porcentaje molido*/}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridPesoTotalInyeccion">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Peso total de inyección
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.000001"
                                                                    min="0"
                                                                    placeholder="Escribe el peso"
                                                                    name="pesoTotalInyeccion"
                                                                    value={formData.pesoPiezas == "" ? 0 : formData.pesoColada == "" ? 0 : formData.cavMolde == "" ? 0 : inyeccion.toFixed(2)}
                                                                    disabled
                                                                />
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Porcentaje scrap
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    placeholder="Escribe el porcentaje"
                                                                    name="porcentajeScrap"
                                                                    defaultValue={formData.porcentajeScrap}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridPorcentajeMolido">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Porcentaje de molido
                                                                </Form.Label>
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.00000000000001"
                                                                    min="0"
                                                                    placeholder="Escribe el porcentaje"
                                                                    name="porcentajeMolido"
                                                                    value={formData.pesoPiezas == "" ? 0 : formData.pesoColada == "" ? 0 : formData.cavMolde == "" ? 0 : molido > 100 ? molido.toFixed(0) : molido.toFixed(2)}
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                </Container>
                                            </div>

                                            {/* Materia prima */}
                                            <div className="materiaPrima">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Materia prima
                                                        </h4>
                                                    </div>
                                                    {/* Descripción */}

                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridDescripcionMateriaPrima">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Selecciona la materia prima
                                                                </Form.Label>
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select"
                                                                    defaultValue={formData.descripcionMP}
                                                                    name="descripcionMP"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMateriasPrimas, (materiaprima, index) => (
                                                                        <option key={index} value={materiaprima?.descripcion} selected={materiaprima?.descripcion === formData.descripcionMP}>{materiaprima?.descripcion}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                </Container>
                                            </div>

                                            {/* Pigmento */}
                                            <div className="pigmentoMasterBach">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Pigmento / Master bach
                                                        </h4>
                                                    </div>
                                                    {/* Descripcion */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridDescripciónPigmento">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Descripción
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe la descripción"
                                                                    name="descripcionPigmento"
                                                                    defaultValue={formData.descripcionPigmento}
                                                                />
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Aplicación G x K.G.
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.000001"
                                                                    min="0"
                                                                    placeholder="Escribe la aplicación"
                                                                    name="aplicacionGxKG"
                                                                    defaultValue={formData.aplicacionGxKG}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                    {/* Aplicacion gxkg, proveedor */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridProveedor">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Proveedor
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.proveedor}
                                                                    name="proveedor"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listProveedores, (proveedor, index) => (
                                                                        <option key={index} value={proveedor?.id} selected={proveedor?.id === formData.proveedor}>{proveedor?.nombre}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>
                                                </Container>
                                            </div>

                                            <div className="pigmentoMasterBach">
                                                <Container fluid>
                                                    <br />
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridProveedor">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    No. de operadores
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el numero de operadores"
                                                                    name="noOperadores"
                                                                    defaultValue={formData.noOperadores}
                                                                />
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo"
                                                                    name="tiempoCiclo"
                                                                    defaultValue={formData.tiempoCiclo}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>
                                                    {/* Tiempo ciclo (seg), no operadores, piezas x hora, piezas x turno */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridPiezasxHora">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Piezas x Hora
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el numero de piezas"
                                                                    name="piezasxHora"
                                                                    value={formData.tiempoCiclo == "" ? 0 : formData.cavMolde == "" ? 0 : piezasHora.toFixed(2)}
                                                                    disabled
                                                                />
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Piezas x Turno
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el numero de piezas"
                                                                    name="piezasxTurno"
                                                                    value={formData.tiempoCiclo == "" ? 0 : formData.cavMolde == "" ? 0 : piezasTurno.toFixed(2)}
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>

                                                    <Row className="mb-3">

                                                    </Row>
                                                </Container>
                                            </div>

                                            {/* Material de empaque */}
                                            <div className="materialEmpaque">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Material de empaque
                                                        </h4>
                                                    </div>
                                                    {/* Porcentaje scrap, no piezas por empaque */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridPorcentajeScrap">
                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    Descripcion de la bolsa
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Escribe el porcentaje"
                                                                    name="descripcionBolsa"
                                                                    defaultValue={formData.descripcionBolsa}
                                                                />
                                                            </Col>

                                                            <Col sm="2">
                                                                <Form.Label>
                                                                    No. de piezas por empaque
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el numero de piezas"
                                                                    name="noPiezasxEmpaque"
                                                                    defaultValue={formData.noPiezasxEmpaque}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>
                                                </Container>
                                            </div>

                                            {/* Opciones maquinaria */}
                                            <div className="opcionesMaquinaria">
                                                <Container fluid>
                                                    <br />
                                                    <div className="tituloSeccion">
                                                        <h4>
                                                            Opciones de maquina
                                                        </h4>
                                                    </div>
                                                    {/* Opcion 1, Tiempo ciclo (seg) */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion1">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 1
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion1}
                                                                    name="opcion1"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion1}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo1"
                                                                    defaultValue={formData.tiempoCiclo1}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>

                                                    {/* Opcion 2, Tiempo ciclo (seg) */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion2">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 2
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion2}
                                                                    name="opcion2"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion2}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo2"
                                                                    defaultValue={formData.tiempoCiclo2}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>
                                                    {/* Opcion 3, Tiempo ciclo (seg) */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion3">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 3
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                            <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion3}
                                                                    name="opcion3"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion3}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo3"
                                                                    defaultValue={formData.tiempoCiclo3}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion1">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 4
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                            <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion4}
                                                                    name="opcion4"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion4}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>

                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo4"
                                                                    defaultValue={formData.tiempoCiclo4}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Row>

                                                    {/* Opcion 2, Tiempo ciclo (seg) */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion2">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 5
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                            <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion5}
                                                                    name="opcion5"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion5}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo5"
                                                                    defaultValue={formData.tiempoCiclo5}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>
                                                    {/* Opcion 3, Tiempo ciclo (seg) */}
                                                    <Row className="mb-3">
                                                        <Form.Group as={Row} controlId="formGridOpcion3">
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Opción 6
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                            <Form.Control
                                                                    as="select"
                                                                    defaultValue={formData.opcion6}
                                                                    name="opcion6"
                                                                >
                                                                    <option>Elige una opción</option>
                                                                    {map(listMaquinas, (maquina, index) => (
                                                                        <option value={maquina?.id} selected={maquina?.id === formData.opcion6}>{maquina?.numeroMaquina + "-" + maquina?.marca}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="1">
                                                                <Form.Label>
                                                                    Tiempo ciclo
                                                                </Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Escribe el tiempo de ciclo"
                                                                    name="tiempoCiclo6"
                                                                    defaultValue={formData.tiempoCiclo6}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                    </Row>
                                                </Container>
                                            </div>

                                            <Form.Group as={Row} className="botones">
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            type="submit"
                                                            variant="success"
                                                            className="registrar"
                                                        >
                                                            {!loading ? "Modificar" : <Spinner animation="border" />}
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            variant="danger"
                                                            className="cancelar"
                                                            onClick={() => {
                                                                rutaRegresoProductos()
                                                            }}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Form>
                                    </div>


                                </>
                            )
                        }
                    </Col>
                </Container>
            </LayoutPrincipal>
        </>
    );
}

function initialFormData(data) {
    return {
        noInterno: "",
        cliente: "",
        noMolde: "",
        cavMolde: "",
        noParte: "",
        descripcion: "",
        precioVenta: "",
        pesoPiezas: "",
        pesoColada: "",
        pesoTotalInyeccion: "",
        porcentajeScrap: "",
        porcentajeMolido: "",
        descripcionMP: "",
        descripcionPigmento: "",
        aplicacionGxKG: "",
        proveedor: "",
        tiempoCiclo: "",
        noOperadores: "",
        piezasxHora: "",
        piezasxTurno: "",
        descripcionBolsa: "",
        noPiezasxEmpaque: "",
        opcion1: "",
        tiempoCiclo1: "",
        opcion2: "",
        tiempoCiclo2: "",
        opcion3: "",
        tiempoCiclo3: "",
        opcion4: "",
        tiempoCiclo4: "",
        opcion5: "",
        tiempoCiclo5: "",
        opcion6: "",
        tiempoCiclo6: ""
    }
}

function valoresAlmacenados(data) {
    return {
        noInterno: data.noInterno,
        cliente: data.cliente,
        noMolde: data.datosMolde.noMolde,
        cavMolde: data.datosMolde.cavMolde,
        noParte: data.noParte,
        descripcion: data.descripcion,
        precioVenta: data.precioVenta,
        pesoPiezas: data.datosPieza.pesoPiezas,
        pesoColada: data.datosPieza.pesoColada,
        pesoTotalInyeccion: data.datosPieza.pesoTotalInyeccion,
        porcentajeScrap: data.datosPieza.porcentajeScrap,
        porcentajeMolido: data.datosPieza.porcentajeMolido,
        descripcionMP: data.materiaPrima.descripcion,
        descripcionPigmento: data.pigmentoMasterBach.descripcion,
        aplicacionGxKG: data.pigmentoMasterBach.aplicacionGxKG,
        proveedor: data.pigmentoMasterBach.proveedor,
        tiempoCiclo: data.tiempoCiclo,
        noOperadores: data.noOperadores,
        piezasxHora: data.piezasxHora,
        piezasxTurno: data.piezasxTurno,
        descripcionBolsa: data.materialEmpaque.descripcionBolsa,
        noPiezasxEmpaque: data.materialEmpaque.noPiezasxEmpaque,
        opcionMaquinaria: data.opcionMaquinaria,
        opcion1: data.opcionMaquinaria[0][1].opcion1,
        tiempoCiclo1: data.opcionMaquinaria[0][1].tiempoCiclo1,
        opcion2: data.opcionMaquinaria[0][2].opcion2,
        tiempoCiclo2: data.opcionMaquinaria[0][2].tiempoCiclo2,
        opcion3: data.opcionMaquinaria[0][3].opcion3,
        tiempoCiclo3: data.opcionMaquinaria[0][3].tiempoCiclo3,
        opcion4: data.opcionMaquinaria[0][4].opcion4,
        tiempoCiclo4: data.opcionMaquinaria[0][4].tiempoCiclo4,
        opcion5: data.opcionMaquinaria[0][5].opcion5,
        tiempoCiclo5: data.opcionMaquinaria[0][5].tiempoCiclo5,
        opcion6: data.opcionMaquinaria[0][6].opcion6,
        tiempoCiclo6: data.opcionMaquinaria[0][6].tiempoCiclo6
    }
}

function formatModelMateriasPrimas(data) {
    // console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            descripcion: data.descripcion,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelProveedores(data) {
    // console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            folio: data.folio,
            nombre: data.nombre,
            tipo: data.tipo,
            productoServicio: data.productoServicio,
            categoria: data.categoria,
            personalContacto: data.personalContacto,
            telefono: data.telefono,
            correo: data.correo,
            tiempoCredito: data.tiempoCredito,
            tiempoRespuesta: data.tiempoRespuesta,
            lugarRecoleccion: data.lugarRecoleccion,
            horario: data.horario,
            comentarios: data.comentarios,
            estado: data.estado,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelClientes(data) {
    // console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefonoCelular: data.telefonoCelular,
            telefonoFijo: data.telefonoFijo,
            rfc: data.rfc,
            correo: data.correo,
            calle: data.direccion.calle,
            numeroExterior: data.direccion.numeroExterior,
            numeroInterior: data.direccion.numeroInterior,
            colonia: data.direccion.colonia,
            estado: data.direccion.estado,
            municipio: data.direccion.municipio,
            pais: data.direccion.pais,
            razonSocial: data.razonSocial,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelMaquinas(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            numeroMaquina: data.numeroMaquina,
            marca: data.marca,
            tonelaje: data.tonelaje,
            lugar: data.lugar,
            status: data.status,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default ModificaMatrizProductos;
