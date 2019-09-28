import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, Locations } from './sessions.model';

@Controller('sessions')
export class SessionsController {
    constructor (private ss : SessionsService) {}
       
    @Get ()
    async getAllSessions() {
        const sessions = await this.ss.getAllSessions();
        return sessions.map((sess) => ({
            id: sess.id,
            title: sess.title,
            tagline: sess.tagline,
            location: sess.location,
            room: sess.room,
            time: sess.time,
            subject: sess.subject,
            numPeople: sess.numPeople,
            maxPeople: sess.maxPeople,
        }));
    }

    @Get ('/:id')
    async getSession(@Param ('id') id : string ){
        const sess = await this.ss.getSessionById(id);
        return sess;
    }

    @Post ()
    async createSession(
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time : string,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
        @Body ('numPeople') numPeople : number,
    ) {

        let loc : Locations;
        if (location == "Min Kao") {
            loc = Locations.MK;
        } else {
            loc = Locations.LIB;
        }
        let t = new Date(time);
        const session = await this.ss.createSession (title, tagline, loc, t, room, subject, maxPeople, numPeople);
        return session;
    }

    @Put ('/:id')
    addPerson (@Param ('id') id:string) {
        this.ss.addPerson(id);
        return "Added!";
    }

    @Patch ('/:id')
    async updateSession (
        @Param ('id') id : string,
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time : Date,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
        @Body ('numPeople') numPeople : number,
    ){
        let loc : Locations;
        if (location == "Min Kao") {
            loc = Locations.MK;
        } else {
            loc = Locations.LIB;
        }

        const session = await this.ss.updateSession (id, title, tagline, loc, time, room, subject, maxPeople, numPeople);
        return session;
    }

    @Delete ('/:id')
    deleteSession (@Param ('id') id : string) {
        let status = this.ss.deleteSession (id);
        return "Deleted!";
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
