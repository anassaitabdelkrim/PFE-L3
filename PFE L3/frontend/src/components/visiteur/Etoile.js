import React, { Component } from 'react';

class Etoile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            etoile: []
        }
    }

    componentDidMount = () => {
        let etoile = [];
        for (let i = 0; i < this.props.nbEtoileHotel; i++) {
            etoile.push(i);
        }
        this.setState({
            etoile: etoile
        });
    }

    render() {
        return (
            <div className="Etoile">
                {
                    this.state.etoile.map((e) => (
                        <i key={e} className="icon-star" style={{ color: "orange" }}></i>
                    ))
                }
            </div>
        )
    }

}

export default Etoile;
