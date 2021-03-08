type Token = { token: string };

export type BusinessAction<DTOType> = (DTO: DTOType) => Promise<Token>;
