import {Body, Controller, Put} from '@nestjs/common';
import {TokenService} from './token.service';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Public} from "../decorators/Public";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

const routeName = 'token'
@ApiTags(routeName)
@Controller(routeName)
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  @Public()
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.tokenService.refreshToken(refreshTokenDto.lastToken);
    }
}
