import { useState, useEffect } from 'react'
import { db } from '../data/db.js'

//CUSTOM HOOK
export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 0

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    //Añadir guitarras al carrito
    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)   //Recorremos el carrito y buscamos si se repite la guitarra, devolviendo su índice
        if (itemExist >= 0) {                   //Si se repite... 
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]       //Copiamos el carrito para no mutar el state directamente
            updatedCart[itemExist].quantity++   //Se incrementa en uno la cantidad de esa guitarra 
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    //Eliminar guitarras del carrito
    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id != id))
    }

    //Agregar guitarras -desde- el carrito
    function increaseCart(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    //Eliminar guitarras -desde- el carrito
    function decreaseCart(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    //Vaciar carrito
    function clearCart() {
        setCart([])
    }

    //State derivado
    const isEmpty = () => cart.length === 0

    const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseCart,
        decreaseCart,
        clearCart,
        isEmpty,
        cartTotal
    }
}
