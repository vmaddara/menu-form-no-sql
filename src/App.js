import { useState, useEffect } from 'react';
import './App.css';
const newMenuStartValue = {
  name: '',
  description: '',
  price: '',
}

function App() {
  const [newMenuValue, setnewMenuValue] = useState(newMenuStartValue)
  const [menu, setMenu] = useState([])

  const getAllMenu = () => {
    fetch('http://localhost:3004/menu')
    .then((response) => response.json())
    .then((allMenu) => {
      setMenu(allMenu)
    })
  }

  useEffect(() => {
    getAllMenu()
  }, [])

  return (
    <div className='food'>
      <form 
        className="food__form" 
        onSubmit={(eventObject) => {
          eventObject.preventDefault()

          fetch('http://localhost:3004/menu', { 
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuValue)
          })
          .then((response) => response.json())
          .then((addedMenu) => {
            setMenu([
              ...menu,
              addedMenu
            ])
          })

          setnewMenuValue(newMenuStartValue)
        }}
      >
        <h1>Menu adding form</h1>

        <label className='food__label'>
          Food name <br />
          <input 
            type="text" 
            placeholder='lasagna...' 
            className='food__input'
            value={newMenuValue.name}
            onChange={(eventObject) => {
              const updatednewMenuValue = {
                ...newMenuValue,
                name: eventObject.target.value
              }
              setnewMenuValue(updatednewMenuValue)
            }}
            required="required"
          />
        </label>

        <label className='food__label'>
          Food description <br />
          <input 
            type="text" 
            placeholder='A rich and creamy whole-wheat pasta dish filled layer by layer with refreshingly fresh onions and garlic, lathered in a succulent sauce and topped with imported, premium quality mozzarella...' 
            className='food__input'
            value={newMenuValue.description}
            onChange={(eventObject) => {
              const updatednewMenuValue = {
                ...newMenuValue,
                description: eventObject.target.value
              }

              setnewMenuValue(updatednewMenuValue)
            }}
            required="required"
          />
        </label>

        <label className='food__label'>
        Price <br />
          <input 
            type="text" 
            placeholder='9.50 Eur...' 
            className='food__input'
            value={newMenuValue.price}
            onChange={(eventObject) => {
              const updatednewMenuValue = {
                ...newMenuValue,
                price: eventObject.target.value
              }

              setnewMenuValue(updatednewMenuValue)
            }}
            required="required"
          />
        </label>

        <button className='food__button' type='submit'>
            Add Menu
        </button>
      </form>

      <div className="food__Menu">
        {menu.map((Menu, index) => {

          return (
            <div key={Math.random()} className="food__Menu">
                <div className='food__Menu-content'>
                  <span className='food__Menu-name'>
                    {Menu.name}
                  </span>
                  <span className='food__Menu-description'>
                    {Menu.description}
                  </span>
                  <span className='food__Menu-price'>
                    {Menu.price}
                  </span>
                </div>
            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default App;
