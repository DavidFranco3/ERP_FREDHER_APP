import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "../../utils/withRouter";
import { toast } from "react-toastify";
import BuscarPlaneaciones from '../../components/Busquedas/BuscarPlaneaciones';
import { listarRequerimientoActivo } from "../../api/requerimientosPlaneacion";
import "./BuscarPlaneacion.scss"
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../api/auth";
import { obtenerUsuario } from "../../api/usuarios";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { LogsInformativosLogout } from "../../components/Logs/LogsSistema/LogsSistema";

function BuscarPlaneacion(props) {
    const { setFormData, formData, setShowModal, setRefreshCheckLogin, location, history } = props;

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

    // Almacena los datos de la orden de venta
    const [listRequerimientos, setListRequerimientos] = useState(null);

    const cargarDatos = () => {
        try {
            listarRequerimientoActivo(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listRequerimientos && data) {
                    setListRequerimientos(formatModelRequerimientosPlaneacion(data));
                } else {
                    const datosRequerimientos = formatModelRequerimientosPlaneacion(data);
                    setListRequerimientos(datosRequerimientos);
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
                listRequerimientos ?
                    (
                        <>
                            <Suspense fallback={<Spinner />}>
                                <BuscarPlaneaciones
                                    listRequerimientos={listRequerimientos}
                                    setShowModal={setShowModal}
                                    location={location}
                                    history={history}
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    formData={formData}
                                    setFormData={setFormData}
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
    );
}

function formatModelRequerimientosPlaneacion(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            requerimiento: data.requerimiento,
            planeacion: data.planeacion,
            bom: data.bom,
            fechaRegistro: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(BuscarPlaneacion);
