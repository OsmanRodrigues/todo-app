export type DatabaseAction<DTOType, DataType> = (
  DTO: DTOType
) => Promise<DataType>;
