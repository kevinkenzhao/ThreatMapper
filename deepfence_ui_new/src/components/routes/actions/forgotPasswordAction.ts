import { z, ZodError } from 'zod';

const ForgotPasswordSchemaValidation = z
  .object({
    newPassword: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password length must be of minimum 6 characters',
      })
      .max(50, {
        message: 'Password length must be of maximum 50 characters',
      })
      .trim(),
    confirmNewPassword: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password length must be of minimum 6 characters',
      })
      .max(50, {
        message: 'Password length must be of maximum 50 characters',
      })
      .trim(),
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Confirm Password doesn't match",
    path: ['confirmNewPassword'], // path of error
  });

export const forgotPasswordAction = async ({
  request,
}: {
  request: Request;
  params: Record<string, unknown>;
}) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  try {
    ForgotPasswordSchemaValidation.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const { fieldErrors: errors } = error.flatten();
      return {
        errors,
      };
    }
  }

  return;
};
