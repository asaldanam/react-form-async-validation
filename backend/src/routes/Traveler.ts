import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import { Traveler } from 'src/services/Traveler';

const traveler = new Traveler();

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export function validateTraveler(req: any, res: Response) {
    const body = req.body;
    if (!body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const validation = traveler.validateUser(body);
    return res.status(OK).json(validation);
}

