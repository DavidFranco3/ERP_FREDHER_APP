import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { listarCotizacion } from "../../api/cotizaciones";
import ListCotizaciones from "../../components/Cotizaciones/ListCotizaciones";
import queryString from "query-string";
import { toast } from "react-toastify";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../api/auth";
import { LogsInformativosLogout } from "../../components/Logs/LogsSistema/LogsSistema";

function Cotizaciones(props) {
    const { setRefreshCheckLogin, location, history } = props;

    const enrutamiento = useNavigate()

    const rutaRegreso = () => {
        enrutamiento("/")
    }

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

    // Ruta de acceso
    const rutaRegistroCotizaciones = () => {
        enrutamiento("/RegistroCotizaciones")
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

    // Para almacenar el listado de cotizaciones
    const [listCotizaciones, setListCotizaciones] = useState(null);

    const cargarDatos = () => {
        try {
            listarCotizacion(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listCotizaciones && data) {
                    setListCotizaciones(formatModelCotizacion(data));
                } else {
                    const datosCotizacion = formatModelCotizacion(data);
                    setListCotizaciones(datosCotizacion);
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
                                    <Col xs={12} md={8}>
                                        <h1>
                                            Cotizaciones
                                        </h1>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button
                                            className="btnRegistroVentas"
                                            title="Registrar una nueva cotizacion"
                                            onClick={() => {
                                                rutaRegistroCotizaciones()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCirclePlus} /> Registrar
                                        </Button>
                                        <Button
                                            className="btnRegistroVentas"
                                            title="Regresar al menú principal"
                                            onClick={() => {
                                                rutaRegreso()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                                        </Button>
                                    </Col>
                                </Row>
                            </Alert>

                            {
                                listCotizaciones ?
                                    (
                                        <>
                                            <Suspense fallback={<Spinner />}>
                                                <ListCotizaciones
                                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                                    location={location}
                                                    history={history}
                                                    listCotizaciones={listCotizaciones}
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
        </>
    );
}

function formatModelCotizacion(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            folio: data.folio,
            cliente: data.cliente,
            sucursal: data.sucursal,
            vendedor: data.vendedor,
            fechaCreacion: data.fechaCreacion,
            partida: data.partida,
            referencia: data.referencia,
            comentarios: data.comentarios,
            correoAtencion: data.correoAtencion,
            status: data.status,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(Cotizaciones);
