import * as bcrypt from 'bcrypt';

export class PasswordService{
    async hashPassword (password: string): Promise<string> {
        const saltRounds = 10
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(plainPassword: String, hashedPassword: String): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }
}