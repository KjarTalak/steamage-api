import Validator from './Validator';

export default class StringValidator extends Validator<string>
{
    constructor(obj: any, ...paths: string[])
    {
        super(obj, ...paths);

        if(this.isValid && typeof this.objToValidate !== "string")
        {
            this.AddError("wrong-type", "string", typeof this.objToValidate);
            this.isValid = false;
        }

        return this;
    }

    Length(len: number)
    {
        if(this.isValid && this.objToValidate.length < len)
        {
            this.AddError("length-not-equal", len, this.objToValidate.length);
        }

        return this;
    }

    Equal(...compares: string[])
    {
        if(this.isValid)
        {
            if(!compares.some((str) => str === this.objToValidate))
            {
                this.AddError("content-not-equal", compares, this.objToValidate);
            }
        }
        return this;
    }

    Min(min: number)
    {
        if(this.isValid && this.objToValidate.length < min)
        {
            this.AddError("less-than", min, this.objToValidate.length);
        }
        return this;
    }

    Max(max: number)
    {
        if(this.isValid && this.objToValidate.length < max)
        {
            this.AddError("greater-than", max, this.objToValidate.length);
        }

        return this;
    }
}