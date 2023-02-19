export interface IFormItem {
    label: string;
    name: string;
    required?: boolean;
    type: string;
    placeholder?: string;
    title: string;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    helper: string;
  }