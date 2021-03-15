import createStore from 'common/hooks/useStore';

interface Props {
  value?: string;
};

export const { provideStore, useConnect, useDispatch, useStore } = createStore<Props>({

  initState: {
    value: 'React-h5-ts'
  },

  reducers: {

    update(prevState, action) {
      return {
        ...prevState,
        ...action.payload,
      };
    }

  },

  effects: {
  },

});