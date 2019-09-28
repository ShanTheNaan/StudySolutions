import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, Locations } from './sessions.model';

@Controller('sessions')
export class SessionsController {
    constructor (private ss : SessionsService) {}
       
    @Get ()
    getAllSessions() : Session[] {
        return this.ss.getAllSessions();
    }

    @Get ('/:id')
    getSession(@Param ('id') id : string ) : Session {
        return this.ss.getSessionById(id);
    }

    @Post ()
    createSession(
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
    ) : Session {

        let loc : Locations;
        if (location == "Min Kao") {
            loc = Locations.MK;
        } else {
            loc = Locations.LIB;
        }

        return this.ss.createSession (title, tagline, loc, time, room, subject, maxPeople);
    }

    @Put ('/:id')
    addPerson (@Param ('id') id:string) {
        this.ss.addPerson(id);
        return "Added!";
    }

    @Patch ('/:id')
    updateSession (
        @Param ('id') id : string,
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
    ) : Session {
        let loc : Locations;
        if (location == "Min Kao") {
            loc = Locations.MK;
        } else {
            loc = Locations.LIB;
        }

        return this.ss.updateSession (id, title, tagline, loc, time, room, subject, maxPeople);
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
