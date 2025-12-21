export interface ISetPassportData extends IPassportIncludes {
    documentTypeId?: number | null;
    seria: string;
    number: string | null;
    dateOfBirth: string | null;
    pinfl: string | null;
  }
  
  export interface IPassportIncludes {
    includePhoto?: boolean;
    includePension?: boolean;
    includeDisabilityGroup?: boolean;
    includeAddress?: boolean;
    includeNeurologicInfo?: boolean;
    includeDivorceInfo?: boolean;
    includeMariageInfo?: boolean;
    includeSalaryInfo?: boolean;
    includePositionInfo?: boolean;
    includeKadastrInfo?: boolean;
    includeDiplomaInfo?: boolean;
    includeWomenNotebookInfo?: boolean;
    includeAlimentInfo?: boolean;
    includeDebtInfo?: boolean;
  }
  