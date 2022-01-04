import { AccessObject } from './AccessObject';
import { CloudAssembly } from './CloudAssembly';
import { ProvisioningParameter } from './ProvisioningContext';
import { ServiceClass } from './ServiceClass'
import {Dataset, IDatasetParams} from './Dataset'
const adGroups = ['GR1', 'GR2'];
const adAos = AccessObject.fromList(adGroups.map(group => group));
const usernames = ['user1', 'user2'];
const usernameAos = AccessObject.fromList(usernames.map(username => usernames));

const caPprovisioningParameterSpec = ProvisioningParameter.fromObject({
    'instance-type': 'String',
    'region': 'String',
});

const rStudioServiceClass = ServiceClass.create({
    name: 'RStudioServer',
    version: '1.0.4',
    description: 'Dette er min HELT egen RStudio server',
    accessObjects: adAos.concat(usernameAos)
});

const rStudioCloudAssembly = CloudAssembly.create({
    name: 'MyRStidoip',
    version: '1.2.3333'
});;
rStudioServiceClass.addCloudAssembly(rStudioCloudAssembly);

rStudioCloudAssembly.addParameters({
    'instance-type': 'String',
    'region': 'String',
});

rStudioCloudAssembly.sign('./fdf');
rStudioCloudAssembly.publish();
rStudioServiceClass.addCloudAssembly(rStudioCloudAssembly);

Dataset.create({
    name: 'ssss',
    
})