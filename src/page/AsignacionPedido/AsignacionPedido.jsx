import { useState, useEffect, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, withRouter } from "react-router-dom";
import BasicModal from "../../components/Modal/BasicModal";
import AgregarOrdenes from "../../components/AsignacionesPedido/RegistraAsignacionPedido";
import { listarAsignacionPedidosPaginacion, totalAsignacionPedido } from "../../api/asignacionPedido";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import ListAsignacionPedido from "../../components/AsignacionesPedido/ListAsignacionPedido";


function AsignacionPedido(props) {
    const { setRefreshCheckLogin, location, history } = props;

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para el registro en el almacen de mp
    const nuevaOrden = (content) => {
        setTitulosModal("Agregar ordenes");
        setContentModal(content);
        setShowModal(true);
    }

    // Para controlar la paginación
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalAsignaciones, setNoTotalAsignaciones] = useState(0);

    // Para almacenar el listado de objetos en el almacen de pt
    const [listAsignacionPedido, setListAsignacionPedido] = useState(null);

    useEffect(() => {
        try {
            totalAsignacionPedido().then(response => {
                const { data } = response;
                setNoTotalAsignaciones(data)
            })
            // listarPaginacionAlmacenMP(page,rowsPerPage)
            if (page === 0) {
                setPage(1)
                listarAsignacionPedidosPaginacion(page, rowsPerPage).then(response => {
                    const { data } = response;

                    if (!listAsignacionPedido && data) {
                        setListAsignacionPedido(formatModelAlmacenPT(data));
                    } else {
                        const datosUsuarios = formatModelAlmacenPT(data);
                        setListAsignacionPedido(datosUsuarios);
                    }
                })
            } else {
                listarAsignacionPedidosPaginacion(page, rowsPerPage).then(response => {
                    const { data } = response;

                    if (!listAsignacionPedido && data) {
                        setListAsignacionPedido(formatModelAlmacenPT(data));
                    } else {
                        const datosUsuarios = formatModelAlmacenPT(data);
                        setListAsignacionPedido(datosUsuarios);
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [location, page, rowsPerPage]);

    // Para definir el enrutamiento
    const enrutamiento = useHistory()

    const rutaRegreso = () => {
        enrutamiento.push("/DashboardPlaneacion")
    }

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Asignaciones de pedido
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            onClick={() => {
                                nuevaOrden(
                                    <AgregarOrdenes
                                        setShowModal={setShowModal}
                                        location={location}
                                        history={history}
                                    />
                                )
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} /> Agregar ordenes
                        </Button>
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

            {
                listAsignacionPedido ?
                    (
                        <>
                            <Suspense fallback={<Spinner />}>
                                <ListAsignacionPedido
                                    listAsignacionPedido={listAsignacionPedido}
                                    location={location}
                                    history={history}
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                    page={page}
                                    setPage={setPage}
                                    noTotalAsignaciones={noTotalAsignaciones}
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

function formatModelAlmacenPT(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            cliente: data.cliente,
            fechaPedido: data.fechaPedido,
            fechaEntrega: data.fechaEntrega,
            producto: data.producto,
            um: data.um,
            cantidadPedida: data.cantidadPedida,
            plantaAsignada: data.plantaAsignada,
            cantidadAsignada: data.cantidadAsignada,
        });
    });
    return dataTemp;
}

export default withRouter(AsignacionPedido);
