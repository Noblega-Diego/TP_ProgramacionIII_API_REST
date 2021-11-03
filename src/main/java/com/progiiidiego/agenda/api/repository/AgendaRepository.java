package com.progiiidiego.agenda.api.repository;

import com.progiiidiego.agenda.api.model.Contacto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author diego
 */

@Repository
public interface AgendaRepository extends CrudRepository<Contacto, Long>{
}
