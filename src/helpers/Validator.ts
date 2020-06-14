import IValidator from './IValidator';

export default abstract class Validator<T> implements IValidator<Validator<T>>
{
    objToValidate: T;
    paths: string[];
    errors: any[] = [];
    isValid: boolean = true;

    constructor(obj: any, ...paths: string[])
    {
        this.paths = paths;

        let objToValidate = obj;
        paths.reduce((acc, cur) =>
        {
            if(objToValidate)
            {
                objToValidate = objToValidate[cur];
            }
            return "";
        }, "");

        if(typeof objToValidate === "undefined")
        {
            this.errors.push(
                {
                    paths: this.paths,
                    constraint: "missing"
                });
            this.isValid = false;
        }
        this.objToValidate = objToValidate;

        return this;
    }

    Length(len: number)
    {
        return this;
    }

    Equal(compare: any | any[])
    {
        return this;
    }

    Min(min: number)
    {
        return this;
    }

    Max(max: number)
    {
        return this;
    }

    AddError(constraint: string, expected: any, actual: any)
    {
        this.errors.push(
        {
            paths: this.paths,
            constraint: constraint,
            expected: expected,
            actual: actual
        })
    }
}