import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {DeberCreateDto} from "./deber.create-dto";

@Controller('deber-calculadora')

export class HttpDeberController{

    @Get('holi')
    holiGet() {
        return '******Gabriela Talavera' +
            '******Aplicaciones Web 2020A******'
    }


    //http://localhost:3001/deber-calculadora/sumar/2?n1=6
    @Get('/sumar/:n2')
    @HttpCode(200)
    async sumar(
        @Query() parametrosConsulta, //n1
        @Param() parametrosRuta,  //n2
        @Req() req,
        @Res() res
    ) {

        if (this.verificarCookies(req)) {
            const valores=new DeberCreateDto()
            valores.valor1= Number(parametrosConsulta.n1)
            valores.valor2= Number(parametrosRuta.n2)
            //res.header('Cabecera', 'Dinamica');
            try {
                //console.log(parametrosConsulta.n1 + parametrosRuta.n2)
                const errores: ValidationError[] = await validate(valores)
                if (errores.length < 0) {
                    console.error('Errooor', errores)
                    throw new BadRequestException("Datos incorrectos")
                } else {
                    return valores.valor2 + valores.valor1
                }
            }catch(e){
                console.error('Error', valores.valor2);
                console.error('Error', valores.valor1);
                throw new BadRequestException('Error con clase validator')
            }

        }else{
            return 'Registre un usuario'
        }
    }


    @Put('/restar')
    @HttpCode(201)
    async restar(
        @Body() parametrosCuerpo, //n1, n2
        @Req() req
    ) {
        if (this.verificarCookies(req)) {
            const valores = new DeberCreateDto()
            valores.valor1 = parametrosCuerpo.n1
            valores.valor2 = parametrosCuerpo.n2
            //res.header('Cabecera', 'Dinamica');
            try {
                const errores: ValidationError[] = await validate(valores)
                if (errores.length > 0) {
                    console.error('Errooooor', errores)
                    throw new BadRequestException("Datos son incorrectos")
                } else {
                    //return "ok"
                    return valores.valor1 - valores.valor2
                }
            } catch (e) {
                throw new BadRequestException("Error usando las validaciones")
            }
        } else {
            return 'Registre un usuario'
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    async multiplicar(
        @Headers() cabecera,
        @Req() req
    ){
        if(this.verificarCookies(req)){
            const valores=new DeberCreateDto()
            valores.valor1=Number(cabecera.n1)
            valores.valor2=Number(cabecera.n2)
            //res.header('Cabecera', 'Dinamica');
            try{
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errooor',errores)
                    throw new BadRequestException("Datos ingresados incorrectos")
                }else{
                    //return "ok"
                    return valores.valor1*valores.valor2
                }
            }catch (e){
                throw new BadRequestException("Error con class-validator")
            }

        }else{
            return 'Registre un usuario'
        }
    }

    @Post('division/:n1/div/:n2')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta,
        @Req() req

    ){
        const bandera=this.verificarCookies(req)
        if(bandera){
            const valores=new DeberCreateDto()
            valores.valor1=Number(parametrosRuta.n1)
            valores.valor2=Number(parametrosRuta.n2)
            try{
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errooor',errores)
                    throw new BadRequestException("Datos ingresados incorrectos")
                }else{
                    if(valores.valor2==0){
                        console.log('No se puede dividir para cero')
                        throw new BadRequestException("Datos ingresados incorrectos")
                    }else{
                        return valores.valor1/valores.valor2
                    }

                }
            }catch (e){
                throw new BadRequestException("No es posible la peticion")
            }
        }else{
            return 'Registre un usuario'
        }
    }

    //http://localhost:3001/deber-calculadora/guardarCookieUsername?username=Gaby
    @Get("guardarCookieUsername")
    @HttpCode(201)
    guardarCookie(
        @Query() parametrosConsulta,
        @Req() req,
        @Res()  res
    ) {
            const validarNombre = parametrosConsulta.username;
                if(validarNombre){
                res.cookie('username', validarNombre);
                const mensaje={
                    mensaje: "El nombre de usuario " + parametrosConsulta.username + "  Se ha creado correctamente"
                }

                res.send(mensaje);
                //Ingresar acceso a calculadora
            }else{
                 throw new BadRequestException('Ingrese el nombre de usuario')
                }
        }


    @Get("verificarCookies")
    verificarCookies(
        @Req() req, // request - peticion
    ){
        const mensaje=req.cookies
        if(mensaje.username){

            const mensaje ={
                sinFirmar: req.cookies,
            };
            return true;
            //return mensaje;
        }else{
            return false;
        }
    }
}