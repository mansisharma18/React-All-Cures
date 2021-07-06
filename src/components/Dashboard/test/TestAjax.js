import React, { Component } from "react";

class TestAjax extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("/dashboard/articlecount")
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

      return <div>Loading...</div>;
    } else if (isLoaded) {
      // return <TestAjax {...this.props} {...this.state} />;

      return (
        // <TestAjax quip="Don't believe everything you think.{items.draft_article}" />
        <div>
            {items[this.props.name]}

            {/* {<ul>
              <li key={items.draft_article}>Draft Article: {items.draft_article}</li>
                <li key={items.published_article}>Published Article: {items.published_article}</li>
                <li key={items.review_article}>Review Artile: {items.review_article}</li>
                <li key={items.approval_article}>Approval Article: {items.approval_article}</li>
            </ul>} */}
        </div>
      );
    }
  }
}
export default TestAjax;