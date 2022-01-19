import { ApplicationException } from '../exceptions/ApplicationException';

export const validateNotEmpty = (value: string, field: string) => {
  if (value.length === 0) {
    throw new ApplicationException(`${field} length should not be empty.`);
  }
};

export const validateLength = (
  value: string,
  field: string,
  length: number,
) => {
  if (value.length < length) {
    throw new ApplicationException(
      `${field} length should have at least ${length} characters.`,
    );
  }
};
