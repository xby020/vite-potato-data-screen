import { defineStore } from 'pinia';
import { dbGet, dbSet } from '@root/src/utils/db';
import _ from 'lodash';

export type ScreenState = {
  // Api function name: return type
};

const defaultState: ScreenState = dbGet({
  path: 'screen',
  user: false,
  value: {},
});

export const useScreenStore = defineStore({
  id: 'screen',
  state: (): ScreenState => defaultState,
  getters: {},
  actions: {
    async refreshData() {
      const apiListMap = {
        // Api function list
      };

      const apiResultRes = await Promise.allSettled(
        Object.keys(apiListMap).map((key: keyof typeof apiListMap) => {
          return apiListMap[key]();
        }),
      );

      const apiResult = Object.keys(apiListMap).map((key: keyof typeof apiListMap, index) => {
        const result = apiResultRes[index];

        if (result.status === 'fulfilled') {
          return { [key]: result.value };
        } else {
          return { [key]: defaultState[key] };
        }
      });

      const result = Object.assign(defaultState, ...apiResult);

      dbSet({
        path: 'screen',
        user: false,
        value: result,
      });

      Object.keys(result).forEach((key) => {
        this[key] = _.cloneDeep(result[key]);
      });

      return result;
    },
  },
});
