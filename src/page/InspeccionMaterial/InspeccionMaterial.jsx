import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import { toast } from "react-toastify";
import { listarInspeccionPieza } from "../../api/inspeccionPieza";
import ListInspeccion from '../../components/InspeccionMaterial/ListInspeccionPieza';
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../api/auth";

function InspeccionPieza(props) {
    const { setRefreshCheckLogin, location, history } = props;

    // Cerrado de sesión automatico
    useEffect(() => {
        if (getTokenApi()) {
            if (isExpiredToken(getTokenApi())) {
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
                logoutApi();
                enrutamiento("");
                setRefreshCheckLogin(true);
            }
        }
    }, []);
    // Termina cerrado de sesión automatico

    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    // Define la ruta de registro
    const rutaRegistro = () => {
        enrutamiento("/RegistraInspeccionPieza")
    }

    const rutaRegreso = () => {
        enrutamiento("/DashboardCalidad")
    }

    // Recuperación de la razón social seleccionada
    const [razonSocialElegida, setRazonSocialElegida] = useState("Sin Selección");

    useEffect(() => {
        if (getSucursal()) {
            setRazonSocialElegida(getSucursal)
        } else {
            setRazonSocialElegida("Sin Selección")
        }
    }, []);
    // Termina recuperación de la razón social recuperada

    // Para almacenar el listado de compras realizadas
    const [listInspeccion, setListInspeccion] = useState(null);

    useEffect(() => {
        try {
            listarInspeccionPieza(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listInspeccion && data) {
                    setListInspeccion(formatModelInspeccion(data));
                } else {
                    const datosInspeccion = formatModelInspeccion(data);
                    setListInspeccion(datosInspeccion);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
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
                                            Inspeccion de pieza
                                        </h1>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button
                                            className="btnRegistroVentas"
                                            title="Registrar una nueva inspeccion de material"
                                            onClick={() => {
                                                rutaRegistro()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCirclePlus} /> Registrar
                                        </Button>
                                        <Button
                                            className="btnRegistroVentas"
                                            title="Regresar al menú calidad"
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
                                listInspeccion ?
                                    (
                                        <>
                                            <Suspense fallback={<Spinner />}>
                                                <ListInspeccion
                                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                                    listInspeccion={listInspeccion}
                                                    history={history}
                                                    location={location}
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

function formatModelInspeccion(data) {
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            folio: data.folio,
            fechaElaboracion: data.fechaElaboracion,
            noOP: data.noOP,
            sucursal: data.sucursal,
            fechaArranqueMaquina: data.fechaArranqueMaquina,
            noMaquina: data.noMaquina,
            cliente: data.cliente,
            descripcionPieza: data.descripcionPieza,
            noParte: data.noParte,
            material: data.material,
            cantidadLote: data.cantidadLote,
            turno1: data.turno1,
            turno2: data.turno2,
            status: data.status,
            motivoCancelacion: data.motivoCancelacion,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(InspeccionPieza);
