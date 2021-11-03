"use strict";
var Table = /** @class */ (function () {
    function Table(tbody) {
        var _this = this;
        this.form = document.createElement("tbody");
        this.DELETE = "delete";
        this.EDIT = "edit";
        this.eventDelete = [];
        this.eventEdit = [];
        this.addRow = function (contacto) {
            var row = document.createElement("tr");
            row.dataset.id = contacto.id.toString();
            row.appendChild(_this.createColumn(contacto.id.toString()));
            row.appendChild(_this.createColumn(contacto.nombre));
            row.appendChild(_this.createColumn(contacto.apellido));
            row.appendChild(_this.createColumn(contacto.domicilio));
            row.appendChild(_this.createColumn(contacto.email));
            row.appendChild(_this.createColumn(contacto.telefono.toString()));
            var btDelete = document.createElement("button");
            btDelete.classList.add("btn", "btn-danger");
            btDelete.innerText = "eliminar";
            btDelete.dataset.type = _this.DELETE;
            btDelete.dataset.id = contacto.id.toString();
            var btEdit = document.createElement("button");
            btEdit.classList.add("btn", "btn-info");
            btEdit.innerText = "modificar";
            btEdit.dataset.type = _this.EDIT;
            btEdit.dataset.id = contacto.id.toString();
            row.appendChild(_this.createColumn(btDelete, btEdit));
            _this.form.appendChild(row);
        };
        if (tbody != null)
            this.form = tbody;
        this.initialize();
    }
    Table.prototype.initialize = function () {
        var _this = this;
        this.form.addEventListener("click", function (e) {
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
    Table.prototype.removeRow = function (id) {
        var _a;
        (_a = this.form.querySelector("tr[data-id='" + id + "']")) === null || _a === void 0 ? void 0 : _a.remove();
    };
    Table.prototype.clear = function () {
        this.form.childNodes.forEach(function (element) { return element.remove(); });
    };
    Table.prototype.addEventButtonDelete = function (target) { this.eventDelete.push(target); };
    ;
    Table.prototype.addEventButtonEdit = function (target) { this.eventDelete.push(target); };
    ;
    Table.prototype.createColumn = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        var column = document.createElement("td");
        content.forEach(function (e) {
            if (e != null)
                column.appendChild((typeof e === "string") ? document.createTextNode(e) : e);
        });
        return column;
    };
    return Table;
}());
var table = new Table(document.getElementById("contentTable"));
table.addEventButtonDelete(function (id) {
    var flagConfirm = confirm("esta seguro de eliminar el contacto");
    if (flagConfirm)
        fetch("api/contactos/" + id, {
            method: "DELETE"
        })
            .then(function (data) { return table.removeRow(id); });
});
table.addEventButtonEdit(function (id) {
});
fetch("api/contactos")
    .then(function (data) { return data.json(); })
    .then(function (json) {
    json.forEach(function (contacto) { return table.addRow(contacto); });
});
