import "./App.css";
import React from "react";
import AddDebt from "./AddDebt";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      data: null,
      allChecked: true,
    };
    this.addRow = this.addRow.bind(this);
  }
  componentDidMount() {
    try {
      fetch(
        "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const customerData = data.map((customer) => {
            customer.isChecked = true;
            return customer;
          });
          this.setState({
            data: customerData,
          });
        });
    } catch (err) {
      this.setState({ hasError: true });
    }
  }

  allChecked() {
    const customers = this.state.data.slice();
    if (this.state.allChecked) {
      customers.forEach((customer) => {
        customer.isChecked = false;
      });
      this.setState({
        data: customers,
        allChecked: false,
      });
    } else {
      customers.forEach((customer) => {
        customer.isChecked = true;
      });
      this.setState({
        data: customers,
        allChecked: true,
      });
    }
  }

  toggleCheck(e) {
    const customers = this.state.data.slice();
    customers.forEach((customer) => {
      if (customer.id === +e.target.name) {
        customer.isChecked = e.target.checked;
      }
    });
    this.setState({
      data: customers,
    });
  }

  deleteRow(id) {
    const filterCustomers = this.state.data.filter(
      (customer) => customer.id !== id
    );
    this.setState({ data: filterCustomers });
  }

  addRow(creditor, firstName, lastName, minPay, balance) {
    const customers = this.state.data.concat({
      id: this.state.data.length
        ? this.state.data[this.state.data.length - 1].id + 1
        : 0,
      creditorName: creditor,
      firstName: firstName,
      lastName: lastName,
      minPaymentPercentage: minPay,
      balance: balance,
      isChecked: true,
    });

    this.setState({
      data: customers,
    });
  }

  renderTableData() {
    return this.state.data.map((customer, index) => {
      const {
        id,
        creditorName,
        firstName,
        lastName,
        minPaymentPercentage,
        balance,
      } = customer;
      return (
        <tr key={id}>
          <td>
            <input
              type="checkbox"
              checked={
                this.state.data.find((customer) => customer.id === id).isChecked
              }
              name={id}
              onChange={(e) => this.toggleCheck(e)}
            />
          </td>
          <td>{creditorName}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td id="min-pay-table" dir="rtl">
            {minPaymentPercentage.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </td>
          <td id="balance-table" dir="rtl">
            {balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>
          <td>
            <button onClick={() => this.deleteRow(id)}>X</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.hasError || this.state.data === null) {
      return <div>oops! something went wrong here</div>;
    } else {
      return (
        <div id="main-wrapper">
          <table id="customers" border="1">
            <tbody>
              <tr id="column-names">
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    name="all"
                    onChange={() => this.allChecked()}
                  />
                </td>
                <td>Creditor</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Min Pay%</td>
                <td>Balance</td>
              </tr>
              {this.renderTableData()}
            </tbody>
          </table>
          <AddDebt addRow={this.addRow} />
          <div id="total-row">
            <div id="total">Total</div>
            <div id="balance">
              {"$" +
                this.state.data
                  .reduce(
                    (acc, cur) => acc + (cur.isChecked ? cur.balance : 0),
                    0
                  )
                  .toLocaleString()}
            </div>
          </div>
          <div id="checked-row">
            <div id="total-row-count">
              Total Row Count {this.state.data.length}
            </div>
            <div id="total-checked-count">
              Total Checked Count{" "}
              {this.state.data.reduce(
                (acc, cur) => acc + (cur.isChecked ? 1 : 0),
                0
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
