import React from 'react';
import { gql, graphql } from 'react-apollo';
import { CHANNEL_LIST_QUERY } from './ChannelList';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      console.log(e.target.value);
      e.persist();
      mutate({
        variables: { name: e.target.value },
        // refetchQueries: [{ query: CHANNEL_LIST_QUERY }] // Double request -> not good
        optimisticResponse: {
          addChannel: {
            name: e.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Channel',
          }
        },
        update: (store, { data: { addChannel }}) => {
          // Read data from cache for this query
          const data = store.readQuery({ query: CHANNEL_LIST_QUERY });
          // Add channel from mutation to the end
          data.channels.push(addChannel);
          // Write the data back to the cache
          store.writeQuery({ query: CHANNEL_LIST_QUERY, data });
        },
      })
      .then( res => {
        e.target.value = '';
      })
    }
  }

  return (
    <input
      type='text'
      placeholder='Add a new channel'
      onKeyUp={handleKeyUp}
    />
  )
}

export const CHANNEL_MUTATION = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const AddChannelMutation = graphql(CHANNEL_MUTATION)(AddChannel);
export default AddChannelMutation;
