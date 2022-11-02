import { z, ZodError } from 'zod';

import { api, apiWrapper, isResponse, isUserSessionActive } from '../../../api';

type ResponseType = {
  data: null;
  error: {
    message: string;
  };
  success: boolean;
};

const LoginSchemaValidation = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export const loginAction = async ({
  request,
}: {
  request: Request;
  params: Record<string, unknown>;
}) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  // validate login input
  try {
    LoginSchemaValidation.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: {
          message: 'Please enter correct credentials',
        },
      };
    }
  }

  const apiResponse = await apiWrapper<ResponseType>(
    api.POST<typeof body, ResponseType>('users/login', body),
  );
  if (isResponse(apiResponse)) {
    // do something if repsonse is not type of successfull or unsuccessfull login
    return apiResponse;
  }
  return apiResponse;
};
