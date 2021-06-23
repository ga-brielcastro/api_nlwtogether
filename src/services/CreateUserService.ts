import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin } : IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);

        // Verifica se o email ta preenchido
        if(!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await usersRepository.findOne({email});

        // Verifica se o usuário já existe
        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = usersRepository.create({ name, email, admin});
        usersRepository.save(user);

        return user;
    };    
}

export { CreateUserService };