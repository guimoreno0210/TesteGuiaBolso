import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            content: [],
            result: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('https://api.chucknorris.io/jokes/categories')
            .then(response => { this.setState({ category: response.data }) })
            .catch(() => { console.log('Erro ao recuperar os dados'); });
    }

    handleClick(e) {
        e.preventDefault();

        let getCategory = e.target.getAttribute('data-id');

        axios.get('https://api.chucknorris.io/jokes/random?category=' + getCategory)
            .then(response => {
                this.setState({
                    result: true,
                    content: response.data
                });
            })
            .catch(() => { console.log('Erro ao recuperar os dados'); });
    }

    render() {

        let content = [];

        if (this.state.result) {
            for (let item in this.state.content) {
                content.push(item)
            }
        }
        let showContent = (
            <div className="col-xs-8 col-sm-10 col-md-12 pull-right">
                <div className="contentjoke container">
                    <h1>PIADA</h1>
                    <h2>
                        <p>{this.state.content['value']}</p>
                    </h2>
                    <h3>
                        Categoria: {this.state.content['categories']}
                    </h3>
                    <button data-id={this.state.content['categories']} onClick={this.handleClick}>Proxima Piada</button>
                </div>
            </div>
        )

        return (
            <section id="menucategories">
                <div className="col-xs-4 col-sm-2 col-md-12 pull-left">
                    <ul>
                        {this.state.category.map((item, idx) =>
                            <li key={idx} data-id={item} onClick={this.handleClick}>
                                {item}
                            </li>
                        )}
                    </ul>
                </div>

                {this.state.result ? showContent : ''}

            </section>
        )
    }
}