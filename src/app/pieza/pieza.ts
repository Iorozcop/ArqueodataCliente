import { Yacimiento } from '../yacimiento/yacimiento';
import { Campain } from '../campain/campain';

export class Pieza {
    id!:number;
    fecha?:Date;
    yacimiento?:Yacimiento; 
    campain?:Campain;
    material?:string;
    util?:string;
    coordenadasX?:number;
    coordenadasY?:number;
    coordenadasZ?:number;
    zona?:string;
    estado?:string;
    observaciones?:string;
    foto?:string;
}
