import { useState, useEffect } from 'react';
import { Row, Col, Container, Badge, Table } from "react-bootstrap"
import { map } from "lodash";
import "./Planeacion.scss"
import { listarRequerimiento } from "../../../../api/requerimientosPlaneacion";
import { getSucursal } from '../../../../api/auth';

function Planeacion(props) {
    const { ordenVenta } = props;

    // Para almacenar la lista completa de clientes
    const [listPlaneaciones, setListPlaneaciones] = useState(null);

    const cargarListaPlaneaciones = () => {
        try {
            listarRequerimiento(getSucursal()).then(response => {
                const { data } = response;

                //console.log(data);

                if (!listPlaneaciones && data) {
                    setListPlaneaciones(formatModelRequerimientos(data));
                } else {
                    const datosPlaneaciones = formatModelRequerimientos(data);
                    setListPlaneaciones(datosPlaneaciones);
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
       cargarListaPlaneaciones();
    }, []);

    console.log(listPlaneaciones)

    return (
        <>
            {
                listPlaneaciones ?
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
                                        <Badge pill bg="secondary">Requerimientos y planeaciones</Badge>
                                    </h3>
                                </Col>
                            </Row>

                            <Container fluid className="contenidoTablaPlaneacion">
                                <Table className="responsive-tableTrackingOV"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Orden venta</th>
                                            <th scope="col">Cantidad pedida</th>
                                            <th scope="col">Cantidad a producir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {map(listPlaneaciones, (planeacion, index) => (
                                            <>
                                                {map(planeacion.requerimiento.ordenVenta, (venta, indexVenta) => (
                                                    <>
                                                        {
                                                            venta.ordenVenta == ordenVenta ?
                                                                (
                                                                    <>
                                                                        <tr key={venta.ordenVenta}>
                                                                            <th>
                                                                                {indexVenta + 1}
                                                                            </th>
                                                                            <td data-title="cantidad">
                                                                                {venta.ordenVenta}
                                                                            </td>
                                                                            <td data-title="um">
                                                                                {venta.cantidadPedidaOV}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {venta.cantidadProducirOV}
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

            {
                listPlaneaciones ?
                    (
                        <>
                            <Row>
                                <Col>
                                    <br />
                                    <h3>
                                        <Badge pill bg="secondary">BOM</Badge>
                                    </h3>
                                </Col>
                            </Row>

                            <Container fluid className="contenidoTablaPlaneacion">
                                <Table className="responsive-tableTrackingOV"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Material</th>
                                            <th scope="col">Molido</th>
                                            <th scope="col">Peso Pieza</th>
                                            <th scope="col">Peso Colada</th>
                                            <th scope="col">kg Material</th>
                                            <th scope="col">Pigmento</th>
                                            <th scope="col">aplicacion</th>
                                            <th scope="col">pigMB</th>
                                            <th scope="col">material x turno</th>
                                            <th scope="col">merma</th>
                                            <th scope="col">empaque</th>
                                            <th scope="col">bolsas o cajas a utilizar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {map(listPlaneaciones, (planeacion, index) => (
                                            <>
                                                {map(planeacion.requerimiento.ordenVenta, (venta, indexVenta) => (
                                                    <>
                                                        {
                                                            venta.ordenVenta == ordenVenta ?
                                                                (
                                                                    <>

                                                                        <tr key={planeacion.bom.material}>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td data-title="cantidad">
                                                                                {planeacion.bom.material}
                                                                            </td>
                                                                            <td data-title="um">
                                                                                {planeacion.bom.molido}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.pesoPieza}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.pesoColada}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.kgMaterial}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.pigmento}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.aplicacion}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.pigMb}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.materialxTurno}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.merma}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.empaque}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.bom.bolsasCajasUtilizar}
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

            {
                listPlaneaciones ?
                    (
                        <>
                            <Row>
                                <Col>
                                    <br />
                                    <h3>
                                        <Badge pill bg="secondary">Primera opcion de maquinaria</Badge>
                                    </h3>
                                </Col>
                            </Row>

                            <Container fluid className="contenidoTablaPlaneacion">
                                <Table className="responsive-tableTrackingOV"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Numero de maquina</th>
                                            <th scope="col">Maquina</th>
                                            <th scope="col">Ciclo</th>
                                            <th scope="col">Pieza</th>
                                            <th scope="col">Bolsa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {map(listPlaneaciones, (planeacion, index) => (
                                            <>
                                                {map(planeacion.requerimiento.ordenVenta, (venta, indexVenta) => (
                                                    <>
                                                        {
                                                            venta.ordenVenta == ordenVenta ?
                                                                (
                                                                    <>

                                                                        <tr key={planeacion.planeacion.opcionesMaquinaria.numeroMaquina}>
                                                                            <td data-title="cantidad">
                                                                                {planeacion.planeacion.opcionesMaquinaria.numeroMaquina}
                                                                            </td>
                                                                            <td data-title="um">
                                                                                {planeacion.planeacion.opcionesMaquinaria.maquina}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.planeacion.opcionesMaquinaria.ciclo}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.planeacion.opcionesMaquinaria.pieza}
                                                                            </td>
                                                                            <td data-title="descripcion">
                                                                                {planeacion.planeacion.opcionesMaquinaria.bolsa}
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

function formatModelRequerimientos(data) {
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

export default Planeacion;
