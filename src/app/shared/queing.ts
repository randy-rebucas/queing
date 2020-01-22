export interface Name {
    firstname: string;
    lastname: string;
    middlename?: string;
}

export class Queing {
    constructor(
        public id: string,
        public uniqueNumber: string,
        public name: Name,
        public priority: string,
        public created: Date
    ) {}
}
