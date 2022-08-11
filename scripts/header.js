const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <style>
    .header {
        display: flex;
        position: relative;
        top: 0px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        background-color: #0a0a23;
        border-bottom: 1px solid #505050;
    }

    .siteTitle {
        font-size: 35px;
        margin: 0 10px;
        border: 0;
        color: #00BFFF;
    }

    a {
        text-decoration: none;
        border-bottom: 1px solid #505050;
        margin-right: 10px;
        color: #00BFFF;
    }
    a:visited {
        color: #00BFFF;
    }
    a:active {
        color: #009cd0;
    }
  </style>
  
  <div class="header">
 		<a class = "siteTitle" href="../index.html"> Hidden Fields </a>
		<div>
			<a href="addInventory.html">Add Something</a>
			<a href="SomethingToSell.html">Sell Something</a>
			<a href="exchange.html">Exchange</a>
		</div>
		<a class="user" id="duser" href="AccountInformation.html">-</a>
	</div>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(headerTemplate.content);
    shadowRoot.getElementById("duser").innerHTML = "Account: " + sessionStorage.getItem("username");
  }
}

customElements.define('header-component', Header);