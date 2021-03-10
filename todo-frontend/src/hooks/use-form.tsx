import * as React from 'react';

interface UseFormReturn<ValueType> {
  value: any;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSetValue: (newValue: any) => void;
}

interface UseFormParams {
  initialValue?: Record<string, unknown>;
}

type UseForm = <ValueType>(
  params?: UseFormParams
) => UseFormReturn<ValueType | unknown>;

export const useForm: UseForm = params => {
  const [value, setValue] = React.useState(params?.initialValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value: inputValue, name: inputName } = event.target;

    setValue({ ...value, [inputName]: inputValue });
  };
  const handleSetValue = (newValue: typeof value) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    handleSetValue
  };
};
