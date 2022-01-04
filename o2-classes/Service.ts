import { ICloudAssembly } from './CloudAssembly';
import {ServiceClass} from './ServiceClass';

enum ServiceState {
    CREATED,
    RUNNING,
    STOPED,
    PROVISIONING,
    UNPROVISIONED
}

interface ServiceParams {
    name: string,
    serviceClass: ServiceClass,
    cloudAssembly: ICloudAssembly;
}

class Service {
    name: string;
    serviceClass: ServiceClass;
    state: ServiceState;
    cloudAssembly: ICloudAssembly;

    private constructor({name, serviceClass, cloudAssembly}: ServiceParams) {
        this.name = name;
        this.serviceClass = serviceClass;
        this.state = ServiceState.CREATED;
        this.cloudAssembly = cloudAssembly;
    }
    public static create(params: ServiceParams): Service {
        return new Service(params);
    }
    public setState(state: ServiceState) {
        this.state = state;
    }
}

export {Service}
