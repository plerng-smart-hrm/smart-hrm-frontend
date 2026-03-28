export interface ISelectOption {
  label: string;
  value: any;
}

interface IComponent {
  field?: any;
  error?: any;
  optional?: any;
  handleEvent?: (_value?: any) => void;
}

interface IFormField {
  label?: string;
  key: string;
  type?: string;
  required?: boolean;
  dataType?: string;
  colSpan?: string;
  options?: ISelectOption[];
  handleEvent?: (_value?: any) => void;
  component?: ({
    field,
    error,
    handleEvent,
    optional,
  }: IComponent) => React.ReactNode | null;
  helper?: string;
  rows?: number;
  icon?: any;
  className?: string;
  readonly?: boolean;
  inputType?: string;
}

export interface IFormType {
  section?: string;
  form: IFormField[];
}

export interface IBaseResponseMutation {
  status: number;
  message: string;
  code?: number;
  data?: any;
}
