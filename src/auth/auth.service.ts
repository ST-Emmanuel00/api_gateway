import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { LogInDto } from './dto/login-auth.dto';
import { envs } from 'src/config';

@Injectable()
export class AuthService {

  private readonly url = envs.AUTH_SERVICE

  constructor(private readonly httpService: HttpService) { }

  async login(logInDto: LogInDto) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.url}/login`, logInDto)
      );
      return response.data

    } catch (error) {
      throw new HttpException(error  , HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}
