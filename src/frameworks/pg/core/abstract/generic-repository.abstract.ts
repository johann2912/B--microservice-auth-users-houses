export abstract class IGenericRepository<T> {
    public abstract findAll(): Promise<T[]>;
    public abstract findOne(id:string): Promise<T>;
    public abstract create(item:T): Promise<T>;
    public abstract update(id:string, item: T): Promise<void>;
    public abstract delete(id:string): Promise<void>;
};