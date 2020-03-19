package com.familytree.server.service;

import com.familytree.server.dao.PersonDao;
import com.familytree.server.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PersonService {

    private final PersonDao personDao;

    @Autowired
    public PersonService(@Qualifier("personDao") PersonDao personDao) {
        this.personDao = personDao;
    }

    // Adds a person to the database
    public int addPerson(Person person) {
        return personDao.insertPerson(person);
    }

    // Gets all the people in the database
    public List<Person> getAllPeople() {
        return personDao.selectAllPeople();
    }

    // Finds person by given id
    public Optional<Person> getPersonById(UUID id) {
        return personDao.selectPersonById(id);
    }
}
