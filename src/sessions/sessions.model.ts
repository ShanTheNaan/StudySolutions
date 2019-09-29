import * as mongoose from 'mongoose';


export enum Locations {
    MK = 'Min Kao',
    LIB = 'Hodges Library',
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
    time: { type: String, required: true},
    subject: { type: String, required: true},
    numPeople: { type: Number, required: true},
    maxPeople: { type: Number, required: false},
});

export interface Session extends mongoose.Document{
    id: string;
    title: string;
    tagline: string;
    location: Locations;
    room: string;
    time: string;
    subject: string;
    numPeople: number;
    maxPeople: number;
}