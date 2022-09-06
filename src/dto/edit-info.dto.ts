export class EditInfoDto {
    name: string | null;
    phone: string | null;
    address: string | null;
    about: string | null;

    constructor() {
        this.name = null;
        this.phone = null;
        this.address = null;
        this.about = null;
    }
}