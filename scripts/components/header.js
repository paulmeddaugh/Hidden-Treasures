const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
	<style>
		.header {
			display: flex;
			position: relative;
			top: 0px;
			flex-wrap: wrap;
			align-items: center;
			padding: 5px;
			background-color: #0a0a23;
			border-bottom: 1px solid #505050;
		}

		.siteTitle {
			font-size: 35px;
			margin: 0;
			border: 0;
			flex: 2;
		}

		#centerContainer {
			display: flex;
			margin: 0px 10px;
		}

		#rightContainer {
			flex: 2;
			display: flex;
			flex-direction: row-reverse;
		}

		a {
			text-decoration: none;
			border-bottom: 1px solid #505050;
			margin-right: 10px;
			color: #00BFFF;
			white-space: nowrap;
			margin-left: 12px;
		}
		a:visited {
			color: #00BFFF;
		}
		a:active {
			color: #009cd0;
		}

		@media (max-width: 679px) {
			.header {
				flex-direction: column;
			}
			#centerContainer {
				margin-bottom: 5px;
			}
		}
	</style>
  
  	<div class="header">
 		<a class = "siteTitle" href="../index.html"> Hidden Treasures </a>
		<div id="centerContainer">
			<a href="addInventory.html">Add Inventory</a>
			<a href="SomethingToSell.html">Sell Inventory</a>
			<a href="exchange.html">Buy</a>
		</div>
		<div id="rightContainer">
			<a class="user" id="duser" href="AccountInformation.html">-</a>
		</div>
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