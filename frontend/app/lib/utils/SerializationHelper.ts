/* eslint-disable */
/**
 * ESLint is disabled here since type checking is hard with this kind of code
 * TODO: Should still be possible, refactor any to unknown,... later
 */
export class SerializationHelper {
  public static toInstance (obj: any, json: any) {
    let jsonObj: any
    if (typeof (json) === 'string') {
      jsonObj = JSON.parse(json)
    } else {
      jsonObj = json
    }

    if (typeof obj.fromJSON === 'function') {
      obj.fromJSON(jsonObj)
    } else {
      for (const propName in jsonObj) {
        if (obj.hasOwnProperty(propName)) {
          obj[propName] = jsonObj[propName]
        }
      }
    }

    return obj
  }

  public static toInstanceArray (Obj: any, json: any) {
    const instances: Array<any> = []  
    json.forEach((jsonObject: any) => {
      instances.push(this.toInstance(new Obj(), jsonObject))
    })
    return instances
  }
}
