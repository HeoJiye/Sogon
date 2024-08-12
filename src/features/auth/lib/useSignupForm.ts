import { useForm } from 'react-hook-form';

const EASY_STRINGS = ['1234', 'abcd', 'password', 'qwer', 'asdf', 'zxcv'];

export interface SignupFormSchema {
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignupForm() {
  const { register, handleSubmit, watch, formState } = useForm<SignupFormSchema>();

  // Register functions for each field
  const emailRegister = register('email', {
    required: '이메일은 필수 입력 항목입니다.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효하지 않은 이메일 형식이에요.',
    },
  });

  const passwordRegister = register('password', {
    required: '비밀번호는 필수 입력 항목입니다.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8글자 이상이어야 해요.',
    },
    validate: {
      hasUpperCase: (value) => /[A-Z]/.test(value) || '비밀번호에 대문자가 포함되어야 합니다.',
      hasLowerCase: (value) => /[a-z]/.test(value) || '비밀번호에 소문자가 포함되어야 합니다.',
      hasNumber: (value) => /[0-9]/.test(value) || '비밀번호에 숫자가 포함되어야 합니다.',
      hasSpecialChar: (value) => /[!@#$%^&*]/.test(value) || '비밀번호에 특수문자가 포함되어야 합니다.',
      notEasyString: (value) =>
        !EASY_STRINGS.some((easyString) => value.includes(easyString)) || '너무 쉬운 문자열이 포함되어 있어요.',
    },
  });

  const passwordConfirmRegister = register('passwordConfirm', {
    required: '비밀번호 확인은 필수 입력 항목입니다.',
    validate: (value) => value === watch('password') || '비밀번호가 일치하지 않아요.',
  });

  return {
    register: {
      email: emailRegister,
      password: passwordRegister,
      passwordConfirm: passwordConfirmRegister,
    },
    handleSubmit,
    watch,
    formState,
  };
}
