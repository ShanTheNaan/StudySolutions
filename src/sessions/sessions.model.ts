export interface Session {
    id: string;
    title: string;
    tagline: string;
    location: Locations;
    room: string;
    time: any;
    subject: string;
    numPeople: number;
    maxPeople: number;
}

export enum Locations {
    MK = 'Min Kao',
    LIB = 'Library',
    STO = 'Stokely',
    HAS = 'Haslam',
    SU = "Studen Union"
}