import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from './js/containers/App';
import {Provider} from 'mobx-react';
import {ViewStore} from './js/stores'

import './scss/app.scss';

const viewStore = new ViewStore();

const stores = {
  viewStore: viewStore
};



const rootEl = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <Provider {...stores}>
      <App viewStore={viewStore} />
    </Provider>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./js/containers/App", () => {
    const NextApp = require<RequireImport>("./js/containers/App").default;
    ReactDOM.render(
      <AppContainer>
        <Provider {...stores}>
          <NextApp viewStore={viewStore} />
        </Provider>
      </AppContainer>
      ,
      rootEl
    );
  });
}
