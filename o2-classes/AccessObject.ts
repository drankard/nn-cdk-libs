
interface IAccessObjectParams {}

interface IActiveDirectoryAccessObjectParams extends IAccessObjectParams {
    group: string
}

interface IUsernameAccessObjectParams extends IAccessObjectParams {
    username: string
}


abstract class AccessObject {
    private static isIActiveDirectoryAccessObject(object: any): object is IActiveDirectoryAccessObjectParams {
        return true;
    }
    private static isUsernameAccessObject(object: any): object is IUsernameAccessObjectParams {
        return true;
    }

    static create(params: IAccessObjectParams): AccessObject {
        if(this.isIActiveDirectoryAccessObject) {
            return new ADAccessObject((params as IActiveDirectoryAccessObjectParams).group);
        } else if(this.isIActiveDirectoryAccessObject) {
            return new UsersAccessObject((params as IUsernameAccessObjectParams).username);
        }
    }

    static fromList(params: IAccessObjectParams[]): AccessObject[] {
        return params.map(param => {
            return this.create(param);
        });
    }

}

class ADAccessObject extends AccessObject {
    group: string;

    constructor(group: string) {
        super();
        this.group = group
    }
    public create(group: string) {
        return new ADAccessObject(group);
    }
}

class UsersAccessObject extends AccessObject {
    username: string;
    constructor(username: string) {
        super();
        this.username = username;
    }
}

export {AccessObject};