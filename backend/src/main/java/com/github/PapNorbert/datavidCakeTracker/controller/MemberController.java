package com.github.PapNorbert.datavidCakeTracker.controller;


import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberIncomingDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.MembersListWithPaginationDto;
import com.github.PapNorbert.datavidCakeTracker.service.MemberService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
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


    @GetMapping()
    public MembersListWithPaginationDto findPaginated(
            @RequestParam(defaultValue = "1", required = false) @Positive int page,
            @RequestParam(defaultValue = "5", required = false) @Positive int limit,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String firstName,
            @RequestParam(defaultValue = "false", required = false) boolean orderByDate
    ) {
        LOGGER.info("GET paginated members at members api, "
                        + "page: {}, limit: {}, orderByDate: {}",
                page, limit, orderByDate);
//        page correction, 0 is the first page, request uses 1 for first page
        return memberService.getMembersPaginated(page -1, limit,lastName, firstName, orderByDate);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreatedObjectDto create(@RequestBody @Valid MemberIncomingDto memberIncomingDto) {
        LOGGER.info("POST request at members api");
        // createMember throws exception, handled by ExceptionHandler,
        // which returns the corresponding status and data
        return memberService.createMember(memberIncomingDto);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Long id, @RequestBody @Valid MemberIncomingDto memberIncomingDto) {
        LOGGER.info("PUT request at members/{} api", id);
        memberService.update(id, memberIncomingDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        LOGGER.info("DELETE request at members/{} api", id);
        memberService.delete(id);
    }

}
