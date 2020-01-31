import dotenv from 'dotenv';
 
dotenv.config();
 
const { password } = process.env;
 
const mockAdmins = {
    missingFirstName: {
        lastName: 'Kamali',
        email: 'fatima.kamali@mail.com',
        password: password,
        confirmPassword: password,
    },
    missingLastname: {
        firstName: 'Fatima',
        email: 'fatima.kamali@mail.com',
        password: password,
        confirmPassword: password,
    },
    missingEmail: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        password: password,
        confirmPassword: password,
    },
    missingPassword: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        email: 'fatima.kamali@mail.com',
        confirmPassword: password,
    },
    missingConfirmPassword: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        email: 'fatima.kamali@mail.com',
        password: password,
    },
    invalidEmail: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        email: 'fatima.kamalioutlook.com',
        password: password,
        confirmPassword: password,
    },
    passwordMismatch: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        email: 'fatima.kamali@outlook.com',
        password: password,
        confirmPassword: `${password}s`,
    },
    correctDetails: {
        firstName: 'Fatima',
        lastName: 'Kamali',
        email: 'fatima.kamali@outlook.com',
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
 
export default mockAdmins;