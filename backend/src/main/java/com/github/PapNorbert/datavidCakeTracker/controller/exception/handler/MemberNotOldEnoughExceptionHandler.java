package com.github.PapNorbert.datavidCakeTracker.controller.exception.handler;

import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.ErrorData;
import com.github.PapNorbert.datavidCakeTracker.service.exception.MemberNotOldEnoughException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MemberNotOldEnoughExceptionHandler {

    @ExceptionHandler(MemberNotOldEnoughException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorData handleFailedConstraintException(MemberNotOldEnoughException exception) {
        return new ErrorData(exception.getMessage());
    }
}
