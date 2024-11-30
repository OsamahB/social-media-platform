import { HttpStatus, ValidationPipe } from '@nestjs/common';

// Password should have upper case, lowcase letter and number
const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const REGEX = {
  PASSWORD_RULE,
};

export const INPUT_VALIDATION = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});
