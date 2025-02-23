import  Header  from './components/Header'
import Guitar from './components/Guitar'
import { useCart } from './hooks/useCart'

function App() {
  
  const {data, cart, addToCart, removeFromCart, increaseCart, decreaseCart, clearCart, cartTotal, isEmpty} = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseCart={increaseCart}
        decreaseCart={decreaseCart}
        clearCart={clearCart}
        cartTotal={cartTotal}
        isEmpty={isEmpty}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar 
                key={guitar.id}         //El key es un prop especial que React utiliza en map para mejorar el rendimiento 
                guitar={guitar}         //El valor del prop es un objeto guitarra
                addToCart={addToCart}
              />
            ))}
          </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
