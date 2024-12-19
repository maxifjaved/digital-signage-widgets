export class DigitalClock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
      this.updateTime();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            font-family: 'Arial', sans-serif;
            background: #000;
            color: #0ff;
            padding: 1rem;
            border-radius: 0.5rem;
            min-width: 200px;
            text-align: center;
          }
          .time {
            font-size: 2.5rem;
            font-weight: bold;
          }
          .date {
            font-size: 1rem;
            margin-top: 0.5rem;
          }
        </style>
        <div class="time"></div>
        <div class="date"></div>
      `;
    }
  
    updateTime() {
      const now = new Date();
      const timeElement = this.shadowRoot.querySelector('.time');
      const dateElement = this.shadowRoot.querySelector('.date');
  
      timeElement.textContent = now.toLocaleTimeString();
      dateElement.textContent = now.toLocaleDateString();
  
      requestAnimationFrame(() => this.updateTime());
    }
  }
  
  customElements.define('digital-clock', DigitalClock);