export interface CambiarPasswordDTO {
    password: string;
    confirmarPassword: string;
    tokenPassword: string;
}

export class CambiarPasswordDTO implements CambiarPasswordDTO {
    constructor(public password:string, public confirmarPassword:string, public tokenPassword:string) {
        this.password = password;
        this.confirmarPassword = confirmarPassword;
        this.tokenPassword = tokenPassword;

    }
}