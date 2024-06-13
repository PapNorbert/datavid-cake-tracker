package com.github.PapNorbert.datavidCakeTracker.controller;


import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberCreationDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.service.MemberService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@ResponseStatus(HttpStatus.OK)
@RequestMapping("api/members")
@AllArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreatedObjectDto create(@RequestBody @Valid MemberCreationDto memberCreationDto) {
        LOGGER.info("POST request at members api");
        // createMember throws exception, handled by ExceptionHandler,
        // which returns the corresponding status and data
        return memberService.createMember(memberCreationDto);
    }

}
