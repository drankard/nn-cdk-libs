enum ParameterType {
    String,
    Number,
    'List<Number>', 
    CommaDelimitedList,
    'AWS::EC2::KeyPair::KeyName',
    'AWS::EC2::SecurityGroup::Id',
    'AWS::EC2::Subnet::Id',
    'AWS::EC2::VPC::Id',
    'List<AWS::EC2::VPC::Id>',
    'List<AWS::EC2::SecurityGroup::Id>',
    'List<AWS::EC2::Subnet::Id>'
}



interface IProvisioningParameter {
    parameters: Record<string, ParameterType>;
}

class ProvisioningParameter implements IProvisioningParameter {
    parameters: Record<string, ParameterType>;
    constructor(parameters: Record<string, ParameterType>) {
        this.parameters = parameters;
    }

    static fromObject(obj: Record<string, string>): ProvisioningParameter {
        const parameters: Record<string, ParameterType> = {};
        for(const name in obj) {
            parameters[name] = ParameterType[name];
        }
        return new ProvisioningParameter(parameters);
    }

    public addParameter(name: string, type: ParameterType) {
        this.parameters[name] = type;
    }
}

export {ProvisioningParameter, IProvisioningParameter};