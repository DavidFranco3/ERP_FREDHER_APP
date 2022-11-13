import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistroInicialAlmacenMP,
    ENDPOINTListarAlmacenMP,
    ENDPOINTObtenerFolioAlmacenMP,
    ENDPOINTListarPaginandoAlmacenMP,
    ENDPOINTObtenerAlmacenMP,
    ENDPOINTObtenerDatosFolioMPAlmacenMP,
    ENDPOINTListarMovimientos,
    ENDPOINTEliminarAlmacenMP,
    ENDPOINTActualizarEstadoAlmacenMP,
    ENDPOINTActualizaExistenciasAlmacenMP,
    ENDPOINTRegistraMovimientosAlmacenMP,
    ENDPOINTTotalMovimientosAlmacenMP
} from "./endpoints";
import axios from 'axios';
import { getTokenApi } from "./auth";

// Registro inicial de almacen de materia prima
export async function registroInicialAlmacenMP(data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistroInicialAlmacenMP, data, config);
}

// Obten el total de registros de la colección
export async function totalMovimientosAlmacenMP() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTTotalMovimientosAlmacenMP, config);
}

// Registra Movimientos del almacen
export async function registraMovimientosAlmacenMP(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTRegistraMovimientosAlmacenMP + `/${id}`, data, config);
}

// Listar todas las materias primas
export async function listarAlmacenMP(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarAlmacenMP, config);
}

// Obtener el folio actual del almacen
export async function obtenerFolioActualAlmacenMP() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerFolioAlmacenMP, config);
}

// Listar paginando las materias primas del almacen
export async function listarPaginacionAlmacenMP(pagina, limite) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoAlmacenMP + `/?pagina=${pagina}&&limite=${limite}`, config);
}

// Obtener los datos de una materia prima segun el id
export async function obtenerAlmacenMPID(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerAlmacenMP + `/${id}`, config);
}

// Obtener los datos de una materia prima segun el folio de la MP
export async function obtenerDatosAlmacenMPFolio(folioMP) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerDatosFolioMPAlmacenMP + `/${folioMP}`, config);
}

// Listar todos los movimientos de una materia prima segun el folio de la mp
export async function listarMovimientosAlmacenMP(folioMP) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarMovimientos + `/${folioMP}`, config);
}

// Eliminar una materia prima del almacen
export async function eliminaAlmacenMP(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarAlmacenMP + `/${id}`, config);
}

// Actualizar el estado de las materias primas del almacen
export async function actualizaEstadoAlmacenMP(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarEstadoAlmacenMP + `/${id}`, data, config);
}

// Actualizar las existencias de almacen de una materia prima
export async function actualizaExistenciasAlmacenMP(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizaExistenciasAlmacenMP + `/${id}`, data, config);
}

