export function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // If the object is a BigInt, convert it to string
  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  // If the object is an array, process each item
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  // If the object is an object, process its values
  if (typeof obj === 'object') {
    const serializedObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      serializedObj[key] = serializeBigInt(value);
    }
    return serializedObj;
  }

  // If it's neither, return the value as is
  return obj;
}
