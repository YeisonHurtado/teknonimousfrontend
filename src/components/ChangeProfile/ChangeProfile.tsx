import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import './changeprofile.css'
import * as userService from '../../services/UserService'
import { UserInterface } from '../../interfaces/UserInterface'

interface Props {
    id: string,
    visible: boolean,
    src: string,
    user: UserInterface | undefined,
    controlModal: () => void,

}

export const ChangeProfile = ({ id, user, visible, src, controlModal }: Props) => {
    // URL de imagen
    const [imageUrl, setImageUrl] = useState<any | null>(null)
    const [userUpdate, setUserUpdate] = useState<UserInterface | any>(user);
    // Hace referencia al campo de tipo file
    const inputFile: MutableRefObject<any> = useRef(null)
    const token = localStorage.getItem("token")
    const [error, setError] = useState("")

    // Guarda en el elemento poster un solo archivo escogido por el usuario
    const handleInputFile = (e: any) => {
        if (!e) {
            setImageUrl(src != "" ? src : null)
        } else {
            setUserUpdate({ ...user, profile: e.target.files[0] })
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

    // Actualizar foto de perfil
    const submitPhoto = async (e: React.FormEvent<HTMLFormElement>, userID: string) => {
        e.preventDefault()
        let res: any = null
        res = await userService.changeProfilePhoto(userUpdate, userID, token?.toString() || null)
            .catch(function (err) {
                if (err.response) {
                    const { message } = err.response.data
                    setError(message)
                }
            })
    }


    useEffect(() => {
        if (!visible) {
            inputFile.current.value = null
            handleInputFile(null)
        }
    }, [visible, src])
    return (
        <div className='modal-window' data-visible={visible}>
            <div className="modal-container" >
                <div className="modal-control">
                    <span onClick={controlModal}>X</span>
                </div>
                <div className="modal-content">
                    <div className="img-preview">
                        <div className="profile-photo">
                            {
                                imageUrl && (
                                    <img src={imageUrl} />
                                )
                            }
                        </div>
                    </div>
                    <form action="" method="PUT" onSubmit={(e) => submitPhoto(e, id)} encType="multipart/form-data">
                        <input
                            type="file"
                            onChange={handleInputFile}
                            name="profile"
                            className=""
                            placeholder="Sube tu foto de perfil."
                            accept='image/*'
                            ref={inputFile}
                        />
                        {error === "" && <span className='validationError'> {error} </span>}
                        <button
                            type='submit'
                            className='btn_change'>
                            Cambiar foto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
