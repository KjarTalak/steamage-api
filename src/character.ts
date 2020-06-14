import StringValidator from './helpers/StringValidator';
import NumberValidator from './helpers/NumberValidator';

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

export function ValidateCharacter(character: any): any[]
{
    let errors: any[] = [];

    let owner = new StringValidator(character, "owner");
    errors.push(owner.errors);

    let name = new StringValidator(character, "name").Min(1);
    errors.push(name.errors);

    let age = new NumberValidator(character, "age").Min(0);
    errors.push(age.errors);

    let race = new StringValidator(character, "race").Equal("human", "dwarf", "elf", "desertelf", "chimera");
    errors.push(race.errors);

    let profession = new StringValidator(character, "profession").Min(1);
    errors.push(profession.errors);

    let origin = new StringValidator(character, "origin").Min(1);
    errors.push(origin.errors);

    let strength = new NumberValidator(character, "attributes", "strength").Min(1).Max(6);
    errors.push(strength.errors);

    let endurance = new NumberValidator(character, "attributes", "endurance").Min(1).Max(6);
    errors.push(endurance.errors);

    let dexterity = new NumberValidator(character, "attributes", "dexterity").Min(1).Max(6);
    errors.push(dexterity.errors);
 
    let knowledge = new NumberValidator(character ,"attributes", "knowledge").Min(1).Max(6);
    errors.push(knowledge.errors);

    let charisma = new NumberValidator(character, "attributes", "charisma").Min(1).Max(6);
    errors.push(charisma.errors);

    let willpower = new NumberValidator(character, "attributes", "willpower").Min(1).Max(6);
    errors.push(willpower.errors);

    errors = errors.reduce((acc, cur) => acc.concat(cur), []);

    return errors;
}