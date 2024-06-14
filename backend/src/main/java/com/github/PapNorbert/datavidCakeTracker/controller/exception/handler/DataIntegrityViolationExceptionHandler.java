package com.github.PapNorbert.datavidCakeTracker.controller.exception.handler;

import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.ErrorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@ControllerAdvice
public class DataIntegrityViolationExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorData handleFailedConstraintException(DataIntegrityViolationException exception) {
        LOGGER.error("Invalid data {}", exception.getMessage());
        return new ErrorData("Invalid data");
    }
}