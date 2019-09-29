import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Session, Locations } from './sessions.model';
import * as uuid from 'uuid/v1';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';
import { timer } from 'rxjs';

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

    async deleteSession (Id : string) {
        const result = await this.sessionModel.deleteOne({_id: Id}).exec();
        if(result.n == 0){
            throw new NotFoundException('Could not find session.');
        }
    }

    async addPerson (id : string, numPeople : number) {
        const session = await this.findSession(id);
        const oldNum = session.numPeople;
        if(!session.maxPeople || (session.numPeople + numPeople) <= session.maxPeople){
            session.numPeople += +numPeople;
            session.save();
        }
        if(oldNum == session.numPeople){
            throw new NotAcceptableException('Number exceeds maxinum capacity.');
        }
        return session.numPeople;
    }

    async createSession (title:string, tagline:string, location:Locations, time:string, room:string, subject:string, maxPeople:number, numPeople:number){
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
                   time:string, room:string, subject:string, maxPeople:number, numPeople:number) {
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
            session = await this.sessionModel.findById(id);
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
