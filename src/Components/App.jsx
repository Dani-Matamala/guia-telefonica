import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import datos from '../Services/datos'
import Notification from './Notification'


function App() {

  // useEffect recibe una funcion y un array de dependencias, que determina si el componente se renderiza o no

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [toggle, setToggle] = useState(false)
  const [notificationName, setNotificationName] = useState()
  const [notifiactionText, setNotificationText] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('notification')

  useEffect(() => {
    datos.getPersons().then(data => {
      setPersons(data)
    })
  }, [])

  const addContact = (event) => {//Handle submit
    event.preventDefault()

    const newPerson = {
      name: newName,//newName es el nombre del input(valor del estado)
      telephone: newNumber,
    }

    const existPerson = persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    if (existPerson) {
      const updatePerson = window.confirm(`${newPerson.name} is already added to phonebook, replace the old  telephone with a new one?`)
      if (updatePerson) {
        const oldPerson = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())
        datos.updatePerson(oldPerson._id, newPerson)
          .then(response => {
            setPersons(persons.map((person) => {
              if (person.name.toLowerCase() === newPerson.name.toLowerCase())
                person = { ...response }
              return person
            }))
            setNotificationStyle("notification")
            setNotificationText("Updated ")
            setNotificationName(oldPerson.name)
            setToggle(!toggle)
            setTimeout(() => {
              setToggle(false)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status === 406) {
              setNotificationStyle("warning")
              setNotificationText(`${error.response.data.error}`)
              setNotificationName(" ")
              setToggle(!toggle)
              setTimeout(() => {
                setToggle(false)
              }, 5000)
            } else {
              setNotificationStyle("warning")
              setNotificationText(
                "This number was already deleted from the phonebook: "
              )
              setNotificationName(oldPerson.name)
              setToggle(!toggle)
              setTimeout(() => {
                setToggle(false)
              }, 5000)
            }
          })
      }
    }
    else {
      datos.createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotificationStyle("notification")
          setNotificationText("Added")
          setNotificationName(response.name)
          setToggle(!toggle)
          setTimeout(() => {
            setToggle(false)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotificationStyle("warning")
          setNotificationText(`${error.response.data.error}`)
          setNotificationName(" ")
          setToggle(!toggle)
          setTimeout(() => {
            setToggle(false)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)// va cambiando el valor del estado newName a medida
    // que se escribe en el input
    // una vez que se escribe el nombre, por medio de submit se agrega el nuevo contacto
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleDelete = (e) => {
    const id = e.target.value
    const person = persons.find(person => person._id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)
    if (confirm) {
      datos.deletePerson(id)
      .then(() => {
        const newPersons = persons.filter((item) => item._id !== id)
        setPersons(newPersons)
        setNotificationStyle("notification")
        setNotificationText("Succesfully deleted ")
        setNotificationName(person.name)
        setToggle(!toggle)
        setTimeout(() => {
         setToggle(false)
          }, 5000)
        })
      .catch(() => {
        setNotificationStyle("warning")
        setNotificationText("Number is already deleted from the phonebook: ")
        setNotificationName(person.name)
        setToggle(!toggle)
        setTimeout(() => {
          setToggle(false)
        }, 5000)
        })
    }
  }

  const handleNotification = () => {
    setToggle(false)
  }

  return (
    <div>

      <h2>Phonebook</h2>
      {toggle && (
        <Notification
          text={notifiactionText}
          name={notificationName}
          style={notificationStyle}
          ok = {handleNotification}
        />
      )}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons}
        filter={filter} handleFilterChange={handleFilterChange} handleDelete={handleDelete} />
    </div>
  )

}

export default App
