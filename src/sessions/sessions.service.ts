import { Injectable, NotFoundException } from '@nestjs/common';
import { Session, Locations } from './sessions.model';
import * as uuid from 'uuid/v1';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class SessionsService {
    private sessions : Session[] = [];

    constructor(@InjectModel('Session') private readonly sessionModel: Model<Session>, ) {

    }

    async getAllSessions () : Promise<Session []>{
        const sessions = await this.sessionModel.find().exec();
        return sessions as Session[];
    }

    async getSessionById (id : string) {
        const session = await this.findSession(id);
        return {
            id: session.id,
            title: session.title,
            tagline: session.tagline,
            location: session.location,
            room: session.room,
            time: session.time,
            subject: session.subject,
            numPeople: session.numPeople,
            maxPeople: session.maxPeople,
        };
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

    async createSession (title:string, tagline:string, location:Locations, time:Date, room:string, subject:string, maxPeople:number, numPeople:number){
        const newSession = new this.sessionModel({
            title : title,
            time : time,
            tagline,
            room : room,
            subject : subject,
            location : location,
            numPeople : numPeople,
            maxPeople : maxPeople,
        });
        const result = await newSession.save();
        console.log(result);
    }

    async updateSession (id:string, title:string, tagline:string, location:Locations,
                   time:Date, room:string, subject:string, maxPeople:number, numPeople:number) {
        const session = await this.findSession(id);
        if(title){
            session.title = title;
        }
        if(tagline){
            session.tagline = tagline;
        }
        if(location){
            session.location = location;
        }
        if(time){
            session.time = time;
        }
        if(room){
            session.room = room;
        }
        if(subject){
            session.subject = subject;
        }
        if(numPeople){
            session.numPeople = numPeople;
        }
        if(maxPeople){
            session.maxPeople = maxPeople;
        }

        session.save();
        return session;
    }

    private async findSession(id : string) : Promise<Session>{
        let session;
        try{
            const session = await this.sessionModel.findById(id);
        } catch(error){
            throw new NotFoundException('Session not found');
        }
        
        if(!session){
            throw new NotFoundException('Session not found');
        }

        return session;
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
