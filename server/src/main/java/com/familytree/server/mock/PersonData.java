package com.familytree.server.mock;

import com.familytree.server.dao.PersonDao;
import com.familytree.server.model.Person;
import com.familytree.server.service.PersonService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PersonData {

    public static void initAll(PersonDao dao) {
        List<Person> people = initPeople();
        addMockToDB(dao, people);
    }

    // Creates the mock data that will be used in the application
    private static List<Person> initPeople() {
        List<Person> people = new ArrayList<>();
        // Pair 1       0-1
        people.add(new Person(UUID.randomUUID(), "Marge Hammer", "female", "1892/10/22", true, "1968/01/12", null, null));
        people.add(new Person(UUID.randomUUID(), "Herman Hammer", "male", "1901/04/20", true, "1944/08/20", null, null));
        // Children 1   2
        people.add(new Person(UUID.randomUUID(), "Randall Hammer", "male", "1938/05/17", true, "2001/12/01", people.get(0).getId(), people.get(1).getId()));
        // Pair 2       3-4
        people.add(new Person(UUID.randomUUID(), "Joanne Hammer", "female", "1940/01/02", false, null, people.get(0).getId(), people.get(1).getId()));
        people.add(new Person(UUID.randomUUID(), "Markus Jones", "male", "1935/03/01", true, "2008/02/11", null, null));
        // Children 2, Pair 3   5-6
        people.add(new Person(UUID.randomUUID(), "Bob Jones", "male", "1968/02/24", false, null, people.get(3).getId(), people.get(4).getId()));
        people.add(new Person(UUID.randomUUID(), "Kate Jones", "female", "1972/05/10", false, null, null, null));
        // Children 3   7
        people.add(new Person(UUID.randomUUID(), "Mathew Jones", "male", "1994/02/13", true, "2010/07/01", people.get(6).getId(), people.get(5).getId()));
        //Pair 4        8 with 2
        people.add(new Person(UUID.randomUUID(), "Lisa Ballmer", "female", "1941/08/12", true, "1984/01/04", null, null));
        // Children 4   9-10
        people.add(new Person(UUID.randomUUID(), "John Hammer", "male", "1971/08/24", false, null, people.get(8).getId(), people.get(2).getId()));
        people.add(new Person(UUID.randomUUID(), "Mark Hammer", "male", "1974/03/02", true, "2000/02/27", people.get(8).getId(), people.get(2).getId()));
        // Pair 5       11 wth 9
        people.add(new Person(UUID.randomUUID(), "Eleanor McDonald", "female", "1974/08/24", false, null, null, null));
        // Children 5   12-13
        people.add(new Person(UUID.randomUUID(), "Suzi Hammer", "female", "1996/03/11", false, null, people.get(11).getId(), people.get(9).getId()));
        people.add(new Person(UUID.randomUUID(), "Thomas Hammer", "male", "2001/05/19", false, null, people.get(11).getId(), people.get(9).getId()));
        // Pair 6       14 with 12
        people.add(new Person(UUID.randomUUID(), "Markus Locust", "male", "1996/12/23", false, null, null, null));
        // Children 6   15
        people.add(new Person(UUID.randomUUID(), "Sandra Locust", "female", "2017/01/21", false, null, people.get(12).getId(), people.get(14).getId()));

        return people;
    }

    // Adds the created mock data to the database
    private static void addMockToDB(PersonDao dao, List<Person> people) {
        for(Person person : people) {
            dao.insertPerson(person.getId(), person);
        }
        System.out.println("SERVER: Data initialized");
    }
}
