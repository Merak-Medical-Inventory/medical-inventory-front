export const getDateString = (date: Date): string => {
    {
        const month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        return `${date.getFullYear()}-${month}-${day}`;
    }
}

export const paginateObject = <T>(objects: T[], pageSize: number) => {
  let aux: T[] = [];
  const paginatedObjects: T[][] = [];
  for (const [index, object] of objects.entries()) {
    if (aux.length === pageSize) {
      paginatedObjects.push(aux);
      aux = [];
    }
    if (index === objects.length - 1) {
      aux.push(object);
      paginatedObjects.push(aux);
      aux = [];
    }
    aux.push(object);
  }
  return paginatedObjects;
};

export const filterTable = <T>(object: T[], searchValue: string): T[] => {
  if (!searchValue) {
    return object;
  }

  return  object.filter(value => {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (value[key] != null) {
          if (value[key].toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
            return true;
          }
        }
      }
    }
  });

};
