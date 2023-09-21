import categoryReducer, {addNewTask, addNewCategory, editTitle, updateTitle} from '../client/reducers/categorySlice';

describe('Category reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      categories: {
        'test': {
          name: 'New Category',
          items: []
        }
      }, // {categoryid: {category, items: []}}
      task: {},
      isEditingTitle: false,
      titleChange: '',
    }
  });

  describe('Add New Task', () => {
    it('should add a new task', () => {
      const newTask = {
        Task_Name: 'New Task',
        Assignee: 'Daniel',
        Due_Date: '2023-09-08',
        Priority: 'High',
        Status: 'In Progress',
        Description: 'need to create new task', 
        Category: 'New Category'
      };
      const categoryId = 'test'
      const obj = {categoryId, newTask};
      const action = addNewTask(obj);
      const newState = categoryReducer(state, action);
      expect(newState.categories[categoryId].items[0]).toEqual(newTask);
    });
  });

  describe('Add New Category', () => {
    it('should add a new category', () => {
      const categoryId = 'test1'
      const category = {
        [categoryId]: {
          name: 'New Category',
          items: []
        }
      };
      const action = addNewCategory();
      const oldLength = Object.entries(state.categories).length;
      const newState = categoryReducer(state, action);
      expect(Object.entries(newState.categories).length).toEqual(oldLength+1);
    });
  });

  describe('Edit Title', () => {
    it('should update titleChange', () => {
      const newTitle = 'New Title'
      const action = editTitle(newTitle);
      const newState = categoryReducer(state, action);
      expect(newState.titleChange).toEqual(newTitle);
    });
    it('should change category name', () => {
      const newTitle = 'New Title'
      const setTitle = categoryReducer(state,editTitle(newTitle));
      const key = 'test'
      const action = updateTitle(key);
      const newState = categoryReducer(setTitle,action);
      expect(newState.categories[key].name).toEqual(newTitle);
    });
  });
})