import { useEffect, useState, Suspense } from 'react';
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { getTokenApi, isExpiredToken, logoutApi } from "../../api/auth";
import { toast } from "react-toastify";
import LayoutPrincipal from "../../layout/layoutPrincipal";
import { listarPaginacionDeptoCompras, totalDeptoCompras } from "../../api/compras";
import { withRouter, useHistory } from "react-router-dom";
import ListCompras from "../../components/Compras/ListCompras";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';

function Compras(props) {
    const { setRefreshCheckLogin, location, history } = props;

    // Para controlar la paginación
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalComprasDepto, setNoTotalComprasDepto] = useState(0);

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

    // Para definir el salto entre rutas
    const enrutamiento = useHistory();

    // Para almacenar el listado de compras realizadas
    const [listCompras, setListCompras] = useState(null);

    useEffect(() => {
        try {
            totalDeptoCompras("Compras").then(response => {
                const { data } = response;
                setNoTotalComprasDepto(data)
            }).catch(e => {
                // console.log(e)
            })

            // listarOrdenesCompraPaginacion(pagina, limite)

            if (page === 0) {
                setPage(1)

                listarPaginacionDeptoCompras(page, rowsPerPage, "Compras").then(response => {
                    const { data } = response
                    if (!listCompras && data) {
                        setListCompras(formatModelCompras(data));
                    } else {
                        const datosCompras = formatModelCompras(data);
                        setListCompras(datosCompras);
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                listarPaginacionDeptoCompras(page, rowsPerPage, "Compras").then(response => {
                    const { data } = response
                    if (!listCompras && data) {
                        setListCompras(formatModelCompras(data));
                    } else {
                        const datosCompras = formatModelCompras(data);
                        setListCompras(datosCompras);
                    }
                }).catch(e => {
                    console.log(e)
                })
            }

        } catch (e) {
            console.log(e)
        }
    }, [location, page, rowsPerPage, "Compras"]);

    // Define el registro de una nueva compra y enruta hacia la vista de registro
    const registraCompra = () => {
        enrutamiento.push("/RegistroCompras")
    }

    const rutaRegreso = () => {
        enrutamiento.push("/DashboardCompras")
    }

    return (
        <>
            <LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
                <Alert>
                    <Row>
                        <Col xs={12} md={8} className="tituloPrincipal">
                            <h1>
                                Mis compras
                            </h1>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                className="btnRegistroVentas"
                                onClick={() => {
                                    registraCompra()
                                }}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} /> Crear orden de compra
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
                    listCompras ?
                        (
                            <>
                                <Suspense fallback={<Spinner />}>
                                    <ListCompras
                                        setRefreshCheckLogin={setRefreshCheckLogin}
                                        listCompras={listCompras}
                                        history={history}
                                        location={location}
                                        rowsPerPage={rowsPerPage}
                                        setRowsPerPage={setRowsPerPage}
                                        page={page}
                                        setPage={setPage}
                                        noTotalComprasDepto={noTotalComprasDepto}
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
            </LayoutPrincipal>
        </>
    );
}

function formatModelCompras(data) {
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            proveedor: data.proveedor,
            fechaSolicitud: data.fechaSolicitud,
            fechaEntrega: data.fechaEntrega,
            tipo: data.tipo,
            ordenVenta: data.ordenVenta ? data.ordenVenta : "No aplica",
            diasCredito: data.diasCredito,
            autoriza: data.autoriza,
            productos: data.productos,
            subtotal: data.subtotal,
            iva: data.iva,
            total: data.total,
            estado: data.estado,
            departamento: data.departamento,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(Compras);
