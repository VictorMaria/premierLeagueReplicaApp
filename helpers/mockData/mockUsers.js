import dotenv from 'dotenv';
 
dotenv.config();
 
const { password } = process.env;
 
const mockUsers = {
    missingFirstName: {
        lastName: 'Kamali',
        email: 'john.kamali@mail.com',
        password: password,
        confirmPassword: password,
    },
    missingLastname: {
        firstName: 'John',
        email: 'john.kamali@mail.com',
        password: password,
        confirmPassword: password,
    },
    missingEmail: {
        firstName: 'John',
        lastName: 'Kamali',
        password: password,
        confirmPassword: password,
    },
    missingPassword: {
        firstName: 'John',
        lastName: 'Kamali',
        email: 'john.kamali@mail.com',
        confirmPassword: password,
    },
    missingConfirmPassword: {
        firstName: 'John',
        lastName: 'Kamali',
        email: 'john.kamali@mail.com',
        password: password,
    },
    invalidEmail: {
        firstName: 'John',
        lastName: 'Kamali',
        email: 'john.kamalioutlook.com',
        password: password,
        confirmPassword: password,
    },
    passwordMismatch: {
        firstName: 'John',
        lastName: 'Kamali',
        email: 'john.kamali@outlook.com',
        password: password,
        confirmPassword: `${password}s`,
    },
    correctDetails: {
        firstName: 'John',
        lastName: 'Kamali',
        email: 'john.kamali@outlook.com',
        password: password,
        confirmPassword: password,
    },
    wrongSignInEmail: {
        email: 'johnny.kamali@outlook.com',
        password: password,
    },
    wrongSignInPassword: {
        email: 'john.kamali@outlook.com',
        password: `${password}s`
    }   
};
 
export default mockUsers;