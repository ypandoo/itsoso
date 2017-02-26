import React from 'react';
import Header from './Header';
require('../styles/App.css');

export default React.createClass({
    render: function() {
        return ( <div>
            <Header></Header>
            {this.props.children}
            </div>
        )
    }
});