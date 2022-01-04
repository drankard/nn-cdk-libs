import {IProvisioningParameter, ProvisioningParameter} from './ProvisioningContext';


class CloudAssemblySignerSigner {
    readonly bucketName: string;
    constructor(bucketName: string) {
        this.bucketName = bucketName;
    }
    public getSignedUrl(localFile: string) {
        console.log(`Signing S3 Url ${localFile}`);
        return "https://some.s3.url";
    }
}

class CloudAssemblyPublisher {
    readonly signedUrl: string;
    constructor(signedUrl: string) {
        this.signedUrl = signedUrl;
    }
    public publish(cloudAssembly: CloudAssembly): boolean {
        console.log("Publishing CloudAssembly");
        return true;
    }
}

enum CloudAssemblyState {
    CREATED,
    SIGNED,
    PUBLISHED,
    READY,
    OFFLINE
}


interface ICloudAssemblyProps {
    name: string;
    version: string;
    provisioningParameters?: IProvisioningParameter;
}
interface ICloudAssembly {
    name: string,
    version: string,
    state: CloudAssemblyState,
    provisioningParameters?: IProvisioningParameter;
}

class CloudAssembly implements ICloudAssembly {
    readonly name: string;
    readonly version: string;
    
    private signedUrl: string;
    private _state: CloudAssemblyState;
    
    provisioningParameters: IProvisioningParameter;

    constructor(props: ICloudAssemblyProps) {
        this.name = props.name;
        this.version = props.version;
        this._state = CloudAssemblyState.CREATED;
    }

    public static create(props: ICloudAssemblyProps): CloudAssembly{
        return new CloudAssembly(props);
    }
    
    public addParameters(parameterSpec: Record<string, string>) {
        this.provisioningParameters = ProvisioningParameter.fromObject(parameterSpec);
    }

    public sign(localFile: string): boolean {
        this.signedUrl = new CloudAssemblySignerSigner('some-bucket').getSignedUrl(localFile);
        this._state = CloudAssemblyState.SIGNED;
        return true;
    }

    public publish(): boolean {
        new CloudAssemblyPublisher(this.signedUrl).publish(this);
        this._state = CloudAssemblyState.PUBLISHED;
        return true;
    }

    get state (): CloudAssemblyState {
        return this._state;
    }
    set state (state: CloudAssemblyState) {
        // Validate valid..
        this._state = state;
    }
}

export {CloudAssembly, ICloudAssembly, ICloudAssemblyProps, CloudAssemblyState}