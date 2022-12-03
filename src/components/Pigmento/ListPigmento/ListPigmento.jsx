import { useState, useEffect } from 'react';
import { eliminaMateriaPrima, actualizaMateriaPrima } from "../../../api/materiaPrima";
import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownLong, faCircleInfo, faPenToSquare, faTrashCan, faEye} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";
import BusquedaMateriaPrima from "../../CatalogoProductos/ListProductos/BusquedaMateriaPrima";
import {Badge, Container} from "react-bootstrap";
import EstadoProducto from "../../CatalogoProductos/EstadoProducto";
import EliminaProductos from "../../CatalogoProductos/EliminaProductos";
import ModificaPigmento from '../ModificaPigmento';
import EliminaPigmento from '../EliminaPigmento';
import {estilos} from "../../../utils/tableStyled";

function ListPigmento(props) {
    const { setRefreshCheckLogin, listPigmentos, history, location, rowsPerPage, setRowsPerPage, page, setPage, noTotalPigmentos } = props;

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion de materiales
    const eliminaPigmento = (content) => {
        setTitulosModal("Eliminando el pigmento");
        setContentModal(content);
        setShowModal(true);
    }

    //Para editar la informacion del material
    const actualizaPigmento = (content) => {
        setTitulosModal("Actualizando datos");
        setContentModal(content);
        setShowModal(true);
    }

            const columns = [
                {
                    name: "Folio",
                    selector: row => row.folio,
                    sortable: false,
                    center: true,
                    reorder: false
                },
                {
                    name: "Nombre",
                    selector: row => row.nombre,
                    sortable: false,
                    center: true,
                    reorder: false
                },
                {
                    name: "UM",
                    selector: row => row.um,
                    sortable: false,
                    center: true,
                    reorder: false
                },
                {
                    name: "Precio",
                    selector: row => (
                        <>
                            {row.precio ? new Intl.NumberFormat('es-MX', {
                                style: "currency",
                                currency: "MXN"
                            }).format(row.precio) : "No disponible"}
                            { } MXN
                        </>
                    ),
                    sortable: false,
                    center: true,
                    reorder: false
                },
                {
                    name: 'Acciones',
                    center: true,
                    reorder: false,
                    selector: row => (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                onClick={() => {
                                    actualizaPigmento(
                                        <ModificaPigmento
                                            dataPigmento={row}
                                            location={location}
                                            history={history}
                                            setShowModal={setShowModal}
                                        />
                                    )
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                            </Badge>
                            <Badge
                                bg="danger"
                                className="eliminar"
                                onClick={() => {
                                    eliminaPigmento(
                                        <EliminaPigmento
                                            dataPigmento={row}
                                            location={location}
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
                }
            ];
            
    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(listPigmentos);
            setPending(false);
        }, 0);
        return () => clearTimeout(timeout);
    }, []);

    // Definicion de la paginacion
    const handlePageChange = (page) => {
        setPage(page)
    }

    const handlePerRowsChange = (newPerPage, page) => {
        setRowsPerPage(newPerPage)
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de'
    };
    const [resetPaginationToogle, setResetPaginationToogle] = useState(false);

    return (
        <>
            <Container fluid>
            <DataTable
                    columns={columns}
                    data={listPigmentos}
                    progressPending={pending}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    paginationServer
                    paginationTotalRows={noTotalPigmentos}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
            />
        </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default ListPigmento;