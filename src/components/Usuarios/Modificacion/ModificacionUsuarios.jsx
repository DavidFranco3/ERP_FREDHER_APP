import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { listarDepartamento } from "../../../api/departamentos";
import { isCurpValid, isEmailValid, isRFCValid } from "../../../utils/validations";
import { toast } from "react-toastify";
import { actualizaUsuario, listarUsuarios, obtenerUsuario, registraUsuarios } from "../../../api/usuarios";
import Dropzone from "../../Dropzone";
import { Button, Col, Form, Row, Spinner, Container, Alert } from "react-bootstrap";
import { map } from "lodash";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { getSucursal } from '../../../api/auth';
import { LogsInformativos } from '../../Logs/LogsSistema/LogsSistema';

function ModificacionUsuarios(props) {
    const { setRefreshCheckLogin } = props;

    const enrutamiento = useHistory();

    const params = useParams();

    //console.log(params)

    // Ruta para enlazar a pagina de usuarios
    const regresaPagina = () => {
        enrutamiento.push("/Usuarios");
    }

    // Para almacenar la foto de perfil del usuario
    const [fotoUsuario, setFotoUsuario] = useState(null);

    // Para alamacenar los datos del usuario
    const [listDatosUsuario, setListDatosUsuario] = useState(null);

    // Para almacenar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para validar si hay conexion a internet o la api
    const [conexionInternet, setConexionInternet] = useState(true);

    // Para almacenar los departamentos registrados
    const [departamentosregistrados, setDepartamentosregistrados] = useState(null);

    // Para almacenar los municipios del estado
    const [municipiosEstado, setMunicipiosEstado] = useState(null);

    // Para el icono de cargando del boton
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            listarDepartamento(getSucursal()).then(response => {
                const { data } = response;
                //console.log(data)
                const dataTemp = formatModelDepartamentos(data);
                //console.log(data)
                setDepartamentosregistrados(dataTemp);
            })
        } catch (e) {

        }
    }, []);

    useEffect(() => {
        try {
            obtenerUsuario(params.id).then(response => {
                const { data } = response;

                //console.log(data);
                setFormData(initialFormDataFinal(data))

            }).catch((e) => {
                //console.log(e)
                if (e.message == 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexi??n a Internet no Disponible");
                    setConexionInternet(false);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, []);


    const onSubmit = e => {
        e.preventDefault();
        const dataTemp = {
            ...formData,
            estadoUsuario: "true",
            direccion: {
                calle: formData.calle,
                numeroExterior: formData.numeroExterior,
                colonia: formData.colonia,
                municipio: formData.municipio,
                estado: formData.estado,
                pais: formData.pais
            }
        }
        delete dataTemp.calle;
        delete dataTemp.numeroExterior;
        delete dataTemp.colonia;
        delete dataTemp.municipio;
        delete dataTemp.estado;
        delete dataTemp.pais;
        delete dataTemp.repitePassword;

        setLoading(true);

        try {
            actualizaUsuario(params.id, dataTemp).then(response => {
                const { data } = response;
                LogsInformativos("Se a modificado el usuario " + dataTemp.nombre, dataTemp);
                toast.success(data.mensaje)
                setLoading(false);
                regresaPagina();
            }).catch(e => {
                console.log(e)
                if (e.message == 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexi??n al servidor no disponible");
                    setLoading(false);
                }
            })
        } catch (e) {
            console.log(e)
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
                            Modificando usuario
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="btnRegistroVentas"
                            title="Regresar a la pagina anterior"
                            onClick={() => {
                                regresaPagina()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                        </Button>
                    </Col>
                </Row>
            </Alert>
            <Container>

                <br /><br />

                <div className="formularioDatos">
                    <Form onChange={onChange} onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNombre">
                                <Form.Label>
                                    Nombre
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escribe el nombre"
                                    name="nombre"
                                    defaultValue={formData.nombre}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalTelefonoFijo">
                                <Form.Label>
                                    Tel??fono fijo
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Numero de tel??fono"
                                    name="telefonoFijo"
                                    defaultValue={formData.telefonoFijo}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalNSS">
                                <Form.Label>
                                    NSS
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escribe el nss"
                                    name="nss"
                                    defaultValue={formData.nss}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalRFC">
                                <Form.Label>
                                    RFC
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escribe el rfc"
                                    name="rfc"
                                    defaultValue={formData.rfc}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalTelefonoCelular">
                                <Form.Label>
                                    Tel??fono celular
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Numero de tel??fono"
                                    name="telefonoCelular"
                                    defaultValue={formData.telefonoCelular}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Label align="center">
                                Datos del domicilio
                            </Form.Label>
                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalCalle">
                                <Form.Label>
                                    Calle
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escribe la calle"
                                    name="calle"
                                    defaultValue={formData.calle}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNumeroExterior">
                                <Form.Label>
                                    Numero exterior
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Numero exterior"
                                    name="numeroExterior"
                                    defaultValue={formData.numeroExterior}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNumeroInterior">
                                <Form.Label>
                                    Numero interior
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Numero interior"
                                    name="numeroInterior"
                                    defaultValue={formData.numeroInterior}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>
                                    Estado
                                </Form.Label>

                                <Form.Control as="select"
                                    defaultValue={formData.estado}
                                    name="estado"
                                >
                                    <option>Elige una opci??n</option>
                                    <option value="Aguascalientes" selected={formData.estado === "Aguascalientes"}>Aguascalientes</option>
                                    <option value="Baja California" selected={formData.estado === "Baja California"}>Baja California</option>
                                    <option value="Baja California Sur" selected={formData.estado === ""}>Baja California Sur</option>
                                    <option value="Campeche" selected={formData.estado === ""}>Campeche</option>
                                    <option value="Chiapas" selected={formData.estado === ""}>Chiapas</option>
                                    <option value="Chihuahua" selected={formData.estado === ""}>Chihuahua</option>
                                    <option value="CDMX" selected={formData.estado === ""}>Ciudad de M??xico</option>
                                    <option value="Coahuila" selected={formData.estado === ""}>Coahuila</option>
                                    <option value="Colima" selected={formData.estado === ""}>Colima</option>
                                    <option value="Durango" selected={formData.estado === ""}>Durango</option>
                                    <option value="Estado de M??xico" selected={formData.estado === ""}>Estado de M??xico</option>
                                    <option value="Guanajuato" selected={formData.estado === ""}>Guanajuato</option>
                                    <option value="Guerrero" selected={formData.estado === ""}>Guerrero</option>
                                    <option value="Hidalgo" selected={formData.estado === ""}>Hidalgo</option>
                                    <option value="Jalisco" selected={formData.estado === ""}>Jalisco</option>
                                    <option value="Michoac??n" selected={formData.estado === ""}>Michoac??n</option>
                                    <option value="Morelos" selected={formData.estado === ""}>Morelos</option>
                                    <option value="Nayarit" selected={formData.estado === ""}>Nayarit</option>
                                    <option value="Nuevo Le??n" selected={formData.estado === ""}>Nuevo Le??n</option>
                                    <option value="Oaxaca" selected={formData.estado === ""}>Oaxaca</option>
                                    <option value="Puebla" selected={formData.estado === ""}>Puebla</option>
                                    <option value="Quer??taro" selected={formData.estado === "Quer??taro"}>Quer??taro</option>
                                    <option value="Quintana Roo" selected={formData.estado === ""}>Quintana Roo</option>
                                    <option value="San Luis Potos??" selected={formData.estado === ""}>San Luis Potos??</option>
                                    <option value="Sinaloa" selected={formData.estado === ""}>Sinaloa</option>
                                    <option value="Sonora" selected={formData.estado === ""}>Sonora</option>
                                    <option value="Tabasco" selected={formData.estado === ""}>Tabasco</option>
                                    <option value="Tamaulipas" selected={formData.estado === ""}>Tamaulipas</option>
                                    <option value="Tlaxcala" selected={formData.estado === ""}>Tlaxcala</option>
                                    <option value="Veracruz" selected={formData.estado === ""}>Veracruz</option>
                                    <option value="Yucat??n" selected={formData.estado === ""}>Yucat??n</option>
                                    <option value="Zacatecas" selected={formData.estado === ""}>Zacatecas</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMunicipio">
                                <Form.Label>
                                    Municipio
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Municipio"
                                    name="municipio"
                                    defaultValue={formData.municipio}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridColonia">
                                <Form.Label>
                                    Colonia
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Colonia"
                                    name="colonia"
                                    defaultValue={formData.colonia}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formHorizontalDepartamento">
                                <Form.Label>
                                    Departamento
                                </Form.Label>
                                <Form.Control as="select"
                                    defaultValue={formData.departamento}
                                    name="departamento"
                                >
                                    <option>Elige una opci??n</option>
                                    {map(departamentosregistrados, (departamento, index) => (
                                        <option key={index} value={departamento?.id} selected={formData.departamento === departamento?.nombre}>{departamento?.nombre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHorizontalCorreo">
                                <Form.Label>
                                    Correo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Correo electronico"
                                    name="correo"
                                    defaultValue={formData.correo}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>
                                    Contrase??a
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contrase??a"
                                    name="password"
                                    defaultValue={formData.password}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRepitePassword">
                                <Form.Label>
                                    Repite la contrase??a
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Repite la contrase??a"
                                    name="repitePassword"
                                    defaultValue={formData.repitePassword}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="botones">
                            <Row>
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
                                            regresaPagina()
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    );
}

function initialFormData() {
    return {
        nombre: "",
        apellidos: "",
        curp: "",
        nss: "",
        rfc: "",
        telefonoCelular: "",
        telefonoFijo: "",
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        colonia: "",
        municipio: "",
        estado: "",
        pais: "",
        departamento: "",
        correo: "",
        password: "",
        repitePassword: ""
    }
}

function initialFormDataFinal(data) {
    const { nombre, apellidos, curp, nss, rfc, telefonoCelular, telefonoFijo, direccion: { calle, numeroExterior, numeroInterior, colonia, municipio, estado, pais }, departamento, foto, correo, password } = data;

    return {
        nombre: nombre,
        apellidos: apellidos,
        curp: curp,
        nss: nss,
        rfc: rfc,
        telefonoCelular: telefonoCelular,
        telefonoFijo: telefonoFijo,
        calle: calle,
        numeroExterior: numeroExterior,
        numeroInterior: numeroInterior,
        colonia: colonia,
        municipio: municipio,
        estado: estado,
        pais: pais,
        foto: foto,
        departamento: departamento,
        correo: correo,
        password: password,
        repitePassword: password
    }
}

function formatModelDepartamentos(data) {
    const tempDepartamentos = []
    data.forEach((data) => {
        tempDepartamentos.push({
            id: data.id,
            nombre: data.nombre
        });
    });
    return tempDepartamentos;
}

function formatModelUsuarios(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        const { direccion: { calle, numeroExterior, numeroInterior, colonia, municipio, estado, pais } } = data;
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            apellidos: data.apellidos,
            curp: data.curp,
            nss: data.nss,
            rfc: data.rfc,
            telefonoCelular: data.telefonoCelular,
            telefonoFijo: data.telefonoFijo,
            calle: calle,
            numeroExterior: numeroExterior,
            numeroInterior: numeroInterior,
            colonia: colonia,
            municipio: municipio,
            estado: estado,
            pais: pais,
            departamento: data.departamento,
            correo: data.correo,
            password: data.password,
            foto: data.foto,
            estadoUsuario: data.estadoUsuario,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default ModificacionUsuarios;
