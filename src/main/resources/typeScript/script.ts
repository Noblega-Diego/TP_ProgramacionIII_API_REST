const table = new Table(document.getElementById("contentTable"));
const form = <HTMLFormElement> document.getElementById("form");
let update = false;
const inputsForm ={   
    id : form?.querySelector<HTMLInputElement>(`#in_id`),
    nombre : form?.querySelector<HTMLInputElement>(`#in_name`),
    apellido : form?.querySelector<HTMLInputElement>(`#in_lastname`),
    domicilio : form?.querySelector<HTMLInputElement>(`#in_direccion`),
    email : form?.querySelector<HTMLInputElement>(`#in_email`),
    telefono : form?.querySelector<HTMLInputElement>(`#in_phone`)
}

const limpiarForm = ()=>{
    form?.reset();
    update = false;
}
const validar = (str:any)=>{
    return !(str == undefined || str == "")
}

const guardarContacto = (contacto:Contacto)=>{
    limpiarForm();
    fetch("api/contactos",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(contacto)
    })
    .then(data=>data.json())
    .then((json:Contacto)=>{
        table.addRow(json);
    })
}

const actualizarContacto=(contacto:Contacto)=>{
    limpiarForm();
    fetch(`api/contactos/${contacto.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(contacto)
    })
    .then(data=>data.json())
    .then((json:Contacto)=>{
        table.updateRow(json);
    })
}




document.getElementById("form")?.addEventListener("submit",e=>{
    e.preventDefault();
    console.log(e.target);
    let id = inputsForm.id?.value;
    let nombre = inputsForm.nombre?.value;
    let apellido = inputsForm.apellido?.value;
    let domicilio = inputsForm.domicilio?.value;
    let email = inputsForm.email?.value;
    let telefono = inputsForm.telefono?.value;
    if(!validar(nombre) || 
        !validar(apellido) || 
        !validar(domicilio) || 
        !validar(email) || 
        !validar(telefono))
        return;
    let contacto:Contacto = {
        id: Number(id),
        nombre: (nombre)? nombre:null,
        apellido: (apellido)? apellido:null,
        domicilio: (domicilio)? domicilio:null,
        email: (email)? email:null,
        telefono: (telefono)?  Number(telefono):null
    }
    console.log(contacto);
    if(update)
        actualizarContacto(contacto);
    else
        guardarContacto(contacto);
});



table.addEventButtonDelete((id)=>{
    let flagConfirm = confirm("esta seguro de eliminar el contacto")
    if(flagConfirm)
        fetch(`api/contactos/${id}`,{
            method:"DELETE"
        })
        .then(data => table.removeRow(id))    
})
table.addEventButtonEdit((id)=>{
    let contacto = table.getContent(id);
    console.log("edit");
    console.log(contacto);
    if(inputsForm.id && contacto.id) inputsForm.id.value = contacto.id.toString();
    if(inputsForm.nombre && contacto.nombre) inputsForm.nombre.value = contacto.nombre.toString();
    if(inputsForm.apellido && contacto.apellido) inputsForm.apellido.value = contacto.apellido.toString();
    if(inputsForm.domicilio && contacto.domicilio) inputsForm.domicilio.value = contacto.domicilio.toString();
    if(inputsForm.telefono && contacto.telefono) inputsForm.telefono.value = contacto.telefono.toString();
    if(inputsForm.email && contacto.email) inputsForm.email.value = contacto.email.toString();
    update = true;
})

fetch("api/contactos")
    .then(data => data.json())
    .then((json:Contacto[]) => {
        json.forEach(contacto => table.addRow(contacto))
    })
