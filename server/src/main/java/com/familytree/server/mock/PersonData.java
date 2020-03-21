package com.familytree.server.mock;

import com.familytree.server.model.Person;
import com.familytree.server.service.PersonService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PersonData {

    public void initAll(PersonService ps) {
        List<Person> people = initPeople();
    }

    public List<Person> initPeople() {
        List<Person> people = new ArrayList<>();

        return people;
    }
}
