type DatabaseAction<DTOType, RecordType> = (
  DTO: DTOType
) => Promise<RecordType>;

export type UserDatabaseAction<DTOType, RecordType> = DatabaseAction<
  DTOType,
  RecordType
>;

export type TaskDatabaseAction<DTOType, RecordType> = DatabaseAction<
  DTOType,
  RecordType
>;
