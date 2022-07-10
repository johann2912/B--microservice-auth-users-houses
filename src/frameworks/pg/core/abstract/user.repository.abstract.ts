import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IUserRepository<T> extends IGenericRepository<T> {
    public abstract findByEmail(email:string): Promise<T>;
};