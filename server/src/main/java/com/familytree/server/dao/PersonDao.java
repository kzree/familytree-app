package com.familytree.server.dao;

import com.familytree.server.model.Person;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonDao {

    // Inserts person to the database
    int insertPerson(UUID id, Person person);

    default int insertPerson(Person person) {
        UUID id = UUID.randomUUID();
        return insertPerson(id, person);
    }

    // Selects everything in the database
    List<Person> selectAllPeople();

    // Selects person by id from the database
    Optional<Person> selectPersonById(UUID id);

    // Deletes the person from the database
    int deletePersonById(UUID id);

    // Updates a certain person in the database
    int updatePersonById(UUID id, Person person);

    // Selects people in a certain family
    List<Person> selectPeopleByFamily(UUID ID);
}
