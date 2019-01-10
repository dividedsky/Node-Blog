import React from 'react';

class UserPosts extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPosts(id);
  }

  render() {
    return (
      <div>
        <h3>user posts</h3>
        {this.props.posts.map(p => (
          <p>{p.text}</p>
        ))}
      </div>
    );
  }
}

export default UserPosts;
