export default interface IValidator<T>
{
    objToValidate: any;

    Length(len: number): T;

    Equal(compare: any | any[]): T;
    Min(min: number): T;
    Max(max: number): T;
}