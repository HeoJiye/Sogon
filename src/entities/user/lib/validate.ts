import { FORM_VALIDATION_MESSAGES } from '@/shared/model/formValidationStrings';

export const nicknameValidation = {
  required: FORM_VALIDATION_MESSAGES.REQUIRED,
  minLength: {
    value: 2,
    message: FORM_VALIDATION_MESSAGES.MIN_LENGTH(2),
  },
  maxLength: {
    value: 10,
    message: FORM_VALIDATION_MESSAGES.MAX_LENGTH(10),
  },
};

export const bioValidation = {
  maxLength: {
    value: 50,
    message: FORM_VALIDATION_MESSAGES.MAX_LENGTH(50),
  },
};
