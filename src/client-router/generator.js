import forward from './forwardToServerModel';

export function byIdRoutes(model) {
  const name = model.plural;
  return [
    {
      route: `${name}ById[{keys:ids}][{keys:fields}]`,
      get(pathSet) {
        return forward.call(this, pathSet);
      }
    },
    {
      route: `${name}ById[{keys:ids}][{keys:hasManyFields}][{keys:filtersAndSorts}].edges[{integers:range}]`, // .comments.edges[{integers:commentRange}]
      get(pathSet) {
        return forward.call(this, pathSet);
      }
    },
    {
      route: `${name}ById[{keys:ids}][{keys:hasManyFields}][{keys:filtersAndSorts}].count`, // .comments.count
      get(pathSet) {
        return forward.call(this, pathSet);
      }
    }
  ];
}

export function clientRoutesFromModels(thinky) {
  const result = [];
  const models = thinky.models;
  for (const modelName in models) {
    // eliminate join tables
    if (!modelName.includes('_')) {
      const model = models[modelName];
      result.push(...byIdRoutes(model));
    }
  }
  return result;
}
