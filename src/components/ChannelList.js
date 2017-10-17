import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import AddChannel from './AddChannel';


class ChannelList extends Component {

  render() {
    if (this.props.channelListQuery && this.props.channelListQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.channelListQuery && this.props.channelListQuery.error) {
      return <div>Error{this.props.channelListQuery.error.message}</div>
    }

    const channelsToRender = this.props.channelListQuery.channels;

    return (
      <div className='channelsList'>
      <AddChannel />
      <ul className='Item-list'>
        {channelsToRender.map(channel => (
          <li 
            key={channel.id}
            className={'channel ' + (channel.id < 0 ? 'optimistic' : '')}
          >{channel.name}</li>
        ))}
      </ul>
      </div>
    )
  }
}

export const CHANNEL_LIST_QUERY = gql`
query channelsListQuery {
  channels {
    id
    name
  }
}
`;

// const channelListQuery = graphql(CHANNEL_LIST_QUERY)(ChannelList);
// export default channelListQuery;

export default graphql(CHANNEL_LIST_QUERY, { name: 'channelListQuery', options: { pollInterval: 5000 }})(ChannelList);