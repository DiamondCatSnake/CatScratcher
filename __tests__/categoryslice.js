import categoryReducer from '../client/reducers/categorySlice';

describe('Category reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      categories: {}, // {categoryid: {category, items: []}}
      task: {},
      isEditingTitle: false,
      titleChange: '',
    }
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(categoryReducer(undefined, )).toEqual(state);
    });
  });
})