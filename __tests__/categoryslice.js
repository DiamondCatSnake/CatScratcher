import categoryReducer from '../client/reducers/categorySlice';

describe('Category reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      categories:{}
    }
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(categoryReducer(undefined, '')).toEqual(state);
    });n
  });
})