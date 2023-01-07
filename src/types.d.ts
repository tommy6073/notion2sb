declare module 'gyazo-api' {
  class Gyazo {
    constructor(accessToken: string | undefined)

    upload(image: string, params?: any[]): any
  }

  export = Gyazo
}
