import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./DashboardVentas.scss";
import { Alert, Button, Col, Row, Card, Container, CardGroup, Image, Badge } from "react-bootstrap";
// Importacion de imagenes para los iconos de los menus
import LogoVentas from "../../../assets/png/menus/ordenVenta.png";
import LogoGastos from "../../../assets/png/menus/gastos.png";
import { getTokenApi, isExpiredToken, logoutApi } from "../../../api/auth";
import { toast } from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";
import { LogGeneral, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";

function DashboardVentas(props) {
    const { setRefreshCheckLogin } = props;

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

    // Define las rutas

    const goTo = (ruta) => enrutamiento(ruta);

    const ItemCard = ({ path, logo, title }) => (
        <Card className="contenidoCentrado" >
            <Card.Body onClick={() => goTo(path)}>
                <div className="flex flex-col items-center justify-center">
                    <Image title={title} alt={title} src={logo} style={{ width: '95px' }} />
                    <span className="inline-block text-lg font-normal">{title}</span>
                </div>
            </Card.Body>
        </Card>
    )

    const rutaRegreso = () => {
        enrutamiento("/")
    }

    return (
        <>
            <Alert>
                    <Row>
                        <Col xs={12} md={8}>
                            <h1>
                                Ventas
                            </h1>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                className="btnRegistroVentas"
                                title="Regresar al menu principal"
                                onClick={() => {
                                    rutaRegreso()
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                            </Button>
                        </Col>
                    </Row>
                </Alert>
                <div className="grid grid-cols-2 gap-3">
                    <ItemCard
                        path={'/Ventas'}
                        logo={LogoVentas}
                        title={'Orden de venta'}
                    />
                    <ItemCard
                        path={'/VentasGastos'}
                        logo={LogoGastos}
                        title={'Integración de ventas/gastos'}
                    />
                </div>
        </>
    );
}

export default DashboardVentas;
