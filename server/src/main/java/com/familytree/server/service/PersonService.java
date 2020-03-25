package com.familytree.server.service;

import com.familytree.server.dao.PersonDao;
import com.familytree.server.mock.MockData;
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
        MockData.initPeopleToDB(personDao);
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

    // Deletes person by given id
    public int deletePerson(UUID id) {
        return personDao.deletePersonById(id);
    }

    // Updates person by given id
    public int updatePerson(UUID id, Person person) {
        return personDao.updatePersonById(id, person);
    }

    // Gets everyone in a certain family
    public List<Person> getPeopleByFamily(UUID id) {
        return personDao.selectPeopleByFamily(id);
    }

    // Gets children of person
    public List<Person> getChildren(UUID id) {
        return personDao.selectChildren(id);
    }

    // Gets siblings of person
    public List<Person> getSiblings(UUID id) {
        return personDao.selectSiblings(id);
    }

    // Gets people that fit the search query
    public List<Person> searchByQuery(String searchQuery) {
        return personDao.searchPeopleByName(searchQuery);
    }
}
