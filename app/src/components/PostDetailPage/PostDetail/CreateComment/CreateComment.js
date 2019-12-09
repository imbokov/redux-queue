import React, { Component } from "react";
import { connect } from "react-redux";

import { createComment } from "modules/request/actions";

const initialValues = {
  body: "",
};

class CreateComment extends Component {
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
    const { postId, createComment } = this.props;

    event.preventDefault();

    try {
      await createComment({ ...this.state.values, post: postId }, { rethrowError: true });
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
        <textarea name="body" onChange={this.handleChange} value={values.body} />
        <button type="submit">{submitText}</button>
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    );
  }
}

const mapState = state => ({
  status: createComment.getStatus(state),
});

const mapDispatch = {
  createComment,
};

export default connect(mapState, mapDispatch)(CreateComment);
