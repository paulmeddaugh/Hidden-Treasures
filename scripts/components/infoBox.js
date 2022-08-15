const infoBoxTemplate = document.createElement('template');

infoBoxTemplate.innerHTML = `
  <style>
    .infoBox {
        padding-left: 10px;
        padding-right: 10px;
        height: 100%;
        background: black;
        opacity: .8;
    }
    .pageTitle {
        padding-top: 10px;
        font-size: 30px;
        font-size: clamp(20px, 3.5vw, 36px);
        color: #fefe2c;
    }
    .balance {
        padding-top: 10px;
        color:#4CAF50;
    }
    .line {
        margin-top: 10px;
        margin-bottom: 10px;
        height: 1px;
        background-color: grey;
    }
  </style>
  
  <div class="infoBox">
    <div class="pageTitle" id="title"> I have no title </div>
    <div class="line"></div>
    <div class="balance" id ="bal">Balance:</div>
  </div>
`;

class InfoBox extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Attaches a side-box component displaying a title ('title' attribute) and the account balance (first
   * loads from session storage, but can be changed using the 'balance' attribute).
   */
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(infoBoxTemplate.content);
    shadowRoot.getElementById("title").innerHTML = this.getAttribute('title');
    let withZeros = sessionStorage.getItem("balance").toLocaleString('en-US');
    shadowRoot.getElementById("bal").innerHTML = "Balance: $" + withZeros;
  }
  
  /**
   * Changing the 'balance' attribute can change the balance displayed in the InfoBox after loading.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    let withZeros = Number.parseFloat(Math.round(newValue*100)/100).toFixed(2);
    if (name === "balance") shadowRoot.getElementById("bal").innerHTML = "Balance: " + withZeros;
  }
}

customElements.define('info-box-component', InfoBox);