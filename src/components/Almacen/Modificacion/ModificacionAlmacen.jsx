import React from 'react';
import { Alert, Col, Row } from "react-bootstrap";

function ModificacionAlmacen(props) {
    const { setRefreshCheckLogin } = props;

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>
                            Modificación de E/S
                        </h1>
                    </Col>
                    <Col xs={6} md={4}>
                        Folio-{ }
                    </Col>
                </Row>
            </Alert>
        </>
    );
}

export default ModificacionAlmacen;
