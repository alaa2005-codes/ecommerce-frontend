import { normalizeArrayValue, normalizeListData } from './normalizeData';

describe('normalizeListData', () => {
  it('returns an array from an API-style payload', () => {
    expect(normalizeListData({ data: [{ _id: '1', name: 'Cat' }] })).toEqual([{ _id: '1', name: 'Cat' }]);
  });

  it('returns an array from a direct array payload', () => {
    expect(normalizeListData([{ _id: '2', name: 'Brand' }])).toEqual([{ _id: '2', name: 'Brand' }]);
  });

  it('returns an empty array for invalid payloads', () => {
    expect(normalizeListData(null)).toEqual([]);
    expect(normalizeListData({ data: { _id: 'x' } })).toEqual([]);
  });

  it('normalizes undefined values safely', () => {
    expect(normalizeArrayValue(undefined)).toEqual([]);
  });
});
