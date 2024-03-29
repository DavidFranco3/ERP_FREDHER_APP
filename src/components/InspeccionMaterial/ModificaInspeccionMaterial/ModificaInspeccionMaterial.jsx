import { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Container, Spinner, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "./ModificaInspeccionMaterial.scss";
import BasicModal from "../../Modal/BasicModal";
import CancelacionInspeccion from "../CancelacionInspeccion";
import { obtenerDatosProduccion } from "../../../api/produccion";
import { obtenerCliente } from "../../../api/clientes";
import { obtenerInspeccionPieza, actualizaInspeccionPieza } from "../../../api/inspeccionPieza";
import { toast } from "react-toastify";
import { LogsInformativos, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";

function ModificaInspeccionMaterial(props) {
    const { setRefreshCheckLogin } = props;

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

    // Para almacenar la informacion del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para definir el enrutamiento
    const enrutamiento = useNavigate();

    const params = useParams();
    const { id } = params

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento("/InspeccionPieza");
    }

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para el registro en el almacen de mp
    const cancelacionInspeccion = (content) => {
        setTitulosModal("Inspeccion cancelada");
        setContentModal(content);
        setShowModal(true);
    }

    // Para guardar el id del cliente
    const [nombreCliente, setNombreCliente] = useState("");

    // Para guardar el nombre del producto
    const [producto, setProducto] = useState("");

    // Para guardar el numero de parte
    const [numeroParte, setNumeroparte] = useState("");

    // Para guardar el nombre del material
    const [material, setMaterial] = useState("");

    const cargarDatosProduccion = () => {
        try {

            obtenerDatosProduccion(formData.ordenProduccion).then(response => {
                const { data } = response;
                const { generalidades, bom } = data;
                setProducto(generalidades.producto);
                setNumeroparte(generalidades.noParte);
                setMaterial(bom.material);

                obtenerCliente(generalidades.cliente).then(response => {
                    const { data } = response;
                    const { nombre, apellidos } = data;
                    setNombreCliente(nombre + " " + apellidos)

                }).catch(e => {
                    console.log(e)
                })

            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDatosProduccion();
    }, [formData.ordenProduccion]);

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    // Para Controlar la columna de primera revision
    const [revision1, setRevision1] = useState(0);

    // Para Controlar la columna de segunda revision
    const [revision2, setRevision2] = useState(0);

    // Para Controlar la columna de tercera revision
    const [revision3, setRevision3] = useState(0);

    // Para Controlar la columna de cuarta revision
    const [revision4, setRevision4] = useState(0);

    // Para Controlar la columna de quinta revision
    const [revision5, setRevision5] = useState(0);

    // Para Controlar la columna de sexta revision
    const [revision6, setRevision6] = useState(0);

    // Para Controlar la columna de septima revision
    const [revision7, setRevision7] = useState(0);

    // Para Controlar la columna de octava revision
    const [revision8, setRevision8] = useState(0);

    // Para Controlar la columna de novena revision
    const [revision9, setRevision9] = useState(0);

    // Para Controlar la columna de decima revision
    const [revision10, setRevision10] = useState(0);

    // Para Controlar la columna de primera revision
    const [revision11, setRevision11] = useState(0);

    // Para Controlar la columna de segunda revision
    const [revision21, setRevision21] = useState(0);

    // Para Controlar la columna de tercera revision
    const [revision31, setRevision31] = useState(0);

    // Para Controlar la columna de cuarta revision
    const [revision41, setRevision41] = useState(0);

    // Para Controlar la columna de quinta revision
    const [revision51, setRevision51] = useState(0);

    // Para Controlar la columna de sexta revision
    const [revision61, setRevision61] = useState(0);

    // Para Controlar la columna de septima revision
    const [revision71, setRevision71] = useState(0);

    // Para Controlar la columna de octava revision
    const [revision81, setRevision81] = useState(0);

    // Para Controlar la columna de novena revision
    const [revision91, setRevision91] = useState(0);

    // Para Controlar la columna de decima revision
    const [revision101, setRevision101] = useState(0);

    const cargarDatosInspeccion = () => {
        try {
            obtenerInspeccionPieza(id).then(response => {
                const { data } = response;
                // console.log(data)
                // initialData

                if (!formData && data) {
                    setFormData(valoresAlmacenados(data));
                    setRevision1(data.turno1.revisiones[0][1].estado);
                    setRevision2(data.turno1.revisiones[0][2].estado);
                    setRevision3(data.turno1.revisiones[0][3].estado);
                    setRevision4(data.turno1.revisiones[0][4].estado);
                    setRevision5(data.turno1.revisiones[0][5].estado);
                    setRevision6(data.turno1.revisiones[0][6].estado);
                    setRevision7(data.turno1.revisiones[0][7].estado);
                    setRevision8(data.turno1.revisiones[0][8].estado);
                    setRevision9(data.turno1.revisiones[0][9].estado);
                    setRevision10(data.turno1.revisiones[0][10].estado);
                    setHora1(data.turno1.revisiones[0][1].hora1);
                    setHora2(data.turno1.revisiones[0][2].hora2);
                    setHora3(data.turno1.revisiones[0][3].hora3);
                    setHora4(data.turno1.revisiones[0][4].hora4);
                    setHora5(data.turno1.revisiones[0][5].hora5);
                    setHora6(data.turno1.revisiones[0][6].hora6);
                    setHora7(data.turno1.revisiones[0][7].hora7);
                    setHora8(data.turno1.revisiones[0][8].hora8);
                    setHora9(data.turno1.revisiones[0][9].hora9);
                    setHora10(data.turno1.revisiones[0][10].hora10);
                    setMotivoCancelacion1(data.turno1.revisiones[0][1].motivoCancelacion1);
                    setMotivoCancelacion2(data.turno1.revisiones[0][2].motivoCancelacion2);
                    setMotivoCancelacion3(data.turno1.revisiones[0][3].motivoCancelacion3);
                    setMotivoCancelacion4(data.turno1.revisiones[0][4].motivoCancelacion4);
                    setMotivoCancelacion5(data.turno1.revisiones[0][5].motivoCancelacion5);
                    setMotivoCancelacion6(data.turno1.revisiones[0][6].motivoCancelacion6);
                    setMotivoCancelacion7(data.turno1.revisiones[0][7].motivoCancelacion7);
                    setMotivoCancelacion8(data.turno1.revisiones[0][8].motivoCancelacion8);
                    setMotivoCancelacion9(data.turno1.revisiones[0][9].motivoCancelacion9);
                    setMotivoCancelacion10(data.turno1.revisiones[0][10].motivoCancelacion10);
                    setRevision11(data.turno2.revisiones[0][1].estado);
                    setRevision21(data.turno2.revisiones[0][2].estado);
                    setRevision31(data.turno2.revisiones[0][3].estado);
                    setRevision41(data.turno2.revisiones[0][4].estado);
                    setRevision51(data.turno2.revisiones[0][5].estado);
                    setRevision61(data.turno2.revisiones[0][6].estado);
                    setRevision71(data.turno2.revisiones[0][7].estado);
                    setRevision81(data.turno2.revisiones[0][8].estado);
                    setRevision91(data.turno2.revisiones[0][9].estado);
                    setRevision101(data.turno2.revisiones[0][10].estado);
                    setHora11(data.turno2.revisiones[0][1].hora1);
                    setHora21(data.turno2.revisiones[0][2].hora2);
                    setHora31(data.turno2.revisiones[0][3].hora3);
                    setHora41(data.turno2.revisiones[0][4].hora4);
                    setHora51(data.turno2.revisiones[0][5].hora5);
                    setHora61(data.turno2.revisiones[0][6].hora6);
                    setHora71(data.turno2.revisiones[0][7].hora7);
                    setHora81(data.turno2.revisiones[0][8].hora8);
                    setHora91(data.turno2.revisiones[0][9].hora9);
                    setHora101(data.turno2.revisiones[0][10].hora10);
                    setMotivoCancelacion11(data.turno2.revisiones[0][1].motivoCancelacion1);
                    setMotivoCancelacion21(data.turno2.revisiones[0][2].motivoCancelacion2);
                    setMotivoCancelacion31(data.turno2.revisiones[0][3].motivoCancelacion3);
                    setMotivoCancelacion41(data.turno2.revisiones[0][4].motivoCancelacion4);
                    setMotivoCancelacion51(data.turno2.revisiones[0][5].motivoCancelacion5);
                    setMotivoCancelacion61(data.turno2.revisiones[0][6].motivoCancelacion6);
                    setMotivoCancelacion71(data.turno2.revisiones[0][7].motivoCancelacion7);
                    setMotivoCancelacion81(data.turno2.revisiones[0][8].motivoCancelacion8);
                    setMotivoCancelacion91(data.turno2.revisiones[0][9].motivoCancelacion9);
                    setMotivoCancelacion101(data.turno2.revisiones[0][10].motivoCancelacion10);
                } else {
                    const datosInspeccion = valoresAlmacenados(data);
                    setFormData(datosInspeccion);
                    setRevision1(data.turno1.revisiones[0][1].estado);
                    setRevision2(data.turno1.revisiones[0][2].estado);
                    setRevision3(data.turno1.revisiones[0][3].estado);
                    setRevision4(data.turno1.revisiones[0][4].estado);
                    setRevision5(data.turno1.revisiones[0][5].estado);
                    setRevision6(data.turno1.revisiones[0][6].estado);
                    setRevision7(data.turno1.revisiones[0][7].estado);
                    setRevision8(data.turno1.revisiones[0][8].estado);
                    setRevision9(data.turno1.revisiones[0][9].estado);
                    setRevision10(data.turno1.revisiones[0][10].estado);
                    setHora1(data.turno1.revisiones[0][1].hora1);
                    setHora2(data.turno1.revisiones[0][2].hora2);
                    setHora3(data.turno1.revisiones[0][3].hora3);
                    setHora4(data.turno1.revisiones[0][4].hora4);
                    setHora5(data.turno1.revisiones[0][5].hora5);
                    setHora6(data.turno1.revisiones[0][6].hora6);
                    setHora7(data.turno1.revisiones[0][7].hora7);
                    setHora8(data.turno1.revisiones[0][8].hora8);
                    setHora9(data.turno1.revisiones[0][9].hora9);
                    setHora10(data.turno1.revisiones[0][10].hora10);
                    setMotivoCancelacion1(data.turno1.revisiones[0][1].motivoCancelacion1);
                    setMotivoCancelacion2(data.turno1.revisiones[0][2].motivoCancelacion2);
                    setMotivoCancelacion3(data.turno1.revisiones[0][3].motivoCancelacion3);
                    setMotivoCancelacion4(data.turno1.revisiones[0][4].motivoCancelacion4);
                    setMotivoCancelacion5(data.turno1.revisiones[0][5].motivoCancelacion5);
                    setMotivoCancelacion6(data.turno1.revisiones[0][6].motivoCancelacion6);
                    setMotivoCancelacion7(data.turno1.revisiones[0][7].motivoCancelacion7);
                    setMotivoCancelacion8(data.turno1.revisiones[0][8].motivoCancelacion8);
                    setMotivoCancelacion9(data.turno1.revisiones[0][9].motivoCancelacion9);
                    setMotivoCancelacion10(data.turno1.revisiones[0][10].motivoCancelacion10);
                    setRevision11(data.turno2.revisiones[0][1].estado);
                    setRevision21(data.turno2.revisiones[0][2].estado);
                    setRevision31(data.turno2.revisiones[0][3].estado);
                    setRevision41(data.turno2.revisiones[0][4].estado);
                    setRevision51(data.turno2.revisiones[0][5].estado);
                    setRevision61(data.turno2.revisiones[0][6].estado);
                    setRevision71(data.turno2.revisiones[0][7].estado);
                    setRevision81(data.turno2.revisiones[0][8].estado);
                    setRevision91(data.turno2.revisiones[0][9].estado);
                    setRevision101(data.turno2.revisiones[0][10].estado);
                    setHora11(data.turno2.revisiones[0][1].hora1);
                    setHora21(data.turno2.revisiones[0][2].hora2);
                    setHora31(data.turno2.revisiones[0][3].hora3);
                    setHora41(data.turno2.revisiones[0][4].hora4);
                    setHora51(data.turno2.revisiones[0][5].hora5);
                    setHora61(data.turno2.revisiones[0][6].hora6);
                    setHora71(data.turno2.revisiones[0][7].hora7);
                    setHora81(data.turno2.revisiones[0][8].hora8);
                    setHora91(data.turno2.revisiones[0][9].hora9);
                    setHora101(data.turno2.revisiones[0][10].hora10);
                    setMotivoCancelacion11(data.turno2.revisiones[0][1].motivoCancelacion1);
                    setMotivoCancelacion21(data.turno2.revisiones[0][2].motivoCancelacion2);
                    setMotivoCancelacion31(data.turno2.revisiones[0][3].motivoCancelacion3);
                    setMotivoCancelacion41(data.turno2.revisiones[0][4].motivoCancelacion4);
                    setMotivoCancelacion51(data.turno2.revisiones[0][5].motivoCancelacion5);
                    setMotivoCancelacion61(data.turno2.revisiones[0][6].motivoCancelacion6);
                    setMotivoCancelacion71(data.turno2.revisiones[0][7].motivoCancelacion7);
                    setMotivoCancelacion81(data.turno2.revisiones[0][8].motivoCancelacion8);
                    setMotivoCancelacion91(data.turno2.revisiones[0][9].motivoCancelacion9);
                    setMotivoCancelacion101(data.turno2.revisiones[0][10].motivoCancelacion10);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDatosInspeccion();
    }, []);

    const onSubmit = e => {
        e.preventDefault()


        if (!formData.fechaElaboracion || !formData.ordenProduccion || !formData.fechaArranque || !formData.numeroMaquina || !formData.cantidadLote) {
            toast.warning("Completa el formulario");
        } else {
            //console.log(formData)
            setLoading(true)
            const dataTemp = {
                fechaElaboracion: formData.fechaElaboracion,
                noOP: formData.ordenProduccion,
                fechaArranqueMaquina: formData.fechaArranque,
                noMaquina: formData.numeroMaquina,
                cliente: nombreCliente,
                descripcionPieza: producto,
                noParte: numeroParte,
                material: material,
                cantidadLote: formData.cantidadLote,
                turno1: {
                    elaboro: formData.elaboro1,
                    operador: formData.operador1,
                    revisiones: {
                        1: {
                            revision1: "1",
                            hora1: hora1,
                            tono1: formData.tono1,
                            contaminacion1: formData.contaminacion1,
                            rebanada1: formData.rebanada1,
                            rafaga1: formData.rafaga1,
                            rechupe1: formData.rechupe1,
                            piezaCompleta1: formData.piezaCompleta1,
                            grietas1: formData.grietas1,
                            inyeccion1: formData.inyeccion1,
                            consistencia1: formData.consistencia1,
                            funcionalidad1: formData.funcionalidad1,
                            empaque1: formData.empaque1,
                            otros1: formData.otros1,
                            piezasRevisadas1: formData.piezasRevisadas1,
                            cantidadPiezas1: formData.cantidadPiezas1,
                            estado: revision1,
                            motivoCancelacion1: motivoCancelacion1
                        },
                        2: {
                            revision2: "2",
                            hora2: hora2,
                            tono2: formData.tono2,
                            contaminacion2: formData.contaminacion2,
                            rebanada2: formData.rebanada2,
                            rafaga2: formData.rafaga2,
                            rechupe2: formData.rechupe2,
                            piezaCompleta2: formData.piezaCompleta2,
                            grietas2: formData.grietas2,
                            inyeccion2: formData.inyeccion2,
                            consistencia2: formData.consistencia2,
                            funcionalidad2: formData.funcionalidad2,
                            empaque2: formData.empaque2,
                            otros2: formData.otros2,
                            piezasRevisadas2: formData.piezasRevisadas2,
                            cantidadPiezas2: formData.cantidadPiezas2,
                            estado: revision2,
                            motivoCancelacion2: motivoCancelacion2
                        },
                        3: {
                            revision3: "3",
                            hora3: hora3,
                            tono3: formData.tono3,
                            contaminacion3: formData.contaminacion3,
                            rebanada3: formData.rebanada3,
                            rafaga3: formData.rafaga3,
                            rechupe3: formData.rechupe3,
                            piezaCompleta3: formData.piezaCompleta3,
                            grietas3: formData.grietas3,
                            inyeccion3: formData.inyeccion3,
                            consistencia3: formData.consistencia3,
                            funcionalidad3: formData.funcionalidad3,
                            empaque3: formData.empaque3,
                            otros3: formData.otros3,
                            piezasRevisadas3: formData.piezasRevisadas3,
                            cantidadPiezas3: formData.cantidadPiezas3,
                            estado: revision3,
                            motivoCancelacion3: motivoCancelacion3
                        },
                        4: {
                            revision4: "4",
                            hora4: hora4,
                            tono4: formData.tono4,
                            contaminacion4: formData.contaminacion4,
                            rebanada4: formData.rebanada4,
                            rafaga4: formData.rafaga4,
                            rechupe4: formData.rechupe4,
                            piezaCompleta4: formData.piezaCompleta4,
                            grietas4: formData.grietas4,
                            inyeccion4: formData.inyeccion4,
                            consistencia4: formData.consistencia4,
                            funcionalidad4: formData.funcionalidad4,
                            empaque4: formData.empaque4,
                            otros4: formData.otros4,
                            piezasRevisadas4: formData.piezasRevisadas4,
                            cantidadPiezas4: formData.cantidadPiezas4,
                            estado: revision4,
                            motivoCancelacion4: motivoCancelacion4
                        },
                        5: {
                            revision5: "5",
                            hora5: hora5,
                            tono5: formData.tono5,
                            contaminacion5: formData.contaminacion5,
                            rebanada5: formData.rebanada5,
                            rafaga5: formData.rafaga5,
                            rechupe5: formData.rechupe5,
                            piezaCompleta5: formData.piezaCompleta5,
                            grietas5: formData.grietas5,
                            inyeccion5: formData.inyeccion5,
                            consistencia5: formData.consistencia5,
                            funcionalidad5: formData.funcionalidad5,
                            empaque5: formData.empaque5,
                            otros5: formData.otros5,
                            piezasRevisadas5: formData.piezasRevisadas5,
                            cantidadPiezas5: formData.cantidadPiezas5,
                            estado: revision5,
                            motivoCancelacion5: motivoCancelacion5
                        },
                        6: {
                            revision6: "6",
                            hora6: hora6,
                            tono6: formData.tono6,
                            contaminacion6: formData.contaminacion6,
                            rebanada6: formData.rebanada6,
                            rafaga6: formData.rafaga6,
                            rechupe6: formData.rechupe6,
                            piezaCompleta6: formData.piezaCompleta6,
                            grietas6: formData.grietas6,
                            inyeccion6: formData.inyeccion6,
                            consistencia6: formData.consistencia6,
                            funcionalidad6: formData.funcionalidad6,
                            empaque6: formData.empaque6,
                            otros6: formData.otros6,
                            piezasRevisadas6: formData.piezasRevisadas6,
                            cantidadPiezas6: formData.cantidadPiezas6,
                            estado: revision6,
                            motivoCancelacion6: motivoCancelacion6
                        },
                        7: {
                            revision7: "7",
                            hora7: hora7,
                            tono7: formData.tono7,
                            contaminacion7: formData.contaminacion7,
                            rebanada7: formData.rebanada7,
                            rafaga7: formData.rafaga7,
                            rechupe7: formData.rechupe7,
                            piezaCompleta7: formData.piezaCompleta7,
                            grietas7: formData.grietas7,
                            inyeccion7: formData.inyeccion7,
                            consistencia7: formData.consistencia7,
                            funcionalidad7: formData.funcionalidad7,
                            empaque7: formData.empaque7,
                            otros7: formData.otros7,
                            piezasRevisadas7: formData.piezasRevisadas7,
                            cantidadPiezas7: formData.cantidadPiezas7,
                            estado: revision7,
                            motivoCancelacion7: motivoCancelacion7
                        },
                        8: {
                            revision8: "8",
                            hora8: hora8,
                            tono8: formData.tono8,
                            contaminacion8: formData.contaminacion8,
                            rebanada8: formData.rebanada8,
                            rafaga8: formData.rafaga8,
                            rechupe8: formData.rechupe8,
                            piezaCompleta8: formData.piezaCompleta8,
                            grietas8: formData.grietas8,
                            inyeccion8: formData.inyeccion8,
                            consistencia8: formData.consistencia8,
                            funcionalidad8: formData.funcionalidad8,
                            empaque8: formData.empaque8,
                            otros8: formData.otros8,
                            piezasRevisadas8: formData.piezasRevisadas8,
                            cantidadPiezas8: formData.cantidadPiezas8,
                            estado: revision8,
                            motivoCancelacion8: motivoCancelacion8
                        },
                        9: {
                            revision9: "9",
                            hora9: hora9,
                            tono9: formData.tono9,
                            contaminacion9: formData.contaminacion9,
                            rebanada9: formData.rebanada9,
                            rafaga9: formData.rafaga9,
                            rechupe9: formData.rechupe9,
                            piezaCompleta9: formData.piezaCompleta9,
                            grietas9: formData.grietas9,
                            inyeccion9: formData.inyeccion9,
                            consistencia9: formData.consistencia9,
                            funcionalidad9: formData.funcionalidad9,
                            empaque9: formData.empaque9,
                            otros9: formData.otros9,
                            piezasRevisadas9: formData.piezasRevisadas9,
                            cantidadPiezas9: formData.cantidadPiezas9,
                            estado: revision9,
                            motivoCancelacion9: motivoCancelacion9
                        },
                        10: {
                            revision10: "10",
                            hora10: hora10,
                            tono10: formData.tono10,
                            contaminacion10: formData.contaminacion10,
                            rebanada10: formData.rebanada10,
                            rafaga10: formData.rafaga10,
                            rechupe10: formData.rechupe10,
                            piezaCompleta10: formData.piezaCompleta10,
                            grietas10: formData.grietas10,
                            inyeccion10: formData.inyeccion10,
                            consistencia10: formData.consistencia10,
                            funcionalidad10: formData.funcionalidad10,
                            empaque10: formData.empaque10,
                            otros10: formData.otros10,
                            piezasRevisadas10: formData.piezasRevisadas10,
                            cantidadPiezas10: formData.cantidadPiezas10,
                            estado: revision10,
                            motivoCancelacion10: motivoCancelacion10
                        },
                    }
                },
                turno2: {
                    elaboro: formData.elaboro2,
                    operador: formData.operador2,
                    revisiones: {
                        1: {
                            revision1: "1",
                            hora1: hora11,
                            tono1: formData.tono11,
                            contaminacion1: formData.contaminacion11,
                            rebanada1: formData.rebanada11,
                            rafaga1: formData.rafaga11,
                            rechupe1: formData.rechupe11,
                            piezaCompleta1: formData.piezaCompleta11,
                            grietas1: formData.grietas11,
                            inyeccion1: formData.inyeccion11,
                            consistencia1: formData.consistencia11,
                            funcionalidad1: formData.funcionalidad11,
                            empaque1: formData.empaque11,
                            otros1: formData.otros11,
                            piezasRevisadas1: formData.piezasRevisadas11,
                            cantidadPiezas1: formData.cantidadPiezas11,
                            estado: revision11,
                            motivoCancelacion1: motivoCancelacion11
                        },
                        2: {
                            revision2: "2",
                            hora2: hora21,
                            tono2: formData.tono21,
                            contaminacion2: formData.contaminacion21,
                            rebanada2: formData.rebanada21,
                            rafaga2: formData.rafaga21,
                            rechupe2: formData.rechupe21,
                            piezaCompleta2: formData.piezaCompleta21,
                            grietas2: formData.grietas21,
                            inyeccion2: formData.inyeccion21,
                            consistencia2: formData.consistencia21,
                            funcionalidad2: formData.funcionalidad21,
                            empaque2: formData.empaque21,
                            otros2: formData.otros21,
                            piezasRevisadas2: formData.piezasRevisadas21,
                            cantidadPiezas2: formData.cantidadPiezas21,
                            estado: revision21,
                            motivoCancelacion2: motivoCancelacion21
                        },
                        3: {
                            revision3: "3",
                            hora3: hora31,
                            tono3: formData.tono31,
                            contaminacion3: formData.contaminacion31,
                            rebanada3: formData.rebanada31,
                            rafaga3: formData.rafaga31,
                            rechupe3: formData.rechupe31,
                            piezaCompleta3: formData.piezaCompleta31,
                            grietas3: formData.grietas31,
                            inyeccion3: formData.inyeccion31,
                            consistencia3: formData.consistencia31,
                            funcionalidad3: formData.funcionalidad31,
                            empaque3: formData.empaque31,
                            otros3: formData.otros31,
                            piezasRevisadas3: formData.piezasRevisadas31,
                            cantidadPiezas3: formData.cantidadPiezas31,
                            estado: revision31,
                            motivoCancelacion3: motivoCancelacion31
                        },
                        4: {
                            revision4: "4",
                            hora4: hora41,
                            tono4: formData.tono41,
                            contaminacion4: formData.contaminacion41,
                            rebanada4: formData.rebanada41,
                            rafaga4: formData.rafaga41,
                            rechupe4: formData.rechupe41,
                            piezaCompleta4: formData.piezaCompleta41,
                            grietas4: formData.grietas41,
                            inyeccion4: formData.inyeccion41,
                            consistencia4: formData.consistencia41,
                            funcionalidad4: formData.funcionalidad41,
                            empaque4: formData.empaque41,
                            otros4: formData.otros41,
                            piezasRevisadas4: formData.piezasRevisadas41,
                            cantidadPiezas4: formData.cantidadPiezas41,
                            estado: revision41,
                            motivoCancelacion4: motivoCancelacion41
                        },
                        5: {
                            revision5: "5",
                            hora5: hora51,
                            tono5: formData.tono51,
                            contaminacion5: formData.contaminacion51,
                            rebanada5: formData.rebanada51,
                            rafaga5: formData.rafaga51,
                            rechupe5: formData.rechupe51,
                            piezaCompleta5: formData.piezaCompleta51,
                            grietas5: formData.grietas51,
                            inyeccion5: formData.inyeccion51,
                            consistencia5: formData.consistencia51,
                            funcionalidad5: formData.funcionalidad51,
                            empaque5: formData.empaque51,
                            otros5: formData.otros51,
                            piezasRevisadas5: formData.piezasRevisadas51,
                            cantidadPiezas5: formData.cantidadPiezas51,
                            estado: revision51,
                            motivoCancelacion5: motivoCancelacion51
                        },
                        6: {
                            revision6: "6",
                            hora6: hora61,
                            tono6: formData.tono61,
                            contaminacion6: formData.contaminacion61,
                            rebanada6: formData.rebanada61,
                            rafaga6: formData.rafaga61,
                            rechupe6: formData.rechupe61,
                            piezaCompleta6: formData.piezaCompleta61,
                            grietas6: formData.grietas61,
                            inyeccion6: formData.inyeccion61,
                            consistencia6: formData.consistencia61,
                            funcionalidad6: formData.funcionalidad61,
                            empaque6: formData.empaque61,
                            otros6: formData.otros61,
                            piezasRevisadas6: formData.piezasRevisadas61,
                            cantidadPiezas6: formData.cantidadPiezas61,
                            estado: revision61,
                            motivoCancelacion6: motivoCancelacion61
                        },
                        7: {
                            revision7: "7",
                            hora7: hora71,
                            tono7: formData.tono71,
                            contaminacion7: formData.contaminacion71,
                            rebanada7: formData.rebanada71,
                            rafaga7: formData.rafaga71,
                            rechupe7: formData.rechupe71,
                            piezaCompleta7: formData.piezaCompleta71,
                            grietas7: formData.grietas71,
                            inyeccion7: formData.inyeccion71,
                            consistencia7: formData.consistencia71,
                            funcionalidad7: formData.funcionalidad71,
                            empaque7: formData.empaque71,
                            otros7: formData.otros71,
                            piezasRevisadas7: formData.piezasRevisadas71,
                            cantidadPiezas7: formData.cantidadPiezas71,
                            estado: revision71,
                            motivoCancelacion7: motivoCancelacion71
                        },
                        8: {
                            revision8: "8",
                            hora8: hora81,
                            tono8: formData.tono81,
                            contaminacion8: formData.contaminacion81,
                            rebanada8: formData.rebanada81,
                            rafaga8: formData.rafaga81,
                            rechupe8: formData.rechupe81,
                            piezaCompleta8: formData.piezaCompleta81,
                            grietas8: formData.grietas81,
                            inyeccion8: formData.inyeccion81,
                            consistencia8: formData.consistencia81,
                            funcionalidad8: formData.funcionalidad81,
                            empaque8: formData.empaque81,
                            otros8: formData.otros81,
                            piezasRevisadas8: formData.piezasRevisadas81,
                            cantidadPiezas8: formData.cantidadPiezas81,
                            estado: revision81,
                            motivoCancelacion8: motivoCancelacion81
                        },
                        9: {
                            revision9: "9",
                            hora9: hora91,
                            tono9: formData.tono91,
                            contaminacion9: formData.contaminacion91,
                            rebanada9: formData.rebanada91,
                            rafaga9: formData.rafaga91,
                            rechupe9: formData.rechupe91,
                            piezaCompleta9: formData.piezaCompleta91,
                            grietas9: formData.grietas91,
                            inyeccion9: formData.inyeccion91,
                            consistencia9: formData.consistencia91,
                            funcionalidad9: formData.funcionalidad91,
                            empaque9: formData.empaque91,
                            otros9: formData.otros91,
                            piezasRevisadas9: formData.piezasRevisadas91,
                            cantidadPiezas9: formData.cantidadPiezas91,
                            estado: revision91,
                            motivoCancelacion9: motivoCancelacion91
                        },
                        10: {
                            revision10: "10",
                            hora10: hora101,
                            tono10: formData.tono101,
                            contaminacion10: formData.contaminacion101,
                            rebanada10: formData.rebanada101,
                            rafaga10: formData.rafaga101,
                            rechupe10: formData.rechupe101,
                            piezaCompleta10: formData.piezaCompleta101,
                            grietas10: formData.grietas101,
                            inyeccion10: formData.inyeccion101,
                            consistencia10: formData.consistencia101,
                            funcionalidad10: formData.funcionalidad101,
                            empaque10: formData.empaque101,
                            otros10: formData.otros101,
                            piezasRevisadas10: formData.piezasRevisadas101,
                            cantidadPiezas10: formData.cantidadPiezas101,
                            estado: revision101,
                            motivoCancelacion10: motivoCancelacion101
                        },
                    }
                },
                observaciones: formData.observaciones,
                status: "Activo",
                motivoCancelacion: "",
            }

            //console.log(dataTemp)
            try {
                actualizaInspeccionPieza(id, dataTemp).then(response => {
                    const { data } = response;
                    LogsInformativos("Inspeccion de pieza actualizada " + id, dataTemp)
                    setLoading(false)
                    toast.success(data.mensaje)
                    rutaRegreso()
                }).catch(e => {
                    console.log(e)
                    if (e.message === 'Network Error') {
                        //console.log("No hay internet")
                        toast.error("Conexión al servidor no disponible");
                    }
                })
            } catch (e) {
                console.log(e)
            }

        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Para guardar el motivo de la primera revision
    const [motivoCancelacion1, setMotivoCancelacion1] = useState("");

    // Para guardar el motivo de la segunda revision
    const [motivoCancelacion2, setMotivoCancelacion2] = useState("");

    // Para guardar el motivo de la tercera revision
    const [motivoCancelacion3, setMotivoCancelacion3] = useState("");

    // Para guardar el motivo de la cuarta revision
    const [motivoCancelacion4, setMotivoCancelacion4] = useState("");

    // Para guardar el motivo de la quinta revision
    const [motivoCancelacion5, setMotivoCancelacion5] = useState("");

    // Para guardar el motivo de la sexta revision
    const [motivoCancelacion6, setMotivoCancelacion6] = useState("");

    // Para guardar el motivo de la septima revision
    const [motivoCancelacion7, setMotivoCancelacion7] = useState("");

    // Para guardar el motivo de la octava revision
    const [motivoCancelacion8, setMotivoCancelacion8] = useState("");

    // Para guardar el motivo de la novena revision
    const [motivoCancelacion9, setMotivoCancelacion9] = useState("");

    // Para guardar el motivo de la decima revision
    const [motivoCancelacion10, setMotivoCancelacion10] = useState("");

    // Para guardar el motivo de la primera revision
    const [motivoCancelacion11, setMotivoCancelacion11] = useState("");

    // Para guardar el motivo de la segunda revision
    const [motivoCancelacion21, setMotivoCancelacion21] = useState("");

    // Para guardar el motivo de la tercera revision
    const [motivoCancelacion31, setMotivoCancelacion31] = useState("");

    // Para guardar el motivo de la cuarta revision
    const [motivoCancelacion41, setMotivoCancelacion41] = useState("");

    // Para guardar el motivo de la quinta revision
    const [motivoCancelacion51, setMotivoCancelacion51] = useState("");

    // Para guardar el motivo de la sexta revision
    const [motivoCancelacion61, setMotivoCancelacion61] = useState("");

    // Para guardar el motivo de la septima revision
    const [motivoCancelacion71, setMotivoCancelacion71] = useState("");

    // Para guardar el motivo de la octava revision
    const [motivoCancelacion81, setMotivoCancelacion81] = useState("");

    // Para guardar el motivo de la novena revision
    const [motivoCancelacion91, setMotivoCancelacion91] = useState("");

    // Para guardar el motivo de la decima revision
    const [motivoCancelacion101, setMotivoCancelacion101] = useState("");

    const hoy = new Date();

    const hora = hoy.getHours() + ':' + hoy.getMinutes();

    const [hora1, setHora1] = useState();

    const cargarRevision1 = () => {
        if (revision1 == 1) {
            setHora1(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision1();
    }, [revision1]);

    const [hora2, setHora2] = useState();

    const cargarRevision2 = () => {
        if (revision2 == 1) {
            setHora2(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision2();
    }, [revision2]);

    const [hora3, setHora3] = useState();

    const cargarRevision3 = () => {
        if (revision3 == 1) {
            setHora3(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision3();
    }, [revision3]);

    const [hora4, setHora4] = useState();

    const cargarRevision4 = () => {
        if (revision4 == 1) {
            setHora4(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision4();
    }, [revision4]);

    const [hora5, setHora5] = useState();

    const cargarRevision5 = () => {
        if (revision5 == 1) {
            setHora5(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision5();
    }, [revision5]);

    const [hora6, setHora6] = useState();

    const cargarRevision6 = () => {
        if (revision6 == 1) {
            setHora6(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision6();
    }, [revision6]);

    const [hora7, setHora7] = useState();

    const cargarRevision7 = () => {
        if (revision7 == 1) {
            setHora7(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision7();
    }, [revision7]);

    const [hora8, setHora8] = useState();

    const cargarRevision8 = () => {
        if (revision8 == 1) {
            setHora8(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision8();
    }, [revision8]);

    const [hora9, setHora9] = useState();

    const cargarRevision9 = () => {
        if (revision9 == 1) {
            setHora9(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision9();
    }, [revision9]);

    const [hora10, setHora10] = useState();

    const cargarRevision10 = () => {
        if (revision10 == 1) {
            setHora10(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision10();
    }, [revision10]);

    const [hora11, setHora11] = useState();

    const cargarRevision11 = () => {
        if (revision11 == 1) {
            setHora11(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision11();
    }, [revision11]);

    const [hora21, setHora21] = useState();

    const cargarRevision21 = () => {
        if (revision21 == 1) {
            setHora21(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision21();
    }, [revision21]);

    const [hora31, setHora31] = useState();

    const cargarRevision31 = () => {
        if (revision31 == 1) {
            setHora31(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision31();
    }, [revision31]);

    const [hora41, setHora41] = useState();

    const cargarRevision41 = () => {
        if (revision41 == 1) {
            setHora41(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision41();
    }, [revision41]);

    const [hora51, setHora51] = useState();

    const cargarRevision51 = () => {
        if (revision51 == 1) {
            setHora51(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision51();
    }, [revision51]);

    const [hora61, setHora61] = useState();

    const cargarRevision61 = () => {
        if (revision61 == 1) {
            setHora61(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision61();
    }, [revision61]);

    const [hora71, setHora71] = useState();

    const cargarRevision71 = () => {
        if (revision71 == 1) {
            setHora71(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision71();
    }, [revision71]);

    const [hora81, setHora81] = useState();

    const cargarRevision81 = () => {
        if (revision81 == 1) {
            setHora81(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision81();
    }, [revision81]);

    const [hora91, setHora91] = useState();

    const cargarRevision91 = () => {
        if (revision91 == 1) {
            setHora91(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision91();
    }, [revision91]);

    const [hora101, setHora101] = useState();

    const cargarRevision101 = () => {
        if (revision101 == 1) {
            setHora101(hoy.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
        }
    }

    useEffect(() => {
        cargarRevision101();
    }, [revision101]);

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Modificar inspección de pieza
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar a la pagina anterior"
                            onClick={() => {
                                rutaRegreso()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                        </Button>
                    </Col>
                </Row>
            </Alert>

            <br />

            <Container fluid>
                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <div className="encabezado">
                            <Container fluid>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Fecha de elaboracion
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="date"
                                                placeholder="Fecha de elaboración"
                                                name="fechaElaboracion"
                                                defaultValue={formData.fechaElaboracion}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                Descripcion pieza
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Descripcion de la pieza"
                                                name="producto"
                                                value={producto}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                No. O.P
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Escribe el numero de la OP"
                                                name="ordenProduccion"
                                                defaultValue={formData.ordenProduccion}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                No. de parte
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Numero de parte"
                                                name="numeroParte"
                                                value={numeroParte}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Fecha de arranque de maquina
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="date"
                                                placeholder="Fecha de arranque de maquina"
                                                name="fechaArranque"
                                                defaultValue={formData.fechaArranque}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                Material
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Material"
                                                name="material"
                                                value={material}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                No. Maquina
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Mumero de la maquina"
                                                name="numeroMaquina"
                                                defaultValue={formData.numeroMaquina}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                Cantidad lote
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                placeholder="Cantidad lote"
                                                name="cantidadLote"
                                                defaultValue={formData.cantidadLote}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Cliente
                                            </Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nombre del cliente"
                                                name="nombreCliente"
                                                value={nombreCliente}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </div>
                        <br />


                        <Row className="mb-3">
                            <Form.Group as={Row}>
                                <Col>
                                    <Button
                                        variant={"light"}
                                        className="turno"
                                    >
                                        Turno 1
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Row>

                        <div className="datosHerramientas">
                            <Container fluid>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Elaboro
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Elaboro"
                                                name="elaboro1"
                                                defaultValue={formData.elaboro1}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                Operador
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Operador"
                                                name="operador1"
                                                defaultValue={formData.operador1}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row}>
                                        <Col sm="2">
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision1 == 0 ? "success" : revision1 == 1 ? "warning" : revision1 == 2 ? "secondary" : "danger"}
                                                title={revision1 == 0 ? "Iniciar" : revision1 == 1 ? "Guardar" : revision1 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision1(revision1 + 1);
                                                    {
                                                        (revision1 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion1}
                                                                    revision={revision1 + 1}
                                                                    setRevision={setRevision1}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision1 == 0 ? "Iniciar" : revision1 == 1 ? "Guardar" : revision1 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision2 == 0 ? "success" : revision2 == 1 ? "warning" : revision2 == 2 ? "secondary" : "danger"}
                                                title={revision2 == 0 ? "Iniciar" : revision2 == 1 ? "Guardar" : revision2 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision2(revision2 + 1);
                                                    {
                                                        (revision2 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion2}
                                                                    revision={revision2 + 1}
                                                                    setRevision={setRevision2}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision2 == 0 ? "Iniciar" : revision2 == 1 ? "Guardar" : revision2 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision3 == 0 ? "success" : revision3 == 1 ? "warning" : revision3 == 2 ? "secondary" : "danger"}
                                                title={revision3 == 0 ? "Iniciar" : revision3 == 1 ? "Guardar" : revision3 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision3(revision3 + 1);
                                                    {
                                                        (revision3 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion3}
                                                                    revision={revision3 + 1}
                                                                    setRevision={setRevision3}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision3 == 0 ? "Iniciar" : revision3 == 1 ? "Guardar" : revision3 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision4 == 0 ? "success" : revision4 == 1 ? "warning" : revision4 == 2 ? "secondary" : "danger"}
                                                title={revision4 == 0 ? "Iniciar" : revision4 == 1 ? "Guardar" : revision4 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision4(revision4 + 1);
                                                    {
                                                        (revision4 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion4}
                                                                    revision={revision4 + 1}
                                                                    setRevision={setRevision4}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision4 == 0 ? "Iniciar" : revision4 == 1 ? "Guardar" : revision4 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision5 == 0 ? "success" : revision5 == 1 ? "warning" : revision5 == 2 ? "secondary" : "danger"}
                                                title={revision5 == 0 ? "Iniciar" : revision5 == 1 ? "Guardar" : revision5 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision5(revision5 + 1);
                                                    {
                                                        (revision5 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion5}
                                                                    revision={revision5 + 1}
                                                                    setRevision={setRevision5}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision5 == 0 ? "Iniciar" : revision5 == 1 ? "Guardar" : revision5 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision6 == 0 ? "success" : revision6 == 1 ? "warning" : revision6 == 2 ? "secondary" : "danger"}
                                                title={revision6 == 0 ? "Iniciar" : revision6 == 1 ? "Guardar" : revision6 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision6(revision6 + 1);
                                                    {
                                                        (revision6 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion6}
                                                                    revision={revision6 + 1}
                                                                    setRevision={setRevision6}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision6 == 0 ? "Iniciar" : revision6 == 1 ? "Guardar" : revision6 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision7 == 0 ? "success" : revision7 == 1 ? "warning" : revision7 == 2 ? "secondary" : "danger"}
                                                title={revision7 == 0 ? "Iniciar" : revision7 == 1 ? "Guardar" : revision7 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision7(revision7 + 1);
                                                    {
                                                        (revision7 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion7}
                                                                    revision={revision7 + 1}
                                                                    setRevision={setRevision7}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision7 == 0 ? "Iniciar" : revision7 == 1 ? "Guardar" : revision7 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision8 == 0 ? "success" : revision8 == 1 ? "warning" : revision8 == 2 ? "secondary" : "danger"}
                                                title={revision8 == 0 ? "Iniciar" : revision8 == 1 ? "Guardar" : revision8 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision8(revision8 + 1);
                                                    {
                                                        (revision8 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion8}
                                                                    revision={revision8 + 1}
                                                                    setRevision={setRevision8}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision8 == 0 ? "Iniciar" : revision8 == 1 ? "Guardar" : revision8 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision9 == 0 ? "success" : revision9 == 1 ? "warning" : revision9 == 2 ? "secondary" : "danger"}
                                                title={revision9 == 0 ? "Iniciar" : revision9 == 1 ? "Guardar" : revision9 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision9(revision9 + 1);
                                                    {
                                                        (revision9 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion9}
                                                                    revision={revision9 + 1}
                                                                    setRevision={setRevision9}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision9 == 0 ? "Iniciar" : revision9 == 1 ? "Guardar" : revision9 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision10 == 0 ? "success" : revision10 == 1 ? "warning" : revision10 == 2 ? "secondary" : "danger"}
                                                title={revision10 == 0 ? "Iniciar" : revision10 == 1 ? "Guardar" : revision10 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision10(revision10 + 1);
                                                    {
                                                        (revision10 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion10}
                                                                    revision={revision10 + 1}
                                                                    setRevision={setRevision10}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision10 == 0 ? "Iniciar" : revision10 == 1 ? "Guardar" : revision10 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                REVISIÓN
                                            </Form.Label>
                                        </Col>
                                        <Col >
                                            <Form.Control
                                                type="text"
                                                name="revision1"
                                                value={1}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision2"
                                                value={2}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision3"
                                                value={3}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision4"
                                                value={4}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision5"
                                                value={5}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision6"
                                                value={6}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision7"
                                                defaultValue={7}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision8"
                                                defaultValue={8}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision9"
                                                defaultValue={9}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision10"
                                                defaultValue={10}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                HORA
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora1"
                                                defaultValue={hora1}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora2"
                                                defaultValue={hora2}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora3"
                                                defaultValue={hora3}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora4"
                                                defaultValue={hora4}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora5"
                                                defaultValue={hora5}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora6"
                                                defaultValue={hora6}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora7"
                                                defaultValue={hora7}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora8"
                                                defaultValue={hora8}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora9"
                                                defaultValue={hora9}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora10"
                                                defaultValue={hora10}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                1-Tono
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono1"
                                                defaultValue={formData.tono1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono2"
                                                defaultValue={formData.tono2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono3"
                                                defaultValue={formData.tono3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono4"
                                                defaultValue={formData.tono4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono5"
                                                defaultValue={formData.tono5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono6"
                                                defaultValue={formData.tono6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono7"
                                                defaultValue={formData.tono7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono8"
                                                defaultValue={formData.tono8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono9"
                                                defaultValue={formData.tono9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono10"
                                                defaultValue={formData.tono10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                2-Contaminación
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion1"
                                                defaultValue={formData.contaminacion1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion2"
                                                defaultValue={formData.contaminacion2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion3"
                                                defaultValue={formData.contaminacion3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion4"
                                                defaultValue={formData.contaminacion4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion5"
                                                defaultValue={formData.contaminacion5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion6"
                                                defaultValue={formData.contaminacion6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion7"
                                                defaultValue={formData.contaminacion7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion8"
                                                defaultValue={formData.contaminacion8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion9"
                                                defaultValue={formData.contaminacion9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion10"
                                                defaultValue={formData.contaminacion10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                3-Rebanada
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada1"
                                                defaultValue={formData.rebanada1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada2"
                                                defaultValue={formData.rebanada2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada3"
                                                defaultValue={formData.rebanada3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada4"
                                                defaultValue={formData.rebanada4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada5"
                                                defaultValue={formData.rebanada5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada6"
                                                defaultValue={formData.rebanada6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada7"
                                                defaultValue={formData.rebanada7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada8"
                                                defaultValue={formData.rebanada8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada9"
                                                defaultValue={formData.rebanada9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada10"
                                                defaultValue={formData.rebanada10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                4-Rafágas
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga1"
                                                defaultValue={formData.rafaga1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga2"
                                                defaultValue={formData.rafaga2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga3"
                                                defaultValue={formData.rafaga3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga4"
                                                defaultValue={formData.rafaga4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga5"
                                                defaultValue={formData.rafaga5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga6"
                                                defaultValue={formData.rafaga6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga7"
                                                defaultValue={formData.rafaga7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga8"
                                                defaultValue={formData.rafaga8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga9"
                                                defaultValue={formData.rafaga9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga10"
                                                defaultValue={formData.rafaga10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                5-Rechupe
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe1"
                                                defaultValue={formData.rechupe1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe2"
                                                defaultValue={formData.rechupe2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe3"
                                                defaultValue={formData.rechupe3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe4"
                                                defaultValue={formData.rechupe4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe5"
                                                defaultValue={formData.rechupe5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe6"
                                                defaultValue={formData.rechupe6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe7"
                                                defaultValue={formData.rechupe7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe8"
                                                defaultValue={formData.rechupe8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe9"
                                                defaultValue={formData.rechupe9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe10"
                                                defaultValue={formData.rechupe10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                6-Pieza completa
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta1"
                                                defaultValue={formData.piezaCompleta1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta2"
                                                defaultValue={formData.piezaCompleta2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta3"
                                                defaultValue={formData.piezaCompleta3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta4"
                                                defaultValue={formData.piezaCompleta4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta5"
                                                defaultValue={formData.piezaCompleta5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta6"
                                                defaultValue={formData.piezaCompleta6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta7"
                                                defaultValue={formData.piezaCompleta7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta8"
                                                defaultValue={formData.piezaCompleta8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta9"
                                                defaultValue={formData.piezaCompleta9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta10"
                                                defaultValue={formData.piezaCompleta10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                7-Grietas de tensión
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas1"
                                                defaultValue={formData.grietas1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas2"
                                                defaultValue={formData.grietas2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas3"
                                                defaultValue={formData.grietas3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas4"
                                                defaultValue={formData.grietas4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas5"
                                                defaultValue={formData.grietas5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas6"
                                                defaultValue={formData.grietas6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas7"
                                                defaultValue={formData.grietas7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas8"
                                                defaultValue={formData.grietas8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas9"
                                                defaultValue={formData.grietas9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas10"
                                                defaultValue={formData.grietas10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                8-Punto de inyección
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion1"
                                                defaultValue={formData.inyeccion1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion2"
                                                defaultValue={formData.inyeccion2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion3"
                                                defaultValue={formData.inyeccion3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion4"
                                                defaultValue={formData.inyeccion4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion5"
                                                defaultValue={formData.inyeccion5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion6"
                                                defaultValue={formData.inyeccion6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion7"
                                                defaultValue={formData.inyeccion7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion8"
                                                defaultValue={formData.inyeccion8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion9"
                                                defaultValue={formData.inyeccion9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion10"
                                                defaultValue={formData.inyeccion10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                9-Consistencia
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia1"
                                                defaultValue={formData.consistencia1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia2"
                                                defaultValue={formData.consistencia2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia3"
                                                defaultValue={formData.consistencia3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia4"
                                                defaultValue={formData.consistencia4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia5"
                                                defaultValue={formData.consistencia5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia6"
                                                defaultValue={formData.consistencia6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia7"
                                                defaultValue={formData.consistencia7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia8"
                                                defaultValue={formData.consistencia8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia9"
                                                defaultValue={formData.consistencia9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia10"
                                                defaultValue={formData.consistencia10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                10-Funcionalidad
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad1"
                                                defaultValue={formData.funcionalidad1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad2"
                                                defaultValue={formData.funcionalidad2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad3"
                                                defaultValue={formData.funcionalidad3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad4"
                                                defaultValue={formData.funcionalidad4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad5"
                                                defaultValue={formData.funcionalidad5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad6"
                                                defaultValue={formData.funcionalidad6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad7"
                                                defaultValue={formData.funcionalidad7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad8"
                                                defaultValue={formData.funcionalidad8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad9"
                                                defaultValue={formData.funcionalidad9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad10"
                                                defaultValue={formData.funcionalidad10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                11-Empaque
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque1"
                                                defaultValue={formData.empaque1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque2"
                                                defaultValue={formData.empaque2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque3"
                                                defaultValue={formData.empaque3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque4"
                                                defaultValue={formData.empaque4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque5"
                                                defaultValue={formData.empaque5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque6"
                                                defaultValue={formData.empaque6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque7"
                                                defaultValue={formData.empaque7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque8"
                                                defaultValue={formData.empaque8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque9"
                                                defaultValue={formData.empaque9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque10"
                                                defaultValue={formData.empaque10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                12-Otros
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros1"
                                                defaultValue={formData.otros1}
                                                disabled={revision1 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros1 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros1 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros2"
                                                defaultValue={formData.otros2}
                                                disabled={revision2 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros2 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros2 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros3"
                                                defaultValue={formData.otros3}
                                                disabled={revision3 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros3 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros3 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros4"
                                                defaultValue={formData.otros4}
                                                disabled={revision4 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros4 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros4 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros5"
                                                defaultValue={formData.otros5}
                                                disabled={revision5 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros5 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros5 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros6"
                                                defaultValue={formData.otros6}
                                                disabled={revision6 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros6 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros6 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros7"
                                                defaultValue={formData.otros7}
                                                disabled={revision7 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros7 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros7 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros8"
                                                defaultValue={formData.otros8}
                                                disabled={revision8 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros8 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros8 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros9"
                                                defaultValue={formData.otros9}
                                                disabled={revision9 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros9 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros9 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros10"
                                                defaultValue={formData.otros10}
                                                disabled={revision10 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros10 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros10 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Total de piezas revisadas
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas1"
                                                defaultValue={formData.piezasRevisadas1}
                                                disabled={revision1 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas2"
                                                defaultValue={formData.piezasRevisadas2}
                                                disabled={revision2 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas3"
                                                defaultValue={formData.piezasRevisadas3}
                                                disabled={revision3 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas4"
                                                defaultValue={formData.piezasRevisadas4}
                                                disabled={revision4 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas5"
                                                defaultValue={formData.piezasRevisadas5}
                                                disabled={revision5 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas6"
                                                defaultValue={formData.piezasRevisadas6}
                                                disabled={revision6 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas7"
                                                defaultValue={formData.piezasRevisadas7}
                                                disabled={revision7 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas8"
                                                defaultValue={formData.piezasRevisadas8}
                                                disabled={revision8 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas9"
                                                defaultValue={formData.piezasRevisadas9}
                                                disabled={revision9 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas10"
                                                defaultValue={formData.piezasRevisadas10}
                                                disabled={revision10 != 1}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Cantidad de piezas por defecto
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas1"
                                                defaultValue={formData.cantidadPiezas1}
                                                disabled={revision1 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas2"
                                                defaultValue={formData.cantidadPiezas2}
                                                disabled={revision2 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas3"
                                                defaultValue={formData.cantidadPiezas3}
                                                disabled={revision3 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas4"
                                                defaultValue={formData.cantidadPiezas4}
                                                disabled={revision4 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas5"
                                                defaultValue={formData.cantidadPiezas5}
                                                disabled={revision5 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas6"
                                                defaultValue={formData.cantidadPiezas6}
                                                disabled={revision6 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas7"
                                                defaultValue={formData.cantidadPiezas7}
                                                disabled={revision7 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas8"
                                                defaultValue={formData.cantidadPiezas8}
                                                disabled={revision8 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas9"
                                                defaultValue={formData.cantidadPiezas9}
                                                disabled={revision9 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas10"
                                                defaultValue={formData.cantidadPiezas10}
                                                disabled={revision10 != 1}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </div>

                        <br />

                        <Row className="mb-3">
                            <Form.Group as={Row}>
                                <Col>
                                    <Button
                                        variant={"light"}
                                        className="turno"
                                    >
                                        Turno 2
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Row>

                        <div className="datosHerramientas">
                            <Container fluid>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Elaboro
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Elaboro"
                                                name="elaboro2"
                                                defaultValue={formData.elaboro2}
                                            />
                                        </Col>

                                        <Col sm="2">
                                            <Form.Label>
                                                Operador
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Operador"
                                                name="operador2"
                                                defaultValue={formData.operador2}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row}>
                                        <Col sm="2">
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision11 == 0 ? "success" : revision11 == 1 ? "warning" : revision11 == 2 ? "secondary" : "danger"}
                                                title={revision11 == 0 ? "Iniciar" : revision11 == 1 ? "Guardar" : revision11 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision11(revision11 + 1);
                                                    {
                                                        (revision11 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion11}
                                                                    revision={revision11 + 1}
                                                                    setRevision={setRevision11}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision11 == 0 ? "Iniciar" : revision11 == 1 ? "Guardar" : revision11 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision21 == 0 ? "success" : revision21 == 1 ? "warning" : revision21 == 2 ? "secondary" : "danger"}
                                                title={revision21 == 0 ? "Iniciar" : revision21 == 1 ? "Guardar" : revision21 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision21(revision21 + 1);
                                                    {
                                                        (revision21 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion21}
                                                                    revision={revision21 + 1}
                                                                    setRevision={setRevision21}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision21 == 0 ? "Iniciar" : revision21 == 1 ? "Guardar" : revision21 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision31 == 0 ? "success" : revision31 == 1 ? "warning" : revision31 == 2 ? "secondary" : "danger"}
                                                title={revision31 == 0 ? "Iniciar" : revision31 == 1 ? "Guardar" : revision31 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision31(revision31 + 1);
                                                    {
                                                        (revision31 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion31}
                                                                    revision={revision31 + 1}
                                                                    setRevision={setRevision31}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision31 == 0 ? "Iniciar" : revision31 == 1 ? "Guardar" : revision31 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision41 == 0 ? "success" : revision41 == 1 ? "warning" : revision41 == 2 ? "secondary" : "danger"}
                                                title={revision41 == 0 ? "Iniciar" : revision41 == 1 ? "Guardar" : revision41 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision41(revision41 + 1);
                                                    {
                                                        (revision41 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion41}
                                                                    revision={revision41 + 1}
                                                                    setRevision={setRevision41}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision41 == 0 ? "Iniciar" : revision41 == 1 ? "Guardar" : revision41 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision51 == 0 ? "success" : revision51 == 1 ? "warning" : revision51 == 2 ? "secondary" : "danger"}
                                                title={revision51 == 0 ? "Iniciar" : revision51 == 1 ? "Guardar" : revision51 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision51(revision51 + 1);
                                                    {
                                                        (revision51 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion51}
                                                                    revision={revision51 + 1}
                                                                    setRevision={setRevision51}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision51 == 0 ? "Iniciar" : revision51 == 1 ? "Guardar" : revision51 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision61 == 0 ? "success" : revision61 == 1 ? "warning" : revision61 == 2 ? "secondary" : "danger"}
                                                className="boton"
                                                title={revision61 == 0 ? "Iniciar" : revision61 == 1 ? "Guardar" : revision61 == 2 ? "Finalizado" : "Cancelado"}
                                                onClick={() => {
                                                    setRevision61(revision61 + 1);
                                                    {
                                                        (revision61 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion61}
                                                                    revision={revision61 + 1}
                                                                    setRevision={setRevision61}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision61 == 0 ? "Iniciar" : revision61 == 1 ? "Guardar" : revision61 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision71 == 0 ? "success" : revision71 == 1 ? "warning" : revision71 == 2 ? "secondary" : "danger"}
                                                title={revision71 == 0 ? "Iniciar" : revision71 == 1 ? "Guardar" : revision71 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision71(revision71 + 1);
                                                    {
                                                        (revision71 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion71}
                                                                    revision={revision71 + 1}
                                                                    setRevision={setRevision71}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision71 == 0 ? "Iniciar" : revision71 == 1 ? "Guardar" : revision71 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision81 == 0 ? "success" : revision81 == 1 ? "warning" : revision81 == 2 ? "secondary" : "danger"}
                                                title={revision81 == 0 ? "Iniciar" : revision81 == 1 ? "Guardar" : revision81 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision81(revision81 + 1);
                                                    {
                                                        (revision81 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion81}
                                                                    revision={revision81 + 1}
                                                                    setRevision={setRevision81}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision81 == 0 ? "Iniciar" : revision81 == 1 ? "Guardar" : revision81 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision91 == 0 ? "success" : revision91 == 1 ? "warning" : revision91 == 2 ? "secondary" : "danger"}
                                                tile={revision91 == 0 ? "Iniciar" : revision91 == 1 ? "Guardar" : revision91 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision91(revision91 + 1);
                                                    {
                                                        (revision91 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion91}
                                                                    revision={revision91 + 1}
                                                                    setRevision={setRevision91}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision91 == 0 ? "Iniciar" : revision91 == 1 ? "Guardar" : revision91 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge
                                                bg={revision101 == 0 ? "success" : revision101 == 1 ? "warning" : revision101 == 2 ? "secondary" : "danger"}
                                                title={revision101 == 0 ? "Iniciar" : revision101 == 1 ? "Guardar" : revision101 == 2 ? "Finalizado" : "Cancelado"}
                                                className="boton"
                                                onClick={() => {
                                                    setRevision101(revision101 + 1);
                                                    {
                                                        (revision101 == 2 &&
                                                            cancelacionInspeccion(
                                                                <CancelacionInspeccion
                                                                    setShowModal={setShowModal}
                                                                    setMotivoCancelacion={setMotivoCancelacion101}
                                                                    revision={revision101 + 1}
                                                                    setRevision={setRevision101}
                                                                />
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                {revision101 == 0 ? "Iniciar" : revision101 == 1 ? "Guardar" : revision101 == 2 ? "Finalizado" : "Cancelado"}
                                            </Badge>
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                REVISIÓN
                                            </Form.Label>
                                        </Col>
                                        <Col >
                                            <Form.Control
                                                type="text"
                                                name="revision11"
                                                value={1}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision21"
                                                value={2}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision31"
                                                value={3}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision41"
                                                value={4}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision51"
                                                value={5}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision61"
                                                value={6}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision71"
                                                defaultValue={7}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision81"
                                                defaultValue={8}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision91"
                                                defaultValue={9}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="revision101"
                                                defaultValue={10}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                HORA
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora11"
                                                defaultValue={hora11}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora21"
                                                defaultValue={hora21}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora31"
                                                defaultValue={hora31}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora41"
                                                defaultValue={hora41}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora51"
                                                defaultValue={hora51}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora61"
                                                defaultValue={hora61}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora71"
                                                defaultValue={hora71}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora81"
                                                defaultValue={hora81}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora91"
                                                defaultValue={hora91}
                                                disabled
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="hora101"
                                                defaultValue={hora101}
                                                disabled
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                1-Tono
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono11"
                                                defaultValue={formData.tono11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono21"
                                                defaultValue={formData.tono21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono31"
                                                defaultValue={formData.tono31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono41"
                                                defaultValue={formData.tono41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono51"
                                                defaultValue={formData.tono51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono61"
                                                defaultValue={formData.tono61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono71"
                                                defaultValue={formData.tono71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono81"
                                                defaultValue={formData.tono81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono91"
                                                defaultValue={formData.tono91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="tono101"
                                                defaultValue={formData.tono101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.tono101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.tono101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                2-Contaminación
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion11"
                                                defaultValue={formData.contaminacion11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion21"
                                                defaultValue={formData.contaminacion21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion31"
                                                defaultValue={formData.contaminacion31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion41"
                                                defaultValue={formData.contaminacion41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion51"
                                                defaultValue={formData.contaminacion51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion61"
                                                defaultValue={formData.contaminacion61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion71"
                                                defaultValue={formData.contaminacion71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion81"
                                                defaultValue={formData.contaminacion81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion91"
                                                defaultValue={formData.contaminacion91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="contaminacion101"
                                                defaultValue={formData.contaminacion101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.contaminacion101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.contaminacion101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                3-Rebanada
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada11"
                                                defaultValue={formData.rebanada11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada21"
                                                defaultValue={formData.rebanada21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada31"
                                                defaultValue={formData.rebanada31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada41"
                                                defaultValue={formData.rebanada41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada51"
                                                defaultValue={formData.rebanada51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada61"
                                                defaultValue={formData.rebanada61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada71"
                                                defaultValue={formData.rebanada71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada81"
                                                defaultValue={formData.rebanada81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada91"
                                                defaultValue={formData.rebanada91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rebanada101"
                                                defaultValue={formData.rebanada101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rebanada101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rebanada101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                4-Rafágas
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga11"
                                                defaultValue={formData.rafaga11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga21"
                                                defaultValue={formData.rafaga21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga31"
                                                defaultValue={formData.rafaga31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga41"
                                                defaultValue={formData.rafaga41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga51"
                                                defaultValue={formData.rafaga51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga61"
                                                defaultValue={formData.rafaga61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga71"
                                                defaultValue={formData.rafaga71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga81"
                                                defaultValue={formData.rafaga81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga91"
                                                defaultValue={formData.rafaga91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rafaga101"
                                                defaultValue={formData.rafaga101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rafaga101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rafaga101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                5-Rechupe
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe11"
                                                defaultValue={formData.rechupe11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe21"
                                                defaultValue={formData.rechupe21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe31"
                                                defaultValue={formData.rechupe31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe41"
                                                defaultValue={formData.rechupe41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe51"
                                                defaultValue={formData.rechupe51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe61"
                                                defaultValue={formData.rechupe61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe71"
                                                defaultValue={formData.rechupe71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe81"
                                                defaultValue={formData.rechupe81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe91"
                                                defaultValue={formData.rechupe91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="rechupe101"
                                                defaultValue={formData.rechupe101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.rechupe101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.rechupe101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                6-Pieza completa
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta11"
                                                defaultValue={formData.piezaCompleta11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta21"
                                                defaultValue={formData.piezaCompleta21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta31"
                                                defaultValue={formData.piezaCompleta31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta41"
                                                defaultValue={formData.piezaCompleta41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta51"
                                                defaultValue={formData.piezaCompleta51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta61"
                                                defaultValue={formData.piezaCompleta61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta71"
                                                defaultValue={formData.piezaCompleta71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta81"
                                                defaultValue={formData.piezaCompleta81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta91"
                                                defaultValue={formData.piezaCompleta91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="piezaCompleta101"
                                                defaultValue={formData.piezaCompleta101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.piezaCompleta101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.piezaCompleta101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                7-Grietas de tensión
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas11"
                                                defaultValue={formData.grietas11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas21"
                                                defaultValue={formData.grietas21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas31"
                                                defaultValue={formData.grietas31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas41"
                                                defaultValue={formData.grietas41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas51"
                                                defaultValue={formData.grietas51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas61"
                                                defaultValue={formData.grietas61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas71"
                                                defaultValue={formData.grietas71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas81"
                                                defaultValue={formData.grietas81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas91"
                                                defaultValue={formData.grietas91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="grietas101"
                                                defaultValue={formData.grietas101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.grietas101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.grietas101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                8-Punto de inyección
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion11"
                                                defaultValue={formData.inyeccion11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion21"
                                                defaultValue={formData.inyeccion21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion31"
                                                defaultValue={formData.inyeccion31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion41"
                                                defaultValue={formData.inyeccion41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion51"
                                                defaultValue={formData.inyeccion51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion61"
                                                defaultValue={formData.inyeccion61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion71"
                                                defaultValue={formData.inyeccion71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion81"
                                                defaultValue={formData.inyeccion81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion91"
                                                defaultValue={formData.inyeccion91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="inyeccion101"
                                                defaultValue={formData.inyeccion101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.inyeccion101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.inyeccion101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                9-Consistencia
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia11"
                                                defaultValue={formData.consistencia11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia21"
                                                defaultValue={formData.consistencia21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia31"
                                                defaultValue={formData.consistencia31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia41"
                                                defaultValue={formData.consistencia41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia51"
                                                defaultValue={formData.consistencia51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia61"
                                                defaultValue={formData.consistencia61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia71"
                                                defaultValue={formData.consistencia71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia81"
                                                defaultValue={formData.consistencia81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia91"
                                                defaultValue={formData.consistencia91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="consistencia101"
                                                defaultValue={formData.consistencia101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.consistencia101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.consistencia101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                10-Funcionalidad
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad11"
                                                defaultValue={formData.funcionalidad11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad21"
                                                defaultValue={formData.funcionalidad21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad31"
                                                defaultValue={formData.funcionalidad31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad41"
                                                defaultValue={formData.funcionalidad41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad51"
                                                defaultValue={formData.funcionalidad51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad61"
                                                defaultValue={formData.funcionalidad61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad71"
                                                defaultValue={formData.funcionalidad71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad81"
                                                defaultValue={formData.funcionalidad81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad91"
                                                defaultValue={formData.funcionalidad91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="funcionalidad101"
                                                defaultValue={formData.funcionalidad101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.funcionalidad101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.funcionalidad101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                11-Empaque
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque11"
                                                defaultValue={formData.empaque11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque21"
                                                defaultValue={formData.empaque21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque31"
                                                defaultValue={formData.empaque31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque41"
                                                defaultValue={formData.empaque41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque51"
                                                defaultValue={formData.empaque51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque61"
                                                defaultValue={formData.empaque61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque71"
                                                defaultValue={formData.empaque71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque81"
                                                defaultValue={formData.empaque81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque91"
                                                defaultValue={formData.empaque91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="empaque101"
                                                defaultValue={formData.empaque101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.empaque101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.empaque101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                12-Otros
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros11"
                                                defaultValue={formData.otros11}
                                                disabled={revision11 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros11 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros11 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros21"
                                                defaultValue={formData.otros21}
                                                disabled={revision21 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros21 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros21 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros31"
                                                defaultValue={formData.otros31}
                                                disabled={revision31 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros31 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros31 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros41"
                                                defaultValue={formData.otros41}
                                                disabled={revision41 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros41 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros41 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros51"
                                                defaultValue={formData.otros51}
                                                disabled={revision51 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros51 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros51 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros61"
                                                defaultValue={formData.otros61}
                                                disabled={revision61 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros61 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros61 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros71"
                                                defaultValue={formData.otros71}
                                                disabled={revision71 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros71 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros71 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros81"
                                                defaultValue={formData.otros81}
                                                disabled={revision81 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros81 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros81 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros91"
                                                defaultValue={formData.otros91}
                                                disabled={revision91 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros91 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros91 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="otros101"
                                                defaultValue={formData.otros101}
                                                disabled={revision101 != 1}
                                            >
                                                <option></option>
                                                <option value="ok" selected={formData.otros101 == "ok"}>OK</option>
                                                <option value="noOK" selected={formData.otros101 == "noOK"}>NO OK</option></Form.Control>
                                        </Col>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Total de piezas revisadas
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas11"
                                                defaultValue={formData.piezasRevisadas11}
                                                disabled={revision11 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas21"
                                                defaultValue={formData.piezasRevisadas21}
                                                disabled={revision21 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas31"
                                                defaultValue={formData.piezasRevisadas31}
                                                disabled={revision31 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas41"
                                                defaultValue={formData.piezasRevisadas41}
                                                disabled={revision41 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas51"
                                                defaultValue={formData.piezasRevisadas51}
                                                disabled={revision51 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas61"
                                                defaultValue={formData.piezasRevisadas61}
                                                disabled={revision61 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas71"
                                                defaultValue={formData.piezasRevisadas71}
                                                disabled={revision71 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas81"
                                                defaultValue={formData.piezasRevisadas81}
                                                disabled={revision81 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas91"
                                                defaultValue={formData.piezasRevisadas91}
                                                disabled={revision91 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="piezasRevisadas101"
                                                defaultValue={formData.piezasRevisadas101}
                                                disabled={revision101 != 1}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                        <Col sm="2">
                                            <Form.Label>
                                                Cantidad de piezas por defecto
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas11"
                                                defaultValue={formData.cantidadPiezas11}
                                                disabled={revision11 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas21"
                                                defaultValue={formData.cantidadPiezas21}
                                                disabled={revision21 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas31"
                                                defaultValue={formData.cantidadPiezas31}
                                                disabled={revision31 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas41"
                                                defaultValue={formData.cantidadPiezas41}
                                                disabled={revision41 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas51"
                                                defaultValue={formData.cantidadPiezas51}
                                                disabled={revision51 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas61"
                                                defaultValue={formData.cantidadPiezas61}
                                                disabled={revision61 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas71"
                                                defaultValue={formData.cantidadPiezas71}
                                                disabled={revision71 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas81"
                                                defaultValue={formData.cantidadPiezas81}
                                                disabled={revision81 != 1}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas91"
                                                defaultValue={formData.cantidadPiezas91}
                                                disabled={revision91 != 1}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="cantidadPiezas101"
                                                defaultValue={formData.cantidadPiezas101}
                                                disabled={revision101 != 1}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </div>

                        <div className="encabezado">
                            <Container fluid>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Row} controlId="formGridCantidad" className="cantidad">
                                        <Col sm="1">
                                            <Form.Label>
                                                Observaciones
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Observaciones"
                                                name="observaciones"
                                                defaultValue={formData.observaciones}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </div>

                        <Form.Group as={Row} className="botones">
                            <Col>
                                <Button
                                    type="submit"
                                    title="Actualizar el registro"
                                    variant="success"
                                    className="registrar"
                                >
                                    {!loading ? "Modificar" : <Spinner animation="border" />}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    title="Cerrar el formulario"
                                    className="cancelar"
                                    onClick={() => {
                                        rutaRegreso()
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Col>
                        </Form.Group>

                        <br />

                    </Form>
                </div>
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function initialFormData() {
    return {
        fechaElaboracion: "",
        producto: "",
        ordenProduccion: "",
        numeroParte: "",
        fechaArranque: "",
        material: "",
        numeroMaquina: "",
        cantidadLote: "",
        nombreCliente: "",
        elaboro: "",
        operador: "",
        revision1: "",
        revision2: "",
        revision3: "",
        revision4: "",
        revision5: "",
        revision6: "",
        revision7: "",
        revision8: "",
        revision9: "",
        revision10: "",
        hora1: "",
        hora2: "",
        hora3: "",
        hora4: "",
        hora5: "",
        hora6: "",
        hora7: "",
        hora8: "",
        hora9: "",
        hora10: "",
        tono1: "",
        tono2: "",
        tono3: "",
        tono4: "",
        tono5: "",
        tono6: "",
        tono7: "",
        tono8: "",
        tono9: "",
        tono10: "",
        contaminacion1: "",
        contaminacion2: "",
        contaminacion3: "",
        contaminacion4: "",
        contaminacion5: "",
        contaminacion6: "",
        contaminacion7: "",
        contaminacion8: "",
        contaminacion9: "",
        contaminacion10: "",
        rebanada1: "",
        rebanada2: "",
        rebanada3: "",
        rebanada4: "",
        rebanada5: "",
        rebanada6: "",
        rebanada7: "",
        rebanada8: "",
        rebanada9: "",
        rebanada10: "",
        rafaga1: "",
        rafaga2: "",
        rafaga3: "",
        rafaga4: "",
        rafaga5: "",
        rafaga6: "",
        rafaga7: "",
        rafaga8: "",
        rafaga9: "",
        rafaga10: "",
        rechupe1: "",
        rechupe2: "",
        rechupe3: "",
        rechupe4: "",
        rechupe5: "",
        rechupe6: "",
        rechupe7: "",
        rechupe8: "",
        rechupe9: "",
        rechupe10: "",
        piezaCompleta1: "",
        piezaCompleta2: "",
        piezaCompleta3: "",
        piezaCompleta4: "",
        piezaCompleta5: "",
        piezaCompleta6: "",
        piezaCompleta7: "",
        piezaCompleta8: "",
        piezaCompleta9: "",
        piezaCompleta10: "",
        grietas1: "",
        grietas2: "",
        grietas3: "",
        grietas4: "",
        grietas5: "",
        grietas6: "",
        grietas7: "",
        grietas8: "",
        grietas9: "",
        grietas10: "",
        inyeccion1: "",
        inyeccion2: "",
        inyeccion3: "",
        inyeccion4: "",
        inyeccion5: "",
        inyeccion6: "",
        inyeccion7: "",
        inyeccion8: "",
        inyeccion9: "",
        inyeccion10: "",
        consistencia1: "",
        consistencia2: "",
        consistencia3: "",
        consistencia4: "",
        consistencia5: "",
        consistencia6: "",
        consistencia7: "",
        consistencia8: "",
        consistencia9: "",
        consistencia10: "",
        funcionalidad1: "",
        funcionalidad2: "",
        funcionalidad3: "",
        funcionalidad4: "",
        funcionalidad5: "",
        funcionalidad6: "",
        funcionalidad7: "",
        funcionalidad8: "",
        funcionalidad9: "",
        funcionalidad10: "",
        empaque1: "",
        empaque2: "",
        empaque3: "",
        empaque4: "",
        empaque5: "",
        empaque6: "",
        empaque7: "",
        empaque8: "",
        empaque9: "",
        empaque10: "",
        otros1: "",
        otros2: "",
        otros3: "",
        otros4: "",
        otros5: "",
        otros6: "",
        otros7: "",
        otros8: "",
        otros9: "",
        otros10: "",
        piezasRevisadas1: "",
        piezasRevisadas2: "",
        piezasRevisadas3: "",
        piezasRevisadas4: "",
        piezasRevisadas5: "",
        piezasRevisadas6: "",
        piezasRevisadas7: "",
        piezasRevisadas8: "",
        piezasRevisadas9: "",
        piezasRevisadas10: "",
        cantidadPiezas1: "",
        cantidadPiezas2: "",
        cantidadPiezas3: "",
        cantidadPiezas4: "",
        cantidadPiezas5: "",
        cantidadPiezas6: "",
        cantidadPiezas7: "",
        cantidadPiezas8: "",
        cantidadPiezas9: "",
        cantidadPiezas10: "",

        elaboro2: "",
        operador2: "",
        revision11: "",
        revision21: "",
        revision31: "",
        revision41: "",
        revision51: "",
        revision61: "",
        revision71: "",
        revision81: "",
        revision91: "",
        revision101: "",
        hora11: "",
        hora21: "",
        hora31: "",
        hora41: "",
        hora51: "",
        hora61: "",
        hora71: "",
        hora81: "",
        hora91: "",
        hora101: "",
        tono11: "",
        tono21: "",
        tono31: "",
        tono41: "",
        tono51: "",
        tono61: "",
        tono71: "",
        tono81: "",
        tono91: "",
        tono101: "",
        contaminacion11: "",
        contaminacion21: "",
        contaminacion31: "",
        contaminacion41: "",
        contaminacion51: "",
        contaminacion61: "",
        contaminacion71: "",
        contaminacion81: "",
        contaminacion91: "",
        contaminacion101: "",
        rebanada11: "",
        rebanada21: "",
        rebanada31: "",
        rebanada41: "",
        rebanada51: "",
        rebanada61: "",
        rebanada71: "",
        rebanada81: "",
        rebanada91: "",
        rebanada101: "",
        rafaga11: "",
        rafaga21: "",
        rafaga31: "",
        rafaga41: "",
        rafaga51: "",
        rafaga61: "",
        rafaga71: "",
        rafaga81: "",
        rafaga91: "",
        rafaga101: "",
        rechupe11: "",
        rechupe21: "",
        rechupe31: "",
        rechupe41: "",
        rechupe51: "",
        rechupe61: "",
        rechupe71: "",
        rechupe81: "",
        rechupe91: "",
        rechupe101: "",
        piezaCompleta11: "",
        piezaCompleta21: "",
        piezaCompleta31: "",
        piezaCompleta41: "",
        piezaCompleta51: "",
        piezaCompleta61: "",
        piezaCompleta71: "",
        piezaCompleta81: "",
        piezaCompleta91: "",
        piezaCompleta101: "",
        grietas11: "",
        grietas21: "",
        grietas31: "",
        grietas41: "",
        grietas51: "",
        grietas61: "",
        grietas71: "",
        grietas81: "",
        grietas91: "",
        grietas101: "",
        inyeccion11: "",
        inyeccion21: "",
        inyeccion31: "",
        inyeccion41: "",
        inyeccion51: "",
        inyeccion61: "",
        inyeccion71: "",
        inyeccion81: "",
        inyeccion91: "",
        inyeccion101: "",
        consistencia11: "",
        consistencia21: "",
        consistencia31: "",
        consistencia41: "",
        consistencia51: "",
        consistencia61: "",
        consistencia71: "",
        consistencia81: "",
        consistencia91: "",
        consistencia101: "",
        funcionalidad11: "",
        funcionalidad21: "",
        funcionalidad31: "",
        funcionalidad41: "",
        funcionalidad51: "",
        funcionalidad61: "",
        funcionalidad71: "",
        funcionalidad81: "",
        funcionalidad91: "",
        funcionalidad101: "",
        empaque11: "",
        empaque21: "",
        empaque31: "",
        empaque41: "",
        empaque51: "",
        empaque61: "",
        empaque71: "",
        empaque81: "",
        empaque91: "",
        empaque101: "",
        otros11: "",
        otros21: "",
        otros31: "",
        otros41: "",
        otros51: "",
        otros61: "",
        otros71: "",
        otros81: "",
        otros91: "",
        otros101: "",
        piezasRevisadas11: "",
        piezasRevisadas21: "",
        piezasRevisadas31: "",
        piezasRevisadas41: "",
        piezasRevisadas51: "",
        piezasRevisadas61: "",
        piezasRevisadas71: "",
        piezasRevisadas81: "",
        piezasRevisadas91: "",
        piezasRevisadas101: "",
        cantidadPiezas11: "",
        cantidadPiezas21: "",
        cantidadPiezas31: "",
        cantidadPiezas41: "",
        cantidadPiezas51: "",
        cantidadPiezas61: "",
        cantidadPiezas71: "",
        cantidadPiezas81: "",
        cantidadPiezas91: "",
        cantidadPiezas101: "",

        observaciones: "",
    }
}

function valoresAlmacenados(data) {
    return {
        fechaElaboracion: data.fechaElaboracion,
        producto: data.descripcionPieza,
        ordenProduccion: data.noOP,
        numeroParte: data.noParte,
        fechaArranque: data.fechaArranqueMaquina,
        material: data.material,
        numeroMaquina: data.noMaquina,
        cantidadLote: data.cantidadLote,
        nombreCliente: data.cliente,
        elaboro1: data.turno1.elaboro,
        operador1: data.turno1.operador,
        tono1: data.turno1.revisiones[0][1].tono1,
        contaminacion1: data.turno1.revisiones[0][1].contaminacion1,
        rebanada1: data.turno1.revisiones[0][1].rebanada1,
        rafaga1: data.turno1.revisiones[0][1].rafaga1,
        rechupe1: data.turno1.revisiones[0][1].rechupe1,
        piezaCompleta1: data.turno1.revisiones[0][1].piezaCompleta1,
        grietas1: data.turno1.revisiones[0][1].grietas1,
        inyeccion1: data.turno1.revisiones[0][1].inyeccion1,
        consistencia1: data.turno1.revisiones[0][1].consistencia1,
        funcionalidad1: data.turno1.revisiones[0][1].funcionalidad1,
        empaque1: data.turno1.revisiones[0][1].empaque1,
        otros1: data.turno1.revisiones[0][1].otros1,
        piezasRevisadas1: data.turno1.revisiones[0][1].piezasRevisadas1,
        cantidadPiezas1: data.turno1.revisiones[0][1].cantidadPiezas1,
        tono2: data.turno1.revisiones[0][2].tono2,
        contaminacion2: data.turno1.revisiones[0][2].contaminacion2,
        rebanada2: data.turno1.revisiones[0][2].rebanada2,
        rafaga2: data.turno1.revisiones[0][2].rafaga2,
        rechupe2: data.turno1.revisiones[0][2].rechupe2,
        piezaCompleta2: data.turno1.revisiones[0][2].piezaCompleta2,
        grietas2: data.turno1.revisiones[0][2].grietas2,
        inyeccion2: data.turno1.revisiones[0][2].inyeccion2,
        consistencia2: data.turno1.revisiones[0][2].consistencia2,
        funcionalidad2: data.turno1.revisiones[0][2].funcionalidad2,
        empaque2: data.turno1.revisiones[0][2].empaque2,
        otros2: data.turno1.revisiones[0][2].otros2,
        piezasRevisadas2: data.turno1.revisiones[0][2].piezasRevisadas2,
        cantidadPiezas2: data.turno1.revisiones[0][2].cantidadPiezas2,
        tono3: data.turno1.revisiones[0][3].tono3,
        contaminacion3: data.turno1.revisiones[0][3].contaminacion3,
        rebanada3: data.turno1.revisiones[0][3].rebanada3,
        rafaga3: data.turno1.revisiones[0][3].rafaga3,
        rechupe3: data.turno1.revisiones[0][3].rechupe3,
        piezaCompleta3: data.turno1.revisiones[0][3].piezaCompleta3,
        grietas3: data.turno1.revisiones[0][3].grietas3,
        inyeccion3: data.turno1.revisiones[0][3].inyeccion3,
        consistencia3: data.turno1.revisiones[0][3].consistencia3,
        funcionalidad3: data.turno1.revisiones[0][3].funcionalidad3,
        empaque3: data.turno1.revisiones[0][3].empaque3,
        otros3: data.turno1.revisiones[0][3].otros3,
        piezasRevisadas3: data.turno1.revisiones[0][3].piezasRevisadas3,
        cantidadPiezas3: data.turno1.revisiones[0][3].cantidadPiezas3,
        tono4: data.turno1.revisiones[0][4].tono4,
        contaminacion4: data.turno1.revisiones[0][4].contaminacion4,
        rebanada4: data.turno1.revisiones[0][4].rebanada4,
        rafaga4: data.turno1.revisiones[0][4].rafaga4,
        rechupe4: data.turno1.revisiones[0][4].rechupe4,
        piezaCompleta4: data.turno1.revisiones[0][4].piezaCompleta4,
        grietas4: data.turno1.revisiones[0][4].grietas4,
        inyeccion4: data.turno1.revisiones[0][4].inyeccion4,
        consistencia4: data.turno1.revisiones[0][4].consistencia4,
        funcionalidad4: data.turno1.revisiones[0][4].funcionalidad4,
        empaque4: data.turno1.revisiones[0][4].empaque4,
        otros4: data.turno1.revisiones[0][4].otros4,
        piezasRevisadas4: data.turno1.revisiones[0][4].piezasRevisadas4,
        cantidadPiezas4: data.turno1.revisiones[0][4].cantidadPiezas4,
        tono5: data.turno1.revisiones[0][5].tono5,
        contaminacion5: data.turno1.revisiones[0][5].contaminacion5,
        rebanada5: data.turno1.revisiones[0][5].rebanada5,
        rafaga5: data.turno1.revisiones[0][5].rafaga5,
        rechupe5: data.turno1.revisiones[0][5].rechupe5,
        piezaCompleta5: data.turno1.revisiones[0][5].piezaCompleta5,
        grietas5: data.turno1.revisiones[0][5].grietas5,
        inyeccion5: data.turno1.revisiones[0][5].inyeccion5,
        consistencia5: data.turno1.revisiones[0][5].consistencia5,
        funcionalidad5: data.turno1.revisiones[0][5].funcionalidad5,
        empaque5: data.turno1.revisiones[0][5].empaque5,
        otros5: data.turno1.revisiones[0][5].otros5,
        piezasRevisadas5: data.turno1.revisiones[0][5].piezasRevisadas5,
        cantidadPiezas5: data.turno1.revisiones[0][5].cantidadPiezas5,
        tono6: data.turno1.revisiones[0][6].tono6,
        contaminacion6: data.turno1.revisiones[0][6].contaminacion6,
        rebanada6: data.turno1.revisiones[0][6].rebanada6,
        rafaga6: data.turno1.revisiones[0][6].rafaga6,
        rechupe6: data.turno1.revisiones[0][6].rechupe6,
        piezaCompleta6: data.turno1.revisiones[0][6].piezaCompleta6,
        grietas6: data.turno1.revisiones[0][6].grietas6,
        inyeccion6: data.turno1.revisiones[0][6].inyeccion6,
        consistencia6: data.turno1.revisiones[0][6].consistencia6,
        funcionalidad6: data.turno1.revisiones[0][6].funcionalidad6,
        empaque6: data.turno1.revisiones[0][6].empaque6,
        otros6: data.turno1.revisiones[0][6].otros6,
        piezasRevisadas6: data.turno1.revisiones[0][6].piezasRevisadas6,
        cantidadPiezas6: data.turno1.revisiones[0][6].cantidadPiezas6,
        tono7: data.turno1.revisiones[0][7].tono7,
        contaminacion7: data.turno1.revisiones[0][7].contaminacion7,
        rebanada7: data.turno1.revisiones[0][7].rebanada7,
        rafaga7: data.turno1.revisiones[0][7].rafaga7,
        rechupe7: data.turno1.revisiones[0][7].rechupe7,
        piezaCompleta7: data.turno1.revisiones[0][7].piezaCompleta7,
        grietas7: data.turno1.revisiones[0][7].grietas7,
        inyeccion7: data.turno1.revisiones[0][7].inyeccion7,
        consistencia7: data.turno1.revisiones[0][7].consistencia7,
        funcionalidad7: data.turno1.revisiones[0][7].funcionalidad7,
        empaque7: data.turno1.revisiones[0][7].empaque7,
        otros7: data.turno1.revisiones[0][7].otros7,
        piezasRevisadas7: data.turno1.revisiones[0][7].piezasRevisadas7,
        cantidadPiezas7: data.turno1.revisiones[0][7].cantidadPiezas7,
        tono8: data.turno1.revisiones[0][8].tono8,
        contaminacion8: data.turno1.revisiones[0][8].contaminacion8,
        rebanada8: data.turno1.revisiones[0][8].rebanada8,
        rafaga8: data.turno1.revisiones[0][8].rafaga8,
        rechupe8: data.turno1.revisiones[0][8].rechupe8,
        piezaCompleta8: data.turno1.revisiones[0][8].piezaCompleta8,
        grietas8: data.turno1.revisiones[0][8].grietas8,
        inyeccion8: data.turno1.revisiones[0][8].inyeccion8,
        consistencia8: data.turno1.revisiones[0][8].consistencia8,
        funcionalidad8: data.turno1.revisiones[0][8].funcionalidad8,
        empaque8: data.turno1.revisiones[0][8].empaque8,
        otros8: data.turno1.revisiones[0][8].otros8,
        piezasRevisadas8: data.turno1.revisiones[0][8].piezasRevisadas8,
        cantidadPiezas8: data.turno1.revisiones[0][8].cantidadPiezas8,
        tono9: data.turno1.revisiones[0][9].tono9,
        contaminacion9: data.turno1.revisiones[0][9].contaminacion9,
        rebanada9: data.turno1.revisiones[0][9].rebanada9,
        rafaga9: data.turno1.revisiones[0][9].rafaga9,
        rechupe9: data.turno1.revisiones[0][9].rechupe9,
        piezaCompleta9: data.turno1.revisiones[0][9].piezaCompleta9,
        grietas9: data.turno1.revisiones[0][9].grietas9,
        inyeccion9: data.turno1.revisiones[0][9].inyeccion9,
        consistencia9: data.turno1.revisiones[0][9].consistencia9,
        funcionalidad9: data.turno1.revisiones[0][9].funcionalidad9,
        empaque9: data.turno1.revisiones[0][9].empaque9,
        otros9: data.turno1.revisiones[0][9].otros9,
        piezasRevisadas9: data.turno1.revisiones[0][9].piezasRevisadas9,
        cantidadPiezas9: data.turno1.revisiones[0][9].cantidadPiezas9,
        tono10: data.turno1.revisiones[0][10].tono10,
        contaminacion10: data.turno1.revisiones[0][10].contaminacion10,
        rebanada10: data.turno1.revisiones[0][10].rebanada10,
        rafaga10: data.turno1.revisiones[0][10].rafaga10,
        rechupe10: data.turno1.revisiones[0][10].rechupe10,
        piezaCompleta10: data.turno1.revisiones[0][10].piezaCompleta10,
        grietas10: data.turno1.revisiones[0][10].grietas10,
        inyeccion10: data.turno1.revisiones[0][10].inyeccion10,
        consistencia10: data.turno1.revisiones[0][10].consistencia10,
        funcionalidad10: data.turno1.revisiones[0][10].funcionalidad10,
        empaque10: data.turno1.revisiones[0][10].empaque10,
        otros10: data.turno1.revisiones[0][10].otros10,
        piezasRevisadas10: data.turno1.revisiones[0][10].piezasRevisadas10,
        cantidadPiezas10: data.turno1.revisiones[0][10].cantidadPiezas10,

        elaboro2: data.turno2.elaboro,
        operador2: data.turno2.operador,
        tono11: data.turno2.revisiones[0][1].tono1,
        contaminacion11: data.turno2.revisiones[0][1].contaminacion1,
        rebanada11: data.turno2.revisiones[0][1].rebanada1,
        rafaga11: data.turno2.revisiones[0][1].rafaga1,
        rechupe11: data.turno2.revisiones[0][1].rechupe1,
        piezaCompleta11: data.turno2.revisiones[0][1].piezaCompleta1,
        grietas11: data.turno2.revisiones[0][1].grietas1,
        inyeccion11: data.turno2.revisiones[0][1].inyeccion1,
        consistencia11: data.turno2.revisiones[0][1].consistencia1,
        funcionalidad11: data.turno2.revisiones[0][1].funcionalidad1,
        empaque11: data.turno2.revisiones[0][1].empaque1,
        otros11: data.turno2.revisiones[0][1].otros1,
        piezasRevisadas11: data.turno2.revisiones[0][1].piezasRevisadas1,
        cantidadPiezas11: data.turno2.revisiones[0][1].cantidadPiezas1,
        tono21: data.turno2.revisiones[0][2].tono2,
        contaminacion21: data.turno2.revisiones[0][2].contaminacion2,
        rebanada21: data.turno2.revisiones[0][2].rebanada2,
        rafaga21: data.turno2.revisiones[0][2].rafaga2,
        rechupe21: data.turno2.revisiones[0][2].rechupe2,
        piezaCompleta21: data.turno2.revisiones[0][2].piezaCompleta2,
        grietas21: data.turno2.revisiones[0][2].grietas2,
        inyeccion21: data.turno2.revisiones[0][2].inyeccion2,
        consistencia21: data.turno2.revisiones[0][2].consistencia2,
        funcionalidad21: data.turno2.revisiones[0][2].funcionalidad2,
        empaque21: data.turno2.revisiones[0][2].empaque2,
        otros21: data.turno2.revisiones[0][2].otros2,
        piezasRevisadas21: data.turno2.revisiones[0][2].piezasRevisadas2,
        cantidadPiezas21: data.turno2.revisiones[0][2].cantidadPiezas2,
        tono31: data.turno2.revisiones[0][3].tono3,
        contaminacion31: data.turno2.revisiones[0][3].contaminacion3,
        rebanada31: data.turno2.revisiones[0][3].rebanada3,
        rafaga31: data.turno2.revisiones[0][3].rafaga3,
        rechupe31: data.turno2.revisiones[0][3].rechupe3,
        piezaCompleta31: data.turno2.revisiones[0][3].piezaCompleta3,
        grietas31: data.turno2.revisiones[0][3].grietas3,
        inyeccion31: data.turno2.revisiones[0][3].inyeccion3,
        consistencia31: data.turno2.revisiones[0][3].consistencia3,
        funcionalidad31: data.turno2.revisiones[0][3].funcionalidad3,
        empaque31: data.turno2.revisiones[0][3].empaque3,
        otros31: data.turno2.revisiones[0][3].otros3,
        piezasRevisadas31: data.turno2.revisiones[0][3].piezasRevisadas3,
        cantidadPiezas31: data.turno2.revisiones[0][3].cantidadPiezas3,
        tono41: data.turno2.revisiones[0][4].tono4,
        contaminacion41: data.turno2.revisiones[0][4].contaminacion4,
        rebanada41: data.turno2.revisiones[0][4].rebanada4,
        rafaga41: data.turno2.revisiones[0][4].rafaga4,
        rechupe41: data.turno2.revisiones[0][4].rechupe4,
        piezaCompleta41: data.turno2.revisiones[0][4].piezaCompleta4,
        grietas41: data.turno2.revisiones[0][4].grietas4,
        inyeccion41: data.turno2.revisiones[0][4].inyeccion4,
        consistencia41: data.turno2.revisiones[0][4].consistencia4,
        funcionalidad41: data.turno2.revisiones[0][4].funcionalidad4,
        empaque41: data.turno2.revisiones[0][4].empaque4,
        otros41: data.turno2.revisiones[0][4].otros4,
        piezasRevisadas41: data.turno2.revisiones[0][4].piezasRevisadas4,
        cantidadPiezas41: data.turno2.revisiones[0][4].cantidadPiezas4,
        tono51: data.turno2.revisiones[0][5].tono5,
        contaminacion51: data.turno2.revisiones[0][5].contaminacion5,
        rebanada51: data.turno2.revisiones[0][5].rebanada5,
        rafaga51: data.turno2.revisiones[0][5].rafaga5,
        rechupe51: data.turno2.revisiones[0][5].rechupe5,
        piezaCompleta51: data.turno2.revisiones[0][5].piezaCompleta5,
        grietas51: data.turno2.revisiones[0][5].grietas5,
        inyeccion51: data.turno2.revisiones[0][5].inyeccion5,
        consistencia51: data.turno2.revisiones[0][5].consistencia5,
        funcionalidad51: data.turno2.revisiones[0][5].funcionalidad5,
        empaque51: data.turno2.revisiones[0][5].empaque5,
        otros51: data.turno2.revisiones[0][5].otros5,
        piezasRevisadas51: data.turno2.revisiones[0][5].piezasRevisadas5,
        cantidadPiezas51: data.turno2.revisiones[0][5].cantidadPiezas5,
        tono61: data.turno2.revisiones[0][6].tono6,
        contaminacion61: data.turno2.revisiones[0][6].contaminacion6,
        rebanada61: data.turno2.revisiones[0][6].rebanada6,
        rafaga61: data.turno2.revisiones[0][6].rafaga6,
        rechupe61: data.turno2.revisiones[0][6].rechupe6,
        piezaCompleta61: data.turno2.revisiones[0][6].piezaCompleta6,
        grietas61: data.turno2.revisiones[0][6].grietas6,
        inyeccion61: data.turno2.revisiones[0][6].inyeccion6,
        consistencia61: data.turno2.revisiones[0][6].consistencia6,
        funcionalidad61: data.turno2.revisiones[0][6].funcionalidad6,
        empaque61: data.turno2.revisiones[0][6].empaque6,
        otros61: data.turno2.revisiones[0][6].otros6,
        piezasRevisadas61: data.turno2.revisiones[0][6].piezasRevisadas6,
        cantidadPiezas61: data.turno2.revisiones[0][6].cantidadPiezas6,
        tono71: data.turno2.revisiones[0][7].tono7,
        contaminacion71: data.turno2.revisiones[0][7].contaminacion7,
        rebanada71: data.turno2.revisiones[0][7].rebanada7,
        rafaga71: data.turno2.revisiones[0][7].rafaga7,
        rechupe71: data.turno2.revisiones[0][7].rechupe7,
        piezaCompleta71: data.turno2.revisiones[0][7].piezaCompleta7,
        grietas71: data.turno2.revisiones[0][7].grietas7,
        inyeccion71: data.turno2.revisiones[0][7].inyeccion7,
        consistencia71: data.turno2.revisiones[0][7].consistencia7,
        funcionalidad71: data.turno2.revisiones[0][7].funcionalidad7,
        empaque71: data.turno2.revisiones[0][7].empaque7,
        otros71: data.turno2.revisiones[0][7].otros7,
        piezasRevisadas71: data.turno2.revisiones[0][7].piezasRevisadas7,
        cantidadPiezas71: data.turno2.revisiones[0][7].cantidadPiezas7,
        tono81: data.turno2.revisiones[0][8].tono8,
        contaminacion81: data.turno2.revisiones[0][8].contaminacion8,
        rebanada81: data.turno2.revisiones[0][8].rebanada8,
        rafaga81: data.turno2.revisiones[0][8].rafaga8,
        rechupe81: data.turno2.revisiones[0][8].rechupe8,
        piezaCompleta81: data.turno2.revisiones[0][8].piezaCompleta8,
        grietas81: data.turno2.revisiones[0][8].grietas8,
        inyeccion81: data.turno2.revisiones[0][8].inyeccion8,
        consistencia81: data.turno2.revisiones[0][8].consistencia8,
        funcionalidad81: data.turno2.revisiones[0][8].funcionalidad8,
        empaque81: data.turno2.revisiones[0][8].empaque8,
        otros81: data.turno2.revisiones[0][8].otros8,
        piezasRevisadas81: data.turno2.revisiones[0][8].piezasRevisadas8,
        cantidadPiezas81: data.turno2.revisiones[0][8].cantidadPiezas8,
        tono91: data.turno2.revisiones[0][9].tono9,
        contaminacion91: data.turno2.revisiones[0][9].contaminacion9,
        rebanada91: data.turno2.revisiones[0][9].rebanada9,
        rafaga91: data.turno2.revisiones[0][9].rafaga9,
        rechupe91: data.turno2.revisiones[0][9].rechupe9,
        piezaCompleta91: data.turno2.revisiones[0][9].piezaCompleta9,
        grietas91: data.turno2.revisiones[0][9].grietas9,
        inyeccion91: data.turno2.revisiones[0][9].inyeccion9,
        consistencia91: data.turno2.revisiones[0][9].consistencia9,
        funcionalidad91: data.turno2.revisiones[0][9].funcionalidad9,
        empaque91: data.turno2.revisiones[0][9].empaque9,
        otros91: data.turno2.revisiones[0][9].otros9,
        piezasRevisadas91: data.turno2.revisiones[0][9].piezasRevisadas9,
        cantidadPiezas91: data.turno2.revisiones[0][9].cantidadPiezas9,
        tono101: data.turno2.revisiones[0][10].tono10,
        contaminacion101: data.turno2.revisiones[0][10].contaminacion10,
        rebanada101: data.turno2.revisiones[0][10].rebanada10,
        rafaga101: data.turno2.revisiones[0][10].rafaga10,
        rechupe101: data.turno2.revisiones[0][10].rechupe10,
        piezaCompleta101: data.turno2.revisiones[0][10].piezaCompleta10,
        grietas101: data.turno2.revisiones[0][10].grietas10,
        inyeccion101: data.turno2.revisiones[0][10].inyeccion10,
        consistencia101: data.turno2.revisiones[0][10].consistencia10,
        funcionalidad101: data.turno2.revisiones[0][10].funcionalidad10,
        empaque101: data.turno2.revisiones[0][10].empaque10,
        otros101: data.turno2.revisiones[0][10].otros10,
        piezasRevisadas101: data.turno2.revisiones[0][10].piezasRevisadas10,
        cantidadPiezas101: data.turno2.revisiones[0][10].cantidadPiezas10,

        observaciones: data.observaciones,
    }
}

export default ModificaInspeccionMaterial;
