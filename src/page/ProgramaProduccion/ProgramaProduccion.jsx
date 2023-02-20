import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner, Form, Tabs, Tab, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import { toast } from "react-toastify";
import ListProgramaProduccion from "../../components/ProgramaProduccion/ListProgramaProduccion";
import ListProgramaProduccionMaquinas from '../../components/ProgramaProduccion/ListProgramaProduccionMaquinas';
import Graficas from '../../components/ProgramaProduccion/Graficas';
import { listarProgramaPorSemana } from "../../api/programaProduccion";
import { obtenerDatosSemana } from "../../api/semana";
import "./ProgramaProduccion.scss"
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../api/auth";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function ProgramaProduccion(props) {
    const { setRefreshCheckLogin, location, history } = props;
    const [tab, setTab] = useState('general')

    // Para definir el enrutamiento
    const enrutamiento = useNavigate();

    dayjs.locale('es') // use Spanish locale globally
    dayjs.extend(localizedFormat)

    const params = useParams();
    const { semana } = params;

    // Para almacenar la lista de las integraciones de ventas y gastos
    const [folio, setFolio] = useState("");
    const [fechaInicial, setFechaInicial] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");

    useEffect(() => {
        try {
            obtenerDatosSemana(semana).then(response => {
                const { data } = response;
                setFolio(data.folio);
                setFechaInicial(data.fechaInicial);
                setFechaFinal(data.fechaFinal);
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, [location]);

    // Define la ruta de registro
    const rutaRegistro = () => {
        enrutamiento(`/RegistroProgramaProduccion/${semana}`);
    }

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

    // Para almacenar la lista de pedidos de venta
    const [listProgramaProduccion, setListProgramaProduccion] = useState(null);

    useEffect(() => {
        try {
            listarProgramaPorSemana(getSucursal(), semana).then(response => {
                const { data } = response;

                if (!listProgramaProduccion && data) {
                    setListProgramaProduccion(formatModelProgramaProduccion(data));
                } else {
                    const datosPrograma = formatModelProgramaProduccion(data);
                    setListProgramaProduccion(datosPrograma);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, [location]);

    const rutaRegreso = () => {
        enrutamiento("/Semana")
    }

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Programa producción
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Registrar un nuevo programa de produccion"
                            onClick={() => {
                                rutaRegistro()
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} /> Registrar
                        </Button>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar al menú planeación"
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
                <Col xs={8} md={6}>
                    <Form.Label>
                        {folio} [{dayjs(fechaInicial).format("LL")} al {dayjs(fechaFinal).format("LL")}]
                    </Form.Label>
                </Col>
            </Row>

            {
                listProgramaProduccion ?
                    (
                        <>
                            <Tabs
                                activeKey={tab}
                                onSelect={(k) => setTab(k)}
                                className="flex w-full"
                                id="uncontrolled-tab-estados"
                            >
                                <Tab
                                    key={0}
                                    tabClassName="font-semibold text-lg"
                                    eventKey="general"
                                    title="Vista por programas"
                                >
                                    <br />

                                    <Suspense fallback={<Spinner />}>
                                        <ListProgramaProduccion
                                            listProgramaProduccion={listProgramaProduccion}
                                            location={location}
                                            history={history}
                                            setRefreshCheckLogin={setRefreshCheckLogin}
                                        />
                                    </Suspense>
                                </Tab>

                                <Tab
                                    key={1}
                                    tabClassName="font-semibold text-lg"
                                    eventKey="maquina"
                                    title="Vista por maquinas"
                                >
                                    <br />

                                    <Suspense fallback={<Spinner />}>
                                        <ListProgramaProduccionMaquinas
                                            listProgramaProduccion={listProgramaProduccion}
                                            location={location}
                                            history={history}
                                            setRefreshCheckLogin={setRefreshCheckLogin}
                                        />
                                    </Suspense>
                                </Tab>

                                <Tab
                                    key={2}
                                    tabClassName="font-semibold text-lg"
                                    eventKey="graficas"
                                    title="Graficas"
                                >
                                    <br />

                                    <Suspense fallback={<Spinner />}>
                                        <Graficas
                                            listProgramaProduccion={listProgramaProduccion}
                                            location={location}
                                            history={history}
                                            setRefreshCheckLogin={setRefreshCheckLogin}
                                        />
                                    </Suspense>
                                </Tab>
                            </Tabs>
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
    );
}

function formatModelProgramaProduccion(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            folioOP: data.folioOP,
            ordenProduccion: data.ordenProduccion,
            programa: data.programa,
            estado: data.estado,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(ProgramaProduccion);
