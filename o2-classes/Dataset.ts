
abstract class Dataset {
    static create(params: IDatasetParams) {
        if(typeof params === INNEDLDatasetParams) {

        }
    }
}
interface IDatasetParams {
    name: string
}

interface INNEDLDatasetParams extends IDatasetParams {
    
}


class NNEDLDataset extends Dataset {
    constructor(params: INNEDLDatasetParams) {
        super();
    }
    create(params: INNEDLDatasetParams): Dataset  {
        return new NNEDLDataset(params)
    }
}



interface IDatahubDatasetParams extends IDatasetParams {
    envoronment: string
}

class DatahubDataset extends Dataset {
    constructor(params: IDatahubDatasetParams) {
        super();
    }
    create(params: IDatahubDatasetParams): Dataset  {
        return new DatahubDataset(params)
    }
}

export {Dataset, IDatasetParams}