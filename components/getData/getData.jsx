import React from 'react';
import './getData.scss';
import firebase from './../firebase';
import 'firebase/auth';
import 'firebase/database';

export class GetData extends React.Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
              user: items[item].user
            });
          }
          this.setState({
            items: newState
          });
        });
      }


    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleSubmit(e) {
          //we need to prevent the default behavior of the form, which if we don't will cause the page to refresh when you hit the submit button.
        e.preventDefault();
        //we need to carve out a space in our Firebase database where we'd like to store all of the items that people are bringing to the potluck.
        const itemsRef = firebase.database().ref('items');
        const item = {
          title: this.state.currentItem,
          user: this.state.username
        }
        itemsRef.push(item);
        this.setState({
          currentItem: '',
          username: ''
        });//is just so that we can clear out the inputs so that an additional item can be added.
      } 

    render() {
        return (
            <div className='app'>
                <header>
                    <div className='wrapper'>
                        <h1>Here i want to download data for further filtering :)</h1>
                    </div>
                </header>
                <div className='container'>
                    <section className='add-item'>
                        <form>
                            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                            <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                            <button>Add Item</button>
                        </form>
                    </section>
                    <section className='display-item'>
                        <div className='wrapper'>
                            <ul>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}