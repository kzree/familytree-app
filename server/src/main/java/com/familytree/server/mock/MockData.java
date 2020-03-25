package com.familytree.server.mock;

import com.familytree.server.dao.FamilyDao;
import com.familytree.server.dao.PersonDao;
import com.familytree.server.model.Family;
import com.familytree.server.model.Person;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MockData {

    public static void initPeopleToDB(PersonDao dao) {
        List<Person> people = initPeople();
        addMockPeopleToDB(dao, people);
    }

    public static void initFamiliesToDB(FamilyDao dao) {
        List<Family> families = initFamilies();
        addMockFamilesToDb(dao, families);
    }

    private static List<Family> initFamilies() {
        List<Family> families = new ArrayList<>();
        families.add(new Family(UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c"), "Hammers"));
        families.add(new Family(UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a"), "Dommer family"));
        return families;
    }

    // Creates the mock data that will be used in the application
    private static List<Person> initPeople() {
        List<Person> people = new ArrayList<>();
        // Pair 1       0-1
        people.add(new Person(UUID.randomUUID(), "Marge Hammer", "female", "1892/10/22", true, "1968/01/12", null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        people.add(new Person(UUID.randomUUID(), "Herman Hammer", "male", "1901/04/20", true, "1944/08/20", null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 1   2
        people.add(new Person(UUID.randomUUID(), "Randall Hammer", "male", "1938/05/17", true, "2001/12/01", people.get(0).getId(), people.get(1).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Pair 2       3-4
        people.add(new Person(UUID.randomUUID(), "Joanne Hammer", "female", "1940/01/02", false, null, people.get(0).getId(), people.get(1).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        people.add(new Person(UUID.randomUUID(), "Markus Jones", "male", "1935/03/01", true, "2008/02/11", null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 2, Pair 3   5-6
        people.add(new Person(UUID.randomUUID(), "Bob Jones", "male", "1968/02/24", false, null, people.get(3).getId(), people.get(4).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        people.add(new Person(UUID.randomUUID(), "Kate Jones", "female", "1972/05/10", false, null, null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 3   7
        people.add(new Person(UUID.randomUUID(), "Mathew Jones", "male", "1994/02/13", true, "2010/07/01", people.get(6).getId(), people.get(5).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        //Pair 4        8 with 2
        people.add(new Person(UUID.randomUUID(), "Lisa Ballmer", "female", "1941/08/12", true, "1984/01/04", null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 4   9-10
        people.add(new Person(UUID.randomUUID(), "John Hammer", "male", "1971/08/24", false, null, people.get(8).getId(), people.get(2).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        people.add(new Person(UUID.randomUUID(), "Mark Hammer", "male", "1974/03/02", true, "2000/02/27", people.get(8).getId(), people.get(2).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Pair 5       11 wth 9
        people.add(new Person(UUID.randomUUID(), "Eleanor McDonald", "female", "1974/08/24", false, null, null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 5   12-13
        people.add(new Person(UUID.randomUUID(), "Suzi Hammer", "female", "1996/03/11", false, null, people.get(11).getId(), people.get(9).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        people.add(new Person(UUID.randomUUID(), "Thomas Hammer", "male", "2001/05/19", false, null, people.get(11).getId(), people.get(9).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Pair 6       14 with 12
        people.add(new Person(UUID.randomUUID(), "Markus Locust", "male", "1996/12/23", false, null, null, null, UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Children 6   15
        people.add(new Person(UUID.randomUUID(), "Sandra Locust", "female", "2017/01/21", false, null, people.get(12).getId(), people.get(14).getId(), UUID.fromString("7348c2f2-d7e6-404d-a4d2-c73b718ea90c")));
        // Pair 7       16-17
        people.add(new Person(UUID.randomUUID(), "John Dommer", "male", "1943/07/01", false, null, null, null, UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        people.add(new Person(UUID.randomUUID(), "Rosa Dommer", "female", "1945/11/19", false, null, null, null, UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Children 7   18-20
        people.add(new Person(UUID.randomUUID(), "William Dommer", "male", "1964/07/01", false, null, people.get(17).getId(), people.get(16).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        people.add(new Person(UUID.randomUUID(), "Robert Dommer", "male", "1966/05/25", true, "1994/10/17", people.get(17).getId(), people.get(16).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        people.add(new Person(UUID.randomUUID(), "Kaisa Dommer", "female", "1970/11/12", false, null, people.get(17).getId(), people.get(16).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Pair 8       21 with 18
        people.add(new Person(UUID.randomUUID(), "Kathrine Smith", "female", "1967/09/04", false, null, null, null, UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Pair 9       22 with 20
        people.add(new Person(UUID.randomUUID(), "Jonathan Walker", "male", "1966/05/14", false, null, null, null, UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Children 8   23
        people.add(new Person(UUID.randomUUID(), "Percival Dommer", "male", "1994/01/24", false, null, people.get(21).getId(), people.get(18).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Children 9   24-25
        people.add(new Person(UUID.randomUUID(), "Michael Walker", "male", "1998/12/11", false, null, people.get(20).getId(), people.get(22).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        people.add(new Person(UUID.randomUUID(), "Suzie Walker", "female", "2002/08/06", false, null, people.get(20).getId(), people.get(22).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Pair 10      26 with 23
        people.add(new Person(UUID.randomUUID(), "Lauren Filch", "female", "1995/03/12", false, null, null, null, UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));
        // Children 10  27
        people.add(new Person(UUID.randomUUID(), "Max Dommer", "male", "2019/08/17", false, null, people.get(26).getId(), people.get(23).getId(), UUID.fromString("e2e5f321-f1d5-492a-968e-af80da5a3e5a")));

        return people;
    }

    // Adds the created mock data to the database

    private static void addMockFamilesToDb(FamilyDao dao, List<Family> families) {
        for(Family family : families) {
            dao.insertFamily(family.getId(), family);
        }
        System.out.println("SERVER: Family data initialized");
    }

    private static void addMockPeopleToDB(PersonDao dao, List<Person> people) {
        for(Person person : people) {
            dao.insertPerson(person.getId(), person);
        }
        System.out.println("SERVER: Person data initialized");
    }
}
