import { useState, useEffect } from 'react';
import "./RegistroEntradaSalida.scss"
import { listarMateriaPrima } from "../../../api/materiaPrima";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { map, size, values } from "lodash";
import { listarRegistrosAlmacen, listarMovimientosAlmacenes, obtenerDatosAlmacenesFolio, registraMovimientosAlmacenes } from "../../../api/almacenes";
import { toast } from "react-toastify";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import queryString from "query-string";
import { listarProduccion } from "../../../api/produccion";
import { obtenerDatosInspeccion } from "../../../api/inspeccionMaterial";
import { obtenerDatosProduccion } from "../../../api/produccion";
import { LogTrackingActualizacion } from "../../Tracking/Gestion/GestionTracking";
import { getSucursal, getAlmacen } from '../../../api/auth';
import BuscarEmpaque from '../../../page/BuscarArticuloAlmacen';
import BuscarArticuloAlmacen from '../../../page/BuscarArticuloAlmacen';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";

function RegistroEntradaSalida(props) {
    const { setShowModal, location, history } = props;

    // Para hacer uso del modal
    const [showModal2, setShowModal2] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

        // Para la eliminacion fisica de usuarios
        const buscarArticulo = (content) => {
            setTitulosModal("Buscar articulo");
            setContentModal(content);
            setShowModal2(true);
        }

    // Define el motivo de la salida
    const [motivoSalida, setMotivoSalida] = useState("");

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    // Para almacenar la informacion del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para almacenar el listado de productos activos
    const [listProduccion, setListProduccion] = useState(null);

    // Para traer el listado de productos activos
    useEffect(() => {
        try {
            listarProduccion(getSucursal()).then(response => {
                const { data } = response;
                // console.log(data)

                if (!listProduccion && data) {
                    setListProduccion(formatModelProduccion(data));
                } else {
                    const datosProduccion = formatModelProduccion(data);
                    setListProduccion(datosProduccion);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    // Para cerrar el modal
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    // Para almacenar la fecha actual
    const [fechaActual, setFechaActual] = useState(new Date);

    // Para almacenar el listado de materias primas
    const [listArticulos, setListArticulos] = useState(null);

    useEffect(() => {
        try {
            listarRegistrosAlmacen(getSucursal(), getAlmacen()).then(response => {
                const { data } = response;
                // console.log(data)
                if (!listArticulos && data) {
                    setListArticulos(formatModelAlmacenes(data));
                } else {
                    const datosArticulos = formatModelAlmacenes(data);
                    setListArticulos(datosArticulos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault()


        if (!formData.fecha || !formData.tipoOperacion || !formData.cantidad || !formData.descripcion) {
            // console.log("Valores "+ validCount + " del form " + size(formData))
            toast.warning("Completa el formulario")
        } else {
            setLoading(true)

            try {
                // Obtener los datos de la materia prima, para recuperar todos los movimientos y almacenar uno nuevo
                listarMovimientosAlmacenes(formDataArticulo.folioArticulo).then(response => {
                    const { data } = response;
                    // console.log(data)
                    // const final = data.concat(dataMovimiento)
                    const dataAlmacenada = data
                    // console.log(final)

                    // Validar tipo y determinar nuevas existencias
                    if (formData.tipoOperacion === "Entrada") {
                        const nuevaExistenciaTotal = parseInt(formDataArticulo.cantidadExistencia) + parseInt(formData.cantidad)

                        const dataMovimiento = {
                            fecha: formData.fecha,
                            articulo: formDataArticulo.nombreArticulo,
                            almacen: getAlmacen(),
                            sucursal: getSucursal(),
                            um: formDataArticulo.um,
                            tipo: formData.tipoOperacion,
                            descripcion: formData.descripcion,
                            cantidadExistencia: formData.cantidad,
                        }

                        const finalEntrada = data.concat(dataMovimiento)

                        const dataTempFinal = {
                            fecha: formData.fecha,
                            movimientos: finalEntrada,
                            cantidadExistencia: nuevaExistenciaTotal.toString()
                        }

                        //console.log("datos finales ", movimientosFinal)

                        // console.log(dataTempFinal)
                        obtenerDatosAlmacenesFolio(formDataArticulo.folioArticulo).then(response => {
                            const { data } = response;
                            // console.log(data)
                            const { _id } = data;
                            registraMovimientosAlmacenes(_id, dataTempFinal).then(response => {
                                const { data } = response;

                                //LogTrackingActualizacion(ordenVenta, "En almacen de materia prima", "5")
                                //console.log(response)
                                const { mensaje, datos } = data;
                                toast.success(mensaje)
                                setLoading(false)
                                LogsInformativos("Se han actualizado las existencias de la materia prima " + formDataArticulo.nombreArticulo, dataTempFinal)
                                history.push({
                                    search: queryString.stringify(""),
                                });
                                setShowModal(false)
                            })

                        })

                    }
                    if (formData.tipoOperacion === "Salida") {

                        // console.log("Afecta existencias ov")
                        if (parseInt(formDataArticulo.cantidadExistencia) - parseInt(formData.cantidad) < 0) {
                            toast.warning("Las existencias en el almacen no pueden satisfacer la solicitud")
                            setLoading(false);
                        } else {
                            const nuevaExistenciaTotal = parseInt(formDataArticulo.cantidadExistencia) - parseInt(formData.cantidad)

                            const dataMovimientoSalida = {
                                fecha: formData.fecha,
                                articulo: formDataArticulo.nombreArticulo,
                                almacen: getAlmacen(),
                                sucursal: getSucursal(),
                                um: formDataArticulo.um,
                                tipo: formData.tipoOperacion,
                                descripcion: formData.descripcion,
                                cantidadExistencia: formData.cantidad,
                            }

                            const finalSalida = data.concat(dataMovimientoSalida)


                            const dataTempFinal = {
                                fecha: formData.fecha,
                                movimientos: finalSalida,
                                cantidadExistencia: nuevaExistenciaTotal.toString()
                            }

                            obtenerDatosAlmacenesFolio(formDataArticulo.folioArticulo).then(response => {
                                const { data } = response;
                                // console.log(data)
                                const { _id } = data;
                                registraMovimientosAlmacenes(_id, dataTempFinal).then(response => {
                                    const { data } = response;

                                    LogTrackingActualizacion(ordenVenta, "En almacen de materia prima", "5")

                                    const { mensaje, datos } = data;
                                    toast.success(mensaje)
                                    setLoading(false)
                                    LogsInformativos("Se han actualizado las existencias de la materia prima " + formDataArticulo.nombreArticulo, dataTempFinal)
                                    history.push({
                                        search: queryString.stringify(""),
                                    });
                                    setShowModal(false)
                                })

                            })
                        }
                        // Termina afectaciones en existencias de ov para salida

                    }

                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    // Para almacenar la informacion del formulario
    const [formDataArticulo, setFormDataArticulo] = useState(initialFormDataArticulo());
    console.log(formDataArticulo)

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setFormDataArticulo({ ...formDataArticulo, [e.target.name]: e.target.value })
    }

    // Para almacenar el lote 
    const [lote, setLote] = useState("");

    // Para almacenar el lote 
    const [ordenVenta, setOrdenVenta] = useState("");

    useEffect(() => {
        try {

            if (formData.tipoOperacion == "Entrada") {
                obtenerDatosInspeccion(formData.referencia).then(response => {
                    const { data } = response;
                    const { lote, ordenVenta } = data;
                    setLote(lote);
                    setOrdenVenta(ordenVenta)
                }).catch(e => {
                    console.log(e)
                })
            } else if (formData.tipoOperacion == "Salida") {
                obtenerDatosProduccion(formData.referencia).then(response => {
                    const { data } = response;
                    const { generalidades } = data;
                    setOrdenVenta(generalidades.ordenVenta)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [formData.referencia, formData.tipoOperacion]);

    const temp = formData.articulo.split("/")

    return (
        <>
            <div className="contenidoFormularioPrincipal">
                <Form onChange={onChange} onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formHorizontalDescripcion">
                            <Form.Label>
                                Fecha
                            </Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Escribe la fecha"
                                name="fecha"
                                defaultValue={formData.fecha}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMateriaPrima" className="materiaPrim">
                            <Form.Label>
                                Articulo
                            </Form.Label>
                            <Col>
                                <div className="flex items-center mb-1">
                                    <Form.Control
                                        type="text"
                                        defaultValue={formDataArticulo.nombreArticulo}
                                        placeholder="Buscar articulo"
                                        name="nombreArticulo"
                                    />
                                    <FontAwesomeIcon
                                        className="cursor-pointer py-2 -ml-6"
                                        icon={faSearch}
                                        onClick={() => {
                                            buscarArticulo(
                                                <BuscarArticuloAlmacen
                                                    formData={formDataArticulo}
                                                    setFormData={setFormDataArticulo}
                                                    setShowModal={setShowModal2}
                                                />)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                            <Form.Label>
                                U.M
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Escribe la unidad de medida"
                                name="um"
                                defaultValue={formDataArticulo.um}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3 motivoSalida">
                            <Form.Label>
                                Tipo operacion
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    value="Entrada"
                                    type="radio"
                                    label="Entrada"
                                    name="tipoOperacion"
                                    id="tipoOperacion"
                                    defaultValue={formData.tipoOperacion}
                                />
                            </Col>
                            <Col sm={10}>
                                <Form.Check
                                    value="Salida"
                                    type="radio"
                                    label="Salida"
                                    name="tipoOperacion"
                                    id="tipoOperacion"
                                    defaultValue={formData.tipoOperacion}
                                />
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                            <Form.Label>
                                {formData.tipoOperacion == "Entrada" ? "Cantidad entrada" : formData.tipoOperacion == "Salida" ? "Cantidad salida" : "Cantidad"}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={formData.tipoOperacion == "Entrada" ? "escribe la cantidad de entrada" : formData.tipoOperacion == "Salida" ? "Escribe la cantidad de salida" : "Escribe la cantidad"}
                                name="cantidad"
                                defaultValue={formData.cantidad}

                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formHorizontalDescripcion" className="descripcionMP">
                            <Form.Label>
                                Descripción
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    as="textarea" rows={2}
                                    placeholder={formData.tipo === "Salida" ? "Escribe motivo de la salida" : "Escribe el motivo de la entrada"}
                                    name="descripcion"
                                    defaultValue={formData.descripcion}
                                />
                            </Col>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="botones">
                        <Col>
                            <Button
                                type="submit"
                                title="Guardar información del movimiento"
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
                                    cancelarRegistro()
                                }}
                            >
                                Cancelar
                            </Button>
                        </Col>
                    </Form.Group>
                    <BasicModal show={showModal2} setShow={setShowModal} title={titulosModal}>
                        {contentModal}
                    </BasicModal>
                </Form>
            </div>
        </>
    );
}

function initialFormData() {
    return {
        articulo: "",
        tipo: "",
        descripcion: "",
        referencia: "",
        cantidad: "",
        fecha: "",
        referencia: "",
        tipoOperacion: "",
        referenciaOP: "",
        lote: "",
        um: "",
    }
}

function initialFormDataArticulo() {
    return {
        folioArticulo: "",
        nombreArticulo: "",
        um: "",
        cantidadExistencia: ""
    }
}

function formatModelAlmacenes(data) {
    // console.log(data)
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
            movimientos: data.movimientos,
            cantidadExistencia: data.cantidadExistencia,
            estado: data.estado,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelProduccion(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            generalidades: data.generalidades,
            planeacion: data.planeacion,
            bom: data.bom,
            resultados: data.resultados,
            materiaPrima: data.materiaPrima,
            observaciones: data.observaciones,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default RegistroEntradaSalida;