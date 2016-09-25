import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';

export default class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newItemPicture: false,
    };
  }

  handleOnMouseEnter() {
    this.setState({
      hover: 5,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      hover: 2,
    });
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleAddItem() {
    this.setState({
      open: false,
    });
    this.props.addItem({
      name: this.state.newItemTitle,
      description: this.state.newItemDescription,
      price: this.state.newItemPrice,
      picture: this.state.newItemPicture,
    });
  }

  handleItemTitleChange(e) {
    this.setState({
      newItemTitle: e.currentTarget.value,
    });
  }

  handleItemDescriptionChange(e) {
    this.setState({
      newItemDescription: e.currentTarget.value,
    });
  }

  handleItemPriceChange(e) {
    this.setState({
      newItemPrice: e.currentTarget.value,
    });
  }

  handleItemPictureChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newItemPicture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancel() {
    this.setState({
      open: false,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newItemPicture: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
    });
  }
  renderPreview() {
    let divToRender = '';
    const imgPrev = {
      float: 'right',
      marginRight: '3%',
      height: '25%',
      width: '25%',
    };
    if (this.state.newItemPicture !== false) {
      divToRender = (
        <img
          role="presentation"
          src={this.state.newItemPicture}
          style={imgPrev}
        />);
    } else {
      divToRender = (
        <img
          role="presentation"
          src={this.props.pic}
          style={imgPrev}
        />);
    }
    return divToRender;
  }
          // <TextField
          //   floatingLabelText="Add Picture"
          //   value={this.state.newItemPicture}
          //   onChange={e => this.handleItemPictureChange(e)}
          // />
  render() {
    const style = {
      floatingActionButton: {
        top: 15,
        right: 20,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        position: 'relative',
        height: 30,
      },
      card: {
        marginBottom: '5%',
      },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleAddItem(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div style={style.card}>
        <Paper zDepth={this.state.hover} >
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            style={style.card}
          >
            <CardTitle title={'Add Item'} style={style.cardActions}>
              <FloatingActionButton
                mini
                secondary
                onTouchTap={e => this.handleOpen(e)}
                style={style.floatingActionButton}
                zDepth={0}
              >
                <ContentAdd />
              </FloatingActionButton>
            </CardTitle>
          </Card>
        </Paper>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          { this.renderPreview() }
          <TextField
            hintText="Item"
            floatingLabelText="Enter Item Title"
            value={this.state.newItemTitle}
            onChange={e => this.handleItemTitleChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Item Description"
            value={this.state.newItemDescription}
            onChange={e => this.handleItemDescriptionChange(e)}
          /><br />
          <TextField
            hintText="Price"
            floatingLabelText="Enter Item Price"
            value={this.state.newItemPrice}
            onChange={e => this.handleItemPriceChange(e)}
          />
          <br />
          <br />
          <FlatButton
            label="Choose an Image"
            labelPosition="before"
          >
            <input
              type="file"
              style={style.imageInput}
              onChange={e => this.handleItemPictureChange(e)}
            />
          </FlatButton>
        </Dialog>
      </div>
    );
  }
}

