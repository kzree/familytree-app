package com.familytree.server.api;

import com.familytree.server.model.Person;
import com.familytree.server.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/person")
@RestController
public class PersonController {
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // Adds a person to the database
    @PostMapping
    public void addPerson(@RequestBody Person person) {
        personService.addPerson(person);
    }

    // Returns the database contents
    @GetMapping
    public List<Person> getAllPeople() {
        return personService.getAllPeople();
    }
}
