import { Description } from './description.interface';

export interface Hero{
    id: Number;
    name: String;
    gender: String;
    race: Number;
    profession: String;
    age: Number;
    birth_place: String;
    look: {
        height: Number;
        hair: String;
        eyes: String;
        skin: String;
        special_characters: Array<string>;
    },
    description: Array<Description>,
    stats: {
        strenght: Number;
        endurance: Number;
        agility: Number;
        intelligence: Number;
        charisma: Number;
    }
}