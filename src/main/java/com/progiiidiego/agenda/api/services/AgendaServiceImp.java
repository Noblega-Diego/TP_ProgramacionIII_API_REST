package com.progiiidiego.agenda.api.services;

import com.progiiidiego.agenda.api.model.Contacto;
import com.progiiidiego.agenda.api.repository.AgendaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author diego
 */

@Service
public class AgendaServiceImp implements AgendaService{
    @Autowired
    private AgendaRepository agendaRepository;
    
    @Override
    public List<Contacto> listAgenda(){
        List<Contacto> listaContactos = new ArrayList<>();
        Iterable<Contacto> iContacto = agendaRepository.findAll();
        
        iContacto.forEach((t) -> listaContactos.add(t));
        return listaContactos;
    }
    
    @Override
    public Contacto getContacto(Long id) throws NoSuchElementException{
        Optional<Contacto> opcional = agendaRepository.findById(id);
        return opcional.get();
    }

    @Override
    public boolean removeContacto(Long id) {
        if(agendaRepository.existsById(id)){
            agendaRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
    
    @Override
    public Contacto createContacto(Contacto contacto) throws NoSuchElementException{
        return agendaRepository.save(contacto);
    }

    @Override
    public Contacto updateContacto(Long id, Contacto datos) {
        Contacto c = agendaRepository.findById(id).get();
        if(datos.getApellido() != null)
            c.setApellido(datos.getApellido());
        if(datos.getNombre()!= null)
            c.setNombre(datos.getNombre());
        if(datos.getEmail()!= null)
            c.setEmail(datos.getEmail());
        if(datos.getDomicilio()!= null)
            c.setDomicilio(datos.getDomicilio());
        if(datos.getTelefono() != 0)
            c.setTelefono(datos.getTelefono());
        agendaRepository.save(c);
        return c;
    }

}
