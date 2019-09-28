import { Injectable } from '@nestjs/common';
import { Session, Locations } from './sessions.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class SessionsService {
    sessions : Session[] = [];

    getAllSessions () : Session[] {
        return this.sessions;
    }

    createSession (title:string, tagline:string, location:Locations, time:any, room:string, subject:string, maxPeople:number) : Session {
        const sesh : Session = {
            id: uuid(),
            title,
            time,
            tagline,
            room,
            subject,
            location,
            numPeople: 0,
            maxPeople,
        };

        this.sessions.push(sesh);

        return sesh;
    }
}

    // id: string;
    // title: string;
    // location: Location;
    // room: string;
    // time: Date;
    // subject: string;
    // numPeople: number;
    // maxPeople: number;
