import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateTokenDto} from './dto/create-token.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Token} from "./entities/token.entity";
import {Repository} from "typeorm";
import {TokenExceptions} from "./token.exceptions";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class TokenService {
  constructor(
      @InjectRepository(Token)
      private readonly tokenRepository: Repository<Token>,

      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService,

  ) {}
  async save(createTokenDto: CreateTokenDto) {
    await this.tokenRepository.save({
        hash: createTokenDto.hash,
        user: createTokenDto.user,
    });
  }

  async refreshToken(lastToken: string) {
      const token = await this.tokenRepository.findOne({
            where: {
                hash: lastToken
            },
            relations: ['user']
      });

      if (!token) {
          throw TokenExceptions.invalidToken();
      }

        await this.tokenRepository.delete(token.id);

      return this.authService.login(token.user);
  }
}
