import { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Container, Image, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import DropzoneDeshabilitado from '../../DropzoneDeshabilitado';
import { getTokenApi, isExpiredToken, logoutApi, getSucursal } from "../../../api/auth";
import { toast } from "react-toastify";
import { actualizaNoConformidad, obtenerNoConformidad } from "../../../api/noConformidad";
import { LogsInformativos, LogsInformativosLogout } from "../../Logs/LogsSistema/LogsSistema";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import "./VistaPreviaNoConformidad.scss";
import LogoPDF from "../../../assets/png/pdf.png";
import Regreso from "../../../assets/png/back.png";

function VistaPreviaNoConformidad(props) {
    const { setRefreshCheckLogin } = props;

    const descargaPDF = async () => {
    }

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

    const params = useParams();
    const { id } = params

    const cargarDatosNoConformidad = () => {
        //
        obtenerNoConformidad(id).then(response => {
            const { data } = response;
            //console.log(data)
            setFormData(initialFormData(data))
            // setFechaCreacion(fechaElaboracion)
            setDiagrama(data.diagrama);
            setEvidencia1(data.evidencia.imagen1);
            setEvidencia2(data.evidencia.imagen2);
            setEvidencia3(data.evidencia.imagen3);
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        cargarDatosNoConformidad();
    }, []);

    // Para guardar los datos del formulario
    const [formData, setFormData] = useState(initialFormDataInitial());

    // Para almacenar la foto de perfil del usuario
    const [diagrama, setDiagrama] = useState(null);

    const [linkDiagrama, setLinkDiagrama] = useState("");

    const cargarDiagrama = () => {
        try {
            if (diagrama) {
                subeArchivosCloudinary(diagrama, "noConformidad").then(response => {
                    const { data } = response;
                    // console.log(data)
                    const { secure_url } = data;
                    setLinkDiagrama(secure_url)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDiagrama();
    }, [diagrama]);

    // Para almacenar la foto de perfil del usuario
    const [evidencia1, setEvidencia1] = useState(null);

    const [linkEvidencia1, setLinkEvidencia1] = useState("");

    const cargarEvidencia1 = () => {
        try {
            if (evidencia1) {
                subeArchivosCloudinary(evidencia1, "noConformidad").then(response => {
                    const { data } = response;
                    // console.log(data)
                    const { secure_url } = data;
                    setLinkEvidencia1(secure_url)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
       cargarEvidencia1();
    }, [evidencia1]);

    const [evidencia2, setEvidencia2] = useState(null);

    const [linkEvidencia2, setLinkEvidencia2] = useState("");

    const cargarEvidencia2 = () => {
        try {
            if (evidencia2) {
                subeArchivosCloudinary(evidencia2, "noConformidad").then(response => {
                    const { data } = response;
                    // console.log(data)
                    const { secure_url } = data;
                    setLinkEvidencia2(secure_url)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)

        }
    }

    useEffect(() => {
        cargarEvidencia2();
    }, [evidencia2]);

    const [evidencia3, setEvidencia3] = useState(null);

    const [linkEvidencia3, setLinkEvidencia3] = useState("");

    const cargarEvidencia3 = () => {
        try {
            if (evidencia3) {
                subeArchivosCloudinary(evidencia3, "noConformidad").then(response => {
                    const { data } = response;
                    // console.log(data)
                    const { secure_url } = data;
                    setLinkEvidencia3(secure_url)
                }).catch(e => {
                    console.log(e)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarEvidencia3();
    }, [evidencia3]);

    // Para definir el enrutamiento
    const enrutamiento = useNavigate()

    // Define la ruta de registro
    const rutaRegreso = () => {
        enrutamiento("/NoConformidad")
    }

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        console.log(e)

        if (!formData.descripcionNoConformidad || !formData.correccion || !formData.analisisCausaRaiz || !formData.causaRaiz || !formData.accionCorrectiva || !formData.status || !formData.responsables || !formData.statusFinal) {
            toast.warning("Completa el formulario");
        } else {
            //console.log("Continuar")
            setLoading(true);

            const dataTemp = {
                descripcionNoConformidad: formData.descripcionNoConformidad,
                correccion: formData.correccion,
                analisisCausaRaiz: formData.analisisCausaRaiz,
                diagrama: linkDiagrama,
                causaRaiz: formData.causaRaiz,
                accionCorrectiva: formData.accionCorrectiva,
                fecha: formData.fecha,
                status: formData.status,
                responsables: formData.responsables,
                fechaCierre: formData.fechaCierre,
                statusFinal: formData.statusFinal,
                evidencia: {
                    imagen1: linkEvidencia1,
                    imagen2: linkEvidencia2,
                    imagen3: linkEvidencia3,
                },
            }
            // console.log(dataTemp)

            // Modificar el pedido creado recientemente
            actualizaNoConformidad(id, dataTemp).then(response => {
                const { data: { mensaje, datos } } = response;
                // console.log(response)
                toast.success(mensaje)
                // Log acerca del registro inicial del tracking
                LogsInformativos("Se han registrado la no conformidad con folio " + formData.folio, dataTemp)
                // Registro inicial del tracking
                rutaRegreso();
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Detalles de la No Conformidad
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar al menú calidad"
                            onClick={() => {
                                rutaRegreso()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                        </Button>
                    </Col>
                </Row>
            </Alert>

            <Container fluid>
                <br />
                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label align="center">
                                        No Conformidad Descripción
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Descripción"
                                        name="descripcionNoConformidad"
                                        defaultValue={formData.descripcionNoConformidad}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label align="center">
                                        ¿Requiere corrección? Corrección
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Corrección"
                                        name="correccion"
                                        defaultValue={formData.correccion}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="3">
                                    <Form.Label align="center">
                                        Analisis de cauda raíz (Metodo Ishikawa)
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Analisis de cauza raiz"
                                        name="analisisCausaRaiz"
                                        defaultValue={formData.analisisCausaRaiz}
                                        disabled
                                    />
                                </Col>

                                <br />
                                <div className="subeOrdenVenta">
                                    <h4>Adjuntar diagrama</h4>
                                    <div className="ordenVenta">
                                        <DropzoneDeshabilitado
                                            setImagen={setDiagrama} imagenBD={formData.diagrama}
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Cauza raiz
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Causa raiz"
                                        name="causaRaiz"
                                        defaultValue={formData.causaRaiz}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Acción correctiva
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Acción correctiva"
                                        name="accionCorrectiva"
                                        defaultValue={formData.accionCorrectiva}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Fecha
                                    </Form.Label>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="date"
                                        placeholder="Fecha"
                                        name="fecha"
                                        defaultValue={formData.fecha}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Status
                                    </Form.Label>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Status"
                                        name="status"
                                        defaultValue={formData.status}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Responsables
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Responsables"
                                        name="responsables"
                                        defaultValue={formData.responsables}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Fecha de cierre
                                    </Form.Label>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="date"
                                        placeholder="Fecha de cierre"
                                        name="fechaCierre"
                                        defaultValue={formData.fechaCierre}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Status Final
                                    </Form.Label>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Satus"
                                        name="statusFinal"
                                        defaultValue={formData.statusFinal}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formHorizontalNoInterno">
                                <Col sm="2">
                                    <Form.Label align="center">
                                        Evidencia
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <div className="subeFotoPerfil">
                                        <div className="fotoPerfil">
                                            <DropzoneDeshabilitado
                                                setImagen={setEvidencia1} imagenBD={formData.evidencia1}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="subeFotoPerfil">
                                        <div className="fotoPerfil">
                                            <DropzoneDeshabilitado
                                                setImagen={setEvidencia2} imagenBD={formData.evidencia2}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="subeFotoPerfil">
                                        <div className="fotoPerfil">
                                            <DropzoneDeshabilitado
                                                setImagen={setEvidencia3} imagenBD={formData.evidencia3}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Form.Group>
                        </Row>

                        <br />

                        <div className="botones">
                            <Form.Group as={Row} className="botones">
                                <Row>
                                    <Col>
                                        <div
                                            className="generacionPDF"
                                        >
                                            <Image
                                                src={LogoPDF}
                                                className="logoPDF"
                                                onClick={() => {
                                                    descargaPDF()
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div
                                            className="regreso"
                                        >
                                            <Image
                                                src={Regreso}
                                                className="regresarVistaAnterior"
                                                onClick={() => {
                                                    rutaRegreso()
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}

function initialFormDataInitial() {
    return {
        folio: "",
        descripcionNoConformidad: "",
        correccion: "",
        analisisCausaRaiz: "",
        causaRaiz: "",
        accionCorrectiva: "",
        status: "",
        responsables: "",
        statusFinal: "",
        fecha: "",
        fechaCierre: "",

        diagrama: "",
        evidencia1: "",
        evidencia2: "",
        evidencia3: ""

    }
}

function initialFormData(data) {
    return {
        folio: data.folio,
        descripcionNoConformidad: data.descripcionNoConformidad,
        correccion: data.correccion,
        analisisCausaRaiz: data.analisisCausaRaiz,
        causaRaiz: data.causaRaiz,
        accionCorrectiva: data.accionCorrectiva,
        status: data.status,
        responsables: data.responsables,
        statusFinal: data.statusFinal,
        fecha: data.fecha,
        fechaCierre: data.fechaCierre,

        diagrama: data.diagrama,
        evidencia1: data.evidencia.imagen1,
        evidencia2: data.evidencia.imagen2,
        evidencia3: data.evidencia.imagen3,
    }
}

export default VistaPreviaNoConformidad;
