export interface IStatus {
  [key: string]: any
}

interface Status extends IStatus {}

class Status {
  private static instance: Status

  public static start() {
    if (!Status.instance) {
      Status.instance = new Status()
    } else {
      console.warn(
        'Status already initialized. Only one status can exist at a time since this is a singleton'
      )
    }
  }

  public static get() {
    if (Status.instance) return Status.instance
    console.warn(
      'Status not yet initialized. Initialize the status with start() before trying to get its instance'
    )
  }
}

export default Status
