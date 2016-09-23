import React, { Component } from 'react';
import MenuCard from './MenuCard';

import Cart from './Cart';
import CateringOptions from './Cateringoptions';
import CompanyDescription from './CompanyDescription';

import Server from '../models/serverAPI';
import orderAPI from '../models/orderAPI';
// import Cart from './Cart';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      menus: [],
    };
  }

  componentWillMount() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      console.log(menus);
      this.setState({ menus });
    });
  }


  fetchPendingOrders() {
    return OrderAPI.fetchPendingOrders(this.state.ownerId);
  }

  acceptPendingOrder(orderId) {
    // need to make call to OrderAPI to change pending order --> accepted
    // this means the (Order) -[rel:EDIT]->(owner)
  }

  completeAcceptedOrder(orderId) {
    // 1. Call OrderAPI.completeAcceptedOrder?
    //.             -- OA.cAO needs to remove the -[rel:EDIT]->(owner) relationship
    //                -- discuss this with team
  }

  // handleAddItemToOrder(itemObj) {
  //   const items = this.state.order;
  //   items.push(itemObj);
  //   console.log('item added', itemObj);
  //   this.openCart();
  //   this.setState({
  //     order: items,
  //   });
  // }
        // <div>
        //   {
        //     this.state.openCart
        //     ? <Cart
        //       open={this.state.openCart}
        //       order={this.state.order}
        //     />
        //     : null
        //   }
        // </div>

  render() {
    const style = {
      width: '60%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div className="StoreFront" >
        <CompanyDescription />
        <CateringOptions />
        <div>
          <h1>Edit Yo Menu</h1>
          {
            this.state.openCart
            ? <Cart
              open={this.state.openCart}
              order={this.state.order}
            />
            : null
          }
        </div>
        { this.state.menus.map((menu, index) =>
          <MenuCard
            key={index}
            style={style}
            menu={menu}
            addItemToOrder={this.props.addItemToOrder}
          />
          <Dashboard pendingOrders={this.fetchPendingOrders()} />
        )}
      </div>
  );
  }
}
