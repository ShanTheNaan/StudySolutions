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
        if (location == 'Min Kao') {
            loc = Locations.MK;
        } else if (location == 'Hodges Library') {
            loc = Locations.LIB;
        } else if (location == 'Stokely'){
            loc = Locations.STO;
        } else if (location == 'Haslam'){
            loc = Locations.HAS;
        } else if (location == 'Studen Union'){
            loc = Locations.SU;
        } else {
            loc = Locations.LIB;
        }
        const session = await this.ss.createSession (title, tagline, loc, time, room, subject, maxPeople, numPeople);
        return session;
    }

    @Put ('/:id/:numPeople')
    async addPerson (@Param ('id') id:string, @Param('numPeople') numPeople:number) {
        const ppl = await this.ss.addPerson(id, numPeople);
        return ppl;
    }

    @Patch ('/:id')
    async updateSession (
        @Param ('id') id : string,
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time : string,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
        @Body ('numPeople') numPeople : number,
    ){
        let loc : Locations;
        if (location == 'Min Kao') {
            loc = Locations.MK;
        } else if (location == 'Hodges Library') {
            loc = Locations.LIB;
        } else if (location == 'Stokely'){
            loc = Locations.STO;
        } else if (location == 'Haslam'){
            loc = Locations.HAS;
        } else if (location == 'Studen Union'){
            loc = Locations.SU;
        } else {
            loc = Locations.LIB;
        }

        const session = await this.ss.updateSession(id, title, tagline, loc, time, room, subject, maxPeople, numPeople);
        return session;
    }

    @Delete ('/:id')
    async deleteSession (@Param ('id') id : string) {
        await this.ss.deleteSession(id);
        return null;
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
