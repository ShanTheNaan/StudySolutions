import { Injectable } from '@nestjs/common';
import { Session, Locations } from './sessions.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class SessionsService {
    private sessions : Session[] = [];

    getAllSessions () : Session[] {
        return this.sessions;
    }

    getSessionById (id : string) : Session {
        return this.sessions.find (session => session.id === id);
    }

    deleteSession (id : string) {
        this.sessions = this.sessions.filter (session => session.id !== id);
    }

    addPerson (id : string) : boolean {
        let index : number = this.sessions.findIndex (session => session.id === id);
        
        if (this.sessions[index].maxPeople != -1) {
            if (this.sessions[index].maxPeople == this.sessions[index].numPeople) return false;
        }

        this.sessions[index].numPeople++;

        return true;
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

    updateSession (id:string, title:string, tagline:string, location:Locations,
                   time:any, room:string, subject:string, maxPeople:number) : Session {
        let index : number = this.sessions.findIndex(session => session.id === id); 
        this.sessions[index] = {
            id: id,
            title,
            time,
            tagline,
            room,
            subject,
            location,
            numPeople: this.sessions[index].numPeople,
            maxPeople,
        };

        console.log (room);

        return this.sessions[index];
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
