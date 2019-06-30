package residency.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import residency.backend.dto.UserDTO;
import residency.backend.services.FakeLoginService;

@RestController
@RequestMapping("/login")
public class FakeLoginController {
    private FakeLoginService fakeLoginService;

    @Autowired
    public FakeLoginController(FakeLoginService fakeLoginService) {
        this.fakeLoginService = fakeLoginService;
    }

    @GetMapping
    public @ResponseBody
    UserDTO loginUser(@RequestParam String user) {
        return fakeLoginService.getUser(user);

    }

}
