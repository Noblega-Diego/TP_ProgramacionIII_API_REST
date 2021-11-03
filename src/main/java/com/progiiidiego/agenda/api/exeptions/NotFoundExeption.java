package com.progiiidiego.agenda.api.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author diego
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundExeption extends RuntimeException{

    public NotFoundExeption(String message) {
        super(message);
    }
}
