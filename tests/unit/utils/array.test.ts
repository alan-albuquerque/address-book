import { concatNotEmpty } from '@src/utils/array';

describe('utils:array', () => {
  describe('concatNotEmpty', () => {
    test('should proper concat two non empty strings', async () => {
      const result = concatNotEmpty(['string 1', 'string 2']);
      expect(result).toEqual('string 1 string 2');
    });
    test('should proper concat three non empty strings', async () => {
      const result = concatNotEmpty(['string 1', 'string 2', 'string 3'], ',');
      expect(result).toEqual('string 1,string 2,string 3');
    });
    test('should proper concat a string and null', async () => {
      const result = concatNotEmpty(['string 1', null], ',');
      expect(result).toEqual('string 1');
    });
    test('should proper concat a string and undefined', async () => {
      const result = concatNotEmpty(['string 1', undefined], ',');
      expect(result).toEqual('string 1');
    });
    test('should proper concat an empty array', async () => {
      const result = concatNotEmpty([], ',');
      expect(result).toEqual('');
    });
    test('should proper concat an array with only null items', async () => {
      const result = concatNotEmpty([null, null], ',');
      expect(result).toEqual('');
    });
    test('should proper concat an array with only undefined items', async () => {
      const result = concatNotEmpty([undefined, undefined], ',');
      expect(result).toEqual('');
    });
    test('should proper concat an array with two strings between empty values', async () => {
      const result = concatNotEmpty(
        [undefined, 'string 1', null, 'string 2'],
        ',',
      );
      expect(result).toEqual('string 1,string 2');
    });
  });
});
