import { useState, useEffect } from 'react';
import { Badge, Container } from "react-bootstrap";
import "./ListRequisiciones.scss"
import BasicModal from "../../Modal/BasicModal";
import EliminaRequisiciones from "../EliminaRequisiciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong, faCircleInfo, faPenToSquare, faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
import { estilos } from "../../../utils/tableStyled";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import ListProductosRequisicion from '../ListProductosRequisicion';
import EliminacionLogicaRequisiciones from '../EliminacionLogica';
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function ListRequisiciones(props) {
    const { listRequisiciones, setRefreshCheckLogin, history, location } = props;

    dayjs.locale('es') // use Spanish locale globally
    dayjs.extend(localizedFormat)

    const enrutamiento = useNavigate();

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion de proveedores
    const eliminacionRequisicion = (content) => {
        setTitulosModal("Eliminando requisicion");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion logica de usuarios
    const eliminaLogicaRequisicion = (content) => {
        setTitulosModal("Cancelando la requisicion");
        setContentModal(content);
        setShowModal(true);
    }


    //Para la eliminacion de proveedores
    const ModificacionRequisicion = (id) => {
        enrutamiento(`/ModificacionRequisicion/${id}`);
    }

    const VistaPreviaRequisiciones = (id) => {
        enrutamiento(`/VistaPreviaRequisiciones/${id}`);
    }

    const ExpandedComponent = ({ data }) => (
        <ListProductosRequisicion
            requisicion={data.folio}
        />
    );

    const columns = [
        {
            name: 'ITEM',
            selector: row => row.item,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Folio',
            selector: row => row.folio,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Fecha elaboracion',
            selector: row => dayjs(row.fechaElaboracion).format('LL'),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Solicitante',
            selector: row => row.solicitante,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Departamento',
            selector: row => row.departamento,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Aprobo',
            selector: row => row.aprobo == "" ? "No disponible" : row.aprobo,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Comentarios',
            selector: row => row.comentarios == "" ? "Sin comentarios" : row.comentarios,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Estado',
            center: true,
            reorder: false,
            selector: row =>
                row.estado === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                title="Deshabilitar"
                                className="editar"
                                onClick={() => {
                                    eliminaLogicaRequisicion(
                                        <EliminacionLogicaRequisiciones
                                            datosRequisicion={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                Activa
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="danger"
                                title="Habilitar"
                                className="eliminar"
                            >
                                Cancelada
                            </Badge>
                        </>
                    )
        },
        {
            name: 'Acciones',
            center: true,
            reorder: false,
            selector: row => (
                row.estado === "true" ?
                    (
                        <>
                            <Badge
                                bg="info"
                                title="Generar PDF"
                                className="evaluacionProveedor"
                                onClick={() => {
                                    VistaPreviaRequisiciones(row.id)
                                }}
                            >
                                <FontAwesomeIcon icon={faEye} className="text-lg" />
                            </Badge>
                            <Badge
                                bg="success"
                                title="Modificar"
                                className="editarProveedor"
                                onClick={() => {
                                    ModificacionRequisicion(row.id)
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                            </Badge>
                            <Badge
                                bg="danger"
                                title="Eliminar"
                                className="eliminarProveedor"
                                onClick={() => {
                                    eliminacionRequisicion(
                                        <EliminaRequisiciones
                                            datosRequisicion={row}
                                            history={history}
                                            setShowModal={setShowModal}
                                        />
                                    )
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                            </Badge>
                        </>
                    )
                    :
                    (
                        "No disponibles"
                    )
            )
        }
    ];

    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);

    const cargarDatos = () => {
        const timeout = setTimeout(() => {
            setRows(listRequisiciones);
            setPending(false);
        }, 0);
        return () => clearTimeout(timeout);
    }

    useEffect(() => {
        cargarDatos();
    }, []);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de'
    };

    const [resetPaginationToogle, setResetPaginationToogle] = useState(false);

    return (
        <>
            <Container fluid>
                <DataTable
                    noDataComponent="No hay registros para mostrar"
                    columns={columns}
                    data={listRequisiciones}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                />
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default ListRequisiciones;
