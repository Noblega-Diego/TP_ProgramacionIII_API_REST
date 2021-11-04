"use strict";
var _a;
var table = new Table(document.getElementById("contentTable"));
var form = document.getElementById("form");
var update = false;
var inputsForm = {
    id: form === null || form === void 0 ? void 0 : form.querySelector("#in_id"),
    nombre: form === null || form === void 0 ? void 0 : form.querySelector("#in_name"),
    apellido: form === null || form === void 0 ? void 0 : form.querySelector("#in_lastname"),
    domicilio: form === null || form === void 0 ? void 0 : form.querySelector("#in_direccion"),
    email: form === null || form === void 0 ? void 0 : form.querySelector("#in_email"),
    telefono: form === null || form === void 0 ? void 0 : form.querySelector("#in_phone")
};
var limpiarForm = function () {
    form === null || form === void 0 ? void 0 : form.reset();
    update = false;
};
var validar = function (str) {
    return !(str == undefined || str == "");
};
var guardarContacto = function (contacto) {
    limpiarForm();
    fetch("api/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contacto)
    })
        .then(function (data) { return data.json(); })
        .then(function (json) {
        table.addRow(json);
    });
};
var actualizarContacto = function (contacto) {
    limpiarForm();
    fetch("api/contactos/" + contacto.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contacto)
    })
        .then(function (data) { return data.json(); })
        .then(function (json) {
        table.updateRow(json);
    });
};
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    var _a, _b, _c, _d, _e, _f;
    e.preventDefault();
    console.log(e.target);
    var id = (_a = inputsForm.id) === null || _a === void 0 ? void 0 : _a.value;
    var nombre = (_b = inputsForm.nombre) === null || _b === void 0 ? void 0 : _b.value;
    var apellido = (_c = inputsForm.apellido) === null || _c === void 0 ? void 0 : _c.value;
    var domicilio = (_d = inputsForm.domicilio) === null || _d === void 0 ? void 0 : _d.value;
    var email = (_e = inputsForm.email) === null || _e === void 0 ? void 0 : _e.value;
    var telefono = (_f = inputsForm.telefono) === null || _f === void 0 ? void 0 : _f.value;
    if (!validar(nombre) ||
        !validar(apellido) ||
        !validar(domicilio) ||
        !validar(email) ||
        !validar(telefono))
        return;
    var contacto = {
        id: Number(id),
        nombre: (nombre) ? nombre : null,
        apellido: (apellido) ? apellido : null,
        domicilio: (domicilio) ? domicilio : null,
        email: (email) ? email : null,
        telefono: (telefono) ? Number(telefono) : null
    };
    console.log(contacto);
    if (update)
        actualizarContacto(contacto);
    else
        guardarContacto(contacto);
});
table.addEventButtonDelete(function (id) {
    var flagConfirm = confirm("esta seguro de eliminar el contacto");
    if (flagConfirm)
        fetch("api/contactos/" + id, {
            method: "DELETE"
        })
            .then(function (data) { return table.removeRow(id); });
});
table.addEventButtonEdit(function (id) {
    var contacto = table.getContent(id);
    console.log("edit");
    console.log(contacto);
    if (inputsForm.id && contacto.id)
        inputsForm.id.value = contacto.id.toString();
    if (inputsForm.nombre && contacto.nombre)
        inputsForm.nombre.value = contacto.nombre.toString();
    if (inputsForm.apellido && contacto.apellido)
        inputsForm.apellido.value = contacto.apellido.toString();
    if (inputsForm.domicilio && contacto.domicilio)
        inputsForm.domicilio.value = contacto.domicilio.toString();
    if (inputsForm.telefono && contacto.telefono)
        inputsForm.telefono.value = contacto.telefono.toString();
    if (inputsForm.email && contacto.email)
        inputsForm.email.value = contacto.email.toString();
    update = true;
});
fetch("api/contactos")
    .then(function (data) { return data.json(); })
    .then(function (json) {
    json.forEach(function (contacto) { return table.addRow(contacto); });
});
