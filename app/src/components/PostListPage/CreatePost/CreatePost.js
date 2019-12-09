import React, { Component } from "react";
import { connect } from "react-redux";

import { createPost } from "modules/request/actions";

const initialValues = {
  title: "",
  body: "",
};

class CreatePost extends Component {
  state = {
    values: initialValues,
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState(({ values }) => ({
      values: {
        ...values,
        [name]: value,
      },
    }));

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await this.props.createPost(this.state.values, { rethrowError: true });
      this.setState({ values: initialValues });
    } catch (e) {}
  };

  render() {
    const { values } = this.state;
    const {
      isBlocked,
      status: { isFetching, error },
    } = this.props;

    let submitText;
    if (isFetching) {
      submitText = "Submitting";
    } else if (isBlocked) {
      submitText = "Blocked";
    } else {
      submitText = "Create";
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input name="title" onChange={this.handleChange} value={values.title} />
        <textarea name="body" onChange={this.handleChange} value={values.body} />
        <button type="submit">{submitText}</button>
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    );
  }
}

const mapState = state => ({
  isBlocked: createPost.getIsBlocked(state),
  status: createPost.getStatus(state),
});

const mapDispatch = {
  createPost,
};

export default connect(mapState, mapDispatch)(CreatePost);
