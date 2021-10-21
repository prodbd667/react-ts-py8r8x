const Type = {
  SINGLE: 'single',
  MERGE_C: 'mergec',
  MERGE_R: 'merger',
  EMPTY: 'empty',
};

export function getTemplateV2(coord = [[], []], factor = 1) {
  const [xArr, yArr] = coord;
  const rstart = xArr[0] + 1;
  const cstart = yArr[0] * factor + 1;
  const rend = rstart + xArr.length;
  const cend = cstart + yArr.length * factor;

  return {
    rstart,
    cstart,
    rend,
    cend,
  };
}

export function getCollection(arr = []) {
  const LCM = [...new Set(arr.map((el) => el.length))].reduce(
    (acc, l) => acc * l,
    1
  );

  const collection = arr.reduce((acc, row, rowIndex) => {
    const lengthRow = row.length;

    row.forEach((column, columnIndex) => {
      const [component, type] = column;

      if (type in acc) {
        acc[type].push({
          component,
          coord: [rowIndex, columnIndex],
          factor: LCM / lengthRow,
        });
        return;
      }

      acc[type] = [];
      acc[type].push({
        component,
        coord: [rowIndex, columnIndex],
        factor: LCM / lengthRow,
      });
    });

    return acc;
  }, {});

  return {
    defaultCountRows: arr.length,
    defaultCountColumns: LCM,
    collection,
  };
}

export function getNormalSingleV2(arr = []) {
  return arr.map(({ component, coord: [x, y], factor }) => {
    return {
      component,
      coord: [[x], [y]],
      factor,
    };
  });
}

export function getNormalMergeCV2(arr = []) {
  const buffer = arr.reduce((acc, el) => {
    const { component, coord } = el;
    const [x, y] = coord;
    if (y in acc) {
      acc[y].x.push(x);
      return acc;
    }

    acc[y] = { x: [], component, y: [y] };
    acc[y].x.push(x);

    return acc;
  }, {});

  return Object.values(buffer).map(({ component, x, y }) => {
    return { component, coord: [x, y] };
  });
}

export function getNormalMergeRV2(arr = []) {
  const buffer = arr.reduce((acc, el) => {
    const { component, coord } = el;
    const [x, y] = coord;
    if (x in acc) {
      acc[x].y.push(y);
      return acc;
    }

    acc[x] = { y: [], component, x: [x] };
    acc[x].y.push(y);

    return acc;
  }, {});

  return Object.values(buffer).map(({ component, x, y }) => {
    return { component, coord: [x, y] };
  });
}
