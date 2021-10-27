import React, { Component } from "react";
import { backendHost } from '../../../api-config';


class TestAjax extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(`${backendHost}/dashboard/articlecount`)
      // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {

      return <span>Loading...</span>;
    } else if (isLoaded) {
      // return <TestAjax {...this.props} {...this.state} />;

      return (
        // <TestAjax quip="Don't believe everything you think.{items.draft_article}" />
        <span>
            {items[this.props.name]}

            {/* {<ul>
              <li key={items.draft_article}>Draft Article: {items.draft_article}</li>
                <li key={items.published_article}>Published Article: {items.published_article}</li>
                <li key={items.review_article}>Review Artile: {items.review_article}</li>
                <li key={items.approval_article}>Approval Article: {items.approval_article}</li>
            </ul>} */}
        </span>
      );
    }
  }
}
export default TestAjax;