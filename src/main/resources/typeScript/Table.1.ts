
class Table {

    private table: HTMLElement = document.createElement("tbody");
    private DELETE = "delete";
    private EDIT = "edit";
    private eventDelete: ((id: number) => void)[] = [];
    private eventEdit: ((id: number) => void)[] = [];
    constructor(tbody: HTMLElement | null) {
        if (tbody != null)
            this.table = tbody;
        this.initialize();
    }

    private initialize() {
        this.table.addEventListener("click", (e) => {
            let element: any = e.target;
            if (element.nodeName === "BUTTON")
                if (element.dataset.type === this.DELETE)
                    this.eventDelete.forEach(event => event(Number(element.dataset.id)));
                else if (element.dataset.type === this.EDIT) {
                    this.eventEdit.forEach(event => event(Number(element.dataset.id)));
                }
            e.preventDefault();
        });
    }

    public addRow = (contacto: Contacto) => {
        if (contacto.id) {
            let { id, nombre, apellido, domicilio, email, telefono } = contacto;
            const row = document.createElement("tr");
            row.dataset.id = contacto.id.toString();
            row.appendChild(this.createColumn("id", id.toString()));
            row.appendChild(this.createColumn("nombre", nombre));
            row.appendChild(this.createColumn("apellido", apellido));
            row.appendChild(this.createColumn("domicilio", domicilio));
            row.appendChild(this.createColumn("email", email));
            row.appendChild(this.createColumn("telefono", telefono?.toString()));
            const btDelete = document.createElement("button");
            btDelete.classList.add("btn", "btn-danger");
            btDelete.innerText = "eliminar";
            btDelete.dataset.type = this.DELETE;
            btDelete.dataset.id = contacto.id.toString();
            const btEdit = document.createElement("button");
            btEdit.classList.add("btn", "btn-info");
            btEdit.innerText = "modificar";
            btEdit.dataset.type = this.EDIT;
            btEdit.dataset.id = contacto.id?.toString();
            row.appendChild(this.createColumn("actions", btDelete, btEdit));
            this.table.appendChild(row);
        }
    };

    public addRows(contactos: Contacto[]) {
        contactos.forEach(c => this.addRow(c));
    }

    public removeRow(id: number) {
        this.table.querySelector(`tr[data-id='${id}']`)?.remove();
    }

    public clear() {
        this.table.childNodes.forEach(element => element.remove());
    }

    public addEventButtonDelete(target: (id: number) => void) { this.eventDelete.push(target); };

    public addEventButtonEdit(target: (id: number) => void) { this.eventEdit.push(target); };

    private createColumn(nameid: string, ...content: (HTMLElement | string | null | undefined)[]): HTMLTableCellElement {
        const column: HTMLTableCellElement = document.createElement("td");
        content.forEach(e => {
            if (e != null)
                column.appendChild((typeof e === "string") ? document.createTextNode(e) : e);
            else
                (e == null || e == undefined);
            column.appendChild(document.createTextNode(""));
        });
        column.dataset.nameid = nameid;
        return column;
    }
    public updateRow(contacto: Contacto) {
        let row = this.table.querySelector(`tr[data-id='${contacto.id}']`);
        const column = (nombre: string) => {
            const col = row?.querySelector<HTMLElement>(`td[data-nameid='${nombre}']`);
            const setText = (content: string | null | undefined) => { if (col?.innerText != undefined) { col.innerText = content ? content : ""; } };
            return { setText };
        };
        column("nombre").setText(contacto.nombre);
        column("apellido").setText(contacto.apellido);
        column("domicilio").setText(contacto.domicilio);
        column("email").setText(contacto.email);
        column("telefono").setText(contacto.telefono?.toString());
    }
    public getContent(id: number): Contacto {
        let row = this.table.querySelector(`tr[data-id='${id}']`);
        const column = (nombre: string) => {
            const col = row?.querySelector<HTMLElement>(`td[data-nameid='${nombre}']`);
            const getText = () => { return col?.innerText; };
            return { getText };
        };
        let contacto: Contacto = {
            id,
            nombre: String(column("nombre").getText()),
            apellido: String(column("apellido").getText()),
            domicilio: String(column("domicilio").getText()),
            email: String(column("email").getText()),
            telefono: Number(column("telefono").getText())
        };
        return contacto;
    }
}
