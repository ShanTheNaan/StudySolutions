import { Controller, Get, Post, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, Locations } from './sessions.model';

@Controller('sessions')
export class SessionsController {
    constructor (private ss : SessionsService) {}
       
    @Get()
    getAllSessions() : Session[] {
        return this.ss.getAllSessions();
    }

    @Post()
    createSession(
        @Body ('title') title : string,
        @Body ('tagline') tagline: string,
        @Body ('location') location : string,
        @Body ('time') time,
        @Body ('room') room : string,
        @Body ('subject') subject : string,
        @Body ('maxPeople') maxPeople : number,
    ) : Session {

        var loc : Locations;
        if (location == "Min Kao") {
            loc = Locations.MK;
        } else {
            loc = Locations.LIB;
        }

        return this.ss.createSession (title, tagline, loc, time, room, subject, maxPeople);
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
