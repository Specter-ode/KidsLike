export interface IFormTextField {
    label: string;
    error: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type: string;
    placeholder?: string;
    title: string;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    helper: string;
  }