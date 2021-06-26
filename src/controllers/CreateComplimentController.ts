import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplementsService"

class CreateComplimentController {
    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, message } = request.body;
        const { user_id } = request;
        
        const createComplimentServive = new CreateComplimentService();

        const compliment = await createComplimentServive.execute({
            tag_id,
            user_receiver,
            user_sender: user_id,
            message
        })

        return response.json(compliment);

    }
}

export { CreateComplimentController }