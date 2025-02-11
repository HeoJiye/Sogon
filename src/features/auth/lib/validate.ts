import { EASY_STRINGS, FORM_VALIDATION_MESSAGES } from '../model';

export const requiredValidation = {
  required: FORM_VALIDATION_MESSAGES.REQUIRED,
};

export const emailValidation = {
  ...requiredValidation,
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: FORM_VALIDATION_MESSAGES.INVALID_EMAIL,
  },
};

export const passwordValidation = {
  ...requiredValidation,
  minLength: {
    value: 8,
    message: FORM_VALIDATION_MESSAGES.MIN_LENGTH(8),
  },
  validate: {
    vaildateStrength: (value: string) => {
      const matches = [/[A-Z]/.test(value), /[a-z]/.test(value), /[0-9]/.test(value), /[!@#$%^&*]/.test(value)];
      return matches.filter(Boolean).length > 3 || FORM_VALIDATION_MESSAGES.STRONG_PASSWORD;
    },
    notEasyString: (value: string) =>
      !EASY_STRINGS.some((easyString) => value.includes(easyString)) || FORM_VALIDATION_MESSAGES.EASY_PASSWORD,
  },
};

export const passwordConfirmValidation = (password: string) => ({
  ...requiredValidation,
  validate: (value: string) => value === password || FORM_VALIDATION_MESSAGES.PASSWORD_MISMATCH,
});
