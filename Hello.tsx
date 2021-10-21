import React from 'react';
import Block from './Block';
import Mock from './Mock';
import Container from './Container';

import {
  getTemplateV2,
  getCollection,
  getNormalMergeCV2,
  getNormalSingleV2,
  getNormalMergeRV2,
} from './helpers';

export default ({ name }) => {
  const areas = '"A B B" "A C ." "D . ."';

  const config = [
    [<Mock text={'A'} />, <Mock text={'B'} />, <Mock text={'B'} />],
    [<Mock text={'A'} />, <Mock text={'C'} />],
    [<Mock text={'D'} />],
  ];

  const c = [
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'merge-c'],
    ],
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'merge-c'],
    ],
    [
      [<Mock text={''} />, 'empty'],
      [<Mock text={''} />, 'merge-r'],
      [<Mock text={''} />, 'merge-r'],
    ],
  ];

  // const list2 = c.map((el, i) => {
  //   return el.map((ell, ii) => {
  //     return `r${i}-c${ii}`;
  //   });
  // });
  // console.log(list2);

  const asd = [
    [<Mock text={''} />, 'single'],
    [<Mock text={''} />, 'single'],
    [<Mock text={''} />, 'merge-c'],
  ];

  const asd2 = [
    [<Mock text={''} />, 'merge-r'],
    [<Mock text={''} />, 'merge-r'],
    [<Mock text={''} />, 'empty'],
  ];

  function reduce(fn, acc, array, l) {
    if (array.length === 0) {
      return acc;
    }

    return reduce(fn, fn(acc, array[0], array, l), array.slice(1), l);
  }

  const start = 0;

  const someFn = (acc, el, arr, l) => {
    // console.log(acc, el, arr, l, `r${start}-c${l - arr.length}`);
    const [component, type] = el;
    if (type === 'merge-r') {
    }

    return acc;
  };

  // console.log('reduce ===>', reduce(someFn, [], asd2, asd2.length));

  const objN = c.reduce(
    (acc, el, i) => {
      const arr = el.reduce((accc, ell, ii) => {
        const [component, type] = ell;
        const item = `r${i}-c${ii}`;

        if (type === 'single') {
          accc.push({
            comp: <Block area={item}>{component}</Block>,
            area: item,
          });
        }

        if (type === 'empty') {
          accc.push({
            comp: null,
            area: '.',
          });
        }

        return accc;
      }, []);

      acc.buffer.push(arr);

      return acc;
    },
    {
      list: [],
      areas: [],
      buffer: [],
    }
  );

  // console.log('objN', objN);

  const obj = {
    listN: [
      <Block area={'A'}>
        <Mock text={'A'} />
      </Block>,
      <Block area={'B'}>
        <Mock text={'B'} />
      </Block>,
      <Block area={'C'}>
        <Mock text={'C'} />
      </Block>,
      <Block area={'D'}>
        <Mock text={'D'} />
      </Block>,
    ],
    areasN: '"A B B" "A C ." ". D D"',
  };

  const { listN, areasN } = obj;

  const list = ['A', 'B', 'C', 'D'].map((el) => (
    <Block area={el}>
      <Mock text={'q'} />
    </Block>
  ));

  const l = [
    [
      <Block area={'1 / 1 / 1 / 2'} key={'A'}>
        <Mock text={'AA'} />
      </Block>,
      <Block area={'B'} key={'B'}>
        <Mock text={'BB'} />
      </Block>,
      null,
    ],
    [
      <Block area={'C'} key={'C'}>
        <Mock text={'CC'} />
      </Block>,
      null,
      null,
    ],
    [
      <Block area={'D'} key={'D'}>
        <Mock text={'DD'} />
      </Block>,
      null,
      null,
    ],
  ];

  const arr1 = [
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'merge-c'],
      [<Mock text={''} />, 'merge-c'],
    ],
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'merge-c'],
      [<Mock text={''} />, 'merge-c'],
    ],
    [
      [<Mock text={''} />, 'merge-r'],
      [<Mock text={''} />, 'merge-r'],
      [null, 'empty'],
      [<Mock text={''} />, 'merge-c'],
    ],
    [
      [<Mock text={''} />, 'merge-r'],
      [<Mock text={''} />, 'merge-r'],
      [<Mock text={''} />, 'merge-r'],
      [<Mock text={''} />, 'merge-r'],
    ],
  ];

  const arr2 = [
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
    ],
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
    ],
    [
      [<Mock text={''} />, 'single'],
      [<Mock text={''} />, 'single'],
    ],
  ];

  // const buffer1 = getCollection(arr1);
  const { defaultCountRows, defaultCountColumns, collection } =
    getCollection(arr2);
  console.log('buffer1 ===>', collection);

  const getTemplateComponents = (arr) => {
    return arr.map((el) => {
      const { component, coord, factor } = el;
      const { rstart, cstart, rend, cend } = getTemplateV2(coord, factor);

      return (
        <Block rstart={rstart} cstart={cstart} rend={rend} cend={cend}>
          {component}
        </Block>
      );
    });
  };

  const singleList = getTemplateComponents(
    getNormalSingleV2(collection['single'])
  );
  const mergeCList = getTemplateComponents(
    getNormalMergeCV2(collection['merge-c'])
  );
  const mergeRList = getTemplateComponents(
    getNormalMergeRV2(collection['merge-r'])
  );

  // , ...mergeCList, ...mergeRList
  return (
    <Container columns={defaultCountColumns} rows={defaultCountRows}>
      {[...singleList]}
    </Container>
  );
};
