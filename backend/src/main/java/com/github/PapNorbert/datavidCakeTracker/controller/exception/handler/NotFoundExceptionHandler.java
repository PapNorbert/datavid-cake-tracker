package com.github.PapNorbert.datavidCakeTracker.controller.exception.handler;

import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.ErrorData;
import com.github.PapNorbert.datavidCakeTracker.service.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NotFoundExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorData handleNotFoundException(NotFoundException exception) {
        return new ErrorData(exception.getMessage());
    }
}
