/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import loader from "../Assets/loader.gif";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const setProfilePicture = async () => {};

    useEffect(() => {
        async function doEffect() {
            const data = [];
            for(let i = 0; i < 4; i++)
            {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }

        doEffect();
    }, [])

    return (
        <>
            <container>
                <div className="title-container">Pick an avatar as your profile picture</div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=> selectedAvatar(index)}/>
                            </div>
                        )
                    })}
                </div>
            </container>
            <ToastContainer/>
        </>
    )
}

const container = styled.div``;

export default SetAvatar;