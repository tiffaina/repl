

export class BackendStatus {
    private static loaded: boolean = false;
    
    static setStatus(loaded: boolean): void {
        BackendStatus.loaded = loaded
  }

  static getBackendStatus():boolean {
    return BackendStatus.loaded;
  }

}

export default BackendStatus;
