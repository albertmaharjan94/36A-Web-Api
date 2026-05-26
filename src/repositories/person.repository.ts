// How to query data source
import { Person } from "../types/person.type";
import { dataset } from "../models/person.model";

export interface IPersonRepository {
    getOne(id: number): Person | undefined;
    getAll(): Person[];
    createPerson(person: Person): Person;
    // create a function updateperson takes id and data to update,
    // data can be partial person
    // returns updated person
    // implement repo, service, controller, route for update person and test the api
}
// export class PersonPGRespository implements IPersonRepository {
//     getOne(id: number): Person | undefined {
//         const person = "select * from person where id = $1";
//         return person;
//     }
// }
export class PersonArrayRepository implements IPersonRepository {
    getOne(id: number): Person | undefined {
        const person = dataset.find(p => p.id === id);
        return person;
    }
    getAll(): Person[] {
        return dataset;
    }
    createPerson(person: Person): Person {
        dataset.push(person);
        return person;
    }
}