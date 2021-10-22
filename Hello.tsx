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

  const {
    defaultCountRows: cr1,
    defaultCountColumns: cc1,
    collection: c1,
  } = getCollection(arr1);

  const singleList1 = getTemplateComponents(getNormalSingleV2(c1['single']));
  const mergeCList1 = getTemplateComponents(getNormalMergeCV2(c1['merge-c']));
  const mergeRList1 = getTemplateComponents(getNormalMergeRV2(c1['merge-r']));

  const {
    defaultCountRows: cr2,
    defaultCountColumns: cc2,
    collection: c2,
  } = getCollection(arr2);
  const singleList2 = getTemplateComponents(getNormalSingleV2(c2['single']));

  return (
    <div>
      <Container columns={cc1} rows={cr1}>
        {[...singleList1, ...mergeCList1, ...mergeRList1]}
      </Container>
      <br />
      <br />
      <br />
      <Container columns={cc2} rows={cr2}>
        {[...singleList2]}
      </Container>
    </div>
  );
};
