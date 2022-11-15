import { Role } from "../entities/user.entity";

export class CreateUserDto {
    name: string;
    login: string;
    password: string;
    role: Role
}
