import { AccessObject } from './AccessObject';
import { CloudAssemblyState, ICloudAssembly } from './CloudAssembly';


interface IServiceClassParams {
    name: string;
    version: string;
    description?: string;
    accessObjects: AccessObject[];
    cloudAssemblies?: ICloudAssembly[];
}

class ServiceClass {
    name: string;
    version: string;
    description?: string;
    accessObjects: AccessObject[];
    cloudAssemblies: ICloudAssembly[];
    constructor({name, version, description, accessObjects, cloudAssemblies}: IServiceClassParams) {
        this.name = name;
        this.version = version;
        this.description = description;
        this.accessObjects = accessObjects;
        if(cloudAssemblies) {
            cloudAssemblies.map(cloudAssembly => {
                this.addCloudAssembly(cloudAssembly)
            })
        }
    }

    static create(params: IServiceClassParams): ServiceClass {
        return new ServiceClass((params));
    }

    public addCloudAssembly(cloudAssembly: ICloudAssembly){
        if(cloudAssembly.state == CloudAssemblyState.READY) {
            this.cloudAssemblies.push(cloudAssembly);
        } else {
            throw new Error("CloudAssembly not READY");
        }
    }
}

export { ServiceClass };
