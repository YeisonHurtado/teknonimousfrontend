import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataDJ, EventInterface } from '../../interfaces/EventInterface'
import * as eventService from '../../services/EventService'
import { MutableRefObject } from 'react'
import ArtistsForm from './ArtistsForm'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { UserContext, context } from '../../context/UserContext'

// Props que recibe este componente
// Recibe la función que consulta todos los eventos que se encuentren en la base de datos
interface Props {
    loadEvents: () => void,
    eventFound?: EventInterface
}

interface ParamsEvent extends Record<string, string | string> {
    id: string
}

// Interface para errores para cada campo del formulario
interface ErrorForm {
    name?: string,
    location?: string,
    date?: string,
    poster?: string,
    name_dj?: string
}


const EventForm = ({ loadEvents, eventFound }: Props) => {
    // Token del usuario autenticado en la app
    const { userAuth } = useContext(UserContext) as context

    // Dependiendo de su valor mostrara el aviso de operación exitos
    const [success, setSuccess] = useState(false)
    // Parametros
    const params = useParams<ParamsEvent>()
    // Navigate
    const navigate = useNavigate()

    // URL de imagen
    const [imageUrl, setImageUrl] = useState<any | null>(null)

    // Constantes con valores predeterminador para el estado de los campos del formulario
    const dataDefault: DataDJ[] = [{
        name_dj: "",
        stage_name: ""
    }]
    const initialState = {
        name: '',
        location: '',
        poster: '',
        date: new Date(),
        lineup: dataDefault
    }

    // UseStates de objetos que guardaran los valores de los campos del formulario
    const [formDJS, setFormDJS] = useState<DataDJ[]>(dataDefault)
    const [event, setEvent] = useState<EventInterface>(initialState)
    // UseState para errores de validacion
    const [error, setError] = useState<ErrorForm>()

    // Hace referencia al campo de tipo file
    const inputFile: MutableRefObject<any> = useRef(null)

    /**
     * Funciones
     */


    // Resetea al valor original del campo file, el campo queda vacio.
    const resetInputFile = () => {
        inputFile.current.value = null
        handleInputFile(null)
    }

    // Se encarga de guardar la información cuando se envie el formulario dilenciado
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); /** Detiene el redireccionamiento generado por el boton del formulario */
        let res: void | AxiosResponse<any, any>
        if (!params.id) {
            res = await eventService.createEvent(event, userAuth) /** Hace la petición llamando el componente de servicios */
                .catch(function (err) { /** Captura los errores de la petición */
                    if (err.response) { /** Si Error tiene una respuesta*/
                        const { path, message } = err.response.data /** Las dos constantes toman el valor de cada elemento del error arrojado */
                        const propErr = `{ "${path}" : "${message}" }` /** Hacemos un string con el formato json para después convertirlo */
                        setError(JSON.parse(propErr)) /** Se almacena el error en el useState */
                        setEvent({ ...event, poster: '' }) /** El elemento poster se limpia */
                        resetInputFile() /** Y aquí  se resetea el campo file*/
                    }
                })

        } else {
            res = await eventService.updateEvent(params.id, event, userAuth) /** Hace la petición llamando el componente de servicios */
                .catch(function (err) { /** Captura los errores de la petición */
                    if (err.response) { /** Si Error tiene una respuesta*/
                        const { path, message } = err.response.data /** Las dos constantes toman el valor de cada elemento del error arrojado */
                        const propErr = `{ "${path}" : "${message}" }` /** Hacemos un string con el formato json para después convertirlo */
                        setError(JSON.parse(propErr)) /** Se almacena el error en el useState */
                        setEvent({ ...event, poster: '' }) /** El elemento poster se limpia */
                        resetInputFile() /** Y aquí  se resetea el campo file*/
                    }
                })
        }

        if (res) {
            // Una vez el evento se guarde ejecuta la función que se pasa por Props y reseteamos todos los valores
            resetInputFile()
            setError({})
            setEvent({ ...event, lineup: dataDefault })
            setEvent(initialState)
            setFormDJS(dataDefault)
            loadEvents()
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/post-event')
            }, 3000)


        }
    }

    // Camptura los valores de cada campo de texto y los guarda en el useState correspondiente
    const handleInputChange = (name: string, value: string, index?: number,) => {
        let copyRows = [...formDJS] //Variable que tendra los valores de los campos que sean generados dinamicamente al ingresar un artista que asistira al evento
        if (index || index === 0) {
            copyRows[index] = {
                ...copyRows[index],
                [name]: value
            }
        }
        setFormDJS(copyRows)
        setEvent({ ...event, [name]: value, lineup: copyRows })
    }

    // Guarda una nueva "fila" de elementos para los campos de los artistas
    const addRow = () => {
        setFormDJS(formDJS.concat(dataDefault))
        setEvent({ ...event, lineup: [...formDJS, { name_dj: "", stage_name: "" }] })
    }


    // Remueve la fila de campos de los artistas confirmados
    const onRemove = (index: number) => {
        const copyRows = [...formDJS]
        copyRows.splice(index, 1)
        setFormDJS(copyRows)
        setEvent({ ...event, lineup: copyRows })
    }

    // Guarda en el elemento poster un solo archivo escogido por el usuario
    const handleInputFile = (e: any) => {
        if (!e) {
            setImageUrl(null)
        } else {

            setEvent({ ...event, poster: e.target.files[0] })
            // setImageUrl(e.target.files[0])
            const reader = new FileReader()
            if (e.target.files[0]) {

                reader.onloadend = () => {
                    setImageUrl(reader.result)
                }
                reader.readAsDataURL(e.target.files[0])
            } else {
                setImageUrl(null)
            }
        }
    }

    // Editar evento
    const putEditEvent = async (id: string) => {
        const res = await eventService.getEvent(id)
        if (res.data) {
            setFormDJS(res.data.lineup)
            const dateTimeEvent = moment(res.data.date, 'YYYY-MM-DDTHH:mm:ss.Z').format('YYYY-MM-DDTHH:mm')
            setEvent({ ...res.data, date: dateTimeEvent })
            setImageUrl(res.data.poster)
        }
    }

    useEffect(() => {
        if (params.id) {
            putEditEvent(params.id)
        } else {
            setEvent(initialState)
            setFormDJS(dataDefault)
        }
    }, [params.id])



    return (
        <>

            {
                imageUrl && (
                    <div id="poster">
                        <img src={imageUrl} al-t="" />
                    </div>
                )
            }
            <div className="card-form">
                <div className="title-card-form">
                    {
                        params.id ?
                            <span>Modify an event</span>
                            :
                            <span>Upload an event</span>
                    }
                </div>
                {
                    params.id ?
                        <div className={`success ${success ? 'active' : ''}`}>
                            <span>Evento actualizado exitosamente</span>
                        </div>
                        :
                        <div className={`success ${success ? 'active' : ''}`}>
                            <span>Evento registrado exitosamente</span>
                        </div>
                }

                <form action="" method="post" onSubmit={handleSubmit} className='form-01' encType="multipart/form-data">
                    <div className="form-01-control">
                        <input
                            onChange={e => handleInputChange(e.target.name, e.target.value)}
                            type="text"
                            name='name'
                            className={`form-01-input ${error?.name && 'error'}`}
                            placeholder='Event name'
                            value={event.name}
                        />
                        {error?.name && <span className='validationError'>{error.name}</span>}
                    </div>
                    <div className="form-01-control">
                        <input
                            onChange={e => handleInputChange(e.target.name, e.target.value)}
                            type="text"
                            name="location"
                            className={`form-01-input ${error?.location && 'error'}`}
                            placeholder="Location"
                            value={event.location}
                            ref={inputFile}
                        />
                        {error?.location && <span className='validationError'>{error.location}</span>}
                    </div>
                    <div className="form-01-control">
                        <label htmlFor="event_date">Date and time</label>
                        <input
                            onChange={e => handleInputChange(e.target.name, e.target.value)}
                            type="datetime-local"
                            name='date'
                            className={`form-01-input ${error?.location && 'error'}`}
                            id='event_date'
                            value={event.date.toLocaleString()}
                        />
                    </div>
                    {<ArtistsForm rows={formDJS} handleInputChange={handleInputChange} addRow={addRow} errorValidation={`${error?.name_dj ? error.name_dj : ''}`} onRemove={onRemove} />}

                    <div className="form-01-control">
                        <input
                            onChange={handleInputFile}
                            type="file"
                            name="poster"
                            className={`form-01-input ${error?.poster && 'error'}`}
                            placeholder="Link img"
                            accept='image/*'
                            ref={inputFile}
                        />

                        {error?.poster && <span className='validationError'>{error.poster}</span>}

                    </div>
                    <div className="form-01-control">
                        {
                            params.id ?
                                <button type="submit" className="form-button-primary">
                                    Update event
                                </button>
                                :
                                <button type="submit" className="form-button-primary">
                                    Post event
                                </button>


                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default EventForm