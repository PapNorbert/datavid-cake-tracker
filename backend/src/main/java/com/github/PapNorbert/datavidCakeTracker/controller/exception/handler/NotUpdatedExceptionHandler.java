package com.github.PapNorbert.datavidCakeTracker.controller.exception.handler;


import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.ErrorData;
import com.github.PapNorbert.datavidCakeTracker.service.exception.NotUpdatedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NotUpdatedExceptionHandler {
    @ExceptionHandler(NotUpdatedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorData handleNotUpdatedException(NotUpdatedException exception) {
        return new ErrorData(exception.getMessage());
    }
}