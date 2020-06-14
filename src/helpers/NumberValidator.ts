import Validator from './Validator';

export default class NumberValidator extends Validator<Number>
{

    constructor(obj: any, ...paths: string[])
    {
        super(obj, ...paths);

        if(this.isValid && typeof this.objToValidate !== "number")
        {
            this.AddError("wrong-type", "number", typeof this.objToValidate);
            this.isValid = false;
        }

        return this;
    }

    Length(len: number)
    {
        return this;
    }

    Equal(num: number)
    {
        if(this.isValid && this.objToValidate !== num)
        {
            this.AddError("not-equal", num, this.objToValidate);
        }
        return this;
    }

    Min(min: number)
    {
        if(this.isValid && this.objToValidate < min)
        {
            this.AddError("greater-than", min, this.objToValidate);
        }
        return this;
    }

    Max(max: number)
    {
        if(this.isValid && this.objToValidate > max)
        {
            this.AddError("less-than", max, this.objToValidate);
        }
        return this;
    }
}