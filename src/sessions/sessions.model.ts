import * as mongoose from 'mongoose';


export enum Locations {
    MK = 'Min Kao',
    LIB = 'Library',
    STO = 'Stokely',
    HAS = 'Haslam',
    SU = "Studen Union"
}

export const SessionSchema = new mongoose.Schema({
    title: { type: String, required: true},
    tagline: { type: String, required: false},
    //location string
    location: { type: String, required: true},
    room: { type: String, required: true},
    time: { type: Date, required: true},
    subject: { type: String, required: true},
    numPeople: { type: String, required: true},
    maxPeople: { type: String, required: false},
});

export interface Session extends mongoose.Document{
    id: string;
    title: string;
    tagline: string;
    location: Locations;
    room: string;
    time: Date;
    subject: string;
    numPeople: number;
    maxPeople: number;
}