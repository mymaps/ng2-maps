
export function getPropertyValue(obj: any, keys: string[], defaultValue: any): any {
  var current = obj;
  keys.forEach(elt => {
    if (current) {
	  current = current[elt];
    }
  });

  if (current != null) {
  	return current;
  } else {
    return defaultValue;
  }
};

export function hasProperty(obj: any, keys: string[]): boolean {
  var current = obj;
  keys.forEach(elt => {
    if (current) {
      current = current[elt];
    }
  });

  return (current != null);
};