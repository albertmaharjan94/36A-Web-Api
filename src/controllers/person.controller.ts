import { Request, Response } from "express";
import { dataset } from "../models/person.model";

export class PersonController {
    async getAllPersons(req: Request, res: Response) {
        // path function
        return res.json(dataset);
    }
}