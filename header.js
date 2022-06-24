const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <style>
  .container {
      height: 40px;
      display: flex;
      align-items: center;
      background-color:  #0a0a23;
  }

  ul {
    padding: 0;
  }

  ul li {
    list-style: none;
    display: inline;
  }

  a {
    font-weight: 700;
    margin: 0 25px;
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    padding-bottom: 1px;
    box-shadow: inset 0 -2px 0 0 #fff;
  }
  </style>
  <header>
  <title> Hidden Fields </title>
  <meta charset="utf-8" />
  <nav class="container">
      <ul>
          <a href="../Login/Login.html">Hidden Fields</a>
      </ul>
  </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);