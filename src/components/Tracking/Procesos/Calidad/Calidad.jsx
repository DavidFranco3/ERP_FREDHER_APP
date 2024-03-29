import { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner, Badge, Table } from "react-bootstrap"
import "./Calidad.scss";
import { map } from "lodash";
import { listarInspeccion } from "../../../../api/inspeccionMaterial";
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getSucursal } from '../../../../api/auth';

function Calidad(props) {
    const { ordenVenta } = props;

    dayjs.locale('es') // use Spanish locale globally
    dayjs.extend(localizedFormat)

    // Para almacenar la lista completa de clientes
    const [listCalidad, setListCalidad] = useState(null);

    const cargarListaCalidad = () => {
        try {
            listarInspeccion(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listarInspeccion && data) {
                    setListCalidad(formatModelInspeccion(data));
                } else {
                    const datosCalidad = formatModelInspeccion(data);
                    setListCalidad(datosCalidad);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    // Obtener los clientes registrados
    useEffect(() => {
        cargarListaCalidad();
    }, []);

    return (
        <>
            {
                listCalidad ?
                    (
                        <>
                            <Row>
                                <Col>
                                    Pedido de venta: {ordenVenta}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <br />
                                    <h3>
                                        <Badge pill bg="secondary">Datos de la inspeccion de calidad</Badge>
                                    </h3>
                                </Col>
                            </Row>

                            <Container fluid className="contenidoTablaPlaneacion">
                                <Table className="responsive-tableTrackingOV"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Folio</th>
                                            <th scope="col">Fecha de solicitud</th>
                                            <th scope="col">Lote</th>
                                            <th scope="col">Propiedad</th>
                                            <th scope="col">Tipo de material</th>
                                            <th scope="col">Nombre / Descripcion</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">UM</th>
                                            <th scope="col">Resultado final</th>
                                            <th scope="col">Recibio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {map(listCalidad, (calidad, index) => (
                                            <>
                                                {
                                                    calidad.ordenVenta == ordenVenta ?
                                                        (
                                                            <>
                                                                <tr key={index}>
                                                                    <th>
                                                                        {index + 1}
                                                                    </th>
                                                                    <td data-title="cantidad">
                                                                        {calidad.folio}
                                                                    </td>
                                                                    <td data-title="um">
                                                                        {dayjs(calidad.fecha).format('LL')}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.lote}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.propiedad}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.tipoMaterial}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.nombre}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.cantidad}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.unidadMedida}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.resultadoFinalInspeccion}
                                                                    </td>
                                                                    <td data-title="descripcion">
                                                                        {calidad.nombreRecibio}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>

                                                            </>
                                                        )
                                                }
                                            </>
                                        ))}
                                    </tbody>
                                </Table>
                            </Container>
                        </>
                    )
                    :
                    (
                        <>
                        </>
                    )
            }
        </>
    );
}

function formatModelInspeccion(data) {
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            item: data.item,
            folio: data.folio,
            ordenVenta: data.ordenVenta,
            fecha: data.fecha,
            lote: data.lote,
            propiedad: data.propiedad,
            tipoMaterial: data.tipoMaterial,
            nombre: data.nombre,
            cantidad: data.cantidad,
            unidadMedida: data.unidadMedida,
            nombreRecibio: data.nombreRecibio,
            estadoMateriaPrima: data.estadoMateriaPrima,
            contaminacion: data.contaminacion,
            presentaHumedad: data.presentaHumedad,
            certificadoCalidad: data.certificadoCalidad,
            empaqueDañado: data.empaqueDañado,
            resultadoFinalInspeccion: data.resultadoFinalInspeccion,
            observaciones: data.observaciones,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default Calidad;
