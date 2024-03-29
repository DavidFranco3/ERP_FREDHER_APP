import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { listarRegistrosAlmacen } from "../../api/almacenes";
import ListAlmacenes from "../../components/Almacenes/ListAlmacenes";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import BasicModal from "../../components/Modal/BasicModal";
import RegistroEntradaSalida from "../../components/Almacenes/RegistroEntradaSalida";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { toast } from "react-toastify";
import { getSucursal, getTokenApi, isExpiredToken, logoutApi, getAlmacen, setAlmacen } from '../../api/auth';
import { listarAlmacenes } from '../../api/gestionAlmacen';
import { map } from "lodash";
import { LogsInformativosLogout } from "../../components/Logs/LogsSistema/LogsSistema";

function Almacenes(props) {
    const { setRefreshCheckLogin, location, history } = props;

    // Para definir el enrutamiento
    const enrutamiento = useNavigate();

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

    // Para almacenar las sucursales registradas
    const [almacenesRegistrados, setAlmacenesRegistrados] = useState(null);

   const cargarListaAlmacenes = () => {
    try {
        listarAlmacenes(getSucursal()).then(response => {
            const { data } = response;
            //console.log(data)
            const dataTemp = formatModelGestionAlmacen(data);
            //console.log(data)
            setAlmacenesRegistrados(dataTemp);
        })
    } catch (e) {

    }
    }

    useEffect(() => {
        cargarListaAlmacenes();
    }, []);

    // Almacena la razón social, si ya fue elegida
    const [almacenElegido, setAlmacenElegido] = useState("");

    // Para almacenar en localstorage la razon social
    const almacenaAlmacen = (almacen) => {
        if (almacen != "Elige una opción") {
            setAlmacen(almacen)
        }
        window.location.reload()
    }

    const guardarAlmacenElegido = () => {
        if (getAlmacen()) {
            setAlmacenElegido(getAlmacen)
        }
    }

    useEffect(() => {
        guardarAlmacenElegido();
    }, []);

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);


    // Para el registro de entradas o salidas
    const nuevaEntradaSalida = (content) => {
        setTitulosModal("Nueva Entrada / Salida");
        setContentModal(content);
        setShowModal(true);
    }

    // Recuperación de la razón social seleccionada
    const [razonSocialElegida, setRazonSocialElegida] = useState("Sin Selección");

    const cargarRazonSocial = () => {
        if (getSucursal()) {
            setRazonSocialElegida(getSucursal)
        } else {
            setRazonSocialElegida("Sin Selección")
        }
    }

    useEffect(() => {
        cargarRazonSocial();
    }, []);
    // Termina recuperación de la razón social recuperada

    // Almacenar el listado de materias primas registradas
    const [listAlmacenes, setListAlmacenes] = useState(null);

    const cargarDatos = () => {
        try {
            listarRegistrosAlmacen(getSucursal(), getAlmacen()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listAlmacenes && data) {
                    setListAlmacenes(formatModelAlmacenes(data));
                } else {
                    const datosAlmacenes = formatModelAlmacenes(data);
                    setListAlmacenes(datosAlmacenes);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDatos();
    }, [location]);

    const rutaRegreso = () => {
        enrutamiento("/")
    }

    return (
        <>
            {
                razonSocialElegida === "Sin Selección" ?
                    (
                        <>
                            <Lottie
                                loop={true}
                                play={true}
                                animationData={AnimacionLoading}
                            />
                        </>
                    )
                    :
                    (
                        <>
                            <Alert>
                                <Row>
                                    <Col xs={12} md={8} className="tituloPrincipal">
                                        <h1>
                                            Almacenes
                                        </h1>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button
                                            className="btnRegistroVentas"
                                            title="Registrar una entrada/salida"
                                            onClick={() => {
                                                nuevaEntradaSalida(
                                                    <RegistroEntradaSalida
                                                        setShowModal={setShowModal}
                                                        location={location}
                                                        history={history}
                                                    />
                                                )
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCirclePlus} /> Registrar E / S
                                        </Button>

                                        <Button
                                            className="btnRegistroVentas"
                                            title="Regresar al menú almacenes"
                                            onClick={() => {
                                                rutaRegreso()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                                        </Button>

                                    </Col>
                                </Row>
                            </Alert>

                            <Row>
                                <Col xs={6} md={4}>

                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Control
                                        as="select"
                                        aria-label="indicadorAlmacen"
                                        name="almacen"
                                        className="cajaSucursal"
                                        defaultValue={almacenElegido}
                                        onChange={(e) => {
                                            almacenaAlmacen(e.target.value)
                                        }}
                                    >
                                        <option>Elige una opción</option>
                                        {map(almacenesRegistrados, (almacen, index) => (
                                            <option key={index} value={almacen?.nombre} selected={almacenElegido == almacen?.nombre}>{almacen?.nombre}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>

                            {
                                listAlmacenes ?
                                    (
                                        <>
                                            <Suspense fallback={<Spinner />}>
                                                <ListAlmacenes
                                                    listAlmacenes={listAlmacenes}
                                                    location={location}
                                                    history={history}
                                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                                />
                                            </Suspense>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Lottie loop={true} play={true} animationData={AnimacionLoading} />
                                        </>
                                    )
                            }
                        </>
                    )}

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function formatModelGestionAlmacen(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            sucursal: data.sucursal,
            status: data.status,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

function formatModelAlmacenes(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            idArticulo: data.idArticulo,
            folioArticulo: data.folioArticulo,
            lote: data.lote,
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

export default withRouter(Almacenes);
