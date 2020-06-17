import * as fs from 'fs';

if(!fs.existsSync('./databases/'))
{
    fs.mkdirSync('./databases/');
}

import Database from './Database';

import { User } from 'user';
import Character from 'character/character';

const userDb = new Database<User>('./databases/users.db');
const characterDb = new Database<Character>('./databases/characters.db');
userDb.load();
characterDb.load();

export { userDb, characterDb };