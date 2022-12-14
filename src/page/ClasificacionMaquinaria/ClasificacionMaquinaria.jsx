import { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import "./ClasificacionMaquinaria.scss";
import { listarClasificacionMaquinaria } from "../../api/clasificacionMaquinaria";
import { toast } from "react-toastify";
import ListClasificacionMaquinaria from "../../components/ClasificacionMaquinaria/ListClasificacionMaquinaria";
import RegistroClasificacionMaquinaria from "../../components/ClasificacionMaquinaria/Registro";
import BasicModal from "../../components/Modal/BasicModal";
import { getTokenApi, isExpiredToken, logoutApi } from "../../api/auth";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { getSucursal } from '../../api/auth';

function ClasificacionMaquinaria(props) {
    const { setRefreshCheckLogin, location, history } = props;

    const enrutamiento = useHistory();

    const rutaRegreso = () => {
        enrutamiento.push("/DashboardConfiguracion")
    }

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

    // Para almacenar los usuarios
    const [listClasificacionMaquinaria, setListClasificacionMaquinaria] = useState(null);

    useEffect(() => {
        try {
            listarClasificacionMaquinaria(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listClasificacionMaquinaria && data) {
                    setListClasificacionMaquinaria(formatModelClasificacionMaquinaria(data));
                } else {
                    const datosClasificacionMaquinaria = formatModelClasificacionMaquinaria(data);
                    setListClasificacionMaquinaria(datosClasificacionMaquinaria);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, [location]);

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para el registro en el almacen de mp
    const nuevoRegistro = (content) => {
        setTitulosModal("Nuevo registro");
        setContentModal(content);
        setShowModal(true);
    }


    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Clasificación Maquinaria
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Registrar un nuevo material"
                            onClick={() => {
                                nuevoRegistro(
                                    <RegistroClasificacionMaquinaria
                                        setShowModal={setShowModal}
                                        location={location}
                                        history={history}
                                    />
                                )
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} /> Registrar
                        </Button>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar al menú configuración"
                            onClick={() => {
                                rutaRegreso()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                        </Button>
                    </Col>
                </Row>
            </Alert>

            {listClasificacionMaquinaria ?
                (
                    <>
                        <Suspense fallback={<Spinner />}>
                            <ListClasificacionMaquinaria
                                listClasificacionMaquinaria={listClasificacionMaquinaria}
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
            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function formatModelClasificacionMaquinaria(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            sucursal: data.sucursal,
            estado: data.estado,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(ClasificacionMaquinaria);
