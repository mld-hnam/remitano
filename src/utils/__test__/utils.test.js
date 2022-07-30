import { parseRoutesRecursion } from '../utils';

describe('parseRoutesRecursion tests', () => {
  it('parse with data have routes', () => {
    const data = [
      {
        feature: '1',
        authority: ['1'],
        path: '/1',
        name: '1',
        index: '1',
        routes: [
          {
            path: '/1-1',
            name: '1-1',
            index: '1-1',
          },
          {
            feature: '1-2',
            authority: ['1-2'],
            index: '1-2',
            routes: [
              {
                path: '/1-2-1',
                name: '1-2-1',
                index: '1-2-1',
              },
              {
                path: '/1-2-2',
                name: '1-2-2',
                feature: '1-2-2',
                authority: ['1-2-2'],
                index: '1-2-2',
              },
            ],
          },
        ],
      },
    ];
    const res = [
      {
        feature: '1',
        authority: ['1'],
        path: '/1',
        name: '1',
        index: '1',
      },
      {
        path: '/1-1',
        name: '1-1',
        feature: '1',
        authority: ['1'],
        index: '1-1',
      },
      {
        path: '/1-2-1',
        name: '1-2-1',
        feature: '1-2',
        authority: ['1-2'],
        index: '1-2-1',
      },
      {
        path: '/1-2-2',
        name: '1-2-2',
        feature: '1-2-2',
        authority: ['1-2-2'],
        index: '1-2-2',
      },
    ];
    const output = parseRoutesRecursion(data);
    expect(output).toEqual(res);
  });

  it('parse with data not key routes', () => {
    const data = [
      {
        path: '/customers',
        name: 'my_customer',
      },
    ];
    const res = [
      {
        path: '/customers',
        name: 'my_customer',
      },
    ];
    const output = parseRoutesRecursion(data);
    expect(output).toEqual(res);
  });

  it('parse with data empty', () => {
    const data = [];
    const output = parseRoutesRecursion(data);
    expect(output).toEqual([]);
  });
});
