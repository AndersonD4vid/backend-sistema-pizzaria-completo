import prismaClient from '../../prisma';

interface UserResquest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserResquest){

        // verifica se enviou um email
        if(!email){
            throw new Error("E-mail inválido!")
        }

        // verifica se já estar cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("E-mail já existe!")
        }

        // cadastrando um usuário
        const user  = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        

    return user;
    }
}

export {CreateUserService}