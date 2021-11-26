export interface EmailBodyInterface {
    email: string;
    content: string;
    subject: string;
}

export class EmailBody implements EmailBodyInterface {
    constructor(public email:string, public content:string, public subject:string) {
        this.email = email;
        this.content = content;
        this.subject = subject;

    }
}