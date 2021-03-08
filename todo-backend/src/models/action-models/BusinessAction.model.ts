type Token = { token: string };

export type BusinessAction<DTOType> = (dto: DTOType) => Promise<Token>;
