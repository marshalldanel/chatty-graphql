const channels = [{
  id: 1,
  name: 'Soccer'
}, {
  id: 2,
  name: 'Football'
}];

let nextId = channels.length + 1;

const resolvers = {
  Query: {
    channels: () => {
      return channels;
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    }
  }
}

module.exports = resolvers;