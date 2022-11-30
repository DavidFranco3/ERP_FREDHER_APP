import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./Dashboard.scss";
import { Card, Image } from "react-bootstrap";
// Importacion de imagenes para los iconos de los menus
import LogoVentas from "../../assets/png/principales/ventas.png";
import LogoMaquinas from "../../assets/png/principales/maquinas.png";
import LogoClientes from "../../assets/png/principales/clientes.png";
import LogoCompras from "../../assets/png/principales/compras.png";
import LogoFacturacion from "../../assets/png/principales/facturacion.png";
import LogoPlaneacion from "../../assets/png/principales/planeacion.png"
import LogoLogistica from "../../assets/png/principales/logistica.png";
import LogoEmbarque from "../../assets/png/principales/embarque.png";
import LogoUsuarios from "../../assets/png/principales/usuarios.png";
import LogoProduccion from "../../assets/png/principales/produccion.png";
import LogoDepartamentos from "../../assets/png/principales/departamentos.png";
import LogoAlmacen from "../../assets/png/principales/almacen.png";
import LogoTiquet from "../../assets/png/principales/tiquet.png";
import LogoProductos from "../../assets/png/principales/productos.png"
import LogoCotizaciones from "../../assets/png/principales/cotizaciones.png"
import LogoCalidad from "../../assets/png/principales/calidad.png";
import Tracking from "../../assets/png/tracking.png"
import LogoLogs from "../../assets/png/principales/logs.png";
import LogoMantenimiento from "../../assets/png/principales/mantenimiento.png";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../api/auth";
import { toast } from "react-toastify";
import { obtenerUsuario } from "../../api/usuarios";
import { LogGeneral } from "../../components/Logs/LogsSistema/LogsSistema";

function Dashboard(props) {
    const { setRefreshCheckLogin } = props;

    const enrutamiento = useHistory();

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

    const goTo = (ruta) => enrutamiento.push(ruta);

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

    return (
        <>
            <div className="grid grid-cols-6 gap-3">
                <ItemCard
                    path={'/Tracking'}
                    logo={Tracking}
                    title={'Tracking'}
                />
                <ItemCard
                    path={'/DashboardVentas'}
                    logo={LogoVentas}
                    title={'Ventas'}
                />
                <ItemCard
                    path={'/DashboardCompras'}
                    logo={LogoCompras}
                    title={'Compras'}
                />
                <ItemCard
                    path={'/Maquinas'}
                    logo={LogoMaquinas}
                    title={'Maquinas'}
                />
                <ItemCard
                    path={'/DashboardAlmacenes'}
                    logo={LogoAlmacen}
                    title={'Almacen'}
                />
                <ItemCard
                    path={'/DashboardPlaneacion'}
                    logo={LogoPlaneacion}
                    title={'Planeación'}
                />
                <ItemCard
                    path={'/Cotizaciones'}
                    logo={LogoCotizaciones}
                    title={'Cotizaciones'}
                />
                <ItemCard
                    path={'/DashboardProduccion'}
                    logo={LogoProduccion}
                    title={'Producción'}
                />
                <ItemCard
                    path={'/DashboardCalidad'}
                    logo={LogoCalidad}
                    title={'Calidad'}
                />
                <ItemCard
                    path={'/Usuarios'}
                    logo={LogoUsuarios}
                    title={'Usuarios'}
                />
                <ItemCard
                    path={'/Clientes'}
                    logo={LogoClientes}
                    title={'Clientes'}
                />
                <ItemCard
                    path={'/DashboardMantenimiento'}
                    logo={LogoMantenimiento}
                    title={'Mantenimiento'}
                />
                <ItemCard
                    path={'/Departamentos'}
                    logo={LogoDepartamentos}
                    title={'Departamentos'}
                />
                <ItemCard
                    path={'/Embarque'}
                    logo={LogoEmbarque}
                    title={'Embarque'}
                />
                <ItemCard
                    path={'/Logistica'}
                    logo={LogoLogistica}
                    title={'Logistíca'}
                />
                <ItemCard
                    path={'/Tiquets'}
                    logo={LogoTiquet}
                    title={'Tiquets'}
                />
                <ItemCard
                    path={'/Facturacion'}
                    logo={LogoFacturacion}
                    title={'Facturación'}
                />
                <ItemCard
                    path={'/Logs'}
                    logo={LogoLogs}
                    title={'Logs'}
                />
            </div>
        </>
    )
}

export default Dashboard;
