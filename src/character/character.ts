export default interface Character
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