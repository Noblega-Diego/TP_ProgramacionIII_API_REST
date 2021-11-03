package com.progiiidiego.agenda.api.services;

import com.progiiidiego.agenda.api.model.Contacto;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author diego
 */
public interface AgendaService {
    
    public List<Contacto> listAgenda();

    public Contacto getContacto(Long id) throws NoSuchElementException;

    public boolean removeContacto(Long id);

    public Contacto createContacto(Contacto contacto);

    public Contacto updateContacto(Long id, Contacto datos) throws NoSuchElementException;
}
