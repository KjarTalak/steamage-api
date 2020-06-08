import { errorMonitor } from "events";

export interface Character
{
    owner: string;
    _id: string;
    name: string;
    age: number;
    race: string;
    profession: string;
    origin: string;
    eyeColor?: string;
    hairColor?: string;
    characteristics?: string;
    attributes:
    {
        strength: number;
        endurance: number;
        dexterity: number;
        knowledge: number;
        charisma: number;
        willpower: number;
    }
    secondaryAttribute:
    {
        health:
        {
            maximum: number;
            current: number;
        }
        resistance:
        {
            maximum: number;
            current: number;
        }
        resilience:
        {
            maximum: number;
            current: number;
        }
    }
    expertise: number;
    skills?: any;
    specializations?: any;
    inventory: any[];
}

class CharacterError
{
    code: string;
    message: string;

    constructor(code: string, message: string)
    {
        this.message = message;
        this.code = code;
    }
}

export function ValidateCharacter(character: any): CharacterError[]
{
    const errors: CharacterError[] = [];

    if(!character.hasOwnProperty("owner"))
    {
        errors.push(new CharacterError("CH1", "owner is missing"));
    }

    if(!character.hasOwnProperty("name"))
    {
        errors.push(new CharacterError("CH2-1", "name is missing"));
    }
    else if(typeof character.name !== "string")
    {
        errors.push(new CharacterError("CH2-2", "name is not a string"));
    }

    if(!character.hasOwnProperty("age"))
    {
        errors.push(new CharacterError("CH3-1", "age is missing"));
    }
    else if(typeof character.age !== "number")
    {
        errors.push(new CharacterError("CH3-2", "age is not a number"));
    }
    else if(character.age <= 0)
    {
        errors.push(new CharacterError("CH3-3", "age cannot be 0 or below 0"));
    }

    if(!character.hasOwnProperty("race"))
    {
        errors.push(new CharacterError("CH4-1", "race is missing"));
    }
    else if(typeof character.race !== "string")
    {
        errors.push(new CharacterError("CH4-2", "race is not a string"))
    }
    else if(character.race !== "human" &&
        character.race !== "dwarf" &&
        character.race !== "elf" &&
        character.race !== "desertelf" &&
        character.race !== "chimera")
        {
            errors.push(new CharacterError("CH4-3", "race is not valid, must be human, dwarf, elf, desertelf or chimera"))
        }

    if(!character.hasOwnProperty("profession"))
    {
        errors.push(new CharacterError("CH5-1", "profession is missing"));
    }
    else if(typeof character.profession !== "string")
    {
        errors.push(new CharacterError("CH5-2", "profession is not a string"));
    }

    if(!character.hasOwnProperty("origin"))
    {
        errors.push(new CharacterError("CH6-1", "origin is missing"));
    }
    else if(typeof character.origin !== "string")
    {
        errors.push(new CharacterError("CH6-2", "origin is not a string"));
    }

    if(!character.hasOwnProperty("attributes"))
    {
        errors.push(new CharacterError("CH7-1", "attributes are missing"));
    }
    else if(typeof character.attributes !== "object")
    {
        errors.push(new CharacterError("CH7-2", "attributes are not an object"));
    }
    else
    {
        if(!character.attributes.hasOwnProperty("strength"))
        {
            errors.push(new CharacterError("CH8-1-1", "strength is missing"));
        }
        else if(typeof character.attributes.strength !== "number")
        {
            errors.push(new CharacterError("CH8-1-2", "strength is not a number"));
        }
        else if(character.attributes.strength < 1 || character.attributes.strength > 6)
        {
            errors.push(new CharacterError("CH8-1-3", "strength must be at least 1 and at most 6"));
        }

        if(!character.attributes.hasOwnProperty("endurance"))
        {
            errors.push(new CharacterError("CH8-2-1", "endurance is missing"));
        }
        else if(typeof character.attributes.endurance !== "number")
        {
            errors.push(new CharacterError("CH8-2-2", "endurance is not a number"));
        }
        else if(character.attributes.endurance < 1 || character.attributes.endurance > 6)
        {
            errors.push(new CharacterError("CH8-2-3", "endurance must be at least 1 and at most 6"));
        }

        if(!character.attributes.hasOwnProperty("dexterity"))
        {
            errors.push(new CharacterError("CH8-3-1", "dexterity is missing"));
        }
        else if(typeof character.attributes.dexterity !== "number")
        {
            errors.push(new CharacterError("CH8-3-2", "dexterity is not a number"));
        }
        else if(character.attributes.dexterity < 1 || character.attributes.dexterity > 6)
        {
            errors.push(new CharacterError("CH8-3-3", "dexterity must be at least 1 and at most 6"));
        }

        if(!character.attributes.hasOwnProperty("knowledge"))
        {
            errors.push(new CharacterError("CH8-4-1", "knowledge is missing"));
        }
        else if(typeof character.attributes.knowledge !== "number")
        {
            errors.push(new CharacterError("CH8-4-2", "knowledge is not a number"));
        }
        else if(character.attributes.knowledge < 1 || character.attributes.knowledge > 6)
        {
            errors.push(new CharacterError("CH8-4-3", "knowledge must be at least 1 and at most 6"));
        }

        if(!character.attributes.hasOwnProperty("charisma"))
        {
            errors.push(new CharacterError("CH8-5-1", "charisma is missing"));
        }
        else if(typeof character.attributes.charisma !== "number")
        {
            errors.push(new CharacterError("CH8-5-2", "charisma is not a number"));
        }
        else if(character.attributes.charisma < 1 || character.attributes.charisma > 6)
        {
            errors.push(new CharacterError("CH8-5-3", "charisma must be at least 1 and at most 6"));
        }

        if(!character.attributes.hasOwnProperty("willpower"))
        {
            errors.push(new CharacterError("CH8-6-1", "willpower is missing"));
        }
        else if(typeof character.attributes.willpower !== "number")
        {
            errors.push(new CharacterError("CH8-6-2", "willpower is not a number"));
        }
        else if(character.attributes.willpower < 1 || character.attributes.willpower > 6)
        {
            errors.push(new CharacterError("CH8-6-3", "willpower must be at least 1 and at most 6"));
        }
    }

    return errors;
}