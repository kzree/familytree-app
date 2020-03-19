package com.familytree.server.dao;

import com.familytree.server.model.Person;

import java.util.List;
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
}
