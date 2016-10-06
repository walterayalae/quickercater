import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

export default class Navigation extends Component {

 // Owners can login without a current store and we need to figure out what to do with them
 // What should the login button say? where should they be redirected?

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  handleBackClick() {
    this.props.goBack();
  }

  signInWithGoogle() {
    console.log(GLOBAL.stopNavigation);
    GLOBAL.stopNavigation = undefined;

    window.location.href = '/auth/google';
  }

  signOut() {
    GLOBAL.stopNavigation = undefined;
    window.location.href = '/api/auth/logout';
  }

  handleViewCart() {
    this.props.viewCart();
  }

          // <ToolbarGroup>
          //   <ToolbarTitle text={this.props.title} />
          // </ToolbarGroup>
          // <ToolbarGroup>
          //   {this.props.inStore
          //     ? <RaisedButton
          //       label="Back to Lobby"
          //       primary onClick={e => this.handleBackClick(e)}
          //     />
          //     : null
          //   }
          //   <RaisedButton label="View Cart" primary onClick={e => this.handleViewCart(e)} />
          //   {this.props.loggedIn
          //     ? this.props.myStore
          //       ? <RaisedButton
          //         label="MyStore"
          //         primary
          //         onClick={() => this.props.goToMyStore(
          //         Object.assign({}, this.props.myStore.properties, { id: this.props.myStore._id })
          //       )}
          //       />
          //       : <RaisedButton
          //         label="MyStore"
          //         primary
          //         onClick={this.props.openRegisterModal}
          //       />
          //     : <RaisedButton
          //       label="Login"
          //       primary
          //       onClick={e => this.signInWithGoogle(e)}
          //     />
          //   }
          //   {this.props.loggedIn
          // ? <RaisedButton label="Logout" primary onClick={e => this.signOut(e)} />
          // : null
          // }
          // </ToolbarGroup>
        // </AppBar>
  render() {
    const style = {
      raisedButton: {
        margin: 14,
      },
    };
    return (
      <div id="Toolbar">
        <AppBar
          title={this.props.title}
          style={{ height: 64 }}
          titleStyle={{ textAlign: 'left' }}
          iconStyleLeft={{ display: 'none' }}
          // children={}
        >
          <div>
            {this.props.inStore
            ? <RaisedButton
              style={style.raisedButton}
              label="Back to Lobby"
              secondary onClick={e => this.handleBackClick(e)}
            />
            : null}
            <RaisedButton
              style={style.raisedButton}
              label="View Cart"
              secondary
              onClick={e => this.handleViewCart(e)}
            />
            {this.props.loggedIn
            ? this.props.myStore
              ? <RaisedButton
                style={style.raisedButton}
                label="MyStore"
                secondary
                onClick={() => this.props.goToMyStore(
                Object.assign({}, this.props.myStore.properties, { id: this.props.myStore._id })
              )}
              />
              : <RaisedButton
                style={style.raisedButton}
                label="MyStore"
                secondary
                onClick={this.props.openRegisterModal}
              />
            : <RaisedButton
              style={style.raisedButton}
              label="Login"
              secondary
              onClick={e => this.signInWithGoogle(e)}
            />
            }
            {this.props.loggedIn
            ? <RaisedButton
              style={style.raisedButton}
              label="Logout"
              secondary
              onClick={e => this.signOut(e)}
            />
            : null
            }
          </div>
        </AppBar>
        <br />
      </div>
    );
  }
}
