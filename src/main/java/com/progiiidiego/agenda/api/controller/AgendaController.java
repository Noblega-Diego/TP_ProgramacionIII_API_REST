package com.progiiidiego.agenda.api.controller;

import com.progiiidiego.agenda.api.exeptions.NotFoundExeption;
import com.progiiidiego.agenda.api.model.Contacto;
import com.progiiidiego.agenda.api.services.AgendaService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author diego
 */
@RestController()
@RequestMapping(value = "api")
public class AgendaController {
    
    @Autowired
    private AgendaService agendaService;
    
    
    @RequestMapping(value = "contactos")
    public List<Contacto> listarContactos(){
        return agendaService.listAgenda();
    }

    @RequestMapping(value = "contactos/{id}")
    public Contacto getContacto(@PathVariable("id") Long id){
        try {
            return agendaService.getContacto(id);
        } catch (NoSuchElementException e) {
            throw new NotFoundExeption("contacto id:"+ id +" no se encuentra");
        }
    }
    
    @RequestMapping(value = "contactos/{id}",method = RequestMethod.DELETE)
    public void removeContacto(@PathVariable("id") Long id){
        agendaService.removeContacto(id);
    }
    
    
    @RequestMapping(value = "contactos",method = RequestMethod.POST)
    public Contacto createContacto(@RequestBody Contacto contacto){
        return agendaService.createContacto(contacto);
    }
    
    @RequestMapping(value = "contactos/{id}",method = RequestMethod.PUT)
    public Contacto createContacto(@PathVariable("id")Long id, @RequestBody Contacto contacto){
        try {
            return agendaService.updateContacto(id,contacto);
        } catch (NoSuchElementException e) {
            throw new NotFoundExeption("contacto id:"+ id +" no se encuentra");
        }
    }

}
