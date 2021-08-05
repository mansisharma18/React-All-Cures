import styled from 'styled-components'
import posed from 'react-pose'

export default styled(posed.div({}))`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2em auto;
  align-items: center;
  text-align: center;

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  button {
    color: #fff;
    font: inherit;
    cursor: pointer;
    background: #00415e;
    border-radius: 3em;
    border: 2px solid;
    padding: .5rem 2em;
    transition: transform 80ms ease-in, -webkit-transform 80ms ease-in;
  }

  button span {
    color: #fff;
  }
  button:active {
    background: #004180
  }

  .container__form {
    padding: 4rem;
    overflow: hidden;
  }

  .container__form--one {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  .container__form--two {
    grid-column: 2 / span 1;
    grid-row: 1;
  }

  .overlay {
    grid-column: 1;
    grid-row: 1;
    background: #b9daf1;
    text-align: center;
    color: #000
  }
`
