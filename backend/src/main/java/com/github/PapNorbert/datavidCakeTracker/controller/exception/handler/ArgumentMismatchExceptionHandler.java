package com.github.PapNorbert.datavidCakeTracker.controller.exception.handler;

import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.ErrorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Slf4j
@ControllerAdvice
public class ArgumentMismatchExceptionHandler {

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorData handleFailedConstraintException(MethodArgumentTypeMismatchException exception) {
        LOGGER.error("Error converting path variable to required type: {}", exception.getMessage());
        return new ErrorData("Path variable type not supported");
    }

}