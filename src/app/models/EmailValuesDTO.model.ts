export interface EmailValuesDTO {
    mailTo: string
}

export class EmailValuesDTO implements EmailValuesDTO {
    constructor(public mailTo:string) {
        this.mailTo = mailTo;
    }
}