import StringValidator from '../helpers/StringValidator';
import NumberValidator from '../helpers/NumberValidator';

import Race from '../race/race';
import Character from './character';

import races from '../race/races';

export default class CharacterValidator
{
    character: Character;

    errors: any[] = [];
    warnings: any[] = [];

    constructor(character: Character)
    {
        this.character = character;
        this.CheckForErrors();
        if(!this.HasErrors())
        {
            this.CheckForWarnings();
        }
    }

    CheckForErrors()
    {
        let owner = new StringValidator(this.character, "owner");
        this.errors.push(owner.errors);

        let name = new StringValidator(this.character, "name").Min(1);
        this.errors.push(name.errors);

        let age = new NumberValidator(this.character, "age").Min(0);
        this.errors.push(age.errors);

        let race = new StringValidator(this.character, "race").Equal(...races.keys());
        this.errors.push(race.errors);

        let profession = new StringValidator(this.character, "profession").Min(1);
        this.errors.push(profession.errors);

        let origin = new StringValidator(this.character, "origin").Min(1);
        this.errors.push(origin.errors);

        let strength = new NumberValidator(this.character, "attributes", "strength").Min(1).Max(6);
        this.errors.push(strength.errors);

        let endurance = new NumberValidator(this.character, "attributes", "endurance").Min(1).Max(6);
        this.errors.push(endurance.errors);

        let dexterity = new NumberValidator(this.character, "attributes", "dexterity").Min(1).Max(6);
        this.errors.push(dexterity.errors);
    
        let knowledge = new NumberValidator(this.character ,"attributes", "knowledge").Min(1).Max(6);
        this.errors.push(knowledge.errors);

        let charisma = new NumberValidator(this.character, "attributes", "charisma").Min(1).Max(6);
        this.errors.push(charisma.errors);

        let willpower = new NumberValidator(this.character, "attributes", "willpower").Min(1).Max(6);
        this.errors.push(willpower.errors);

        for(let skill in this.character.skills)
        {
            let testSkill = new NumberValidator(this.character, "skills", skill).Min(1).Max(6);
            this.errors.push(testSkill.errors);
        }

        for(let specialization in this.character.specializations)
        {
            let testSpecialization = new NumberValidator(this.character, "skills", specialization).Min(1).Max(6);
            this.errors.push(testSpecialization.errors);
        }

        this.errors = this.errors.reduce((acc, cur) => acc.concat(cur), []);
    }

    CheckForWarnings()
    {
        let race = races.get(this.character.race) as Race;

        let attributes = this.character.attributes;

        let attributePoints = Object.values(attributes).reduce((a, b) => a + b);
        race.weaknesses.forEach(weakness =>
            {
                attributePoints += (attributes[weakness as keyof typeof attributes] - 1);
            });

        let attributeValidator = new NumberValidator(attributePoints - 6).OverridePaths("attributes", "spent-points").Equal(race.attributePoints);
        this.warnings.push(attributeValidator.errors);

        let skills = this.character.skills;
        let skillPoints = 0;

        for(let skill in skills)
        {
            skillPoints += skills[skill];
        }

        let specializations = this.character.specializations;
        for(let specialization in specializations)
        {
            skillPoints += specializations[specialization];
        }
        
        let skillValidator = new NumberValidator(skillPoints).OverridePaths("skills", "spent-points").Equal(race.skillPoints);
        this.warnings.push(skillValidator.errors);

        this.warnings = this.warnings.reduce((acc, cur) => acc.concat(cur), []);
    }

    Errors(): any[]
    {
        return this.errors;
    }

    Warnings(): any[]
    {
        return this.warnings;
    }

    HasErrors(): boolean
    {
        return this.errors.length > 0;
    }

    HasWarnings(): boolean
    {
        return this.warnings.length > 0;
    }
}