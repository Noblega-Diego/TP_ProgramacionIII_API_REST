
interface Contacto{
    id:number,
    nombre:string,
    apellido:string,
    domicilio:string,
    email:string,
    telefono:number
}

class Table {
    private form:HTMLElement = document.createElement("tbody");
    private DELETE = "delete";
    private EDIT = "edit";
    private eventDelete: ((id:number)=>void)[] = [];
    private eventEdit: ((id:number)=>void)[] = [];
    constructor(tbody:HTMLElement|null) {
        if(tbody != null)
            this.form = tbody;
        this.initialize();
    }
    
    private initialize() {
        this.form.addEventListener("click", (e)=>{
            let element:any = e.target;
            if(element.nodeName === "BUTTON")
                if(element.dataset.type === this.DELETE)
                    this.eventDelete.forEach(event => event(Number(element.dataset.id)))
                else if(element.dataset.type === this.EDIT){
                    this.eventEdit.forEach(event => event(Number(element.dataset.id)))
                }
            e.preventDefault();
        })
    }

    public addRow = (contacto:Contacto)=>{
        const row = document.createElement("tr");
        row.dataset.id = contacto.id.toString();
        row.appendChild(this.createColumn(contacto.id.toString()));
        row.appendChild(this.createColumn(contacto.nombre)); 
        row.appendChild(this.createColumn(contacto.apellido)); 
        row.appendChild(this.createColumn(contacto.domicilio)); 
        row.appendChild(this.createColumn(contacto.email)); 
        row.appendChild(this.createColumn(contacto.telefono.toString())); 
        const btDelete = document.createElement("button");
        btDelete.classList.add("btn","btn-danger");
        btDelete.innerText = "eliminar";
        btDelete.dataset.type = this.DELETE;
        btDelete.dataset.id = contacto.id.toString();
        const btEdit = document.createElement("button");
        btEdit.classList.add("btn","btn-info");
        btEdit.innerText = "modificar";
        btEdit.dataset.type = this.EDIT;
        btEdit.dataset.id = contacto.id.toString();
        row.appendChild(this.createColumn(btDelete,btEdit))
        this.form.appendChild(row);
    }

    public addRows(contactos:Contacto[]){
        contactos.forEach(c=>this.addRow(c));
    }

    public removeRow(id:number){
        this.form.querySelector(`tr[data-id='${id}']`)?.remove()
    }

    public clear(){
        this.form.childNodes.forEach(element=>element.remove())
    }

    public addEventButtonDelete(target:(id:number)=>void){this.eventDelete.push(target)};
    
    public addEventButtonEdit(target:(id:number)=>void){this.eventDelete.push(target)};

    private createColumn(...content:(HTMLElement|string)[]):HTMLTableCellElement{
        const column:HTMLTableCellElement = document.createElement("td");
        content.forEach(e =>{ 
            if(e != null)
                column.appendChild((typeof e === "string")? document.createTextNode(e):e)})
        return column;
    }
}

let table = new Table(document.getElementById("contentTable"));


table.addEventButtonDelete((id)=>{
    let flagConfirm = confirm("esta seguro de eliminar el contacto")
    if(flagConfirm)
        fetch(`api/contactos/${id}`,{
            method:"DELETE"
        })
        .then(data => table.removeRow(id))    
})
table.addEventButtonEdit((id)=>{
    
})
fetch("api/contactos")
    .then(data => data.json())
    .then((json:Contacto[]) => {
        json.forEach(contacto => table.addRow(contacto))
    })
