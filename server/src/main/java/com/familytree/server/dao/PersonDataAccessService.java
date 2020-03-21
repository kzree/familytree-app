package com.familytree.server.dao;

import com.familytree.server.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("personDao")
public class PersonDataAccessService implements PersonDao {

    //Simple list to be used as a database
    private static List<Person> DB = new ArrayList<>();

    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName(), person.getGender(),person.getBirthDate() , person.getParent1(), person.getParent2()));
        return 1;
    }

    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    @Override
    public Optional<Person> selectPersonById(UUID id) {
        return DB.stream()
                .filter(person -> person.getId().equals(id))
                .findFirst();
    }

    @Override
    public int deletePersonById(UUID id) {
        Optional<Person> personMaybe = selectPersonById(id);
        if(personMaybe.isEmpty()) {
            return 0;
        }
        DB.remove(personMaybe.get());
        // Remove reference of deleted person
        for(Person person : DB) {
            if(person.getParent1() != null) {
                if(person.getParent1().equals(id)) {
                    updatePersonById(person.getId(), new Person(null, person.getName(), person.getGender(), person.getBirthDate(), null, person.getParent2()));
                }
            }
            if(person.getParent2() != null) {
                if(person.getParent2().equals(id)) {
                    updatePersonById(person.getId(), new Person(null, person.getName(), person.getGender(), person.getBirthDate(), person.getParent1(), null));
                }
            }
        }
        return 1;
    }

    @Override
    public int updatePersonById(UUID id, Person updatedPerson) {
        return selectPersonById(id).map(person1 -> {
            int indexOfPersonToUpdate = DB.indexOf(person1);
            if(indexOfPersonToUpdate >= 0) {
                DB.set(indexOfPersonToUpdate, new Person(id, updatedPerson.getName(), updatedPerson.getGender(),updatedPerson.getBirthDate() ,updatedPerson.getParent1(), updatedPerson.getParent2()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }
}
