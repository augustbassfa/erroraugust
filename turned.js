import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
/* import InputGroup from "react-bootstrap/InputGroup"; */

export default function FormChange() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [monto1, setMonto1] = useState("");
  const [monto2, setMonto2] = useState("");
  const refBcv = 25.0;

  const handleMonto1Change = (event) => {
    const input = event.target.value;
    console.log(input);
    let nuevoMonto1 = input.replace(/,/g, ""); // Eliminar todo excepto los números
    // console.log(nuevoMonto1);
    // eslint-disable-next-line
    const longitud = nuevoMonto1.replace(/[^0-9]/g, "").length;
    const RgX = /0[1-9]/g;
    // setMonto1(nuevoMonto1);
    if (longitud > 2) {
      // let nuevoMonto1Slice = nuevoMonto1.slice(0, longitud - 2);
      let nuevoMonto1Slice = nuevoMonto1.split(".");
      if (nuevoMonto1Slice[0] === "00") {
        nuevoMonto1Slice = "0";
      } else if (RgX.test(nuevoMonto1Slice[0])) {
        nuevoMonto1Slice = nuevoMonto1Slice.substring(1);
        console.log("hola");
      } /* else {
        nuevoMonto1Slice = nuevoMonto1Slice[0];
      } */
      console.log(nuevoMonto1, nuevoMonto1Slice, longitud);
      // console.log(nuevoMonto1, longitud, nuevoMonto1.slice(longitud - 2));
      // nuevoMonto1 = `${nuevoMonto1Slice}.${nuevoMonto1.slice(longitud - 2)}`;
    } else if (longitud === 1) {
      nuevoMonto1 = `0.0${nuevoMonto1}`;
    } else if (longitud === 2) {
      nuevoMonto1 = `0.${nuevoMonto1}`;
    } else if (longitud > 2 && nuevoMonto1.endsWith("0")) {
      // Agregar ceros a la derecha si existen
      nuevoMonto1 = `${nuevoMonto1.slice(0, longitud - 2)}.${nuevoMonto1.slice(longitud - 2)}`;
    }
    // eslint-disable-next-line
    setMonto1(nuevoMonto1);
    console.log(nuevoMonto1);
    // const nuevoMonto2 = Number.isNaN(nuevoMonto1) ? 0 : Number(nuevoMonto1) / refBcv;
    // console.log(nuevoMonto2);
    /* const monto = parseFloat(nuevoMonto1).toFixed(2);
    const formattedMonto = new Intl.NumberFormat("es-VE").format(monto);
    // setMonto2(event.target.value === " " ? 0 : nuevoMonto2); */
  };

  const handleMonto2Change = (event) => {
    const input = event.target.value;
    let nuevoMonto2 = input.replace(/[^0-9]/g, ""); // Eliminar todo excepto los números
    const longitud = nuevoMonto2.length;
    const RgX = /0[1-9]/g;
    if (longitud > 2) {
      let nuevoMonto2Slice = nuevoMonto2.slice(0, longitud - 2);
      if (nuevoMonto2Slice === "00") {
        nuevoMonto2Slice = "0";
      } else if (RgX.test(nuevoMonto2Slice)) {
        nuevoMonto2Slice = nuevoMonto2Slice.substring(1);
      }
      nuevoMonto2 = `${nuevoMonto2Slice}.${nuevoMonto2.slice(longitud - 2)}`;
    } else if (longitud === 1) {
      nuevoMonto2 = `0.0${nuevoMonto2}`;
    } else if (longitud === 2) {
      nuevoMonto2 = `0.${nuevoMonto2}`;
    }
    const nuevoMonto1 = Number.isNaN(nuevoMonto2) ? 0 : Number(nuevoMonto2) * refBcv;
    const monto = parseFloat(nuevoMonto2).toFixed(2);
    const formattedMonto = new Intl.NumberFormat("es-VE").format(monto);
    // eslint-disable-next-line
    setMonto2(formattedMonto);
    setMonto1(event.target.value === " " ? 0 : nuevoMonto1);
    event.target.setSelectionRange(0, 0);
  };

  /* const handleMonto2Change = (event) => {
    // eslint-disable-next-line
    console.log(event.target.value);
    const input = event.target.value;
    // Eliminar cualquier caracter no numérico, excepto el punto o la coma (para el separador decimal)
    let numero = input.replace(/[^0-9.,]/g, "");
    // Reemplazar cualquier coma por un punto (para el separador decimal)
    const longitud = numero.length;
    if (longitud > 2) {
      numero = `${numero.slice(0, longitud - 2)}.${numero.slice(longitud - 2)}`;
    } else if (longitud === 1) {
      numero = `0.0${numero}`;
    } else if (longitud === 2) {
      numero = `0.${numero}`;
    }
    const nuevoMonto2 = parseFloat(event.target.value.replace(/\./g, "").replace(",", "."));
    // eslint-disable-next-line
    console.log(nuevoMonto2);
    const monto = parseFloat(numero).toFixed(2);
    const formattedMonto = new Intl.NumberFormat("es-VE").format(monto);
    setMonto2(formattedMonto);
    const nuevoMonto1 = Number.isNaN(nuevoMonto2) ? 0 : nuevoMonto2 * refBcv;
    const formattedMonto2 = nuevoMonto2.toLocaleString("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setMonto2(event.target.value === " " ? "0,00" : formattedMonto2);
    setMonto1(event.target.value === " " ? 0 : nuevoMonto1);
    event.target.setSelectionRange(0, 0);
  }; */

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mx-auto">
        <Form.Group as={Col} md="8">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombres"
            defaultValue=""
            controlId="validationCustom01"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su Nombre y Apellido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom02">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control required type="text" placeholder="(0412) 123-4567" />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su número de télefono.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label htmlFor="disabledSelect">Documento de identidad</Form.Label>
        <Form.Group as={Col} md="2">
          <Form.Select id="disabledSelect">
            <option>V</option>
            <option>E</option>
            <option>J</option>
            <option>G</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Control type="text" placeholder="Documento de Identidad" required />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su documento de identidad.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label> . </Form.Label>
        <Form.Group as={Col} md="8">
          <Form.Select id="disabledSelect">
            <option>Seleccione un Banco</option>
            <option>Aqui va un Banco</option>
            <option>Aqui va un Banco</option>
            <option>Aqui va un Banco</option>
            <option>Aqui va un Banco</option>
            <option>Aqui va un Banco</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mx-auto">
        <Form.Group as={Col} md="8" controlId="validationCustom03">
          <Form.Label>Monto</Form.Label>
          <Form.Control
            id="amount"
            type="text"
            /* value={formattedMonto1.format(monto1)} */
            value={monto1}
            onChange={handleMonto1Change}
            minLength="2"
            placeholder="Monto"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese monto para realizar la transacción.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label htmlFor="disabledSelect">Selecione Referencia</Form.Label>
        <Form.Group as={Col} md="3">
          <Form.Select id="disabledSelect">
            <option>$</option>
            <option>€</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="5">
          <Form.Control
            id="amount"
            type="text"
            value={monto2}
            /*  value={formattedMonto2.format(monto2)} */
            onChange={handleMonto2Change}
            placeholder="Referencia"
            minLength="1"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese referencia.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom04">
          <Form.Label>Nota</Form.Label>
          <Form.Control type="text" placeholder="Opcional" required />
          <Form.Control.Feedback type="invalid">
            Ingrese más de seis (6) digitos por favor
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mx-auto">
        <Form.Check
          required
          label="Acepto los terminos y condiciones"
          feedback="Usted debe aceptar antes de enviar."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Confirmar</Button>
    </Form>
  );
}
