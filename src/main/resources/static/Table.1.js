"use strict";
var Table = /** @class */ (function () {
    function Table(tbody) {
        var _this = this;
        this.table = document.createElement("tbody");
        this.DELETE = "delete";
        this.EDIT = "edit";
        this.eventDelete = [];
        this.eventEdit = [];
        this.addRow = function (contacto) {
            var _a;
            if (contacto.id) {
                var id = contacto.id, nombre = contacto.nombre, apellido = contacto.apellido, domicilio = contacto.domicilio, email = contacto.email, telefono = contacto.telefono;
                var row = document.createElement("tr");
                row.dataset.id = contacto.id.toString();
                row.appendChild(_this.createColumn("id", id.toString()));
                row.appendChild(_this.createColumn("nombre", nombre));
                row.appendChild(_this.createColumn("apellido", apellido));
                row.appendChild(_this.createColumn("domicilio", domicilio));
                row.appendChild(_this.createColumn("email", email));
                row.appendChild(_this.createColumn("telefono", telefono === null || telefono === void 0 ? void 0 : telefono.toString()));
                var btDelete = document.createElement("button");
                btDelete.classList.add("btn", "btn-danger");
                btDelete.innerText = "eliminar";
                btDelete.dataset.type = _this.DELETE;
                btDelete.dataset.id = contacto.id.toString();
                var btEdit = document.createElement("button");
                btEdit.classList.add("btn", "btn-info");
                btEdit.innerText = "modificar";
                btEdit.dataset.type = _this.EDIT;
                btEdit.dataset.id = (_a = contacto.id) === null || _a === void 0 ? void 0 : _a.toString();
                row.appendChild(_this.createColumn("actions", btDelete, btEdit));
                _this.table.appendChild(row);
            }
        };
        if (tbody != null)
            this.table = tbody;
        this.initialize();
    }
    Table.prototype.initialize = function () {
        var _this = this;
        this.table.addEventListener("click", function (e) {
            var element = e.target;
            if (element.nodeName === "BUTTON")
                if (element.dataset.type === _this.DELETE)
                    _this.eventDelete.forEach(function (event) { return event(Number(element.dataset.id)); });
                else if (element.dataset.type === _this.EDIT) {
                    _this.eventEdit.forEach(function (event) { return event(Number(element.dataset.id)); });
                }
            e.preventDefault();
        });
    };
    Table.prototype.addRows = function (contactos) {
        var _this = this;
        contactos.forEach(function (c) { return _this.addRow(c); });
    };
    Table.prototype.removeRow = function (id) {
        var _a;
        (_a = this.table.querySelector("tr[data-id='" + id + "']")) === null || _a === void 0 ? void 0 : _a.remove();
    };
    Table.prototype.clear = function () {
        this.table.childNodes.forEach(function (element) { return element.remove(); });
    };
    Table.prototype.addEventButtonDelete = function (target) { this.eventDelete.push(target); };
    ;
    Table.prototype.addEventButtonEdit = function (target) { this.eventEdit.push(target); };
    ;
    Table.prototype.createColumn = function (nameid) {
        var content = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            content[_i - 1] = arguments[_i];
        }
        var column = document.createElement("td");
        content.forEach(function (e) {
            if (e != null)
                column.appendChild((typeof e === "string") ? document.createTextNode(e) : e);
            else
                (e == null || e == undefined);
            column.appendChild(document.createTextNode(""));
        });
        column.dataset.nameid = nameid;
        return column;
    };
    Table.prototype.updateRow = function (contacto) {
        var _a;
        var row = this.table.querySelector("tr[data-id='" + contacto.id + "']");
        var column = function (nombre) {
            var col = row === null || row === void 0 ? void 0 : row.querySelector("td[data-nameid='" + nombre + "']");
            var setText = function (content) { if ((col === null || col === void 0 ? void 0 : col.innerText) != undefined) {
                col.innerText = content ? content : "";
            } };
            return { setText: setText };
        };
        column("nombre").setText(contacto.nombre);
        column("apellido").setText(contacto.apellido);
        column("domicilio").setText(contacto.domicilio);
        column("email").setText(contacto.email);
        column("telefono").setText((_a = contacto.telefono) === null || _a === void 0 ? void 0 : _a.toString());
    };
    Table.prototype.getContent = function (id) {
        var row = this.table.querySelector("tr[data-id='" + id + "']");
        var column = function (nombre) {
            var col = row === null || row === void 0 ? void 0 : row.querySelector("td[data-nameid='" + nombre + "']");
            var getText = function () { return col === null || col === void 0 ? void 0 : col.innerText; };
            return { getText: getText };
        };
        var contacto = {
            id: id,
            nombre: String(column("nombre").getText()),
            apellido: String(column("apellido").getText()),
            domicilio: String(column("domicilio").getText()),
            email: String(column("email").getText()),
            telefono: Number(column("telefono").getText())
        };
        return contacto;
    };
    return Table;
}());
