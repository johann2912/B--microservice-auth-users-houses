import { IFormatExceptionMessage } from "./exception";

export interface IException {
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    UnauthorizedException(data?: IFormatExceptionMessage): void;
    notFoundException(data?: IFormatExceptionMessage): void;
};