import Nedb from 'nedb';
import { throws } from 'assert';

export default class Database<T>
{
    private database: Nedb<T>;

    constructor(pathOrOptions: string | Nedb.DataStoreOptions)
    {
        this.database = new Nedb(pathOrOptions);
    }

    load()
    {
        this.database.loadDatabase();
    }

    find(query: any): Promise<T[]>
    {
        return new Promise((resolve, reject) =>
        {
            this.database.find(query, function(err, documents)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(documents);
            });
        });
    }

    findOne(query: any): Promise<T>
    {
        return new Promise((resolve, reject) =>
        {
            this.database.findOne(query, function(err, document)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(document);
            });
        });
    }

    insert(newDoc: T): Promise<T>
    {
        return new Promise((resolve, reject) =>
        {
            this.database.insert(newDoc, function(err, document)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(document);
            });
        });
    }

    update(query: any, updateQuery: any): Promise<Number>
    {
        return new Promise((resolve, reject) =>
        {
            this.database.update(query, updateQuery, {}, function(err, numReplaced)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(numReplaced);
            })
        });
    }

    remove(query: any): Promise<Number>
    {
        return new Promise((resolve, reject) =>
        {
            this.database.remove(query, function(err, n)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(n);
            });
        });
    }
}