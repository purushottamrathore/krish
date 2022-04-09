import React from 'react';
import loading from "../../assets/loader.gif";
import './Loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderState: false,
    };
  }

  updateStatus = status => {
    this.setState({ loaderState: status });
  };

  render() {
    const { loaderState } = this.state;
    return (
      loaderState &&
      <div className="centerbox">
        <img src={loading} alt="" />
      </div>


    )

  }
}

export default Loading;