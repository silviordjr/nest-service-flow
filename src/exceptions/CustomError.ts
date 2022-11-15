export default class CustomError extends Error {
    constructor(public status: number, public message: string) {
      super();
    }
  }