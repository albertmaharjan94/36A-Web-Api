import { PersonArrayRepository } from "../repositories/person.repository";
import { CreatePersonDTO } from "../dtos/person.dto";
import { HttpException } from "../exceptions/http-exception";

const personRepo = new PersonArrayRepository();

export class PersonService {
    getOnePerson(id?: number) {
        if(!id){
            throw new HttpException(400, "ID is required");
        }
        const person = personRepo.getOne(id);
        if(!person){
            throw new HttpException(404, "Person not found");
        }
        // transform
        person.name = person.name.toUpperCase();
        return person;
    }
    createPerson(data: CreatePersonDTO) {
        if(data.age < 18){
            throw new HttpException(400, "Person must be at least 18 years old");
        }
        const person = {
            id: Date.now(), // generate unique id
            ...data
        }
        const created = personRepo.createPerson(person);
        if(!created){
            throw new HttpException(500, "Failed to create person");
        }
        return created;
    }
}
