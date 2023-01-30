import { useState, useEffect, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import "./ListProgramaProduccionMaquinas.scss"
import { Badge, Button, Container, Form, Col } from "react-bootstrap";
import BasicModal from '../../Modal/BasicModal';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import { estilos } from "../../../utils/tableStyled";
import { exportCSVFile } from "../../../utils/exportCSV";
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import HabilitarLunesT1 from '../HabilitarLunesT1';
import HabilitarLunesT2 from '../HabilitarLunesT2';
import HabilitarMartesT1 from '../HabilitarMartesT1';
import HabilitarMartesT2 from '../HabilitarMartesT2';
import HabilitarMiercolesT1 from '../HabilitarMiercolesT1';
import HabilitarMiercolesT2 from '../HabilitarMiercolesT2';
import HabilitarJuevesT1 from '../HabilitarJuevesT1';
import HabilitarJuevesT2 from '../HabilitarJuevesT2';
import HabilitarViernesT1 from '../HabilitarViernesT1';
import HabilitarViernesT2 from '../HabilitarViernesT2';
import HabilitarSabadoT1 from '../HabilitarSabadoT1';

function ListProgramaProduccionMaquinas(props) {
    const { listProgramaProduccion, history, location, setRefreshCheckLogin } = props;

    const enrutamiento = useHistory();

    dayjs.locale('es') // use Spanish locale globally
    dayjs.extend(localizedFormat)

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion fisica de usuarios
    const habilitaLT1 = (content) => {
        setTitulosModal("Habilitando el primer turno del lunes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaLT1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del lunes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaLT2 = (content) => {
        setTitulosModal("Habilitando el segundo turno del lunes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaLT2 = (content) => {
        setTitulosModal("Deshabilitando el segundo turno del lunes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaMT1 = (content) => {
        setTitulosModal("Habilitando el primer turno del martes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaMT1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del martes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaMT2 = (content) => {
        setTitulosModal("Habilitando el segundo turno del martes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaMT2 = (content) => {
        setTitulosModal("Deshabilitando el segundo turno del martes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaMIT1 = (content) => {
        setTitulosModal("Habilitando el primer turno del miercoles");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaMIT1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del miercoles");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaMIT2 = (content) => {
        setTitulosModal("Habilitando el primer segundo del miercoles");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaMIT2 = (content) => {
        setTitulosModal("Deshabilitando el segundo turno del miercoles");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaJT1 = (content) => {
        setTitulosModal("Habilitando el primer turno del jueves");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaJT1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del jueves");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const habilitaJT2 = (content) => {
        setTitulosModal("Habilitando el segundo turno del jueves");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaJT2 = (content) => {
        setTitulosModal("Deshabilitando el segundo turno del jueves");
        setContentModal(content);
        setShowModal(true);
    }

     //Para la eliminacion fisica de usuarios
     const habilitaVT1 = (content) => {
        setTitulosModal("Habilitando el primer turno del viernes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaVT1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del viernes");
        setContentModal(content);
        setShowModal(true);
    }

     //Para la eliminacion fisica de usuarios
     const habilitaVT2 = (content) => {
        setTitulosModal("Habilitando el segundo turno del viernes");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaVT2 = (content) => {
        setTitulosModal("Deshabilitando el segundo turno del viernes");
        setContentModal(content);
        setShowModal(true);
    }

     //Para la eliminacion fisica de usuarios
     const habilitaST1 = (content) => {
        setTitulosModal("Habilitando el primer turno del sabado");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion fisica de usuarios
    const deshabilitaST1 = (content) => {
        setTitulosModal("Deshabilitando el primer turno del sabado");
        setContentModal(content);
        setShowModal(true);
    }

    const columns = [
        {
            name: 'MAQ',
            selector: row => row.ordenProduccion.noMaquina + "-" + row.ordenProduccion.maquina,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'OP',
            selector: row => row.folioOP,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Lunes T1',
            selector: row =>
                row.programa.estadoLT1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el primer turno del lunes"
                                onClick={() => {
                                    deshabilitaLT1(
                                        <HabilitarLunesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.lunesT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el primer turno del lunes"
                                onClick={() => {
                                    habilitaLT1(
                                        <HabilitarLunesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Lunes T2',
            selector: row =>
                row.programa.estadoLT2 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del lunes"
                                onClick={() => {
                                    deshabilitaLT2(
                                        <HabilitarLunesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.lunesT2).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del lunes"
                                onClick={() => {
                                    habilitaLT2(
                                        <HabilitarLunesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Martes T1',
            selector: row =>
                row.programa.estadoMT1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del lunes"
                                onClick={() => {
                                    deshabilitaMT1(
                                        <HabilitarMartesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.martesT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del lunes"
                                onClick={() => {
                                    habilitaMT1(
                                        <HabilitarMartesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Martes T2',
            selector: row =>
                row.programa.estadoMT2 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del martes"
                                onClick={() => {
                                    deshabilitaMT2(
                                        <HabilitarMartesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.martesT2).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del martes"
                                onClick={() => {
                                    habilitaMT2(
                                        <HabilitarMartesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Miercoles T1',
            selector: row =>
                row.programa.estadoMIT1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el primer turno del miercoles"
                                onClick={() => {
                                    deshabilitaMIT1(
                                        <HabilitarMiercolesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.miercolesT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el primer turno del miercoles"
                                onClick={() => {
                                    habilitaMIT1(
                                        <HabilitarMiercolesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Miercoles T2',
            selector: row =>
                row.programa.estadoMIT2 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del miercoles"
                                onClick={() => {
                                    deshabilitaMIT2(
                                        <HabilitarMiercolesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.miercolesT2).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del miercoles"
                                onClick={() => {
                                    habilitaMIT2(
                                        <HabilitarMiercolesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Jueves T1',
            selector: row =>
                row.programa.estadoJT1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el primer turno del jueves"
                                onClick={() => {
                                    deshabilitaJT1(
                                        <HabilitarJuevesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.juevesT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del miercoles"
                                onClick={() => {
                                    habilitaJT1(
                                        <HabilitarJuevesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Jueves T2',
            selector: row =>
                row.programa.estadoJT2 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del jueves"
                                onClick={() => {
                                    deshabilitaJT2(
                                        <HabilitarJuevesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.juevesT2).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del jueves"
                                onClick={() => {
                                    habilitaJT2(
                                        <HabilitarJuevesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Viernes T1',
            selector: row =>
                row.programa.estadoVT1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del jueves"
                                onClick={() => {
                                    deshabilitaVT1(
                                        <HabilitarViernesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.viernesT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del jueves"
                                onClick={() => {
                                    habilitaVT1(
                                        <HabilitarViernesT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Viernes T2',
            selector: row =>
                row.programa.estadoVT2 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del viernes"
                                onClick={() => {
                                    deshabilitaVT2(
                                        <HabilitarViernesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.viernesT2).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del viernes"
                                onClick={() => {
                                    habilitaVT2(
                                        <HabilitarViernesT2
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Sabado T1',
            selector: row =>
                row.programa.estadoST1 === "true" ?
                    (
                        <>
                            <Badge
                                bg="success"
                                className="editar"
                                title="Deshabilitar el segundo turno del jueves"
                                onClick={() => {
                                    deshabilitaST1(
                                        <HabilitarSabadoT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#198754">{dayjs(row.programa.sabadoT1).format("LL")}</font>
                            </Badge>
                        </>
                    )
                    :
                    (
                        <>
                            <Badge
                                bg="light"
                                className="editar"
                                title="Habilitar el segundo turno del jueves"
                                onClick={() => {
                                    habilitaST1(
                                        <HabilitarSabadoT1
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                <font color="#F8F9FA">No disponible </font>
                            </Badge>
                        </>
                    ),
            sortable: false,
            center: true,
            reorder: false
        },
        /*{
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
                                    eliminaLogicaPrograma(
                                        <EstadoPrograma
                                            datos={row}
                                            setShowModal={setShowModal}
                                            history={history}
                                        />)
                                }}
                            >
                                Activo
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
                                cancelado
                            </Badge>
                        </>
                    )
        },
        {
            name: 'Acciones',
            center: true,
            reorder: false,
            selector: row => (
                <>
                    <Badge
                        bg="primary"
                        title="Generar PDF"
                        className="ver"
                        onClick={() => {
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} className="text-lg" />
                    </Badge>
                    <Badge
                        bg="success"
                        title="Modificar"
                        className="editar"
                        onClick={() => {
                            modificaRecepcion(row.id)
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                    </Badge>
                    <Badge
                        bg="danger"
                        title="Eliminar"
                        className="eliminar"
                        onClick={() => {
                            eliminaPrograma(
                                <EliminacionFisicaPrograma
                                    datos={row}
                                    setShowModal={setShowModal}
                                    history={history}
                                />)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                    </Badge>
                </>
            )
        }*/
    ];

    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(listProgramaProduccion);
            setPending(false);
        }, 0);
        return () => clearTimeout(timeout);
    }, []);

    listProgramaProduccion.sort((x, y) => parseInt(x.ordenProduccion.noMaquina) - parseInt(y.ordenProduccion.noMaquina));

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de'
    };

    const Export = ({ onExport }) => (
        <>
            <Button onClick={
                e => onExport(e.target.value)
            }>Descargar CSV</Button>
        </>
    );

    const headers = {
        id: "ID",
        nombre: "Nombre",
        apellidos: "Apellidos",
        curp: "CURP",
        nss: "NSS",
        rfc: "RFC",
        telefonoCelular: "Telefono celular",
        telefonoFijo: "Telefono fijo",
        calle: "Calle",
        numeroExterior: "Numero exterior",
        numeroInterior: "Numero interior",
        colonia: "Colonia",
        municipio: "Municipio",
        estado: "Estado",
        pais: "Pais",
        departamento: "Departamento",
        correo: "Correo",
        password: "Contraseña",
        foto: "foto",
        estadoUsuario: "Estado Usuario",
        fechaCreacion: "Fecha de registro",
        fechaActualizacion: "Fecha actualizcion"
    };

    const descargaCSV = useMemo(() => <Export onExport={() => exportCSVFile(headers, listProgramaProduccion, "USUARIOS")} />, []);

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToogle, setResetPaginationToogle] = useState(false);



    // Defino barra de busqueda
    const ClearButton = styled(Button)` 
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 34px;
        width: 32px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const TextField = styled.input` 
        height: 32px;
        border-radius: 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #e5e5e5;
        padding: 0 32px 0 16px;
      &:hover {
        cursor: pointer;
      }
    `;


    const filteredItems = listProgramaProduccion.filter(
        item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToogle(!resetPaginationToogle);
                setFilterText('');
            }
        };

        return (
            <>
                <Col sm="2">
                    <Form.Control
                        id="search"
                        type="text"
                        placeholder="Busqueda por nombre"
                        aria-label="Search Input"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                </Col>
                <ClearButton type="button" onClick={handleClear}>
                    X
                </ClearButton>
            </>
        );
    }, [filterText]);

    return (
        <>
            <Container fluid>
                <DataTable
                    noDataComponent="No hay registros para mostrar"
                    columns={columns}
                    data={listProgramaProduccion}
                    //subHeader
                    //subHeaderComponent={subHeaderComponentMemo}
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

export default ListProgramaProduccionMaquinas;