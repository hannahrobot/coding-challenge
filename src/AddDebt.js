import "./App.css";
import React from "react";

class AddDebt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      creditor: "",
      firstName: "",
      lastName: "",
      minPay: 0,
      balance: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addRow(
      this.state.creditor,
      this.state.firstName,
      this.state.lastName,
      this.state.minPay,
      +this.state.balance
    );
    this.setState({
      creditor: "",
      firstName: "",
      lastName: "",
      minPay: 0,
      balance: 0,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>oops! something went wrong here</div>;
    } else {
      return (
        <div>
          <form id="add-debt-wrapper" onSubmit={(e) => this.handleSubmit(e)}>
            <button type="submit">Add Debt</button>
            <label htmlFor="creditor" placeholder="Creditor"></label>
            <input
              name="creditor"
              type="text"
              value={this.state.creditor}
              onChange={this.handleChange}
            />
            <label htmlFor="firstName"></label>
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName"></label>
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="minPay"></label>
            <input
              name="minPay"
              type="text"
              value={this.state.minPay}
              onChange={this.handleChange}
            />
            <label htmlFor="balance"></label>
            <input
              name="balance"
              type="text"
              value={this.state.balance}
              onChange={this.handleChange}
            />
          </form>
        </div>
      );
    }
  }
}

export default AddDebt;
