import {IsAlpha, IsInt, IsNotEmpty, IsPositive, MaxLength, MinLength} from "class-validator";

export class RedUpdateDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre?: string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    tipo?: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    numElementos?: number;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    medio?: string;

    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    alcance?: number;
}