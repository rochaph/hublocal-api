import { ApplicationException } from '../exceptions/ApplicationException';

export const validatePrincipal = (filtered: unknown[], label: string) => {
  if (filtered.length !== 1) {
    throw new ApplicationException(
      `${label} should have ${filtered.length > 1 ? 'only' : ''}1 principal`,
    );
  }
};
