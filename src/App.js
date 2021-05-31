import React from 'react';
import EditorComp from './Editor';
import './App.css';
// import {generate} from './mjml/App';

// import {render} from 'mjml-react';
// import {htmlOutput} from './mjml/mjm'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef(null);
  }

  render() {
    return (
      <div class="container">
        <h2>Email Authoring Tool</h2>
        <EditorComp />
      </div>
    );
  }
}


export default App;