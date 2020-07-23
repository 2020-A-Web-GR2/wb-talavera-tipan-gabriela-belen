//para el nombre
// @IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()

//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsPositive()
//@IsOptional()
//@IsNumber()

import {
    IsAlpha, IsInt,
    IsNotEmpty,
    IsNumber, IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class DeberCreateDto {

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    username: string;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    valor1:number;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    valor2:number;
}