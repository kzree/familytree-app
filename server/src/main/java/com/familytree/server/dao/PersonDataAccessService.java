package com.familytree.server.dao;

import com.familytree.server.model.Person;
import org.springframework.stereotype.Repository;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository("personDao")
public class PersonDataAccessService implements PersonDao {

    //Simple list to be used as a database
    private static List<Person> DB = new ArrayList<>();

    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName(), person.getGender(),person.getBirthDate() , person.isDead(), person.getDeathDate(), person.getParent1(), person.getParent2(), person.getFamily()));
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
                    updatePersonById(person.getId(), new Person(null, person.getName(), person.getGender(), person.getBirthDate(), person.isDead(), person.getDeathDate(), null, person.getParent2(), person.getFamily()));
                }
            }
            if(person.getParent2() != null) {
                if(person.getParent2().equals(id)) {
                    updatePersonById(person.getId(), new Person(null, person.getName(), person.getGender(), person.getBirthDate(), person.isDead(), person.getDeathDate(), person.getParent1(), null, person.getFamily()));
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
                DB.set(indexOfPersonToUpdate, new Person(id, updatedPerson.getName(), updatedPerson.getGender(),updatedPerson.getBirthDate(), updatedPerson.isDead(), updatedPerson.getDeathDate(),updatedPerson.getParent1(), updatedPerson.getParent2(), updatedPerson.getFamily()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }

    @Override
    public List<Person> selectPeopleByFamily(UUID id) {
        return DB.stream().filter(item -> item.getFamily().equals(id)).collect(Collectors.toList());
    }

    @Override
    public List<Person> selectChildren(UUID id) {
        List<Person> children = new ArrayList<>();
        for(Person person : DB) {
            // Null checks
            if(person.getParent1() != null) {
                if(person.getParent1().equals(id)){
                    children.add(person);
                }
            }
            if(person.getParent2() != null) {
                if(person.getParent2().equals(id)){
                    children.add(person);
                }
            }
        }
        return children;
    }

    @Override
    public List<Person> selectSiblings(UUID id) {
        List<Person> siblings = new ArrayList<>();
        Optional<Person> dbPerson = this.selectPersonById(id);
        if(dbPerson.isPresent()) {
            Person existingPerson = dbPerson.get();

            for(Person person : DB) {
                boolean p1IsParent = false;
                boolean p2IsParent = false;
                if(person.getParent1() != null && existingPerson.getParent1() != null) {
                    if(existingPerson.getParent1().equals(person.getParent1()) && !person.getId().equals(existingPerson.getId())){
                        p1IsParent = true;
                    }
                }
                if(person.getParent2() != null && existingPerson.getParent1() != null) {
                    if(existingPerson.getParent2().equals(person.getParent2())&& !person.getId().equals(existingPerson.getId())){
                        p2IsParent = true;
                    }
                }
                if(p1IsParent || p2IsParent) {
                    siblings.add(person);
                }
            }
        }
        return siblings;
    }

    @Override
    public List<Person> searchPeopleByName(String searchQuery) {
        String cleanedSearchQuery = searchQuery.replace('+', ' ');
        return DB.stream()
                .filter(person -> person.getName().toLowerCase()
                .contains(cleanedSearchQuery.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public Person findYoungestPerson() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/mm/dd");
        Person personToSend = DB.get(0);

        for(Person person : DB) {
            Date current = null;
            Date challenger = null;
            try {
                current = dateFormat.parse(personToSend.getBirthDate());
                challenger = dateFormat.parse(person.getBirthDate());

            } catch (ParseException e) {
                e.printStackTrace();
            }
            if(challenger != null && current != null) {
                if(challenger.compareTo(current) > 0) {
                    personToSend = person;
                }
            }
        }

        return personToSend;
    }

    @Override
    public Person findOldestPerson() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/mm/dd");
        Person personToSend = DB.get(0);

        for(Person person : DB) {
            Date current = null;
            Date challenger = null;
            try {
                current = dateFormat.parse(personToSend.getBirthDate());
                challenger = dateFormat.parse(person.getBirthDate());

            } catch (ParseException e) {
                e.printStackTrace();
            }
            if(challenger != null && current != null) {
                if(challenger.compareTo(current) < 0) {
                    personToSend = person;
                }
            }
        }

        return personToSend;
    }
}
